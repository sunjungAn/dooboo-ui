import type {MutableRefObject} from 'react';
import {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import type {ThemeContext} from '@dooboo-ui/theme';
import {ThemeProvider, useTheme} from '@dooboo-ui/theme';
import {css} from '@emotion/native';
import {loadAsync} from 'expo-font';

import type {AlertDialogContext} from '../modals/AlertDialog';
import AlertDialog from '../modals/AlertDialog';
import type {SnackbarContext} from '../modals/Snackbar';
import Snackbar from '../modals/Snackbar';
import createCtx from '../utils/createCtx';

export type {ThemeContext} from '@dooboo-ui/theme';
export type ThemeType = ThemeContext['themeType'];
export type DoobooTheme = ThemeContext['theme'];

export type DoobooContext = {
  assetLoaded: boolean;
  snackbar: SnackbarContext;
  alertDialog: AlertDialogContext;
} & ThemeContext;

export type DoobooProviderProps = {
  children?: JSX.Element;
};

const [useCtx, Provider] = createCtx<DoobooContext>(
  'dooboo-ui modals should be used within DoobooProvider.',
);

function DoobooProvider({children}: DoobooProviderProps): JSX.Element {
  const [assetLoaded, setAssetLoaded] = useState(false);

  useEffect(() => {
    const loadAsset = async (): Promise<void> => {
      await loadAsync({
        doobooui: require('../uis/Icon/doobooui.ttf'),
        'Pretendard-Bold': require('../uis/Icon/Pretendard-Bold.otf'),
        Pretendard: require('../uis/Icon/Pretendard-Regular.otf'),
        'Pretendard-Thin': require('../uis/Icon/Pretendard-Thin.otf'),
      });

      setAssetLoaded(true);
    };

    loadAsset();
  }, []);

  const themeContext = useTheme();

  const snackbar =
    useRef<SnackbarContext>() as MutableRefObject<SnackbarContext>;

  const alertDialog =
    useRef<AlertDialogContext>() as MutableRefObject<AlertDialogContext>;

  /**
   ** Snackbar
   */
  const snackbarContext: SnackbarContext = {
    open: (snackbarOption): void => {
      snackbar.current && snackbar.current.open(snackbarOption);
    },
    close: (): void => {
      snackbar.current && snackbar.current.close();
    },
  };

  /**
   ** AlertDialog
   */
  const alertDialogContext: AlertDialogContext = {
    open: (alertDialogOptions): void => {
      alertDialog.current && alertDialog.current.open(alertDialogOptions);
    },
    close: (): void => {
      alertDialog.current && alertDialog.current.close();
    },
  };

  return (
    <View
      style={css`
        flex: 1;
        align-self: stretch;
      `}
    >
      <Provider
        value={{
          ...themeContext,
          assetLoaded,
          snackbar: snackbarContext,
          alertDialog: alertDialogContext,
        }}
      >
        {children}
      </Provider>
      <Snackbar ref={snackbar} />
      <AlertDialog ref={alertDialog} />
    </View>
  );
}

function DoobooWithThemeProvider(props: DoobooProviderProps): JSX.Element {
  return (
    <ThemeProvider>
      <DoobooProvider {...props} />
    </ThemeProvider>
  );
}

export {useCtx as useDooboo, DoobooWithThemeProvider as DoobooProvider};

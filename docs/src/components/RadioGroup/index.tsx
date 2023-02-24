import React, {ReactNode, useEffect} from 'react';
import type {ReactElement} from 'react';
import styled from '@emotion/native';
import {DoobooProvider, useDooboo} from 'dooboo-ui';
import {useDarkMode} from 'storybook-dark-mode';

export {default as Basic} from './Basic';
export {default as Colored} from './Colored';
export {default as SelectValue} from './SelectValue';
export {default as WithLabels} from './WithLabels';
export {default as WithTitle} from './WithTitle';

type ContainerProps = {
  children: ReactNode;
};

const StoryContainer = styled.View`
  background-color: ${({theme}) => theme.bg.basic};
  justify-content: center;
  align-items: center;
`;

export function StoryWrapper({children}: ContainerProps): ReactElement {
  const {themeType, changeThemeType} = useDooboo();
  const isDark = useDarkMode();
  const storybookTheme = isDark ? 'dark' : 'light';

  useEffect(() => {
    if (storybookTheme !== themeType) {
      changeThemeType();
    }
  }, [storybookTheme]);

  return <StoryContainer>{children}</StoryContainer>;
}

export function StoryProvider({children}: ContainerProps): ReactElement {
  const isDark = useDarkMode();

  return (
    <DoobooProvider themeConfig={{initialThemeType: isDark ? 'dark' : 'light'}}>
      <StoryWrapper>{children}</StoryWrapper>
    </DoobooProvider>
  );
}

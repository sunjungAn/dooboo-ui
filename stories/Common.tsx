// Caveat: Expo web needs React to be imported
import React, {useState} from 'react';
import {StatusBar, View} from 'react-native';

import {
  DoobooProvider,
  LoadingIndicator,
  SwitchToggle,
  Typography,
  useDooboo,
} from '../main';

import {StoryContainer} from './GlobalStyles';

type ContainerProps = {
  children: JSX.Element;
};

export function StoryWrapper({children}: ContainerProps): JSX.Element {
  const {themeType, changeThemeType, assetLoaded} = useDooboo();
  const [on, off] = useState(themeType === 'dark');

  if (!assetLoaded) {
    return <LoadingIndicator />;
  }

  return (
    <StoryContainer>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Typography.Heading3>{themeType}</Typography.Heading3>
        <SwitchToggle
          isOn={on}
          onPress={() => {
            off(!on);
            changeThemeType();
          }}
          size="small"
          style={{padding: 8}}
        />
      </View>
      {children}
    </StoryContainer>
  );
}

export function renderStory(el: JSX.Element): JSX.Element {
  return (
    <DoobooProvider>
      <StoryWrapper>{el}</StoryWrapper>
    </DoobooProvider>
  );
}

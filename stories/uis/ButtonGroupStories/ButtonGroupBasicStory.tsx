// Caveat: Expo web needs React to be imported
import React from 'react';
import {ScrollView} from 'react-native';
import {select} from '@storybook/addon-knobs';

import type {DoobooTheme} from '../../../main';
import {ButtonGroup} from '../../../main/uis/ButtonGroup';
import {StoryContainer, StoryTitle} from '../../GlobalStyles';

function ButtonGroupBasic(): JSX.Element {
  const color = select<keyof DoobooTheme['button']>(
    'color',
    ['primary', 'secondary', 'success', 'warning', 'danger', 'light', 'info'],
    'primary',
  );

  return (
    <ScrollView contentContainerStyle={{flexDirection: 'column'}}>
      <StoryContainer>
        <StoryTitle style={{fontSize: 18, marginBottom: 8}}>Basic</StoryTitle>
        <ButtonGroup
          color={color}
          initialValue="Option1"
          options={['Option1', 'Option2', 'Option3']}
        />
      </StoryContainer>
    </ScrollView>
  );
}

export default ButtonGroupBasic;

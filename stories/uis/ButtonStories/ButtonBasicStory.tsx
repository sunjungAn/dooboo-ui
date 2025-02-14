// Caveat: Expo web needs React to be imported
import React from 'react';
import {boolean, number, select} from '@storybook/addon-knobs';

import type {ButtonColorType, ButtonSizeType} from '../../../main';
import {Button} from '../../../main';
import {StoryContainer, StorySection, StoryTitle} from '../../GlobalStyles';
import {buttonColors, buttonSizes, buttonTypes} from '../const';

function ButtonBasicStory(): JSX.Element {
  const color = select<ButtonColorType>('color', buttonColors, 'primary');
  const size = select<ButtonSizeType>('size', buttonSizes, 'medium');
  const disabled = boolean('disabled', false);
  const activeOpacity = number('activeOpacity', 0.8);
  const loading = boolean('loading', false);

  return (
    <StoryContainer>
      <StoryTitle>Basic</StoryTitle>
      <StorySection style={{flexDirection: 'column'}}>
        {buttonTypes.map((type) => (
          <Button
            activeOpacity={activeOpacity}
            color={color}
            disabled={disabled}
            key={type}
            loading={loading}
            // eslint-disable-next-line no-console
            onPress={() => console.log(`press ${type} basic button`)}
            size={size}
            style={{margin: 4}} // eslint-disable-next-line no-console
            text={`type: ${type}`}
            type={type}
          />
        ))}
      </StorySection>
    </StoryContainer>
  );
}

export default ButtonBasicStory;

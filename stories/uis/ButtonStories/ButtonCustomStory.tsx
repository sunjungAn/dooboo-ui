// Caveat: Expo web needs React to be imported
import React from 'react';
import {css} from '@emotion/native';
import {select} from '@storybook/addon-knobs';

import type {ButtonColorType, ButtonSizeType, ButtonType} from '../../../main';
import {Button} from '../../../main';
import {StoryContainer, StorySection, StoryTitle} from '../../GlobalStyles';
import {buttonColors, buttonSizes, buttonTypes} from '../const';

function ButtonCustomStory(): JSX.Element {
  const type = select<ButtonType>('type', buttonTypes, 'solid');
  const color = select<ButtonColorType>('color', buttonColors, 'primary');
  const size = select<ButtonSizeType>('size', buttonSizes, 'medium');

  return (
    <StoryContainer>
      <StoryTitle>Custom</StoryTitle>
      <StorySection>
        <Button
          color={color}
          // eslint-disable-next-line no-console
          onPress={() => console.log(`press enabled button`)}
          size={size}
          style={{margin: 4}}
          styles={{
            container: css`
              background-color: #449944;
              padding: 12px 12px;
            `,
            text: {color: '#fff'},
            disabled: {backgroundColor: '#efefef'},
            disabledText: {color: '#ccc'},
          }}
          text="ENABLED"
          type={type}
        />

        <Button
          disabled
          style={{margin: 4}}
          styles={{
            container: css`
              background-color: #449944;
              padding: 12px 12px;
            `,
            text: {color: '#fff'},
            disabled: {backgroundColor: '#efefef'},
            disabledText: {color: '#ccc'},
          }}
          text="DISABLED"
          type="solid"
        />
      </StorySection>
    </StoryContainer>
  );
}

export default ButtonCustomStory;

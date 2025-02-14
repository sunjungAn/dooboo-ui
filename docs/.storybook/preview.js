import React, {useState, useEffect} from 'react';
import {useStorybookState} from '@storybook/api';
import {useDarkMode} from 'storybook-dark-mode';
import {DocsContainer} from '@storybook/addon-docs';
import darkTheme from './darkTheme';
import lightTheme from './lightTheme';

export const parameters = {
  previewTabs: {
    'storybook/docs/panel': {
      index: 0,
      title: 'Docs',
    },
    canvas: {
      // hidden: true,
    },
  },
  docs: {
    container: ({children, context}) => (
      <DocsContainer
        context={{
          ...context,
          storyById: (id) => {
            const storyContext = context.storyById(id);
            return {
              ...storyContext,
              parameters: {
                ...storyContext?.parameters,
                docs: {
                  ...storyContext?.parameters?.docs,
                  theme: useDarkMode() ? darkTheme : lightTheme,
                },
              },
            };
          },
        }}
      >
        {children}
      </DocsContainer>
    ),
  },
  options: {
    storySort: (a, b) => {
      const sectionA = a[1].id.split('-')[0];
      const sectionB = b[1].id.split('-')[0];
      if (sectionA === sectionB) {
        return a[0].localeCompare(b[0]);
      }
      const sectionMap = {
        overview: 0,
        components: 1,
        packages: 2,
      };
      return sectionMap[sectionA] - sectionMap[sectionB];
    },
    /**
     * regex for finding the hierarchy separator
     * @example:
     *   null - turn off hierarchy
     *   /\// - split by `/`
     *   /\./ - split by `.`
     *   /\/|\./ - split by `/` or `.`
     * @type {Regex}
     */
    hierarchySeparator: /\/|\./,
    /**
     * regex for finding the hierarchy root separator
     * @example:
     *   null - turn off multiple hierarchy roots
     *   /\|/ - split by `|`
     * @type {Regex}
     */
    hierarchyRootSeparator: /\|/,

    isToolshown: true,
    showPanel: true,
    panelPosition: "bottom",
  },
  darkMode: {
    dark: darkTheme,
    light: lightTheme,
  },
};

import React from 'react'
import { addDecorator,addParameters} from '@storybook/react'
import Center from '../src/Components/Center/Center'
import { ThemeProvider, CSSReset, theme,Box } from '@chakra-ui/react'
import {withConsole} from '@storybook/addon-console'
import {withKnobs} from '@storybook/addon-knobs'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {withA11y} from '@storybook/addon-a11y'

// addDecorator(story => (
// <ThemeProvider theme={theme}>
//   <Center>{story()}</ Center>
//   <CSSReset/>
// </ThemeProvider>))

addDecorator((storyFn,context)=>withConsole()(storyFn)(context))
addDecorator(withKnobs)
addDecorator(withA11y)

addParameters({
  viewport:{
    viewports:INITIAL_VIEWPORTS
  }
})

export const decorators=[
  (story) => (
  <ThemeProvider theme={theme}>
    <Box m='4'><Center>{story()}</ Center></Box>
    <CSSReset/>
  </ThemeProvider>)
]
  
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
}

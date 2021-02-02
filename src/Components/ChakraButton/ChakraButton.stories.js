import React from 'react'
import { Button } from '@chakra-ui/react'
import { action, actions } from '@storybook/addon-actions'
import { text, boolean } from '@storybook/addon-knobs'

export default {
    title: 'Chakra/Button',
    component: Button,
    argTypes: {
        colorScheme: { control: 'text' },
        children: { control: 'text' },
        onClick: { action: 'clicked' }
    }
}

//  export const Success = () => <Button onClick={action('click handler')} colorScheme='green'>Success</Button>
//  export const Danger = () => <Button {...actions('onClick', 'onMouseOver')} colorScheme='red'>Danger</Button>
export const Log = () => <Button onClick={() => console.log('button clicked', process.env.STORYBOOK_THEME)} colorScheme='blue'>Log</Button>
export const knobs = () => <Button colorScheme='purple' disabled={boolean('Disabled', false)}>
    {text('label', 'button label')}
</Button>

const Template = args => <Button {...args} />
export const Success = Template.bind({})
Success.args = {
    colorScheme: 'green',
    children: 'Success'
}

export const Danger = Template.bind({})
Danger.args = {
    colorScheme: 'red',
    children: 'Danger'
}
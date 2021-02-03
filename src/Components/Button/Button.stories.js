import React from 'react'
import Button from './Button'
import Center from '../Center/Center'

export default {
    title: 'Form/Button',
    component: Button,
    // decorators: [story => <Center>{story()}</Center>]
}

export const Primary = () => <Button variant='primary'>Primary</Button>
export const Secondary = () => <Button variant='secondary'>Secondary</Button>
export const Success = () => <Button variant='success'>Success</Button>
export const Danger = () => <Button variant='danger'>Danger</Button>

// import React from 'react'
// import Tag from './Button'
// export default {
//      title: 'Tag title',
//      component: Tag
// }
// export const Basic = () => (
//      <Tag/>
// )
// export const Second = () => (
//      <Tag title="My second tag"/>
// )

// const Template = (args) => <Button {...args}/>

// export const PrimaryA=Template.bind({});
// PrimaryA.args={
//     variant:'primary',
//     children:'Primary Args'
// };

// export const LongPrimaryA = Template.bind({});
//  LongPrimaryA.args={
//      ...PrimaryA.args,
//      children:'Long Primary Args'
//  };

// export const SecondaryA=Template.bind({});
// SecondaryA.args={
//     variant:'secondary',
//     children:'Secondary Args'
// }
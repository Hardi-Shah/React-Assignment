import React from 'react'                                              
import './Input.css'

function Input(props) {
    const { size = 'medium', ...rest }=props
    return (
        <input className={`input ${size}`}{...rest}/>
    )
}
export default Input

// import React, { FC } from 'react'
// interface TagProps {
//      title?: string;
// }
// const Tag: FC<TagProps> = ({ title="My title" }) => {
//      return (
//          <div style={{backgroundColor: 'yellow'}}>
//              {title}
//          </div>
//      )
// }
// export default Tag
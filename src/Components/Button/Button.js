import React  from 'react'
import './Button.css'

function Button(props) {
    const { variant = 'primary', children, ...rest }=props
    return (
        <button className={`button ${variant}`}{...rest}>
            {children}
        </button>
    )
}
export default Button

//export interface IButtonProps {
    //     children?: React.ReactNode,
    //     variant:'primary'
    // }
    // const Button: React.SFC<IButtonProps> = props => (
    // 	<button ClassNames={`button ${props.variant}`}>
    // 		{props.children}
    //     </button>
    // )


// export interface TagProps {
//     title?: string;
// }
// const Tag: FC<TagProps> = ({ title="My title" }) => {
//     return (
//         <div style={{backgroundColor: 'yellow'}}>
//             {title}
//         </div>
//     )
// }
// export default Tag
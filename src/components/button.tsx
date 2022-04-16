
interface ButtonProps {
    title: String,
    style?: any,
    suffix?: any
}

export default function Button({title,style,suffix}:ButtonProps) {
    return (
       <button style={style} type="submit" className='button' >
           {suffix !== undefined ? (<div style={{marginRight: 9,display:'flex',alignItems:'center'}}>{suffix}</div>) : ''}
           <div>{title}</div>  
       </button>
    )
}
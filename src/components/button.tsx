
interface ButtonProps {
    title: String,
    style?: any,
    suffix?: any,
    className?: string,
    isButtonMobileResponsive?: Boolean
}

export default function Button({title,style,suffix,className,isButtonMobileResponsive}:ButtonProps) {
    return (
       <button style={style} type="submit" className={'button '+className} >
           {suffix !== undefined ? (<div style={{display:'flex',alignItems:'center'}}>{suffix}</div>) : ''}
           {!isButtonMobileResponsive ? ( <div>{title}</div>  ) :  <div className="button__title">{title}</div>  }
          
           
       </button>
    )
}
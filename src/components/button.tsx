import { MouseEventHandler } from "react"

interface ButtonProps {
    title?: String,
    style?: any,
    suffix?: any,
    className?: string,
    shadowed?: boolean,
    outlined?: boolean,
    fullsize?: boolean,
    isButtonMobileResponsive?: Boolean,
    smalled?: boolean,
    children?: React.ReactNode,
    onClick?:MouseEventHandler<HTMLButtonElement>
}

export default function Button({shadowed,title,style,suffix,
                                outlined,fullsize,smalled,children,
                                className,isButtonMobileResponsive,
                                onClick}:ButtonProps) {
    let classnames = 'button '+className;
    if (shadowed) {
        classnames += ' shadowed';
    }
    if (outlined) {
        classnames += ' outlined';
    }

    if (smalled) {
        classnames += ' smalled';
    }

    if (fullsize) {
        classnames += ' fullsize';
    }

    const renderTitle = () => {
        if (!isButtonMobileResponsive) {
            return <div>{title}</div>       
        }

        return <div className="button__title">{title}</div>
     
    }
    return (
       <button onClick={onClick} style={style} type="submit" className={classnames} >
           {suffix !== undefined ? (<div style={{display:'flex',alignItems:'center',marginRight:5}}>{suffix}</div>) : ''}
           {renderTitle()}
           {children}
       </button>
    )
}
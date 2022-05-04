import React, { MouseEventHandler } from "react";


interface RowProps {
    children:  React.ReactNode,
    alignItems?: 'center' | 'flex-start' | 'end' | 'stretch',
    justifyContent?: 'center' | 'start' | 'end' | 'space-between',
    style?: any,
    className? : string,
    onClick?: MouseEventHandler<HTMLDivElement>
}

export default function Row({children,alignItems,justifyContent,style,className,onClick}:RowProps) {
    return <div 
    onClick={onClick}
    className={className + ' row'}
    style={{
alignItems: alignItems,
justifyContent: justifyContent,
...style
    }}>{children}</div>
}
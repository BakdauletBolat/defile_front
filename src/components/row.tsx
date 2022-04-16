import React from "react";


interface RowProps {
    children:  React.ReactNode,
    alignItems?: 'center' | 'start' | 'end' | 'stretch',
    justifyContent?: 'center' | 'start' | 'end' | 'space-between',
    style?: any,
    className? : string
}

export default function Row({children,alignItems,justifyContent,style,className}:RowProps) {
    return <div 
    className={className + ' row'}
    style={{
alignItems: alignItems,
justifyContent: justifyContent,
...style
    }}>{children}</div>
}
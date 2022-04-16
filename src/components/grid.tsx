import React from "react";


interface GridProps {
    children:  React.ReactNode,
    alignItems?: 'center' | 'start' | 'end' | 'stretch',
    justifyContent?: 'center' | 'start' | 'end' | 'space-between',
    style?: any,
    className? : string,
    gridTemplateColumns?: string
}

export default function Row({children,alignItems,justifyContent,style,className,gridTemplateColumns}:GridProps) {
    return <div 
    className={className + ' grid'}
    style={{
alignItems: alignItems,
justifyContent: justifyContent,
gridTemplateColumns: gridTemplateColumns,
...style
    }}>{children}</div>
}
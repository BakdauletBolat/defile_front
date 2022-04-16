import React from "react";


interface SizedBoxProps {
    width?:  number
    height?: number
}

export default function SizedBox({width,height}:SizedBoxProps) {
    return <div style={{
        width:width,
        height:height
    }}></div>
}
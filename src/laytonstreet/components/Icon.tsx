import * as React from 'react';

type IconName = "layton-street"

interface IconDef {
    width: number,
    height: number,
    path: string
}

const iconDefinitions: {[key: string]: IconDef} = {
    "layton-street": {
        width: 100,
        height: 100,
        path: "M3,0 m30,30 h-30 v20 h20 v20 h20 v-30 z M97,0 m-30,30 h30 v20 h-20 v20 h-20 v-30 z"
    }
}

interface IconProps {
    icon: IconName,
}

export default function Icon({icon}: IconProps) {
    const { width, height, path } = iconDefinitions[icon];
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            xlinkHref="http://www.w3.org/1999/xlink"
            version="1.1"
            preserveAspectRatio="xMidYMid meet"
            viewBox={`0 0 ${width} ${height}`} >
            <g fill="currentColor" opacity="1" fill-opacity="1">
                <path d={path} />
            </g>
        </svg>
    );
}

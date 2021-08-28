import * as React from 'react';
import { library, IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSignInAlt, faSignOutAlt, faEdit, faTimes, faExclamationTriangle, faCheckCircle, faTimesCircle, faExclamationCircle, faInfoCircle, faFile, faFileCode, faFileAlt, faFileArchive, faFileImage, faFileUpload, faFileDownload, faFileCsv, faFileWord, faBan, faUser, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const faIcons = [
    faUser,
    faSignInAlt, 
    faSignOutAlt, 
    faEdit, 
    faTimes,
    faExclamationTriangle,
    faCheckCircle,
    faTimesCircle,
    faExclamationCircle,
    faInfoCircle,
    faFileUpload,
    faFileDownload,
    faFile,
    faFileAlt,
    faFileCode,
    faFileArchive,
    faFileImage,
    faFileCsv,
    faFileWord,
    faBan,
    faAngleLeft,
    faAngleRight,
];

library.add(...faIcons);

type CustomIcons = "layton-street";

type IconName = CustomIcons | IconProp;

interface IconDef {
    width: number,
    height: number,
    path: string
}

const iconDefinitions: {[key in CustomIcons]: IconDef} = {
    "layton-street": {
        width: 100,
        height: 100,
        path: "M3,0 m30,30 h-30 v20 h20 v20 h20 v-30 z M97,0 m-30,30 h30 v20 h-20 v20 h-20 v-30 z"
    }
}

type IconProps = {
    icon: IconName,
    color?: string,
    className?: string
} & Omit<React.DOMAttributes<SVGSVGElement>, 'children' | 'mask'>

export default function Icon({ icon, className = "", onClick, ...otherProps }: IconProps) {
    className += " Icon";
    if (onClick) {
        className += " clickable";
    }
    const iconDefinition = iconDefinitions[icon as CustomIcons];
    if (iconDefinition) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg"
                xlinkHref="http://www.w3.org/1999/xlink"
                version="1.1"
                preserveAspectRatio="xMidYMid meet"
                viewBox={`0 0 ${iconDefinition.width} ${iconDefinition.height}`}
                className={className}
                onClick={onClick}
                {...otherProps}  >
                <g fill="currentColor" opacity="1" fillOpacity="1">
                    <path d={iconDefinition.path} />
                </g>
            </svg>
        );
    } else {
        return <FontAwesomeIcon icon={icon as IconProp}
            className={className}
            onClick={onClick}
            {...otherProps} />
    }
}

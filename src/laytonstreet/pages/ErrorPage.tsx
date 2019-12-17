import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import Page from '../components/Page';
import { Color } from 'csstype';

interface Props {
    code: number;
}

export default function ErrorPage({code}: Props) {
    const { caption, message, icon } = getError(code);
    return (
        <Page narrow className="error-page">
            <div className="text-center align-middle">
                <FontAwesomeIcon icon={icon.name} color={icon.color} className="display-1"/>
                <h1>{caption}</h1>
                <div>{message}</div> 
            </div>
        </Page>
    );
}

interface Error {
    caption: string,
    message: string,
    icon: { name: IconProp, color: Color }
}

const errors: {[key: number]: Error} = {
    404: {
        caption: "This page does not exist",
        message: "How did you get here?",
        icon: { name: "ghost", color: "grey" }
    },
    501: {
        caption: "Under constuction",
        message: "This page is coming soon",
        icon: { name: "hard-hat", color: "#ffc107" }
    }
};

function getError(code: number): Error {
    return errors[code];
}

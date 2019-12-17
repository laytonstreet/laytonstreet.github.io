import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardTitle from 'reactstrap/lib/CardTitle';

export interface Props {
    title: string,
    icon: IconProp,
    text: string,
    link: string
}

export default function Option({title, icon, text, link}: Props) {
    return (
        <Card className="text-center option">
            <Link to={link}>
                <CardBody>
                    <CardTitle><h3>{title}</h3></CardTitle>
                        <FontAwesomeIcon icon={icon} className="display-1" />
                    <CardBody>{text}</CardBody>
                </CardBody>
            </Link>
        </Card>
    );
}
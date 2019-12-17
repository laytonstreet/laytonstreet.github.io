import * as React from 'react';
import { Container } from 'reactstrap';

type Props = {
    children: JSX.Element[] | JSX.Element
    narrow?: boolean
} | React.ComponentProps<any>

export default function Page({children, narrow, ...otherProps}: Props) {
    return <>
        <Container className={`page ${narrow ? "page-xs" : ""}`} {...otherProps}>
            {children}
        </Container>
    </>;
}

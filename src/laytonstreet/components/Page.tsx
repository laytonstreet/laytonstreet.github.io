import { isLoggedIn, login } from 'laytonstreet/api/LaytonStreetApi';
import { UserContext } from 'laytonstreet/contexts/UserContext';
import ErrorPage from 'laytonstreet/pages/ErrorPage';
import { Role } from 'laytonstreet/types/LaytonStreetRoles';
import * as React from 'react';
import { Container } from 'reactstrap';

type Props = {
    children: JSX.Element[] | JSX.Element
    className?: string
    narrow?: boolean
    requiresLogin?: boolean
    rolesAllowed?: Role | Role[]
}

export default function Page({children, narrow, rolesAllowed, requiresLogin = rolesAllowed && rolesAllowed?.length > 0, ...otherProps}: Props) {
    const userInfo = React.useContext(UserContext);
    if (requiresLogin && !isLoggedIn()) {
        if (userInfo) {
            login().then(({ redirectUri }) => {
                if (redirectUri) {
                    window.location.href = redirectUri;
                }
            });
        }
        return <ErrorPage code={401} />
    }
    if (rolesAllowed) {
        if (!Array.isArray(rolesAllowed)) {
            rolesAllowed = [rolesAllowed];
        }
        if (!rolesAllowed.some((role: Role) => userInfo?.roles.includes(role))) {
            return <ErrorPage code={403} />;
        }
    }
    return <>
        <Container className={`page ${narrow ? "page-xs" : ""}`} {...otherProps}>
            {children}
        </Container>
    </>;
}

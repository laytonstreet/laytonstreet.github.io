import { MEMBER } from 'laytonstreet/types/LaytonStreetRoles';
import * as React from 'react';
import Page from '../components/Page';

export default function MembersPage() {
    return (
        <Page rolesAllowed={MEMBER}>
            <h1 className="text-center display-4">Members</h1>
            <br/>

        </Page>
    );
}
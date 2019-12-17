import * as React from 'react';
import Page from '../components/Page';
import Option from '../components/Option';
import CardDeck from 'reactstrap/lib/CardDeck';

export default function LeaseholdersPage() {
    return (
        <Page>
            <h1 className="text-center">Leaseholders</h1>
            <br/>
            <CardDeck>
                <Option title="Pay ground rent"
                        icon="credit-card"
                        text="I'd like to pay my gound rent"
                        link="ground-rent" />
                <Option title="Modifications"
                        icon="hammer"
                        text="I'd like to make improvements to my flat"
                        link="flat-modification" />
                <Option title="Lease extensions"
                        icon="scroll"
                        text="I'd like to extend my lease"
                        link="lease-extension" />
            </CardDeck>
        </Page>
    );
}
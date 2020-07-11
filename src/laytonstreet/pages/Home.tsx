import * as React from 'react';
import CardDeck from 'reactstrap/lib/CardDeck';
import Option from '../components/Option';
import Page from '../components/Page';

export default function Home() {
    return (
        <Page>
            <h1 className="text-center display-3">
                <span className="d-inline-block">Welcome to</span>{"\u00A0"}
                <span className="d-inline-block">Layton Street</span>
            </h1>
            <br/>
            <CardDeck>
                <Option title="Members"
                        icon="users"
                        text="I own a share of the freehold"
                        link="members" />
                <Option title="Pay ground rent"
                        icon="credit-card"
                        text="I'd like to pay my ground rent"
                        link="ground-rent" />
                <Option title="Modifications"
                        icon="hammer"
                        text="I'd like to make improvements to my flat"
                        link="flat-modification" />
                <Option title="Lease extensions"
                        icon="scroll"
                        text="I'd like to extend my lease"
                        link="lease-extension" />
                <Option title="Moving"
                        icon="truck-moving"
                        text="I've just sold/bought my flat"
                        link="rentals" />
                <Option title="Rentals"
                        icon="sign"
                        text="I'd like to rent out my flat or change my tenants"
                        link="rentals" />
            </CardDeck>
            {/* <CantFindWhatYoureLookingForToast/> */}
        </Page>
    );
}
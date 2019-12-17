import * as React from 'react';
import CardDeck from 'reactstrap/lib/CardDeck';
import Option, { Props as OptionProps } from '../components/Option';
import Page from '../components/Page';

const options: OptionProps[] = [{
    title: "Members",
    icon: "users",
    text: "I own a share of the freehold",
    link: "members"
},{
    title: "Leaseholders",
    icon: "scroll",
    text: "I own a flat on Layton Street",
    link: "leaseholders"
},{
    title: "Occupants",
    icon: "building",
    text: "I live in a flat on Layton Street",
    link: "occupants"
}]

export default function Home() {
    return (
        <Page>
            <h1 className="text-center">Welcome to Layton Street</h1>
            <br/>
            <CardDeck>
                {options.map(option => <Option {...option}/> )}
            </CardDeck>
        </Page>
    );
}
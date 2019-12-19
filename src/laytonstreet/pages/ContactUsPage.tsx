import * as React from 'react';
import Page from '../components/Page';

export default function ContactUsPage() {
    const email = "freehold@laytonstreet.co.uk";
    return (
        <Page narrow>
            <h1 className="text-center display-4">Contact us</h1>
            <br/>
            <address>
               <strong>Email</strong>
               <br/>
               <a href={`mailto:${email}`}>{email}</a>
            </address> 
        </Page>
    );
}

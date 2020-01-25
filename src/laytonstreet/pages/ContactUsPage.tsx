import * as React from 'react';
import Page from '../components/Page';

export default function ContactUsPage() {
    const companyName = "Layton Street Freehold Company Ltd"
    const companyNumber = "11098547"
    const registeredAddress = "Mint Lettings Ltd, 162b, Stevenage, England, SG1 3LL";
    const email = "freehold@laytonstreet.co.uk";
    return (
        <Page narrow>
            <h1 className="text-center display-4">Contact us</h1>
            <br/>
            <address>
                <p>
                    <strong>Company name</strong>
                    <br/>
                    {companyName}
                </p>
                <p>
                    <strong>Company number</strong>
                    <br/>
                    {companyNumber}
                </p>
                <p>
                    <strong>Registered address</strong>
                    <br/>
                    {registeredAddress}
                </p>
                <p>
                    <strong>Email</strong>
                    <br/>
                    <a href={`mailto:${email}`}>{email}</a>
                </p>
            </address> 
        </Page>
    );
}

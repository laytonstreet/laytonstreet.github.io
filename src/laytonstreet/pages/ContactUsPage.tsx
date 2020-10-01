import * as React from 'react';
import Page from '../components/Page';
import Text from '../components/Text';
import { GlobalPublicContext } from '../contexts/GlobalPublicContext';

export default function ContactUsPage() {
    const { freeholder } = React.useContext(GlobalPublicContext)!;
    return (
        <Page narrow>
            <h1 className="text-center display-4">About us</h1>
            <br/>
            <Text source="intro" context={GlobalPublicContext}/>
            <Text source="company_info_template" context={freeholder}/>
        </Page>
    );
}

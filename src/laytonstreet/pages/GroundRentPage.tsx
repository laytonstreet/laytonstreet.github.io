import * as React from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/Page';
import Form from 'reactstrap/lib/Form';
import Input from 'reactstrap/lib/Input';
import InputGroup from 'reactstrap/lib/InputGroup';
import Label from 'reactstrap/lib/Label';

export default function GroundRentPage() {
    // const [userInfo, setUserInfo] = React.useState((window as any).userInfo);
    return (
        <Page narrow>
            <h1 className="text-center display-4">Ground rent</h1>
            <br/>
            <p>If you've received a ground rent notice you can pay here.</p>
            <p>
                You'll need to sign in to pay online.
                If you'd rather not pay online please <Link to="contact-us">contact us</Link> to discuss other payment options.
            </p>
            <Form>
                <Label for="groundRentReference">Reference</Label>
                <InputGroup>
                    <Input
                        id="groundRentReference"
                        name="reference"
                        type="text"
                        placeholder="XXXX-XXXX-XX"/>
                </InputGroup>
            </Form>
        </Page>
    );
}

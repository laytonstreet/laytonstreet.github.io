import { isLoggedIn } from "laytonstreet/api/LaytonStreetApi";
import Page from "laytonstreet/components/Page";
import * as React from "react";
import { Navigate } from "react-router";

export default function LoggedOutPage() {
    if (isLoggedIn()) {
        return <Navigate to="/" />
    }
    return (
        <Page>
            <div className="text-center align-middle">
                <h1 className="display-4">You are now signed out.</h1>
                <div>We hope to see you again!</div> 
            </div>
        </Page>
    );
}
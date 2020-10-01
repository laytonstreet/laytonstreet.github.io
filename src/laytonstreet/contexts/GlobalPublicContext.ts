import * as React from 'react';

export type GlobalPublicContextType = {
    "freeholder": {
        "name": string,
        "companyNumber": string,
        "shortName": string,
        "address": string,
        "email": string
    },
    "rtmCompany": {
        "name": string,
        "shortName": string
    },
    "managingAgent": {
        "name": string,
        "shortName": string,
        "address": string,
        "email": string
    }
};

export const GlobalPublicContext = React.createContext<GlobalPublicContextType | undefined>(undefined);

export async function loadGlobalPublicContext(): Promise<GlobalPublicContextType | undefined> {
    let response = await fetch('/globalPublicContext.json', {
        headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) {
        console.error(`Error loading GlobalPublicContext`)
        return undefined;
    }
    return await response.json();
}
import * as React from 'react';

export type UserInfo = {
    userId: string,
    username: string,
    email: string,
    email_verified: boolean,
    fullName: string,
    preferredName: string
};

export const UserContext = React.createContext<UserInfo | undefined>(undefined);

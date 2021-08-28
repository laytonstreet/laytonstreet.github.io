import { UserInfo } from 'laytonstreet/types/LaytonStreetTypes';
import * as React from 'react';

export const UserContext = React.createContext<UserInfo | undefined>(undefined);

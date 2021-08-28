import config from 'config';
import { Block, BlockId, FullUnitDetails, Unit, UnitId, UnitType, UnitTypeId, UserInfo } from 'laytonstreet/types/LaytonStreetTypes';

let loggedIn = false;

type RequestParams = {
    path: string,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: any,
    params?: Record<string, string> | string
}

async function request({ path, method = 'GET', data, params }: RequestParams) {
    const url = new URL(config.backendApiUrl
        + (path.startsWith('/') ? '' : '/') + path)
        + (params ? "?" + new URLSearchParams(params) : "");
    const response = await fetch(url, {
        method,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined
    });
    if (response.status === 401) {
        loggedIn = false;
    }
    return response;
}

async function requestJson(params: RequestParams) {
    const response = await request(params);
    if (response.ok) {
        return response.json();
    }
    throw response; // TODO is there something better that could be thrown?
}

export function isLoggedIn() {
    return loggedIn;
}

export function getUserInfo(): UserInfo | null {
    const item = window.localStorage.getItem('userInfo');
    if (item) {
        return JSON.parse(item) as UserInfo;
    }
    return null;
}

export async function login(): Promise<{ redirectUri?: string, userInfo?: UserInfo }> {
    const { isLoggedIn, userInfo, redirectUri } = await requestJson({ method: 'GET', path: '/sso/login', params: { callbackUri: '/login', postLoginRedirectUri: window.location.href } });
    if (isLoggedIn) {
        window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
        loggedIn = true;
        return { userInfo }
    } else {
        return { redirectUri }
    }
}

export async function verifyLogin(code: string, state: string): Promise<{ userInfo: UserInfo, redirectUri: string }> {
    const { userInfo, redirectUri } = await requestJson({ method: 'POST', path: '/sso/verify', params: { code, state }})
    window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
    loggedIn = true;
    console.info(`Logged in as [${userInfo.username}], userId=[${userInfo.userId}]`);
    return { userInfo, redirectUri };
}

export async function logout() {
    try {
        const { redirectUri } = await requestJson({ method: 'GET', path: '/sso/logout', params: { callbackUri: '/logout' } });
        window.localStorage.removeItem('userInfo');
        loggedIn = false;
        return { redirectUri }
    } catch (e) {
        // throw new LSApiError()
    }
}

export async function getBlocks(): Promise<Block[]> {
    return requestJson({ method: 'GET', path: '/blocks' });
}

export async function getBlock(blockId: BlockId): Promise<Block> {
    return requestJson({ method: 'GET', path: `/blocks/${blockId}` });
}

export async function createBlock(name: string, description: string): Promise<BlockId> {
    return requestJson({ method: 'POST', path: `/blocks`, data: { name, description } });
}

export async function getUnitTypes(): Promise<UnitType[]> {
    return requestJson({ method: 'GET', path: '/unit-types' });
}

export async function getUnitType(unitId: UnitId): Promise<UnitType> {
    return requestJson({ method: 'GET', path: `/unit-types/${unitId}` });
}

export async function createUnitType(name: string, description: string): Promise<UnitTypeId> {
    return requestJson({ method: 'POST', path: `/unit-types`, data: { name, description } });
}

export async function getUnits(): Promise<Unit[]> {
    return requestJson({ method: 'GET', path: '/units' });
}

export async function getUnit(unitId: UnitId): Promise<Unit> {
    return requestJson({ method: 'GET', path: `/units/${unitId}` });
}

export async function createUnit(unitNumber: string, address: string, unitTypeId: UnitTypeId, blockId?: BlockId): Promise<UnitId> {
    return requestJson({ method: 'POST', path: `/units`, data: { unitNumber, address, unitTypeId, blockId } });
}

export async function getFullUnitDetails(unitId: UnitId): Promise<FullUnitDetails> {
    return requestJson({ method: 'GET', path: `/units/${unitId}/full-details` });
}


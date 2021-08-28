export type Role = "user"
    | "developer"
    | "laytonstreet:user-admin"
    | "laytonstreet:director"
    | "laytonstreet:secretary"
    | "laytonstreet:member"
    | "laytonstreet:owner"
    | "laytonstreet:participant"
    | "laytonstreet:managing-agent";

export const USER: Role = "user";
export const DEVELOPER: Role = "developer";
export const USER_ADMIN: Role = "laytonstreet:user-admin";
export const DIRECTOR: Role = "laytonstreet:director";
export const SECRETARY: Role = "laytonstreet:secretary";
export const MEMBER: Role = "laytonstreet:member";
export const OWNER: Role = "laytonstreet:owner";
export const PARTICIPANT: Role = "laytonstreet:participant";
export const MANAGING_AGENT: Role = "laytonstreet:managing-agent";
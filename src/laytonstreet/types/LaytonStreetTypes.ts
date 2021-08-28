import { IntId, StringId, TypedString } from "./Identifiers";
import { Role } from "./LaytonStreetRoles";
import { LocalDate } from "./LocalDate";

export type UserId = StringId<"UserId">;
export function UserId(value: string): UserId {
    return value as any as UserId;
}

export type Username = StringId<"Username">;
export function Username(value: string): Username {
    return value as any as Username;
}

export type EmailAddress = TypedString<"EmailAddress">;
export function EmailAddress(value: string): EmailAddress {
    return value as any as EmailAddress;
}

export type UserInfo = {
    userId: UserId,
    username: Username,
    emailAddress?: EmailAddress,
    displayName: string,
    roles: Role[],
    attributes: { [key: string]: string }
}

export type BodyId<T extends string> = StringId<"BodyId">

export type PersonId = BodyId<"PersonId">;
export function PersonId(value: string): PersonId {
    return value as any as PersonId;
}

export type Person = {
    id: PersonId,
    shortName: string,
    fullLegalName: string,
    preferredName: string
}

export type CompanyId = BodyId<"CompanyId">;
export function CompanyId(value: string): CompanyId {
    return value as any as CompanyId;
}

export type Company = {
    id: CompanyId,
    companyNumber: string,
    companyName: string
    shortName?: string
}


export type BlockId = IntId<"BlockId">;
export function BlockId(value: number): BlockId {
    return value as any as BlockId;
}

export type Block = {
    id: BlockId,
    name: string,
    description: string
}

export type EstateId = IntId<"EstateId">;
export function EstateId(value: number): EstateId {
    return value as any as EstateId;
}

export type Estate = {
    estateId: EstateId,
    name: string,
    description?: string,
    managementCompanyId?: CompanyId,
    managingAgentId?: CompanyId
}

export type UnitTypeId = IntId<"UnitTypeId">;
export function UnitTypeId(value: number): UnitTypeId {
    return value as any as UnitTypeId;
}


export type UnitType = {
    id: UnitTypeId,
    name: string,
    description: string,
}

export type UnitId = IntId<"UnitId">;
export function UnitId(value: number): UnitId {
    return value as any as UnitId;
}

export type Unit = {
    id: UnitId,
    number: string,
    address: string,
    blockId: BlockId,
    unitTypeId: UnitTypeId
}

export type Property = {

}

export type LeaseId = IntId<"LeaseId">;
export function LeaseId(value: number): LeaseId {
    return value as any as LeaseId;
}

export type Lease = {
    id: LeaseId,
    leaseStartDate: LocalDate,
    leaseYears: number,
    groundRent: number,
    groundRentTerms: { description: string, terms: string }
    groundRentCommencementDate: LocalDate,
    nextGroundRentReviewDate?: LocalDate
}

export type OwnerId = IntId<"OwnerId">;
export function OwnerId(value: number): OwnerId {
    return value as any as OwnerId;
};

export type Owner = {
    id: OwnerId,
    legalName: string,
    shortName: string,
    startDate: LocalDate,
    endDate: LocalDate
}

export type FullUnitDetails = {
    unit: Unit,
    unitType?: UnitType,
    property?: Property,
    block?: Block,
    estate?: Estate,
    lease?: Lease,
    owners: Owner[],
    isShareOfFreehold: boolean
}

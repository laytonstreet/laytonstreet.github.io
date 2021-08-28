import { TypedString } from "./Identifiers";

export type LocalDate = TypedString<"LocalDate">;

export const LocalDate = {
     fromString(value: string): LocalDate {
         return value as unknown as LocalDate;
     }
}

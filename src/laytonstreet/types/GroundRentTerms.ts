export type GroundRentCalculation = (year: number) => number;

export enum GroundRentTerms {
    INCREASING_FROM_125 = "INCREASING_FROM_125",
    INCREASING_FROM_150 = "INCREASING_FROM_150"
}

export function getGroundRentCalculation(groundRentTerms: GroundRentTerms): GroundRentCalculation {
    switch (groundRentTerms) {
        case GroundRentTerms.INCREASING_FROM_125:
            return (year) => (year < 33 ? 125 : year < 66 ? 250 : 375);
        case GroundRentTerms.INCREASING_FROM_150:
            return (year) => (year < 33 ? 150 : year < 66 ? 300 : 450);
    }
}

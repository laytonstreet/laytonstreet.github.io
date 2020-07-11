import { range, total } from './LsUtils';

// enum groundRentCalculations {
//     ONE_TWO_FIVE_INCREASING: (year) => ((year < 33) ? 125 : (year < 66) ? 250 : 375),
//     ONE_FIFTY_INCREASING: (year) => ((year < 33) ? 150 : (year < 66) ? 300 : 450)
// }

//   const extensionTypes = {
//     statutory: (yearsRemaining) => 90,
//     99: (yearsRemaining) => 99 - yearsRemaining,
//     125: (yearsRemaining) => 125 - yearsRemaining,
//     999: (yearsRemaining) => 999 - yearsRemaining
//   };

type GroundRentCalculation = (year: number) => number;

export function calculateLeaseExtensionPremium(params: {
    leaseLengthAtCommmencement: number,
    calculateGroundRentForYear: GroundRentCalculation,
    yearsCurrentlyRemainingOnLease: number,
    valueOfFlatWithLongLease: number,
    currentValueOfFlat: number,
    yeildRate: number,
    yearsToExtendBy: number
}): number {
    const {
        leaseLengthAtCommmencement,
        calculateGroundRentForYear,
        yearsCurrentlyRemainingOnLease,
        valueOfFlatWithLongLease,
        currentValueOfFlat,
        yeildRate,
        yearsToExtendBy
    } = params;

    function calculateReversionValueForYearsRemaining(yearsRemaining: number) {
        const deferrmentRate = 0.05;
        return valueOfFlatWithLongLease * Math.pow(1 - deferrmentRate, yearsRemaining);
    }

    let deferredGroundRentValues = range(0, yearsCurrentlyRemainingOnLease)
        .map(yearsRemaining => {
            let groundRent = calculateGroundRentForYear(leaseLengthAtCommmencement - yearsRemaining)
            let exponent = yearsCurrentlyRemainingOnLease - yearsRemaining;
            return groundRent * Math.pow(1 - yeildRate, exponent);
        });

    let totalDeferredGroundRentValue = total(deferredGroundRentValues);

    let landlordsCurrentInterest = totalDeferredGroundRentValue + calculateReversionValueForYearsRemaining(yearsCurrentlyRemainingOnLease);

    let landlordsNewInterest = calculateReversionValueForYearsRemaining(yearsCurrentlyRemainingOnLease + yearsToExtendBy)

    function calculateMarriageValue() {
        if (yearsCurrentlyRemainingOnLease >= 80) {
            return 0;
        }
        return (valueOfFlatWithLongLease + landlordsNewInterest) - (currentValueOfFlat + landlordsCurrentInterest);
    }

    let marriageValue = calculateMarriageValue();

    return (landlordsCurrentInterest - landlordsNewInterest) + (marriageValue / 2);
}

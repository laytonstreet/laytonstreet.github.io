import * as React from 'react';
import LeaseExtensionCalculator, { ExtensionType } from '../components/LeaseExtensionCalculator';
import Page from '../components/Page';
import { GroundRentTerms } from '../types/GroundRentTerms';
import { monthDiff, round } from '../utils/LsUtils';

export default function LeaseExtensionCalculatorPage() {
    const commencementDate = new Date(2002, 12, 24); // TODO check this
    const today = new Date();
    const yearsRemainingOnLease = 99 - round(monthDiff(commencementDate, today) / 12, { decimalPlaces: 2 });

    return (
        <Page narrow>
            <h1 className="text-center display-4">Lease extension calculator</h1>
            <br/>
            <p>For calculating the premium for lease extensions of flats at Layton Street.</p>
            <p>The underlying calculations used are based on <a href="https://www.lease-advice.org/advice-guide/lease-extension-valuation/">this formula</a> given by the Leasehold Advisory Service.</p>
            <LeaseExtensionCalculator inputs={{
                        groundRentTerms: GroundRentTerms.INCREASING_FROM_125,
                        leaseLength: 99,
                        yearsRemainingOnLease,
                        valueOfFlatWithLongLease: 250000,
                        currentValueOfFlat: 220000,
                        yieldRate: 0.04,
                        extensionType: ExtensionType.STATUTORY
                    }} />
            <br />
        </Page>
    );
}
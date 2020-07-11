import * as React from 'react';
import LeaseExtensionCalculator, { ExtensionType, FormInputDefaults } from '../components/LeaseExtensionCalculator';
import Page from '../components/Page';
import { GroundRentTerms } from '../types/GroundRentTerms';

const defaults: FormInputDefaults = {
    groundRentTerms: GroundRentTerms.INCREASING_FROM_125,
    leaseLength: 99,
    yearsRemainingOnLease: 80.5,
    valueOfFlatWithLongLease: 250000,
    currentValueOfFlat: 220000,
    yieldRate: 0.04,
    extensionType: ExtensionType.STATUTORY
};

export default function LeaseExtensionCalculatorPage() {
    return (
        <Page narrow>
            <h1 className="text-center display-4">Lease extension calculator</h1>
            <br/>
            <p>For calculating the premium for lease extensions of flats at Layton Street.</p>
            <p>The underlying calculations used are based on <a href="https://www.lease-advice.org/advice-guide/lease-extension-valuation/">this formula</a> given by the Leasehold Advisory Service.</p>
            <LeaseExtensionCalculator inputs={defaults} />
            <br />
        </Page>
    );
}
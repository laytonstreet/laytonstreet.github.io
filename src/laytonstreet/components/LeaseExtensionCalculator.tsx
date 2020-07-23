import * as React from 'react';
import Form from "reactstrap/lib/Form";
import { calculateLeaseExtensionPremium } from "../utils/LeaseExtensionUtils";
import { round } from "../utils/LsUtils";
import { Radio, RadioOption } from "./inputs/Radio";
import TextInput from './inputs/TextInput';
import { GroundRentTerms, getGroundRentCalculation } from '../types/GroundRentTerms';

export enum ExtensionType {
    STATUTORY = "STATUTORY",
    EXTEND_TO_99 = "EXTEND_TO_99",
    EXTEND_TO_125 = "EXTEND_TO_125",
    EXTEND_TO_999 = "EXTEND_TO_999"
}

function getNumberOfYearsToExtendBy(extensionType: ExtensionType, yearsCurrentlyRemainingOnLease: number): number {
    switch (extensionType) {
        case ExtensionType.STATUTORY:
            return 90;
        case ExtensionType.EXTEND_TO_99:
            return 99 - yearsCurrentlyRemainingOnLease;
        case ExtensionType.EXTEND_TO_125:
            return 125 - yearsCurrentlyRemainingOnLease;
        case ExtensionType.EXTEND_TO_999:
            return 999 - yearsCurrentlyRemainingOnLease;
    }
}

export interface FormInputDefaults {
    groundRentTerms: GroundRentTerms,
    leaseLength: number,
    yearsRemainingOnLease: number,
    valueOfFlatWithLongLease: number,
    currentValueOfFlat: number,
    yieldRate: number,
    extensionType: ExtensionType
}

export interface LeaseExtensionCalculatorParams {
    inputs: FormInputDefaults
}

export default function LeaseExtensionCalculator({ inputs: defaults }: LeaseExtensionCalculatorParams) {
    const [premium, setPremium] = React.useState<number>();
    return (
        <>
            <FormArea {...{setPremium, defaults}} />
            <PremiumArea premium={premium} />
        </>
    );
}

function FormArea({ setPremium, defaults }: { setPremium: (premium: number) => void, defaults: FormInputDefaults}) {
    const [groundRentTerms, setGroundRentTerms] = React.useState<GroundRentTerms>(defaults.groundRentTerms);
    const [leaseLengthAtCommmencement, setLeaseLengthAtCommmencement] = React.useState<number>(defaults.leaseLength);
    const [yearsCurrentlyRemainingOnLease, setYearsCurrentlyRemainingOnLease] = React.useState<number>(defaults.yearsRemainingOnLease);
    const [valueOfFlatWithLongLease, setValueOfFlatWithLongLease] = React.useState<number>(defaults.valueOfFlatWithLongLease);
    const [currentValueOfFlat, setCurrentValueOfFlat] = React.useState<number>(defaults.currentValueOfFlat);
    const [yeildRate, setYeildRate] = React.useState<number>(defaults.yieldRate);
    const [extensionType, setExtensionType] = React.useState<ExtensionType>(defaults.extensionType);

    const premium = calculateLeaseExtensionPremium({
        calculateGroundRentForYear: getGroundRentCalculation(groundRentTerms),
        leaseLengthAtCommmencement,
        yearsCurrentlyRemainingOnLease,
        valueOfFlatWithLongLease,
        currentValueOfFlat,
        yeildRate,
        yearsToExtendBy: getNumberOfYearsToExtendBy(extensionType, yearsCurrentlyRemainingOnLease)
    });

    setPremium(premium);

    return (
        <Form>
            <TextInput id="leaseLengthAtCommmencement"
                    type="number"
                    value={leaseLengthAtCommmencement}
                    onValueChange={(value) => setLeaseLengthAtCommmencement(+value)}>
                Lease length at commencement
            </TextInput>
            <TextInput id="yearsCurrentlyRemainingOnLease"
                    type="number"
                    value={yearsCurrentlyRemainingOnLease}
                    onValueChange={(value) => setYearsCurrentlyRemainingOnLease(+value)}>
                Years remaining on lease
            </TextInput>
            <Radio name="groundRentTerms"
                    caption="Ground rent terms"
                    value={groundRentTerms.toString()}
                    onValueChange={(value) => setGroundRentTerms(GroundRentTerms[value])}>
                <RadioOption value={GroundRentTerms.INCREASING_FROM_125.toString()}>
                    £125 per year, increasing to £250 after 33 years and £375 after 66 years
                </RadioOption>
                <RadioOption value={GroundRentTerms.INCREASING_FROM_150.toString()}>
                    £150 per year, increasing to £300 after 33 years and £450 after 66 years
                </RadioOption>
            </Radio>
            <TextInput id="valueOfFlatWithLongLease"
                    type="number"
                    value={valueOfFlatWithLongLease}
                    onValueChange={(value) => setValueOfFlatWithLongLease(+value)}>
                Value of flat with a long lease (£)
            </TextInput>
            <TextInput id="currentValueOfFlat"
                    type="number"
                    value={currentValueOfFlat}
                    onValueChange={(value) => setCurrentValueOfFlat(+value)}>
                Current value of flat (£)
            </TextInput>
            <TextInput id="yeildRate"
                    type="number"
                    value={round(yeildRate * 100, { decimalPlaces: 4 })}
                    onValueChange={(value) => setYeildRate(+value / 100)}>
                Yield rate (%)
            </TextInput>
            <Radio name="extensionType"
                caption="Extension type"
                value={extensionType.toString()}
                onValueChange={(value) => setExtensionType(ExtensionType[value])}>
                <RadioOption value={ExtensionType.STATUTORY.toString()}>
                    Statutory (increase by 90 years)
                </RadioOption>
                <RadioOption value={ExtensionType.EXTEND_TO_99.toString()}>
                    Increase to 99 years
                </RadioOption>
                <RadioOption value={ExtensionType.EXTEND_TO_125.toString()}>
                    Increase to 125 years
                </RadioOption>
                <RadioOption value={ExtensionType.EXTEND_TO_999.toString()}>
                    Increase to 999 years
                </RadioOption>
            </Radio>
        </Form>
    );
}

function PremiumArea({ premium }: { premium?: number }) {
    const premiumText = premium
        ? '£' + round(premium, { decimalPlaces: 2 })
        : 'unknown';
    return (
        <div>
            <h3>Premium: <span>{ premiumText }</span></h3>
        </div>
    );
}

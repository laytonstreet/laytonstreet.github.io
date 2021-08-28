import { createUnit, getBlocks, getUnits, getUnitTypes } from "laytonstreet/api/LaytonStreetApi";
import { Radio, RadioOption } from "laytonstreet/components/inputs/Radio";
import TextInput from "laytonstreet/components/inputs/TextInput";
import Page from "laytonstreet/components/Page";
import UnitPage from "laytonstreet/pages/units/UnitPage";
import { DIRECTOR, MANAGING_AGENT } from "laytonstreet/types/LaytonStreetRoles";
import { Block, Unit, UnitType, UnitTypeId } from "laytonstreet/types/LaytonStreetTypes";
import * as React from "react";
import { Step, Steps, WithWizard, Wizard } from "react-albus";
import { Route, Routes } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "reactstrap";
import Button from "reactstrap/lib/Button";
import Container from "reactstrap/lib/Container";
import Form from "reactstrap/lib/Form";
import Spinner from "reactstrap/lib/Spinner";

export default function UnitRouting() {
    return (
        <Routes>
            <Route element={<UnitsPage/>}/>
            <Route path="/:unitId" element={<UnitPage/>}/>
            <Route path="/create" element={<UnitCreationPage/>}/>
        </Routes>
    );
}

function UnitsPage() {
    const navigate = useNavigate();
    const [units, setUnits] = React.useState<Unit[]>();
    const [unitTypes, setUnitTypes] = React.useState<UnitType[]>();
    const [blocks, setBlocks] = React.useState<Block[]>();
    React.useEffect(() => {
        (async () => {
            const units = await getUnits();
            const unitTypes = await getUnitTypes();
            const blocks = await getBlocks();
            setUnits(units);
            setUnitTypes(unitTypes);
            setBlocks(blocks);
        })();
    }, []);
    if (!units || !unitTypes || !blocks) {
        return <div className="text-center align-middle"><Spinner/></div>
    }
    if (units.length == 0) {
        return (
            <div className="text-center align-middle mt-4">
                <h1 className="">🤔</h1>
                <p className="lead">It doesn't look like any units exist yet...</p>
                <Button color="primary" onClick={() => navigate("./create")}>Create a unit</Button>
            </div>
        );
    }
    return (
        <Page rolesAllowed={[DIRECTOR, MANAGING_AGENT]} >
            <div className="text-center align-middle">
                <Container className="mb-2">
                    <div className="text-right">
                        <Button color="primary" onClick={() => navigate("./create")}>Create a unit</Button>
                    </div>
                </Container>
                <Table size="sm">
                    <thead >
                        <tr>
                            <th>#</th>
                            <th>Address</th>
                            <th>Block</th>
                            <th>Unit type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {units.map((unit) => <UnitRow key={unit.id.valueOf()} unit={unit} unitTypes={unitTypes} blocks={blocks}/>)}
                    </tbody>
                </Table>
            </div>
        </Page>
    );
}

function UnitRow({ unit, unitTypes, blocks }: { unit: Unit, unitTypes: UnitType[], blocks: Block[] }) {
    const unitType = unitTypes.find(({ id }) => id === unit.unitTypeId);
    const blockName = blocks.find(({ id }) => id === unit.blockId)?.name;
    return (
        <tr key={unit.id.valueOf()}>
            <td><Link to={`${unit.id}`}>{unit.number}</Link></td>
            <td>{unit.address}</td>
            <td>{blockName || "-"}</td>
            <td>{unitType && <abbr>{unitType.name}</abbr>}</td>
        </tr>
    );
}

function UnitCreationPage() {
    const navigate = useNavigate();
    const [allUnitTypes, setAllUnitTypes] = React.useState<UnitType[]>();
    const [unitNumber, setUnitNumber] = React.useState<string>();
    const [address, setAddress] = React.useState<string>();
    const [unitType, setUnitType] = React.useState<UnitTypeId>();
    React.useEffect(() => {
        getUnitTypes().then(setAllUnitTypes);
    }, []);
    if (!allUnitTypes) {
        return <Spinner/>;
    }
    return (
        <Page rolesAllowed={[DIRECTOR, MANAGING_AGENT]} >
            <div className="text-center align-middle">
                <Wizard>
                    <Steps>
                        <Step id="unit-details-step">
                            <Form>
                                <TextInput id="unit-number" onValueChange={setUnitNumber}>Unit number/name</TextInput>
                                <TextInput id="unit-address" onValueChange={setAddress}>Address</TextInput>
                                <Radio name="unit-type" caption="Unit type" onValueChange={(value) => setUnitType(UnitTypeId(+value))}>
                                    {allUnitTypes.map(unitType => (
                                        <RadioOption key={unitType.id.valueOf()} value={`${unitType.id}`}>
                                            {unitType.name}
                                        </RadioOption>
                                    ))}
                                </Radio>
                            </Form>
                        </Step>
                    </Steps>
                    <WithWizard render={({ next, previous, step, steps }) => {
                        const isLastStep = steps.indexOf(step) == steps.length - 1;
                        const navigateBackToUnitsPage = () => navigate("../");
                        return (
                            <div>
                                <Button onClick={() => navigateBackToUnitsPage()}>Cancel</Button>
                                {!isLastStep && <Button primary onClick={next}>Next</Button>}
                                {isLastStep && <Button color="primary" onClick={async () => {
                                    if (unitNumber && address && unitType) {
                                        const unitId = await createUnit(unitNumber, address, unitType);
                                        if (unitId) {
                                            navigateBackToUnitsPage();
                                        }
                                    }
                                }}>Done</Button>}
                            </div>
                        );
                    }}/>
                </Wizard>
            </div>
        </Page>
    );
}
import { getFullUnitDetails } from "laytonstreet/api/LaytonStreetApi";
import Icon from "laytonstreet/components/Icon";
import Page from "laytonstreet/components/Page";
import { FullUnitDetails, Lease, LeaseId, UnitId } from 'laytonstreet/types/LaytonStreetTypes';
import { LocalDate } from "laytonstreet/types/LocalDate";
import * as React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Badge from "reactstrap/lib/Badge";
import Card from "reactstrap/lib/Card";
import CardBody from "reactstrap/lib/CardBody";
import CardTitle from "reactstrap/lib/CardTitle";

export default function UnitPage() {
    const unitId = UnitId(parseInt(useParams().unitId));
    const [fullUnitDetails, setFullUnitDetails] = React.useState<FullUnitDetails>();
    React.useEffect(() => {
        getFullUnitDetails(unitId).then(setFullUnitDetails);
    }, [unitId]);
    const fakeLease: Lease = {
        id: LeaseId(1),
        leaseYears: 99,
        leaseStartDate: LocalDate.fromString("2002-12-21"),
        groundRent: 0,
        nextGroundRentReviewDate: LocalDate.fromString("2035-12-21"),
        groundRentCommencementDate: LocalDate.fromString("2002-12-21"),
        groundRentTerms: { terms: "", description: "" }
    };
    let { unit, unitType, block, estate, lease = fakeLease, owners = [], isShareOfFreehold } = fullUnitDetails || {};
    const ownersDescription = owners.length > 0
        ? owners.map(owner => owner.legalName).join(", ") + "(since " + [...new Set(owners.map(owner => owner.startDate))].join(", ") + ")"
        : "-";
    lease = fakeLease;
    return (
        <Page>
            <div>
                <Link to=".."><Icon icon="angle-left"/> Back</Link>
            </div>
            <br/>
            <Card>
                {fullUnitDetails && <CardBody>
                    <CardTitle tag="h4">{unit?.number}</CardTitle>
                    <div><h5>Address</h5><p>{unit?.address.split(",").map((line, i, lines) => <div>{line}{i < (lines.length - 1) ? "," : ""}</div>)}</p></div>
                    {block && <div><h5>Block</h5><p>{block?.name}</p></div>}
                    {unitType && <div><h5>Unit type</h5><p>{unitType.name}</p></div>}
                    {estate && <div><h5>Estate</h5><p>{estate.name}</p></div>}
                    {lease && <div><h5>Lease details</h5><p>{lease.leaseYears} from {lease.leaseStartDate}</p></div>}
                    {lease && <div><h5>Ground rent</h5><p>{lease.groundRent < 0 ? "nil" : `£${lease.groundRent} p/a`}{lease.nextGroundRentReviewDate && ` (to be reviewed on ${lease.nextGroundRentReviewDate})`}</p></div>}
                    {isShareOfFreehold && <Badge>Share of freehold</Badge>}
                    <h5>{owners.length == 1 ? "Owner" : "Owners"}</h5><p>{ownersDescription}</p>
                </CardBody>}
            </Card>
        </Page>
    )
}

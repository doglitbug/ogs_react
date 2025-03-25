import Card from 'react-bootstrap/Card';
import {Link} from "react-router";
import type {garagePreview, garage} from "~/models/all";
import {shortenText} from "~/components/Misc";

interface previewProps {
    garage: garagePreview;
}
export default function ShowGaragePreview(props: previewProps) {
    const {garage} = props;
    return (
        <Card className="mb-6 garagePreview">
            <Card.Body>
                <Card.Title>{garage['name']}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{garage['location']}</Card.Subtitle>
                <Card.Text>
                    {shortenText(garage['description'])}
                </Card.Text>
                <Link to={`/garage/${garage['garage_id']}`}>Go to Garage</Link>
            </Card.Body>
        </Card>
    );
}

export function ShowGarage(garage: garage) {
    return (
        <>
            <h1>Show Garage: {garage['name']}</h1>
            <div className="row">
                <div className="col-md-6">
                    <h2>Details:</h2>
                    <table className="table table-hover">
                        <tbody>
                        <tr>
                            <th>Name</th>
                            <td>{garage['name']}</td>
                        </tr>
                        <tr>
                            <th>Location</th>
                            <td>{garage['location']}</td>
                        </tr>
                        <tr>
                            <th>Visible</th>
                            <td>{garage['visible'] ? 'Visible to public' : 'Hidden from public'}</td>
                        </tr>

                        <tr>
                            <th>Description</th>
                            <td>{garage['description']}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6">
                    <h2>Contact:</h2>
                    <table className="table table-hover">
                        <tbody>
                        <tr><td> This is only available to registered users.<br />Please click <Link to="/login">here</Link> to log in or sign up</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
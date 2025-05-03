import {Link} from "react-router";
import type {garagePreview, garage} from "~/models/all";
import {shortenText} from "~/components/Misc";

interface previewProps {
    garage: garagePreview;
}

export default function ShowGaragePreview(props: previewProps) {
    const {garage} = props;
    return (
        <div className="card mb-6 garagePreview rounded">
            <div className="card-header">
                <h5 className="card-title">{garage['name']}</h5>
                <div className="card-subtitle">{garage['location']}</div>
            </div>
            <div className="card-body">
                <p className="card-text">
                    {shortenText(garage['description'])}
                </p>
            </div>
            <div className="card-footer"><Link to={`/garage/${garage['garage_id']}`} className="btn btn-primary">Go to Garage</Link></div>
        </div>
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
                        <tr>
                            <td> This is only available to registered users.<br/>Please click <Link
                                to="/login">here</Link> to log in or sign up
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
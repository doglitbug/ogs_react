import type { Route } from "./+types/garage";
import { Link } from 'react-router'

export async function clientLoader({ params }: Route.LoaderArgs) {
    const garageId = params.garageId;
    if(!garageId) return null;

    const garage = {
        garageId: garageId,
        name: "PAR Garage",
        description: "We need to have a garage sale before we move! Please contact owners for sales not workers",
        location: "Dunedin",
        visible: true,
    }
    return { garage }
}

export async function clientAction() {

}

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Online Garage Sale" },
        { name: "description", content: "Welcome to the Online Garage Sale!" },
    ];
}

export default function Garage({ loaderData }: Route.ComponentProps) {
    if (loaderData!=null) {
        return showGarage(loaderData.garage);
    }

    return (
        <>
            <h1>Garages</h1>
        </>
    )
}

function showGarage(garage: any) {
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
                        <tr><td>This is only available to registered users.<br />Please click <Link to="/login">here</Link> to log in or sign up</td></tr>
                    </table>
                </div>
            </div>
        </>
    )
}
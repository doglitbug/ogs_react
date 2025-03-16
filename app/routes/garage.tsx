import type { Route } from "./+types/garage";
import { Link } from 'react-router'

export async function clientLoader({ params }: Route.LoaderArgs) {
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    const token = localStorage.getItem('jwt-token')
    if (token) myHeaders.append("Authorization", `Bearer ${token}`)

    //TODO Check for and ID, if there isn;t one get all garages
    const res = await fetch(`http://doglitbug.com:82/api/v1/garage/${params.garageId}`, {
        headers: myHeaders
    });
    const garage = await res.json();
    return garage.data;
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
    if (loaderData != null) {
        return showGarage(loaderData);
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
                        <tbody>
                            <tr><td>This is only available to registered users.<br />Please click <Link to="/login">here</Link> to log in or sign up</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
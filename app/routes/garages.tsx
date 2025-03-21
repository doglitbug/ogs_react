import type {Route} from "./+types/garages";
import {Link} from 'react-router'
import {getGarages} from "~/api";

export async function clientLoader({params}: Route.LoaderArgs) {
    return getGarages();
}

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Online Garage Sale"},
        {name: "description", content: "Welcome to the Online Garage Sale!"},
    ];
}

export default function Garages({loaderData}: Route.ComponentProps) {
    console.log(loaderData)
    if (loaderData != null && loaderData.status == 200) {
        return showGarage(loaderData.data.garages.items[0]);
    } else {
        return (
            <>
                <h1>Garages</h1>
                <p>Not found</p>
            </>
        )
    }
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
import type {Route} from "../../../.react-router/types/app/routes/item/+types/show";
import {getItem} from "~/api";

export async function clientLoader({params}: Route.LoaderArgs) {
    return getItem(params.itemId ? params.itemId : "");
}

export async function clientAction() {

}

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Online item Sale"},
        {name: "description", content: "Welcome to the Online item Sale!"},
    ];
}

export default function Show({loaderData}: Route.ComponentProps) {
    if (loaderData != null && loaderData.status == 200) {
        return showItem(loaderData.item);
    } else {
        return (
            <>
                <h1>Items</h1>
                <p>No items found</p>
            </>
        )
    }
}

function showItem(item: any) {
    return (
        <>
            <h1>Show item: {item['name']}</h1>

            <div>
                <table className="table table-hover">
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{item['name']}</td>
                    </tr>

                    <tr>
                        <th>Visibility</th>
                        <td>Visible to public</td>
                    </tr>

                    <tr>
                        <th>Description</th>
                        <td>{item['description']}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <h3>Images:</h3>
            <div className="images">

            </div>
        </>
    )
}
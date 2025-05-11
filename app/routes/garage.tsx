import type {Route} from "./+types/garage";
import {getGarage, getItems} from "~/api";
import type {callToAction, user, item} from "~/models/all";
import {useLoaderData} from "react-router";
import CallToAction from "~/components/CallToAction";
import {useAuth} from "~/context/useAuth";
import {ShowSearchResult} from "~/components/SearchResult";
import Pagination from "~/components/Pagination";

export async function clientLoader({params, request}: Route.LoaderArgs) {
    const garage = await getGarage(params.garageId ? params.garageId : "");
    //TODO Check garage is valid?

    let page = new URL(request.url).searchParams.get("page") ?? "1";

    let parameters = "?garage_id=" + params.garageId;
    parameters += "&page=" + page;

    const items = await getItems(parameters);
    return [garage, items];
}

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Online Garage Sale: Show Garage"},
        {name: "description", content: "Welcome to the Online Garage Sale!"},
    ];
}

export default function Garage() {
    const [{garage}, itemsResult] = useLoaderData();
    const {isLoggedIn} = useAuth();

    const actions: callToAction[] = [
        {
            text: "Back",
            variant: "primary",
            icon: "arrow-left",
            link: "/garage"
        },
        {
            text: "Edit",
            variant: "warning",
            icon: "pencil",
            link: "/garage/" + garage.garage_id + "/edit"
        },
        {
            text: "Delete",
            variant: "danger",
            icon: "trash3",
            link: "/garage/" + garage.garage_id + "/delete"
        },
    ];

    if (!garage || !itemsResult) {
        return <>Loading...</>
    }

    return (
        <>
            <h1>Show Garage: {garage['name']}</h1>
            <CallToAction actions={actions}/>
            <div className="row">
                <div className="col-md-6">
                    <div className="rounded">
                        <h2>Details:</h2>
                        <dl>
                            <dt>Name</dt>
                            <dd>{garage.name}</dd>
                            <dt>Location</dt>
                            <dd>{garage.location}</dd>
                            <dt>Description</dt>
                            <dd>{garage.description}</dd>
                        </dl>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="rounded">
                        <h2>Contact:</h2>
                        {isLoggedIn() ?
                            <ul>
                                {garage.staff.map(function (staff: user) {
                                    return (
                                        <li key={staff.user_id}>{staff.access}: {staff.name} ({staff.username})&nbsp;<a
                                            href={"mailto:" + staff.email}>Email</a>
                                        </li>
                                    );
                                })}
                            </ul> : <>Only available to registered users, please log in</>
                        }
                    </div>
                </div>

            </div>

            <h2>Garage Items:</h2>
            {itemsResult.error && (<div className={"error"}>
                {itemsResult.error}
            </div>)}

            {itemsResult.items && (
                <div className="row">
                    {itemsResult.items?.map(function (item: item) {
                        return (
                            <div className="col-xl-4 col-md-6" key={item.item_id}>
                                <ShowSearchResult searchResult={item}/>
                            </div>
                        )
                    })}
                </div>
            )}
            <div className="centered"><Pagination totalItems={itemsResult.total_items}/></div>
        </>
    )
}
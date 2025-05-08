import type {Route} from "./+types/garage";
import {updateGarage, getGarage, getLocations} from "~/api";
import CallToAction from "~/components/CallToAction";
import {Form, redirect, useActionData, useLoaderData, useParams} from "react-router";
import {useEffect, useState} from "react";
import type {callToAction, location} from "~/models/all";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Online Garage Sale: Edit Garage"},
        {name: "description", content: "Welcome to the Online Garage Sale!"},
    ];
}

export async function clientLoader({params}: Route.LoaderArgs) {
    //TODO Check valid garage as a 404 will result in stuck at 'loading'
    return getGarage(params.garageId);
}

export async function clientAction({request, params}: Route.ClientActionArgs) {
    let formData = await request.formData();
    const obj = Object.fromEntries(formData.entries())
    const result = await updateGarage(params.garageId, obj);
    if (result.status == 200) {
        return redirect("/garage/" + params.garageId);
    }
    return result;
}

export default function GarageEdit() {
    const {garage} = useLoaderData();
    const actionResults = useActionData();
    const errors = actionResults?.error;
    const [locations, setLocations] = useState<location[]>();

    useEffect(() => {
        getLocations().then((response) => {
                setLocations(response.locations);
            }
        )
    }, []);

    const actions: callToAction[] = [
        {
            text: "Back",
            variant: "primary",
            icon: "arrow-left",
            link: "/garage"
        }
    ]

    //Required to set selected location to current value
    if (!garage || !locations) {
        return <>Loading</>
    }

    return (
        <>
            <h1>Edit Garage</h1>
            <CallToAction actions={actions}/>
            <div className="rounded">
                <Form method="post" className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" placeholder="Name" aria-label="Name"
                               name="name"
                               defaultValue={garage.name}
                               required
                        />
                        <small className="error">{errors?.name}</small>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="location_id" className="form-label">Location</label>

                        <select className="form-select" name="location_id" defaultValue={garage.location_id}
                                aria-label="Location">
                            {locations?.map((location) =>
                                <option key={location.location_id}
                                        value={location.location_id}
                                >{location.description}
                                </option>
                            )}

                        </select>
                        <small className="error">{errors?.location_id}</small>
                    </div>

                    <div className="col-12">
                        <label htmlFor="description" className="form-label">Description </label>
                        <textarea className="form-control" placeholder="Garage Description" aria-label="Description"
                                  name="description"
                                  rows={5}
                                  defaultValue={garage.description}
                        >
                        </textarea>
                        <small className="error">{errors?.description}</small>
                    </div>

                    <div className="col-12" id="operations">
                        <button type="reset" className="btn btn-primary">Reset</button>
                        <button type="submit" className="btn btn-warning">Edit Garage</button>
                    </div>
                </Form>
            </div>
        </>
    )

}
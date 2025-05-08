import type {Route} from "./+types/garage";
import {Form, redirect, useActionData} from "react-router";
import {useEffect, useState} from "react";
import type {callToAction, location} from "~/models/all";
import {getLocations, createGarage} from "~/api";
import CallToAction from "~/components/CallToAction";
import {useAuth} from "~/context/useAuth";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Online Garage Sale: New Garage"},
        {name: "description", content: "Welcome to the Online Garage Sale!"},
    ];
}

export async function clientAction({request}: Route.ClientActionArgs) {
    let formData = await request.formData();
    const obj = Object.fromEntries(formData.entries())
    const result = await createGarage(obj);
    if (result.status == 201) {
        return redirect("/garage/" + result.garage.garage_id);
    }
    return result;
}

export default function GarageNew() {
    const actionResults = useActionData();
    const errors = actionResults?.error;
    const [locations, setLocations] = useState<location[]>();
    const {user} = useAuth();

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
    if (!locations) {
        return <>Loading</>
    }

    return (
        <>
            <h1>New Garage:</h1>
            <CallToAction actions={actions}/>
            <div className="rounded">
                Creating a garage is the first step to getting up and running!<br/>
                Please fill out the form below and click 'Create Garage' to continue!
            </div>
            <div className="rounded">
                <Form method="post" className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" placeholder="Name" aria-label="Name"
                               name="name"
                               required
                        />
                        <small className="error">{errors?.name}</small>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="location_id" className="form-label">Location</label>

                        <select className="form-select" name="location_id" defaultValue={user?.location_id}
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
                        >
                        </textarea>
                        <small className="error">{errors?.description}</small>
                    </div>

                    <div className="col-12" id="operations">
                        <button type="reset" className="btn btn-primary">Reset</button>
                        <button type="submit" className="btn btn-success">Create Garage</button>
                    </div>
                </Form>
            </div>
        </>
    )
}

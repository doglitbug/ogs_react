import type {Route} from "./+types/profile";
import {getUser, updateUser, getLocations} from "~/api";
import type {callToAction, location} from "~/models/all";
import CallToAction from "~/components/CallToAction";
import {Form, redirect, useActionData, useLoaderData} from "react-router";
import {useEffect, useState} from "react";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Online Garage Sale: Edit Profile"},
        {name: "description", content: "Welcome to the Online Garage Sale!"},
    ];
}

export async function clientLoader() {
    return getUser();
}

export async function clientAction({request}: Route.ClientActionArgs) {
    let formData = await request.formData();
    const obj = Object.fromEntries(formData.entries())
    const result = await updateUser("", obj);
    if (result.status == 200) {
        return redirect("/profile");
    }
    return result;
}

export default function ProfileEdit() {
    const {user} = useLoaderData();
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
            link: "/profile"
        },
        {
            text: "Delete",
            variant: "danger",
            icon: "trash3",
            link: "/profile/delete"
        },
    ]

    //Required to set selected location to current value
    if (!user || !locations) {
        return <>Loading</>
    }

    return (
        <>
            <h1>Edit user:</h1>
            <CallToAction actions={actions}/>
            <div className="rounded">
                <Form method="post" className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email (cannot be changed)</label>
                        <input type="text"
                               className="form-control"
                               placeholder="email"
                               aria-label="Email"
                               name="email"
                               disabled
                               value={user.email}/>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Real Name</label>
                        <input type="text" className="form-control" placeholder="Real Name" aria-label="Real Name"
                               name="name"
                               defaultValue={user.name}/>
                        <small className="error">{errors?.name}</small>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="username" className="form-label">Username (shown to others)</label>
                        <input type="text" className="form-control" placeholder="Username" aria-label="Username"
                               name="username"
                               defaultValue={user.username}/>
                        <small className="error">{errors?.username}</small>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="location_id" className="form-label">Location (used for default Garage/Search
                            location)</label>

                        <select className="form-select" name="location_id" defaultValue={user.location_id}
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
                        <label htmlFor="description" className="form-label">Description (about yourself)</label>
                        <textarea className="form-control" placeholder="About me" aria-label="Description"
                                  name="description"
                                  rows={5}
                                  defaultValue={user.description}>
                        </textarea>
                        <small className="error">{errors?.description}</small>
                    </div>

                    <div className="col-12" id="operations">
                        <button type="reset" className="btn btn-primary">Reset</button>
                        <button type="submit" className="btn btn-warning">Edit User</button>
                    </div>
                </Form>
            </div>
        </>
    )
}

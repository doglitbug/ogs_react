import type {Route} from "./+types/profile";
import {getUser} from "~/api";
import type {userProfile} from "~/models/all";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export async function clientLoader({params}: Route.LoaderArgs) {
    return getUser();
}

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Online Garage Sale"},
        {name: "description", content: "Welcome to the Online Garage Sale!"},
    ];
}

export default function Profile({loaderData}: Route.ComponentProps) {
    if (loaderData != null && loaderData.status == 200) {
        return EditProfile(loaderData.data.user);
    } else {
        return (
            <>
                <h1>Edit user</h1>
            </>
        )
    }
}

function EditProfile(user: userProfile) {
    return (
        <>
            <h1>Edit user:</h1>
            <Form className="row g-2">
                <Form.Group className="col-md-6">asd
                    <Form.Label>Full name:</Form.Label>
                    <Form.Control type="text" defaultValue={user.name}/>
                    <Form.Text className="text-muted">This will only be shown to other logged in users</Form.Text>
                </Form.Group>
                <Form.Group className="col-md-6">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" defaultValue={user.username}/>
                    <Form.Text className="text-muted">Shown to all users</Form.Text>
                </Form.Group>
                <Form.Group className="col-md-6">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" defaultValue={user.email} disabled/>
                    <Form.Text className="text-muted">This will only be shown to other logged in users and cannot be
                        changed</Form.Text>
                </Form.Group>
                <Form.Group className="col-md-6">
                    <Form.Label>Location:</Form.Label>
                    <Form.Select>
                        <option>Dunedin</option>
                        <option>Dunedin</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="col-md-12">
                    <Form.Label>Description (about yourself):</Form.Label>
                    <Form.Control as="textarea" defaultValue={user.description} rows={4}/>
                </Form.Group>
                <Form.Group>
                    <Button variant="warning" type="reset">
                        Cancel
                    </Button>
                    <Button variant="success" type="submit">
                        Save
                    </Button>
                </Form.Group>
            </Form>
        </>
    )
}
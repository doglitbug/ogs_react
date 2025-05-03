import type {Route} from "./+types/profile";
import {getUser, updateUser} from "~/api";
import type {userProfile} from "~/models/all";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import type {callToAction} from "~/models/all";
import CallToAction from "~/components/CallToAction";
import {useState} from "react";
import {useNavigate} from "react-router";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Online Garage Sale: Edit Profile"},
        {name: "description", content: "Welcome to the Online Garage Sale!"},
    ];
}

export async function clientLoader({params}: Route.ClientLoaderArgs) {
    return getUser();
}

export default function Profile({loaderData}: Route.ComponentProps) {
    if (loaderData != null && loaderData.status == 200) {
        return EditProfile(loaderData.user);
    } else {
        return (
            <>
                <h1>Edit user</h1>
            </>
        )
    }
}

function EditProfile(user: userProfile) {
    const [errors, setErrors] = useState({
        name: '',
        username: '',
        location: '',
        description: ''
    })
    const navigate = useNavigate();

    const actions: callToAction[] = [
        {
            text: "Back",
            variant: "primary",
            link: "/profile"
        },
        {
            text: "Delete",
            variant: "danger",
            link: "/profile/delete"
        },
    ];

    async function handleSubmit(event: any) {
        event.preventDefault()

        const obj = Object.fromEntries(new FormData(event.target).entries())

        const result: any = await updateUser("", obj);
        if (result.status == 200) {
            navigate("/profile");
        } else {
            setErrors(result.error);
        }
    }

    // @ts-ignore All the error?.xxx
    return (
        <>
            <h1>Edit user:</h1>
            <CallToAction actions={actions}/>
            <div className="rounded">
                <Form onSubmit={handleSubmit} className="row g-2">
                    <Form.Group className="col-md-6">
                        <Form.Label>Full name:</Form.Label>
                        <Form.Control type="text" name="name" defaultValue={user.name}/>
                        <Form.Text className="text-muted">This will only be shown to other logged in users</Form.Text>
                        <Form.Text className="error">{errors.name}</Form.Text>
                    </Form.Group>
                    <Form.Group className="col-md-6">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" name="username" defaultValue={user.username}/>
                        <Form.Text className="text-muted">Shown to all users</Form.Text>
                        <Form.Text className="error">{errors.username}</Form.Text>
                    </Form.Group>
                    <Form.Group className="col-md-6">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" defaultValue={user.email} disabled/>
                        <Form.Text className="text-muted">This will only be shown to other logged in users and cannot be
                            changed</Form.Text>
                    </Form.Group>
                    <Form.Group className="col-md-6">
                        <Form.Label>Location:</Form.Label>
                        <Form.Select name="location_id">
                            <option value="1">Dunedin</option>
                            <option value="1">Dunedin</option>
                        </Form.Select>
                        <Form.Text className="error">{errors.location}</Form.Text>
                    </Form.Group>
                    <Form.Group className="col-md-12">
                        <Form.Label>Description (about yourself):</Form.Label>
                        <Form.Control as="textarea" name="description" defaultValue={user.description} rows={4}/>
                        <Form.Text className="error">{errors.description}</Form.Text>
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
            </div>
        </>
    )
}
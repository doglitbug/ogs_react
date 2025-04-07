import type { Route } from "./+types/login";
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from "~/context/useAuth"

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Online Garage Sale" },
        { name: "description", content: "Welcome to the Online Garage Sale!" },
    ];
}

export default function Register() {
    const [username, setUsername] = useState('doglitbug')
    const [password, setPassword] = useState('1')
    //const { loginUser } = useAuth()

    function handleSubmit(event: { preventDefault: () => void }) {
        event.preventDefault()
        //loginUser(username, password)
    }

    return (
        <>
            <h1>Register:</h1>
            <Form className="row g-2 rounded" onSubmit={handleSubmit}>
                <Form.Group className="col-md-6" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        required />
                </Form.Group>

                <Form.Group className="col-md-6" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required />
                </Form.Group>

                <Form.Group className="col-md-12">
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form.Group>
            </Form>
        </>
    )
}

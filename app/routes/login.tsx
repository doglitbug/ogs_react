import type {Route} from "./+types/login";
import {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useAuth} from "~/context/useAuth"
import {useNavigate} from "react-router";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Online Garage Sale: Login"},
        {name: "description", content: "Welcome to the Online Garage Sale!"},
    ];
}

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')
    const {loginUser} = useAuth()
    const navigate = useNavigate();

    async function handleSubmit(event: { preventDefault: () => void }) {
        event.preventDefault()
        const result: any = await loginUser(username, password);
        if (result.status == 200) {
            navigate("/profile");
        } else {
            console.log(result);
            setErrors(result.error);
        }
    }

    return (
        <>
            <h1>Login:</h1>
            <Form className="row g-2 rounded" onSubmit={handleSubmit}>
                <Form.Group className="col-md-6" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        required/>
                </Form.Group>

                <Form.Group className="col-md-6" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required/>
                    <div className="error">
                        {errors}
                    </div>
                </Form.Group>

                <Form.Group className="col-md-12">
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form.Group>
            </Form>
        </>
    )
}

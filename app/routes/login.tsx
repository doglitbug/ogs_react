import type {Route} from "./+types/login";
import {useState} from 'react'
import {useAuth} from "~/context/useAuth"
import {Form, useNavigate} from "react-router";

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
                <div className="col-md-6">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text"
                           className="form-control"
                           placeholder="Enter username"
                           aria-label="Username"
                           name="username"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           required/>
                </div>

                <div className="col-md-6">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password"
                           className="form-control"
                           placeholder="Enter password"
                           aria-label="password"
                           name="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required
                    />
                </div>

                <div className="col-md-12">
                    <div className="error">
                        {errors}
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </div>
            </Form>
        </>
    )
}

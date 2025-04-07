import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import {useNavigate} from "react-router";
import {InputGroup} from "react-bootstrap";

export function NavbarSearch() {
    const navigate = useNavigate();
    const [q, setQ] = useState("");

    function handleSubmit(event: { preventDefault: () => void }) {
        event.preventDefault()
        let url = `/search?q=${q}`
        navigate(url);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <InputGroup>
                <Form.Control
                    type="search"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search"
                    aria-label="Search"
                />
                <Button type="submit">Search</Button>
            </InputGroup>

        </Form>
    )
}
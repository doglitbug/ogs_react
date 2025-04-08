import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router";
import {InputGroup} from "react-bootstrap";

export function NavbarSearch() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [q, setQ] = useState(searchParams.get('q') ?? '');

    useEffect(() => {
        setQ(searchParams.get('q') ?? '')
    }, [searchParams.get('q')])

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
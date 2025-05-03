import {useEffect, useState} from "react";
import {Form, useNavigate, useSearchParams} from "react-router";

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
            <div className="input-group">
                <input
                    type="text"
                    value={q}
                    className="form-control"
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search"
                    aria-label="Search"
                />
                <button type="submit" className="btn btn-primary">Search</button>
            </div>
        </Form>
    )
}
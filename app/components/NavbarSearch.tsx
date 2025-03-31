import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import {useNavigate} from "react-router";
import {useAuth} from "~/context/useAuth";
import {InputGroup} from "react-bootstrap";

export function NavbarSearch() {
    const navigate = useNavigate();
    const {getUserDetails} = useAuth();

    const [q, setQ] = useState("");
    const [location, setLocation] = useState(getUserDetails()?.location);

    function handleSubmit(event: { preventDefault: () => void }) {
        event.preventDefault()
        if (q == "") return
        let url = `/search?q=${q}`
        if (location) {
            url += `&location=${location}`
        }
        navigate(url);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <div className="container">
                <div className="row">

                    <div className="col-sm-12 col-lg-4">
                        <InputGroup>
                            <InputGroup.Text>I want to</InputGroup.Text>
                            <Form.Select
                                aria-label="Buying or Selling"
                            >
                                <option value="buy">buy</option>
                                <option value="sell">sell</option>
                                <option value="either">buy or sell</option>
                            </Form.Select>
                        </InputGroup>
                    </div>

                    <div className="col-sm-12 col-lg-3">
                        <InputGroup>
                            <Form.Control
                                type="search"
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                placeholder="Search"
                                aria-label="Search"
                            />
                        </InputGroup>
                    </div>

                    <div className="col-sm-12 col-lg-3">
                        <InputGroup>
                            <InputGroup.Text>in</InputGroup.Text>
                            <Form.Control
                                type="search"
                                value={location ? location : ""}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Location"
                                aria-label="Location"
                            />

                        </InputGroup>
                    </div>
                    <div className="col-sm-2 col-lg-2">
                            <Button type="submit">Search</Button>
                    </div>

                </div>
            </div>
        </Form>
    )
}
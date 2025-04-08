import {getSearch} from "~/api";
import type {Route} from "../../.react-router/types/app/routes/+types/search";
import type {searchResult} from "~/models/all";
import {ShowSearchResult} from "~/components/SearchResult";
import {InputGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useAuth} from "~/context/useAuth";
import {useState} from "react";
import {useNavigate} from "react-router";

export async function clientLoader({params, request}: Route.LoaderArgs) {
    const searchParams = new URL(request.url).searchParams;
    let searchTerm = searchParams.get("q");
    if (!searchTerm) return null;
    let location = searchParams.get("location");
    if (location) {
        searchTerm += `&location=${location}`
    }
    return getSearch(searchTerm);
}

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Online item Sale"},
        {name: "description", content: "Welcome to the Online item Sale!"},
    ];
}

export default function Search({loaderData}: Route.ComponentProps) {
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

    let results;
    if (loaderData != null) {
        results = loaderData.search?.results;
    }
    return (
        <>
            <h1>Search results:</h1>
            <Form onSubmit={handleSubmit} className="rounded">
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
                                defaultValue={q}
                                onChange={(e) => setQ(e.target.value)}
                                placeholder="Search"
                                aria-label="Search"
                            />
                        </InputGroup>
                    </div>

                    <div className="col-sm-12 col-lg-4">
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
                    <div className="col-sm-2 col-lg-1">
                        <Button type="submit">Search</Button>
                    </div>
                </div>
            </Form>

            {results && (
                <div className="row">
                    {results.map(function (result: searchResult) {
                        return (
                            <div className="col-xl-4 col-md-6" key={result.item_id}>
                                <ShowSearchResult searchResult={result}/>
                            </div>
                        )
                    })}
                </div>)}

            {loaderData.error && (<div className={"error"}>
                {loaderData.error}
            </div>)}
        </>
    )
}

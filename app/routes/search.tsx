import {getSearch} from "~/api";
import type {Route} from "../../.react-router/types/app/routes/+types/search";
import type {searchResult} from "~/models/all";
import {ShowSearchResult} from "~/components/SearchResult";
import {InputGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useAuth} from "~/context/useAuth";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router";

export async function clientLoader({request}: Route.LoaderArgs) {
    const searchParams = new URL(request.url).searchParams;
    console.log(searchParams.toString());

    return getSearch(searchParams.toString());
}

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Online Garage Sale: Search"},
        {name: "description", content: "Welcome to the Online item Sale!"},
    ];
}

export default function Search({loaderData}: Route.ComponentProps) {
    const {getUserDetails} = useAuth();

    const [searchParams, setSearchParams] = useSearchParams();
    const [parameters, setParameters] = useState({q: '', method: '', location: ''})

    //Updates on page form when searching from navbar on same page
    useEffect(() => {
        setParameters({
            q: searchParams.get('q') ?? '',
            method: searchParams.get('method') ?? 'buy',
            location: searchParams.get('location') ?? getUserDetails()?.location ?? ''
        })
    }, [searchParams])

    const results = loaderData?.search?.results;
    const error = loaderData?.error;

    function handleSubmit(event: any) {
        event.preventDefault()
        setSearchParams(parameters)
    }

    return (
        <>
            <h1>Search results:</h1>
            <Form onSubmit={handleSubmit} className="rounded">
                <div className="row">
                    <div className="col-sm-12 col-lg-3">
                        <InputGroup>
                            <InputGroup.Text>I want to</InputGroup.Text>
                            <Form.Select id="method"
                                         value={parameters.method}
                                         aria-label="Buying or Selling"
                                         onChange={(e) => setParameters({...parameters, method: e.target.value})}
                            >
                                <option value="buy">buy</option>
                                <option value="sell">sell</option>
                                <option value="either">buy or sell</option>
                            </Form.Select>
                        </InputGroup>
                    </div>

                    <div className="col-sm-12 col-lg-4">
                        <InputGroup>
                            <Form.Control
                                id="search"
                                type="search"
                                value={parameters.q}
                                onChange={(e) => setParameters({...parameters, q: e.target.value})}
                                placeholder="Search"
                                aria-label="Search"
                            />
                        </InputGroup>
                    </div>

                    <div className="col-sm-12 col-lg-4">
                        <InputGroup>
                            <InputGroup.Text>in</InputGroup.Text>
                            <Form.Control
                                id="location"
                                type="search"
                                value={parameters.location}
                                onChange={(e) => setParameters({...parameters, location: e.target.value})}
                                placeholder="Location"
                                aria-label="Location"
                            />

                        </InputGroup>
                    </div>

                    <div className="col-sm-2 col-lg-1">
                        <Button type="submit">Find</Button>
                    </div>
                </div>
            </Form>

            {error && (<div className={"error"}>
                {error}
            </div>)}

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
        </>
    )
}

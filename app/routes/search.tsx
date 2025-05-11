import {getSearch} from "~/api";
import type {Route} from "../../.react-router/types/app/routes/+types/search";
import type {searchResult} from "~/models/all";
import {ShowSearchResult} from "~/components/SearchResult";
import {useAuth} from "~/context/useAuth";
import {useEffect, useState} from "react";
import {Form, useSearchParams} from "react-router";
import Pagination from "~/components/Pagination";

export async function clientLoader({request}: Route.LoaderArgs) {
    const searchParams = new URL(request.url).searchParams;

    return getSearch(searchParams.toString());
}

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Online Garage Sale: Search"},
        {name: "description", content: "Welcome to the Online item Sale!"},
    ];
}

export default function Search({loaderData}: Route.ComponentProps) {
    const {user} = useAuth();

    const [searchParams, setSearchParams] = useSearchParams();
    const [parameters, setParameters] = useState({q: '', method: '', location: ''})

    //Updates on page form when searching from navbar on same page
    useEffect(() => {
        setParameters({
            q: searchParams.get('q') ?? '',
            method: searchParams.get('method') ?? 'buy',
            location: searchParams.get('location') ?? user?.location ?? ''
        })
    }, [searchParams])

    const results = loaderData?.search;
    const error = loaderData?.error;

    function handleSubmit(event: any) {
        event.preventDefault()
        setSearchParams(parameters)
    }

    return (
        <>
            <h1>Search results:</h1>
            <div className="rounded">
                <Form onSubmit={handleSubmit} className="row g-3">

                    <div className="col-md-12 col-lg-3 form-floating">
                        <select id="method"
                                className="form-select"
                                value={parameters.method}
                                aria-label="Buying or Selling"
                                onChange={(e) => setParameters({...parameters, method: e.target.value})}
                        >
                            <option value="buy">buy</option>
                            <option value="sell">sell</option>
                            <option value="either">buy or sell</option>
                        </select>
                        <label htmlFor="method">I want to</label>
                    </div>

                    <div className="col-md-12 col-lg-4 form-floating">
                        <input
                            id="search"
                            type="search"
                            className="form-control"
                            value={parameters.q}
                            onChange={(e) => setParameters({...parameters, q: e.target.value})}
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <label htmlFor="search"></label>
                    </div>

                    <div className="col-md-12 col-lg-4 form-floating">
                        <input
                            id="location"
                            type="search"
                            className="form-control"
                            value={parameters.location}
                            onChange={(e) => setParameters({...parameters, location: e.target.value})}
                            placeholder="Location"
                            aria-label="Location"
                        />
                        <label htmlFor="location">in/from</label>
                    </div>

                    <div className="col-sm-2 col-lg-1">
                        <button type="submit" className="btn btn-primary">Search</button>
                    </div>

                </Form>
            </div>

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
                    <Pagination totalItems={loaderData?.total_items}/>
                </div>)}

        </>
    )
}

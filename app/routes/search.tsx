import {getSearch} from "~/api";
import type {Route} from "../../.react-router/types/app/routes/+types/search";
import type {searchResult} from "~/models/all";
import {ShowSearchResult} from "~/components/SearchResult";

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
    if (loaderData != null && loaderData.status == 200) {
        return showSearchResults(loaderData.data.search.results);
    } else {
        return (
            <>
                <h1>Search</h1>
                <p>No results found</p>
            </>
        )
    }
}

function showSearchResults(results: any) {
    return (
        <>
            <h1>Search results</h1>
            <div className="row">
                {results.map(function (result: searchResult) {
                    return (
                        <div className="col-lg-3 col-md-6" key={result.item_id}>
                            <ShowSearchResult searchResult={result}/>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
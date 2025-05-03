import {Link} from "react-router";
import type {searchResult} from "~/models/all";
import {shortenText} from "~/components/Misc";

export function ShowSearchResult(props: { searchResult: searchResult }) {
    const {searchResult} = props;
    return (
        <div className="card mb-6 searchResult rounded">
            <div className="card-header">
                <h5 className="card-title">{searchResult['name']}</h5>
                <div className="card-subtitle mb-2 text-muted">{searchResult['location']}</div>
            </div>
            <div className="card-body">
                <p className="card-text">
                    {shortenText(searchResult['description'])}
                </p>
            </div>
            <div className="card-footer"><Link to={`/item/${searchResult['item_id']}`} className="btn btn-primary">Go to item</Link></div>
        </div>
    );
}

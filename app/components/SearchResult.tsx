import {Link} from "react-router";
import type {searchResult} from "~/models/all";
import Card from "react-bootstrap/Card";
import {shortenText} from "~/components/Misc";
import {CardFooter} from "react-bootstrap";

export function ShowSearchResult(props: { searchResult: searchResult }) {
    const {searchResult} = props;
    return (
        <Card className="mb-6 searchResult rounded">
            <Card.Header>
                <Card.Title>{searchResult['name']}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{searchResult['location']}</Card.Subtitle>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {shortenText(searchResult['description'])}
                </Card.Text>
            </Card.Body>
            <Card.Footer><Link to={`/item/${searchResult['item_id']}`}>Go to item</Link></Card.Footer>
        </Card>
    );
}

import Card from 'react-bootstrap/Card';
import {Link} from "react-router";
export interface garagePreview {
    name: string;
    location: string;
    description: string;
    garage_id: number;
}

interface myProps {
    garage: garagePreview;
}
export default function GaragePreview(props: myProps) {
    const {name, location, description, garage_id} = props.garage
    return (
        <Card key={garage_id}>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{location}</Card.Subtitle>
                <Card.Text>
                    {description}
                </Card.Text>
                <Link to={`/garage/${garage_id}`}>Go to Garage</Link>
            </Card.Body>
        </Card>
    );
}

import type { Route } from "./+types/garage";

export async function loader({ params }: Route.LoaderArgs) {
    const garageId = params.garageId;
    return { garageId }
}

export async function action() {

}

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Online Garage Sale" },
        { name: "description", content: "Welcome to the Online Garage Sale!" },
    ];
}

export default function Garage({ loaderData }: Route.ComponentProps) {
    return (
        <>
            <h1>Garages: {loaderData.garageId}</h1>
        </>
    )
}

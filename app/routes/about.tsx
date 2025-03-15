import type { Route } from "./+types/about";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Online Garage Sale" },
        { name: "description", content: "Welcome to the Online Garage Sale!" },
    ];
}

export default function About() {
    return (
        <>
            <h1>About</h1>

            <h2>What is this about?</h2>
            <p>Its a free (at the moment, costs permitting) website to help people <strong>Reduce, Reuse and Recycle</strong> stuff they have lying around the home
            </p>

            <h2>What are the rules?</h2>
            <p>
                <ul className="about">
                    <li>Don't be a dick</li>
                    <li>Don't harrass people</li>
                    <li>Be polite</li>
                    <li>Nobody owes you anything, but please also be considerate of other people's time!</li>
                    <li>Don't list anything illegal: guns, drugs etc</li>
                </ul>
            </p>

            <h2>Privacy policy</h2>
        </>
    )
}

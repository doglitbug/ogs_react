import type {Route} from "./+types/about";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Online Garage Sale"},
        {name: "description", content: "Welcome to the Online Garage Sale!"},
    ];
}

export default function About() {
    return (
        <>
            <h1>About</h1>
            <div className="rounded">
                <h2>What is this about?</h2>
                <p>Its a free (at the moment, costs permitting) website to help people <strong>Reduce, Reuse and
                    Recycle</strong> stuff they have lying around the home
                </p>

                <h2>What are the rules?</h2>
                <ul className="about">
                    <li>Don't be a dick</li>
                    <li>Don't harass people</li>
                    <li>Be polite</li>
                    <li>Nobody owes you anything, but please also be considerate of other people's time!</li>
                    <li>Don't list anything illegal: guns, drugs etc</li>
                </ul>

                <h2>Privacy policy</h2>
                <p>We only record your name, username and email as provided for the purposes of allowing other people to
                    contact you.<br/>
                    Name and email address are only available to other users who have signed up
                </p>

                <h2>Extras</h2>
                <p>
                    Author: <a href="https://doglitbug.xyz">doglitbug.xyz</a><br/>
                    Source: <a href="https://github.com/search?q=owner%3Adoglitbug+ogs&type=repositories">GitHub</a>
                </p>
            </div>
        </>
    )
}

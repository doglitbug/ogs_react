import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Online Garage Sale" },
    { name: "description", content: "Welcome to the Online Garage Sale!" },
  ];
}

export default function Home() {
  return <>
    <h1>Online Garage Sale</h1>
    <p>Welcome to the Online Garage Sale, an idea born of necessity and disappointment!</p>

    <p>Necessity and disappointment?</p>
    <p>
      Well yes, we all have a pile of stuff that we have been meaning to put up on online for sale, or for a good
      old-fashioned yard sale, but we never get around to it!<br />
      And disappointment? Well our local auction site is all drop shippers and businesses now, no hope of competing, or
      finding stuff second hand without wading through all the business listings<br />
      Wanted to buy something local, second hand and fast. And what do I see there...23 day lead time from our factory in
      China. That's great for what was a New Zealand second hand website...<br />
      So the online garage sale was born, a place for people to buy, sell or exchange their secondhand/homemade goods without
      battling Big International Businesses for visibility!
    </p>
    <p>
      Local individuals, maker spaces, and op shops are all welcome here!
    </p>
    <p>Any questions, comments, bugs etc, please contact onlinegaragesale1234(at)gmail.com</p>
  </>
}

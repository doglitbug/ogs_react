import React from "react";
import type {callToAction} from "~/models/all";
import {Link} from "react-router";
import Button from "react-bootstrap/Button";

interface callToActionProps {
    actions: callToAction[];
}

export default function CallToAction(props: callToActionProps) {
    const {actions} = props;
    if (actions.length == 0) return (<></>);
    return (
        <div className="cta">
            {actions.map((action) => {
                return (
                    <Link to={action.link} key={action.link + action.text}>
                        <Button variant={action.variant}>
                            {action.text}
                        </Button>
                    </Link>
                )
            })}
        </div>
    )
}
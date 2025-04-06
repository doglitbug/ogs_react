import React from "react";
import type {callToAction} from "~/models/all";
import {Link} from "react-router";
import Button from "react-bootstrap/Button";

interface callToActionProps {
    actions: callToAction[];
}

export default function CallToAction(props: callToActionProps) {
    const {actions} = props;
    return (
        <div className="cta">
            {actions.map((action) => {
                return (
                    <>
                        <Link to={action.link}>
                            <Button variant={action.variant}>
                                {action.text}
                            </Button>
                        </Link>
                    </>
                )
            })}
        </div>
    )
}
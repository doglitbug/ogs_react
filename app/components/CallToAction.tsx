import type {callToAction} from "~/models/all";
import {Link} from "react-router";

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
                        <button type="button" className={"btn btn-" + action.variant}>
                            {action.icon !== "" && <i className={"bi bi-" + action.icon}></i>}
                            {action.text}
                        </button>
                    </Link>
                )
            })}
        </div>
    )
}
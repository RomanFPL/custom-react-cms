import React from "react";

const Panel = () => {
    return (
        <div className="panel">
            <button className="uk-button uk-button-primary uk-margin-small-right" uk-toggle="target: #modal-open">Open pages</button>
            <button className="uk-button uk-button-primary" uk-toggle="target: #modal-save">Save page</button>
            <button className="uk-button uk-button-default" uk-toggle="target: #modal-backUp">Back up</button>
        </div>
    )
}
export default Panel;
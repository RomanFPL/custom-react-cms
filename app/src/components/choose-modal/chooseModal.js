import React from "react";

const ChooseModal = ({target, data, redirect}) => {
    const pages = data.map(item => {
        return (
            <li key={item}><a 
            className="uk-link-muted uk-modal-close" 
            href="#"
            onClick={(e) => redirect(e, item)}>{item}</a></li>
        )
    })
    return (
        <div id={target} uk-modal="true" container="false">
        <div className="uk-modal-dialog uk-modal-body">
            <h2 className="uk-modal-title">Open</h2>
            <ul className="uk-list uk-list-divider">
                {pages}
            </ul>
            <p className="uk-text-right">
                <button className="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
            </p>
        </div>
    </div>
    )
}

export default ChooseModal;
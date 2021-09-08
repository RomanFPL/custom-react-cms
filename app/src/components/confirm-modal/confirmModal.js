import React from "react";

const ConfirmModal = ({target, method}) => {
    return (
        <div id={target} uk-modal="true" container="false">
        <div className="uk-modal-dialog uk-modal-body">
            <h2 className="uk-modal-title">Saving</h2>
            <p>Do you want to save changes?</p>
            <p className="uk-text-right">
                <button className="uk-button uk-button-default uk-modal-close uk-margin-small-right" type="button">Cancel</button>
                <button 
                    onClick={() => method()} 
                    className="uk-button uk-button-primary uk-modal-close" 
                    type="button">Save</button>
            </p>
        </div>
    </div>
    )
}
 
export default ConfirmModal;
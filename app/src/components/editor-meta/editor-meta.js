import React, {Component} from "react";

export default class EditorMeta extends Component {
    constructor(props){
        super(props);
        this.state = {
            meta: {
                title: "",
                keywords: "",
                description: ""
            }
        }
    }

    componentDidMount = () => {
        this.getMeta(this.props.virtualDom);
    }

    getMeta = (virtualDom) => {
        let title = virtualDom.head.querySelector("title") || virtualDom.head.appendChild(virtualDom.createElement("title"));

        this.setState({
            meta: {
                title: title.innerHTML
            }
        })
    }

    render(){
        const {target} = this.props;
        const {title, keywords, description} = this.state.meta;

        return (
        <div id={target} uk-modal="true" container="false">
            <div className="uk-modal-dialog uk-modal-body">
                <h2 className="uk-modal-title">Edit meta</h2>
                <form>
                <div className="uk-margin">
                    <input className="uk-input" type="text" placeholder="Title" defaultValue={title}/>
                </div>
                <div className="uk-margin">
                    <textarea className="uk-textarea" rows="5" placeholder="Keywords"></textarea>
                </div>
                <div className="uk-margin">
                    <textarea className="uk-textarea" rows="5" placeholder="Description"></textarea>
                </div>
                </form>
                <p className="uk-text-right">
                    <button className="uk-button uk-button-default uk-modal-close uk-margin-small-right" type="button">Cancel</button>
                    <button 
                        className="uk-button uk-button-primary uk-modal-close" 
                        type="button">Save</button>
                </p>
            </div>
        </div>
        )
    }
}
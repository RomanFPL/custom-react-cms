import axios from "axios";
import React, {Component} from "react";
import "../../helper/iframeLoader.js";
import DOMHelper from "../../helper/dom-helper.js";
import EditorText from "../text-editor";
import UIkit from "uikit";
import Spinner from "../spinner";
import ChooseModal from "../choose-modal";
import ConfirmModal from "../confirm-modal";

export default class Editor extends Component {
    constructor() {
        super();
        this.currentPage = "index.html";
        this.state  = {
            pageList: [],
            newPageName: "",
            loading: true
        }
    }

    componentDidMount(){
        this.init(null, this.currentPage);
    }

    init = (e, page) => {
        if(e){
            e.preventDefault();
        }
        this.isLoaded;
        this.iframe = document.querySelector('iframe');
        this.open(page, this.isLoaded);
        this.loadPageList();
    }

    open = (page, cb) => {
        this.currentPage = page;
        axios
            .get(`../${page}?rnd=${Math.random()}`)
            .then(res => DOMHelper.parseStrToDOM(res.data))
            .then(DOMHelper.wrapTextNodes)
            .then(dom => {
                this.virtualDom = dom;
                return dom;
            })
            .then(DOMHelper.serializeDOMToString)
            .then(html => axios.post("./api/save_temp_page.php", {html}))
            .then(() => this.iframe.load("../lsdjhkljdbkjfhw9p8r3y872ogfwp;aph93d2-qwhean.html"))
            .then(() => {axios.post("./api/delete_temp_page.php")})
            .then(() => this.enableEditing())
            .then(() => this.injectStyles())
            .then(cb);
    }

    save = (onSuccess, onError) => {
        this.isLoading();
        const newDom = this.virtualDom.cloneNode(this.virtualDom);
        DOMHelper.unwrapTextNodes(newDom);
        const html = DOMHelper.serializeDOMToString(newDom);
        axios
            .post("./api/save_page.php", {pageName: this.currentPage, html})
            .then(onSuccess)
            .catch(onError)
            .finally(this.isLoaded);
    }

    enableEditing = () => {
        this.iframe.contentDocument.body.querySelectorAll("text-editor").forEach(element => {
            const id = element.getAttribute("nodeid");
            const virtualElement = this.virtualDom.body.querySelector(`[nodeid="${id}"]`);
            new EditorText(element, virtualElement);
        })
    }

    injectStyles = () => {
        const style = this.iframe.contentDocument.createElement("style");
        style.innerHTML = `
        text-editor:hover {
            border-bottom: 1px solid orange;
            box-sizing: border-box;
            display: inline-block;
        }
        text-editor:focus {
            border-bottom: 1px solid red;
            box-sizing: border-box;
            display: inline-block;
        }`
        this.iframe.contentDocument.head.appendChild(style);
    }

    loadPageList = () => {
        axios
            .get("./api/page_list.php")
            .then(res => this.setState({pageList: res.data}));
    }
    
    createNewPage = () => {
        axios
            .post("./api/create_new_page.php", {"name": this.state.newPageName})
            .then(this.loadPageList())
            .catch(() => alert("This page is already exist, change page name!"))
    }

    deletePage = page => {
        axios
            .post("./api/delete_page.php", {"name" : page})
            .then(this.loadPageList())
            .catch(() => alert("This page is not exist"));
    }

    isLoading = () => {
        this.setState({
            loading: true
        })
    }
    
    isLoaded = () => {
        this.setState({
            loading: false
        })
    }
    
    render(){
        const {loading, pageList} = this.state;
        let spinner;
        loading ? spinner = <Spinner active/> : <Spinner/>

        return (
            <>
                <iframe src={this.currentPage} frameBorder="0"></iframe>
                {spinner}
                <div className="panel">
                    <button className="uk-button uk-button-primary uk-margin-small-right" uk-toggle="target: #modal-open">Open pages</button>
                    <button className="uk-button uk-button-primary" uk-toggle="target: #modal-save">Save page</button>
                </div>
                <ConfirmModal target={'modal-save'} method={this.save}/>
                <ChooseModal target={'modal-open'} data={pageList} redirect={this.init}/>
            </>
        )
    }
}

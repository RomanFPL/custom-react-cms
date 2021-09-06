import axios from "axios";
import React, {Component} from "react";
import "../../helper/iframeLoader.js";
import DOMHelper from "../../helper/dom-helper.js";
import EditorText from "../text-editor";
import UIkit from "uikit";
import Spinner from "../spinner";
import ChooseModal from "../choose-modal";
import ConfirmModal from "../confirm-modal";
import Panel from "../panel/panel.js";

export default class Editor extends Component {
    constructor() {
        super();
        this.currentPage = "index.html";
        this.state  = {
            pageList: [],
            newPageName: "",
            loading: true,
            backupsList: []
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
        this.loadBackupsList();
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

            this.loadBackupsList();
    }

    save = async (onSuccess, onError) => {
        this.isLoading();
        const newDom = this.virtualDom.cloneNode(this.virtualDom);
        DOMHelper.unwrapTextNodes(newDom);
        const html = DOMHelper.serializeDOMToString(newDom);
        await axios
            .post("./api/save_page.php", {pageName: this.currentPage, html})
            .then(onSuccess)
            .catch(onError)
            .finally(this.isLoaded);

            this.loadBackupsList();
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

    loadBackupsList = () => {
        axios
            .get("./backups/backups.json")
            .then(res => this.setState({backupsList: res.data.filter(backup => {
                 return backup.page === this.currentPage;   
            })}));
    }
    
    restoreBackup = (e, backup) => {
        if(e){
            e.preventDefault();
        }
        UIkit.modal.confirm("Do you want to get this back up page? You will couse all unsaved changes?", {labels: {ok: "backup", cancel: "Cancel"}})
        .then(() => {
            this.isLoading();
            return axios
                .post("./api/restore_backup.php", {"page": this.currentPage, "file": backup})
        })
        .then(() => {
            this.open(this.currentPage, this.isLoaded);
        });
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
        const {loading, pageList, backupsList} = this.state;
        let spinner;

        loading ? spinner = <Spinner active/> : <Spinner/>
        const modalSave = "modal-save",
                modalOpen = "modal-open",
                modalBackUP = "modal-backUp"
        return (
            <>
                <iframe src="" frameBorder="0"></iframe>
                {spinner}
                <Panel/>
                <ConfirmModal target={modalSave} method={this.save}/>
                <ChooseModal target={modalOpen} data={pageList} redirect={this.init}/>
                <ChooseModal target={modalBackUP} data={backupsList} redirect={this.restoreBackup}/>
            </>
        )
    }
}

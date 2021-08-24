import axios from "axios";
import React, {Component} from "react";
import "../../helper/iframeLoader.js";

export default class Editor extends Component {
    constructor() {
        super();
        this.currentPage = "index.html";
        this.state  = {
            pageList: [],
            newPageName: ""
        }
    }

    componentDidMount(){
        this.init(this.currentPage);
    }

    init = page => {
        this.iframe = document.querySelector('iframe');
        this.open(page);
        this.loadPageList();
    }

    open = page => {
        this.currentPage = `../${page}`;
        this.iframe.load(this.currentPage, () => {
            console.log(this.currentPage);
        });
    }

    loadPageList = () => {
        axios
            .get("./api")
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

    render(){
        // const {pageList} = this.state;
        // const pages = pageList.map((page,i) => {
        //     return <h1 key={i}>
        //         {page}
        //         <a href="#" onClick={() => {this.deletePage(page)}}>(x)</a>
        //     </h1>
        // });
        

        return (
            <iframe src={this.currentPage} frameBorder="0"></iframe>
            // <>
            // <input onChange={(e) => {this.setState({newPageName: e.target.value})}} type="text"/>
            // <button onClick={this.createNewPage}>Create new page</button>
            // {pages}
            // </>
        )
    }
}

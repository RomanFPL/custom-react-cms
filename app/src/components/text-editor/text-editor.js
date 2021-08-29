export default class EditorText {
    constructor (element, virtualElement){
        this.element = element;
        this.virtualElement = virtualElement;
        this.element.addEventListener("click", () => this.onClick());
        // element.addEventListener("input", () => {
        //     this.onTextEdit(element);
        // })
    }

    onClick = () => {
        this.element.contentEditable = "true";
    }
    
    onTextEdit = element => {
        const id = element.getAttribute("nodeid");
        this.virtualDom.body.querySelector(`[nodeid="${id}"]`).innerHTML = element.innerHTML;
    }
}
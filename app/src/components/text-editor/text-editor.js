export default class EditorText {
    constructor (element, virtualElement){
        this.element = element;
        this.virtualElement = virtualElement;
        this.element.addEventListener("click", () => this.onClick());
        this.element.addEventListener("blur", () => this.onBlur());
        this.element.addEventListener("keypress", (e) => this.onKeypress(e))
        this.element.addEventListener("input", () => this.onTextEdit());

        // element.addEventListener("input", () => {
        //     this.onTextEdit(element);
        // })
    }

    onClick = () => {
        this.element.contentEditable = "true";
        this.element.focus();
    }

    onBlur = () => {
        this.element.removeAttribute("contenteditable");
    }

    onKeypress = e => {
        e.keyCode === 13 ? this.element.blur() : null;
    }
    
    onTextEdit = () => {
        this.virtualElement.innerHTML = this.element.innerHTML;
    }
}
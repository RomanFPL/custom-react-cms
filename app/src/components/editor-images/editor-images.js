import axios from "axios";

export default class EditorImages {
    constructor (element, virtualElement, ...[isLoading, isLoaded, showNotification]){
        this.element = element;
        this.virtualElement = virtualElement;
        this.element.addEventListener("click", () => this.onClick());
        this.imgUploader =document.querySelector("#img-upload");
        this.isLoading = isLoading;
        this.isLoaded = isLoaded;
        this.showNotification = showNotification;

    }

    onClick = () => {
        this.imgUploader.click();
        this.imgUploader.addEventListener("change", () => {
            if(this.imgUploader.files && this.imgUploader.files[0]){
                let formData = new FormData();
                formData.append("image", this.imgUploader.files[0]);
                this.isLoading();
                axios
                    .post("./api/upload_image.php", formData, {
                        headres: {
                            "Content-type": "multipart/form-data"
                        }
                    })
                    .then((res) => {
                        this.virtualElement.src = this.element.src = `./img/${res.data.src}`;
                        this.imgUploader.value = "";
                        this.isLoaded();
                    })
                    .catch(() => this.showNotification("Saving error. Maybe you have internet conection lost!", "danger"))
                    .finally(() => {
                        this.imgUploader.value = "";
                        this.isLoaded();
                    })
            }
        });
    }
}


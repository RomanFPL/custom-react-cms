import $ from 'jquery';

function getPageList(){
    $("p").remove();
    $.get("api", data => {
        data.forEach(file => {
            $("body").append(`<p>${file}</p>`);     
        });
    }, "JSON");
}

getPageList()


$("button").click(() => {
    $.post("./api/create_new_page.php", {
        "name" : $("input").val()
    }, () => {
        getPageList();
    })
    .fail(() => {
        alert("This page already exist, enter another name!");
    });
});
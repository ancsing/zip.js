window.addEventListener("DOMContentLoaded",function() {
    var article = document.querySelector(".geogebraweb");
    var param = article.getAttribute("data-param-ggbbase64");
    zip.createReader(new zip.Data64URIReader(param),function(reader) {
        reader.getEntries(function(entries) {
            console.log(entries.length);
        });
    },
    function (error) {
    });
});

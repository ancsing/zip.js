window.addEventListener("DOMContentLoaded",function() {
    var article = document.querySelector(".geogebraweb");
    var param = article.getAttribute("data-param-ggbbase64");
    var imageRegex = /\.(png|jpg|jpeg|gif)$/;
    var filename = "";
    zip.createReader(new zip.Data64URIReader(param),function(reader) {
        reader.getEntries(function(entries) {
            for (var i = 0, l = entries.length; i < l; i++) {
                if (entries[i].filename.match(imageRegex)) {
                        console.log(entries[i].filename+" : image");
                        entries[i].getData(new zip.Data64URIWriter("image/"+entries[i].filename.split(".")[1]), function(data) {
                            var img = new Image();
                            img.src = data;
                            var p = document.createElement("p");
                            p.appendChild(img);
                            document.body.appendChild(p);
                        });
                    } else {
                        console.log(entries[i].filename+" : text");
                        entries[i].getData(new zip.TextWriter(), function(text) {
                            var t = document.createTextNode(text)
                            var p = document.createElement("p");
                            p.appendChild(t);
                            document.body.appendChild(p);
                        });
                }
            } 
        });
    },
    function (error) {
    });
});

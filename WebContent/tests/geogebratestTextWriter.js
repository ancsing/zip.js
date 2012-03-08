window.addEventListener("DOMContentLoaded",function() {
    var article = document.querySelector(".geogebraweb");
    var param = article.getAttribute("data-param-ggbbase64");
    var imageRegex = /\.(png|jpg|jpeg|gif)$/;
    var filename = "";
    zip.useWebWorkers = false;
    zip.createReader(new zip.Data64URIReader(param),function(reader) {
        reader.getEntries(function(entries) {
            for (var i = 0, l = entries.length; i < l; i++) {
                (function(entry) {
                    if (entry.filename.match(imageRegex)) {
                            console.log(entry.filename+" : image");
                            entry.getData(new zip.Data64URIWriter("image/"+entry.filename.split(".")[1]), function(data) {
                                var img = new Image();
                                img.src = data;
                                var p = document.createElement("p");
                                p.appendChild(img);
                                document.body.appendChild(p);
                            });
                        } else {
                            console.log(entry.filename+" : text");
                            entry.getData(new zip.TextWriter(), function(text) {
                                var t = document.createTextNode(text)
                                var p = document.createElement("p");
                                var pre = document.createElement("pre");
                                pre.appendChild(t);
                                p.appendChild(pre);
                                document.body.appendChild(p);
                            });
                    }
                })(entries[i]);
            }
        });
    },
    function (error) {
    });
});

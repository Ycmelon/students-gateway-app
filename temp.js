meta = document.createElement("meta");
meta.name = "viewport";
meta.content = "width=device-width, initial-scale=1.0";
document.head.appendChild(meta);
document.getElementById("content").style.margin = 0;
document.getElementById("content").style.width = "fit-content";
document.getElementsByClassName("tips")[0].remove();
document.getElementsByTagName("header")[0].style.width = "fit-content";

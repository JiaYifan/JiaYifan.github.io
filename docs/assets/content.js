const allanchor = document.querySelectorAll(".anchor");
let content = document.createElement("div")
allanchor.forEach((e,i)=>{
    let a = document.createElement("a")
    a.href = e.href
    // a.innerHTML = e.children[0].innerHTML
    a.innerHTML = e.innerHTML
    content.append(a)
})
document.getElementById("content").append(content)
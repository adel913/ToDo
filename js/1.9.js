let text =document.querySelector("[type=\"text\"]");
let submat =document.querySelector("[type=\"submit\"]");
let tsk=document.querySelector(".name");
let sound =new Audio("Swiss Bell Sound.mp3")
let arryOfTask=[];
// window.localStorage.clear();
getlocalStorageTopage()
if(localStorage.getItem("tasks")) {
    arryOfTask=JSON.parse(localStorage.getItem("tasks"));
}
document.forms[0].onsubmit=function(e) {
    e.preventDefault();
    if(text.value !=="") {
        addTaskToArry(text.value);
        text.value="";
    }
    else {
    }
}
tsk.addEventListener("click",(e)=> {
    if(e.target.className==="Delete") {
        ///remove body
        e.target.parentElement.parentElement.remove();
        //remove localStorage
        removelocalStorag( e.target.parentElement.parentElement.getAttribute("data-id"));
}});
tsk.addEventListener("click",(e)=> {
    if(e.target.className==="Chicked") {
        console.log(e.target.parentElement.parentElement);
        e.target.parentElement.parentElement.classList.toggle("done");
        togglrchecked(e.target.parentElement.parentElement.getAttribute("data-id"));
        if(e.target.parentElement.parentElement.classList.contains("done")) {
            sound.play();
        }
    }
});
function addTaskToArry(TaskText) {
    const task={
        id:Date.now(),
        title:TaskText,
        completed:false,
    };
    //push arry
    arryOfTask.push(task);
    // add page
    addElementToPage(arryOfTask);
    //add local storage
    addTaskTolocalStorage(arryOfTask);
    getlocalStorageTopage(arryOfTask);
}
function addElementToPage(arryOfTask) {
    //empty
    tsk.innerHTML="";
    // if(document.forms[0].nextElementSibling.className==="list"){
    //     let s=document.querySelectorAll(".list")
    //     for(let i=0; i<s.length;i++) {
    //         s[i].remove();
    //     }
    //     console.log("dola")
    // }
    // console.log(document.scripts[2].nextElementSibling)
    //arry page
    arryOfTask.forEach((adel) => {
        let div =document.createElement("div");
        div.className="list";
        if(adel.completed) {
            div.className="list done";
        }
        let div2 =document.createElement("div");
        div2.className="click";
        let span1 =document.createElement("span");
        span1.className="Chicked";
        span1.appendChild(document.createTextNode("Chicked"));
        let span2 =document.createElement("span");
        span2.className="Delete";
        span2.appendChild(document.createTextNode("Delete"));
        div2.appendChild(span1);
        div2.appendChild(span2);
        div.appendChild(document.createTextNode(adel.title));
        div.appendChild(div2);
        div.setAttribute("data-id",adel.id);
        tsk.appendChild(div);
        document.body.appendChild(tsk)
    })
}; 
function addTaskTolocalStorage(arryOfTask){
    window.localStorage.setItem("tasks",JSON.stringify(arryOfTask));
};
function getlocalStorageTopage() {
    let ate = localStorage.getItem("tasks");
    if(ate) {
        let tsek= JSON.parse(ate);
        addElementToPage(tsek);
    }
};
function removelocalStorag( teskid) {
    arryOfTask = arryOfTask.filter((task)=> task.id != teskid);
    window.localStorage.setItem("tasks",JSON.stringify(arryOfTask));
};
function togglrchecked(taskid) {
    for(let i=0;i< arryOfTask.length;i++) {
        if(taskid==arryOfTask[i].id) {
            arryOfTask[i].completed==false ? (arryOfTask[i].completed=true) : (arryOfTask[i].completed= false);
        }
    };
    addTaskTolocalStorage(arryOfTask);

};
//رساله
let mydiv= document.createElement("div");
mydiv.className="dola";
let myh2 = document.createElement("h2");
let myp = document.createElement("p");
let btn = document.createElement("button");
let span8=document.createElement("span"); 
//h2
let texth2 =document.createTextNode("website to do");
myh2.appendChild(texth2);
//span
span8.appendChild(document.createTextNode(`انجز مهامك اليوم ولا تتركها  غدا `));
span8.className="q"
//p
let textp =document.createTextNode(`Welcome to website dola`);
myp.appendChild(textp);
//btn
let textbtn =document.createTextNode("X");
btn.appendChild(textbtn);
//div
mydiv.appendChild(myh2);
mydiv.appendChild(myp);
mydiv.appendChild(span8);
mydiv.appendChild(btn);
document.body.appendChild(mydiv);
let times = setTimeout(s,1500);
function s() {
    mydiv.style.opacity="1";
    mydiv.style.transform="translate( -50% , -50%) scale(1)";
    tsk.style.opacity="0.5";
    submat.style.opacity="0.5";
    text.style.opacity="0.5";
    console.log("dola")
};
btn.onclick = function() {
    mydiv.style.opacity="0";
    mydiv.style.transform="translate( -50% , -50%) scale(0)";
    submat.style.opacity="1";
    text.style.opacity="1";
    tsk.style.opacity="1";
    setTimeout(function() {
        mydiv.remove()
    },1000);
};
let up=document.querySelector(".up");
up.onclick=function() {
    window.scrollTo( {
        left:0,
        top:0,
        behavior:"smooth",
    });
}
window.onscroll=function(e) {
    if(window.scrollY>=100) {
        up.style.display="block";
        up.style.opacity="1";
    }
    else {
        up.style.display="none";
    }
}
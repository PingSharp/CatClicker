var Cat = function(){
    this.name = "Tom";
    this.image = "image/cat.jpg";
    this.beClickedTimes = 0;
    this.imgAttribution = "https://www.flickr.com/photos/poplinre/625069434/in/photostream/"
}
cat2 = new Cat();
cat2.image = "image/cat2.jpg";
cat2.name =  "Ben";
cat2.imgAttribution = "https://www.flickr.com/photos/chewie/2290467335";
let cat1 = new Cat();
let cat3 = new Cat();
cat3.name = "felixAndOrange";
cat3.image = "image/cat3.jpg";
cat3.imgAttribution = "https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454";
let cat4 = new Cat();
cat4.name = "Ruffy";
cat4.image = "image/bullet_cat.jpg";
cat4.imgAttribution = "http://i0.kym-cdn.com/entries/icons/original/000/002/232/bullet_cat.jpg";
let cat5 = new Cat();
cat5.name = "Lime";
cat5.image = "image/lime-cat.jpg";
cat5.imgAttribution="http://i0.kym-cdn.com/photos/images/facebook/000/012/445/lime-cat.jpg";
var model = {
 
catArray : [cat1,cat2,cat3,cat4,cat5],

currentCat : null
}
var Controller ={
    init: function(){
        View.init();
        model.currentCat = cat1;
    },
    getAllCats: function(){
        return model.catArray;
    },
    ChangeCatDiv: function(){
        let target = event.target;
        let id = (target.id).slice(6);
        let selector = "#CatDiv"+id;
        model.currentCat = model.catArray[id-1];
        View.picRender(selector);
          
    },
    clickCount: function(){
        let target = event.target;
        let id = target.parentElement.id;
        let selector = "#"+id+" ."+"counter";
        let catNumber = id.slice(6);
        let clickedTime = ++model.catArray[catNumber-1].beClickedTimes;
        View.counterRender(selector,clickedTime);    
    },
    adminClick: function(){
        View.adminRender();
    },
    getCurrentCat: function(){
        return model.currentCat;
    },
    adminSaveClick: function(name,url,clicks){
       model.currentCat.name = name;
       model.currentCat.url = url;
       model.currentCat.beClickedTimes = clicks;
    }
    }


var View = {
    picRender: function(selector){
        let currDiv = document.querySelector(".show");
        currDiv.classList.remove("show");
        currDiv.classList.add("hidden");
        let catDiv = document.querySelector(selector);
        catDiv.classList.remove("hidden");
        catDiv.classList.add("show");
    },
    counterRender: function(selector,counter){
        let timeCount = document.querySelector(selector);
        timeCount.innerHTML = counter+"times";  
    },
    adminRender: function(){
        let currCat = Controller.getCurrentCat();
        let catArray = Controller.getAllCats();
        let adminForm = document.querySelector(".adminForm");
        adminForm.classList.remove("hidden");
        adminForm.classList.add("show");
        let nameInput = document.querySelector("#nameInput");
        nameInput.value = currCat.name;
        let urlInput = document.querySelector("#urlInput");
        urlInput.value = currCat.imgAttribution;
        let clickInput = document.querySelector("#clickInput");
        clickInput.value = currCat.beClickedTimes;
        let cancelButton = document.querySelector("#cancelButton");
        cancelButton.addEventListener("click",function(){
            adminForm.classList.remove("show");
            adminForm.classList.add("hidden");
        })
        let saveButton = document.querySelector("#saveButton");
        saveButton.addEventListener("click",function(){Controller.adminSaveClick(nameInput.value,urlInput.value,clickInput.value);
            adminForm.classList.remove("show");
            adminForm.classList.add("hidden");
            let currCat = Controller.getCurrentCat();
           let button = document.querySelector("#button"+(catArray.indexOf(currCat)+1));
           button.innerText = nameInput.value;
           let counter = document.querySelector("#CatDiv"+(catArray.indexOf(currCat)+1)+" .counter");
           counter.innerText = clickInput.value + "times";
           let para = document.querySelector("#CatDiv"+(catArray.indexOf(currCat)+1)+" p");
           para.innerText = "You have clicked "+nameInput.value +" : ";
           
        })
    },
    init: function(){
        let container = document.querySelector(".container");
        let cats = Controller.getAllCats();
        for(var i = 0;i < cats.length;i++){
            let button = document.createElement("button");
            button.innerText = cats[i].name;
            button.style.marginLeft = "10px";
            button.id = "button"+(i+1);
            container.appendChild(button);
            button.addEventListener("click",Controller.ChangeCatDiv);
        }
        for(var j = 0;j < cats.length;j++){
            let catDiv = document.createElement("div");
            catDiv.id = "CatDiv"+(j+1);
            let CatImage = document.createElement("img");
            CatImage.src = cats[j].image;
            let para = document.createElement("p");
            para.innerText = "You have clicked "+ cats[j].name +" : ";
            let catClicks = document.createElement("span");
            catClicks.className = "counter";
            catClicks.innerText = 0;
            catClicks.style.display = "block";
            catDiv.appendChild(para);
            catDiv.appendChild(catClicks);
            catDiv.appendChild(CatImage);
            container.appendChild(catDiv);
            catDiv.addEventListener("click",Controller.clickCount);
            if(j===0){
                catDiv.className = "show";
            }
            else{
                catDiv.className = "hidden";
            }
        } 
        let adminForm = document.querySelector(".adminForm");
        adminForm.classList.add("hidden");
        let adminButton = document.querySelector("#adminButton");
        adminButton.addEventListener("click",Controller.adminClick);   
    }
}
// let container = document.querySelector(".container");
// for(var i = 0;i < catArray.length;i++){
//     let catImage = document.createElement("img");
//     catImage.src = catArray[i].image;
//     catImage.className = "cat";
//     let figure = document.createElement("figure");
//     figure.appendChild(catImage);
//     container.appendChild(figure);
//     let describe = document.createElement("figcaption");
//     figure.appendChild(describe);
//     let timeSpan = document.createElement("span");
//     describe.innerHTML= "You have clicked "+ catArray[i].name +" : ";
//     describe.appendChild(timeSpan);
//     timeSpan.id = "cat"+i;
//     catImage.addEventListener("click",(function(copy){
//         return function(){
//             clickCount(copy)
//         }
//     })(i));
// }
// let allDescribe = document.querySelectorAll(".describe");
// let catPic = document.querySelectorAll(".cat");


Controller.init();

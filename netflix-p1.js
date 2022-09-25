const tabItems = document.querySelectorAll('.tab-item');
const tabContentItems = document.querySelectorAll('.tab-content-item');



//Remove the border
function removeBorder() {
    tabItems.forEach(item => item.classList.remove('tab-border'));
}
function removeShow() {
    tabContentItems.forEach(item => item.classList.remove('show'));
}



// Seelct tab content item
function selectItem(e) {

    removeBorder();
    removeShow();
    //add border to current tab
    console.log(e);
    this.classList.add('tab-border');
    //grab content item from DOM
    console.log(this.id);
    const tabContentItem = document.querySelector(`#${this.id}-content`);
    //add show class
    tabContentItem.classList.add('show');
}



//listen for tab click
for (let item of tabItems) {
    item.addEventListener('click', selectItem);
}
//tabItems.forEach(item => item.addEventListener('click', selectItem));



//signIn page

const input=document.querySelectorAll('form .user-data');

function select(evt) {
this.classList.toggle('border-bottom');
console.log(this.id);
evt.preventDefault();
}

//listen for input section click
input.forEach(item => item.addEventListener('click',select) );

//control of input
function CheckPassword(inputTxt) 
{ 
if(inputTxt.value.length<4 || inputTxt.value.length>40){
const newp=document.createElement("p");
const newContent=document.createTextNode("Your password must contain between 4 and 40 characters");
newp.appendChild(newContent);
newp.style.fontSize='8px';
newp.style.color='choclate';
inputTxt.after(newp);
return false;
}
else{
    newp.style.display='none';
    return true;
}
}


//input[1].addEventListener('click', CheckPassword(input[1]) );
/*input[1].addEventListener('keyup', evt => {
    //evt.preventDefault();
    if(evt.code==="Enter" &&  CheckPassword(input[1])===false ){
        alert("Error");
    }
})*/






 
 
//try for 30 days 
const header=document.querySelector('showcase .showcase-content');
const button=document.querySelector('.showcase .showcase-content .btn');
const inputNav=document.querySelector( '.showcase-content .navbar.navbar-light');



function addElement (ele) {
    // create a new paragraph element
    const newp = document.createElement("p");
  
    // and give it some content
    const newContent = document.createTextNode("search for a TV show");
  
    // add the text node to the newly created paragraph and style it
    newp.appendChild(newContent);
    newp.style.fontSize='16px';
    newp.style.fontFamily='The Nautigal cursive';
    newp.style.color='#FFA785';
  
    // add the newly created element and its content into the DOM
    ele.appendChild(newp);
  }

function showInputNav(evt) {
   //evt.preventDefault();
    button.style.display='none'; 
   inputNav.style.display='block';
   addElement(inputNav);

}




button.addEventListener('click',showInputNav);



//side-bar

const sideButton=document.querySelector('.showcase #SideBar .SidebarInner i ');
const sideBar=document.querySelector('.showcase #SideBar .SidebarOutter');
const sideBarContent=document.querySelector('.showcase #SideBar .SidebarOutter ul');
const customerDropDown=document.querySelector('#SideBar .SidebarOutter #toggledown #toggle');
const DropDown=document.querySelector('#SideBar .SidebarOutter .dropdown');
const body=document.querySelector('body .showcase');
//select all links inside of the parent lis
const text=document.querySelectorAll('.showcase #Sidebar .SidebarOutter > ul > li > a');

function showSideBar(evt) {
    //console.log(this);
    sideBar.classList.toggle('showSidebar');
    sideButton.classList.toggle('rotate');
   
}

function toggleDown(evt) {
 DropDown.classList.toggle('toggle');
}


sideButton.addEventListener('click',showSideBar);
customerDropDown.addEventListener('mouseover',toggleDown);


//get searched item
const searchSection=document.querySelector('.showcase .navbar form .form-control');
const showContainer=document.querySelector('#SideBar .SidebarOutter .showContainer ul');


const appendShow=(results , sideBar )=>{
    sideBar.classList.add('showSidebar');
    showContainer.innerHTML="";
results.forEach( result=>{
    const element = document.createElement("Li");
    element.innerText=result;
    element.classList.add('appendedShows');
    //element.setAttribute("class","appendedShows");
    showContainer.append(element);
    sideBarContent.style.display='none';
    showContainer.style.display='block';
    

})
}


const searchShow=async(query)=>{
    //console.log(this);
    try{
  const res=await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
  const results=res.data.map(element => element.show.name) ;
  console.log(results);
  let firstShows=results.slice(0,4);
  appendShow(firstShows,sideBar);
  
    }catch(e){
        alert('Error',e);
    }
}



let searchTimeoutToken=0;

window.onload =() =>{
    
    searchSection.addEventListener('keyup', (evt,sideBarContent,showContainer) => {
       
        clearTimeout(searchTimeoutToken);
        if(searchSection.value.trim().length===0){
            //console.log(this);
           showContainer.innerHTML="";
            sideBarContent.style.display='block';
            return;
        }
        searchTimeoutToken=setTimeout( () =>{
            searchShow(searchSection.value);
        },250); 
    } )
   
}

//ul not showing up
//sidebarContent and showContainer are undefined in function scope
//remove everyhting when initiliasing input and return siebar content
//style the newly added lis


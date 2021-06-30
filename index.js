const taskContainer=document.querySelector(".task__container");          // to directly access the cards instead of array format 

// Global Store 
let globalStore =[];      


const newCard = ({id,imageUrl,taskTitle,taskType,taskDescription})=>    // destructuring the object made i.e taskData


// Dynamically designing the same card for reusability

`<div class="col-md-6 col-lg-4"id=${id}>  
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2"> 
    <button type="button" id=${id} class="btn btn-outline-success"><i class="fas fa-pencil-alt" id=${id} onclick="editCard.apply(this,arguments)"></i></button>
    <button type="button" class="btn btn-outline-danger" id=${id} onclick="deleteCard.apply(this,arguments)"><i class="fas fa-trash-alt"id=${id} onclick="deleteCard.apply(this,arguments)"></i></button>
  </div>
  <img src= ${imageUrl} class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${taskTitle}</h5>
    <p class="card-text">${taskDescription}</p>
     <span class="badge bg-primary">${taskType}</span>
  </div>
  <div class="card-footer text-muted"> 
    <button type="button" id=${id} class="btn btn-outline-primary float-end">Open Task</button> 
    <!-- if there is one component to shift use float instead of justify content-->
  </div>
</div>
</div>`;


const loadInitialTaskCards= () =>
{
//access local storage 

const getInitialData = localStorage.tasky;

if(!getInitialData) return ;                                       // if device dosen't see any item as id : tasky return null or just teturn (fixing a potential bug)

// convert stringified object to object

const {cards}=JSON.parse(getInitialData);                         // {cards} means we have destructured it as well

//map around the array to generate HTML card and inject it to DOM

cards.map((cardObject)=>                                         // basically used for looping in array .. we are doing for each card
{
  const createNewCard=newCard(cardObject);
  taskContainer.insertAdjacentHTML("beforeend",createNewCard);
  globalStore.push(cardObject);
});

};



const updateLocalStorage= () =>
{
  localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));    // key, the data to store . here we shouldn't give array directly so create object than give array in it. stringify converts all the data in string form so local storage can store it 
};


const saveChanges = () =>
{
  const taskData =
  {
      id: `${Date.now()}`,                                              // This will return unique number for card id everytime. It will behave as card id
      imageUrl:document.getElementById("imageurl").value,               //parent object of browser->window & parent object of html -> document (whenever we want to Access html document)
      taskTitle:document.getElementById("tasktitle").value,
      taskType:document.getElementById("tasktype").value, 
      taskDescription:document.getElementById("taskdescription").value,
      
  };



  const createNewCard=newCard(taskData);
  taskContainer.insertAdjacentHTML("beforeend",createNewCard);
  globalStore.push(taskData);


  /* Application programming interface (API) :
  
  Here we have to use local storage as application and we want to program it to save or add the new data by using the interface So we have to call the local storage API 
  So the interface will be : */

  // add to local storage 

  updateLocalStorage();        
  console.log(globalStore);
 
};

const deleteCard =(event) => {
  //id 

  event=window.event;                                                            // assigning browser event to this event 
  const targetId =event.target.id;                                               // storing the id of the target 
  const tagname = event.target.tagName;                                          //BUTTON
  console.log(targetId);

  //search the globalStore, remove the object which matches the id 

  globalStore= globalStore.filter((cardObject)=>cardObject.id !=targetId);
  
  updateLocalStorage();


  //we have to access DOM to remove them

  if(tagname==="BUTTON")
  {
      return taskContainer.removeChild(                                                  // go to task container 
      event.target.parentNode.parentNode.parentNode                                      // telling it to delete this child
    );
  }
    // else for the icon: one step extra

     return taskContainer.removeChild(                                                  // go to task container 
    event.target.parentNode.parentNode.parentNode.parentNode                            // telling it to delete this child
  );
};



// Features



// Edit the card


const editCard=(event)=>
{
  event = window.event;
  // id
  const targetID = event.target.id;
  const tagname = event.target.tagName; // BUTTON

  let parentElement;
  if(tagname==="BUTTON")
  {
    parentElement=event.target.parentNode.parentNode;

  }else{
    parentElement=event.target.parentNode.parentNode.parentNode;
  }

   let taskTitle=parentElement.childNodes[5].childNodes[1];
   let taskDescription=parentElement.childNodes[5].childNodes[3];
   let taskType=parentElement.childNodes[5].childNodes[5];
   let submitButton=parentElement.childNodes[7].childNodes[1];

    taskTitle.setAttribute("contenteditable","true");
    taskDescription.setAttribute("contenteditable","true");
    taskType.setAttribute("contenteditable","true");
    submitButton.setAttribute("onclick","saveEditChanges.apply(this,arguments)");
    submitButton.innerHTML="Save Changes";
};

const saveEditChanges=(event)=>
{
  event = window.event;
  // id
  const targetId = event.target.id;
  const tagname = event.target.tagName; // BUTTON

  let parentElement;
  if(tagname==="BUTTON")
  {
    parentElement=event.target.parentNode.parentNode;

  }else{
    parentElement=event.target.parentNode.parentNode.parentNode;
  } 
  let taskTitle=parentElement.childNodes[5].childNodes[1];
  let taskDescription=parentElement.childNodes[5].childNodes[3];
  let taskType=parentElement.childNodes[5].childNodes[5];
  let submitButton=parentElement.childNodes[7].childNodes[1];



 const updatedData={
   taskTitle:taskTitle.innerHTML,
   taskDescription:taskDescription.innerHTML,
   taskType:taskType.innerHTML,
 };
   globalStore=globalStore.map((task)=>{
    if(task.id===targetId)
    {
      return {

      id: task.id,    
      imageUrl:task.imageUrl,
      taskTitle:updatedData.taskTitle,
      taskType: updatedData.taskType,
      taskDescription:updatedData.taskDescription,
      }
    }
    return task;
   });

   updateLocalStorage();

   taskTitle.setAttribute("contenteditable","false");
    taskDescription.setAttribute("contenteditable","false");
    taskType.setAttribute("contenteditable","false");
    submitButton.removeAttribute("onclick");
    submitButton.innerHTML="Open Task";
};
const taskContainer=document.querySelector(".task__container"); // to directly access the cards instead of array format 

// Global Store 
const globalStore =[]; // for issue 2 (cards deleted on refreshing) -> resolving by storing cards in local storage 


const newCard = ({id,imageUrl,taskTitle,taskType,taskDescription})=>    // destructuring the object made i.e taskData

// Dynamically designing the same card for reusability
`<div class="col-md-6 col-lg-4"id=${id}>  
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2"> 
    <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
    <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button>
  </div>
  <img src= ${imageUrl} class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${taskTitle}</h5>
    <p class="card-text">${taskDescription}</p>
     <span class="badge bg-primary">${taskType}</span>
  </div>
  <div class="card-footer text-muted"> 
    <button type="button" class="btn btn-outline-primary float-end">Open Task</button> 
    <!-- if there is one component to shift use float instead of justify content-->
  </div>
</div>

</div>`;


const loadInitialTaskCards= () =>{

//access local storage 

const getInitialData = localStorage.getItem("tasky");

if(!getInitialData) return ;   // if device dosen't see any item as id : tasky return null or just teturn (fixing a potential bug)

// convert stringified object to object

const {cards}=JSON.parse(getInitialData);  // {cards} means we have destructured it as well

// map around the array to generate HTML card and inject it to DOM

cards.map((cardObject)=>                // basically used for looping in array .. we are doing for each card
{
  const createNewCard=newCard(cardObject);
  taskContainer.insertAdjacentHTML("beforeend",createNewCard);
  globalStore.push(cardObject);
});

};


const saveChanges = () =>
{
  const taskData =
  {
      id: `${Date.now()}`,               // This will return unique number for card id everytime. It will behave as card id
      imageUrl:document.getElementById("imageurl").value, //parent object of browser->window & parent object of html -> document (whenever we want to Access html document)
      taskTitle:document.getElementById("tasktitle").value,
      taskType:document.getElementById("tasktype").value, 
      taskDescription:document.getElementById("taskdescription").value,
      
  };

  const createNewCard=newCard(taskData);
  taskContainer.insertAdjacentHTML("beforeend",createNewCard);
  globalStore.push(taskData);

  // Application programming interface (API) :
  //Here we have to use local storage as application and we want to program it to save or add the new data by using the interface 
  //So we have to call the local storage API 
  // So the interface will be :

  // add to local storage 
  localStorage.setItem("tasky",JSON.stringify({cards:globalStore})); // key, the data to store . here we shouldn't give 
 //array directly so create object than give array in it. stringify converts all the data in string form so local storage can store it 
  console.log(globalStore);
 
};

/* Issues */

// 1) The modal was not closing upon adding new card                      -> Resolved 
// 2) The cards were deleted after refresh -> Local storage (5MB)

// Features 
// 1) Delete modal feature
// 2) Open Task
// 3) Edit Task 



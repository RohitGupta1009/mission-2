const taskContainer=document.querySelector(".task__container"); // to directly access the cards instead of array format 



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

</div>`




const saveChanges = () =>
{
  const taskData =
  {
      id: `${Date.now}`,               // This will return unique number for card id everytime. It will behave as card id
      imageUrl:document.getElementById("imageurl").value, //parent object of browser->window & parent object of html -> document (whenever we want to Access html document)
      taskTitle:document.getElementById("tasktitle").value,
      taskType:document.getElementById("tasktype").value, 
      taskDescription:document.getElementById("taskdescription").value,
      
  };

  const createNewCard=newCard(taskData);
  taskContainer.insertAdjacentHTML("beforeend",createNewCard);
 
}
console.log(taskContainer);




const state = {
  taskList: [],
};

//Dom Manipluations
const taskModal = document.querySelector(".task__modal__body");
// Adding Preview Card
const taskContents = document.querySelector(".task__contents");
//Create a Card on home page
const htmlTaskContent = ({ id, title, description, type, url }) => `
    <div class='col-md-6 col-lg-4 mt-3' id=${id} key=${id}>
        <div class='card shadow-sm task__card'>
            <div class='card-heading d-flex gap-2 justify-content-end task__card__header'>
                <button type='button' class='btn btn-outline-info mr-2' name=${id} onclick="editTask.apply(this, arguments)">
                    <i class='fas fa-pencil-alt' name='${id}'></i> 
                </button>
                <button type='button' class='btn btn-outline-danger mr-2' name=${id} onclick="deleteTask.apply(this, arguments)">
                    <i class='fas fa-trash-alt' name='${id}'></i> 
                </button>
                 </div>
                <div class='card-body'>
                ${
                  url
                    ? `<img width='100%' height='150px' style="object-fit: cover; object-position: center" src=${url} alt='card image cap' class='card-image-top md-3 rounded-lg'/>`
                    : `<img width='100%' height='150px' style="object-fit; cover; object-position: center" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQb4GbT507HJD10Md8CAq_YCsvbkN3DbN95DlU_22K0Q&usqp=CAU&ec=48665698 " alt='card image cap' class='card-image-top md-3 rounded-lg'/>`
                }
                <h4 class='task__card__title'>${title}</h4>
                <p class='description trim-3-lines text-muted' data-gram_editor='false'> ${description}</p>
                <div class='tags text-white d-flex flex-wrap'>
                    <span class='badge bg-primary m-1'>${type}</span>
                </div>
                </div>
                <div class='card-footer'>
                <button type='button' class='btn btn-outline-primary float-right' data-bs-toggle='modal' data-bs-target='#ShowTask' id=${id} onclick='openTask.apply(this, arguments)'>Open Task</button>
                </div>
            </div>  
    </div>
    `;

// Dynamic CArds  in home page ui
const htmlmodalcontent = ({ id, title, description, url }) => {
  const date = new Date(parseInt(id));
  return `
    <div id=${id}>
    ${
      url
        ? `<img width='100%' src=${url} alt='card image here' class='img-fluid place__holder__image mb-3'/>`
        : `<img width='100%' height='150px' style="object-fit: cover; object-position: center" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQb4GbT507HJD10Md8CAq_YCsvbkN3DbN95DlU_22K0Q&usqp=CAU&ec=48665698" alt='card-image-top md-3 rounded-lg'/>`
    }
     <strong class="text-sm text-muted"> Craated on ${date.toDateString()}</strong>
    <h2 class="my-3"> ${title}</h2>
    <p class="lead"> ${description}</p>
     </div> `;
};

// Updating the Local Stroage -set items -browser storage
const updatelocalstorage = () => {
  localStorage.setItem(
    "task",
    JSON.stringify({
      tasks: state.taskList,
    })
  );
};

// get the data on ui from local storage -get items -browser storge
const loadinitialdata = () => {
  const localStorageCopy = JSON.parse(localStorage.task);

  if (localStorageCopy) state.taskList = localStorageCopy.tasks;

  state.taskList.map((cardDate) => {
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
  });
};

const handleSubmit = (event) => {
  const id = `${Date.now()}`;
  const input = {
    url: document.getElementById("imageurl").value,
    title: document.getElementById("tasktitle").value,
    type: document.getElementById("tasktype").value,
    description: document.getElementById("taskdis").value,
  };
  if (input.title === "" || input.type === "" || input.description === "") {
    return alert("Please Fill All the Fields");
  }
  taskContents.insertAdjacentHTML(
    "beforeend",
    htmlTaskContent({
      ...input,
      id,
    })
  );

  //Updating tasklist
  state.taskList.push({ ...input, id });

  //Updating the localstorage too
  updatelocalstorage();
};
// From this All the Parts of the Program is Consider esay Compare to the above Js Part
const openTask = (e) => {
  //Pop up the current One
  if (!e) e = window.event;

  //finding the id of the Current Card
  const getTask = state.taskList.find(({ id }) => id === e.target.id);
  taskModal.innerHTML = htmlmodalcontent(getTask);
};

const deleteTask = (e) => {
  if (!e) e = window.event; // e is a contion if e is found do nothing

  const targetID = e.target.getAttribute("name");
  const type = e.target.tagName;
  const removeTask = state.taskList.filter(({ id }) => id !== targetID);

  state.taskList = removeTask; // Upadting the tasklist Array
  updatelocalstorage(); // upadating The Locoal Storage

  if (type === "Button") {
    //  Targeting or Selecting the Edit Button And Font Awesome Icon as <i>
    return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode
    );
  }
  //  Targeting or Selecting the Font Awesome Icon as <i>
  return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
    e.target.parentNode.parentNode.parentNode.parentNode
  );
};

  const editTask = (e) => { 
  if (!e) e = window.event; // e is a contion if e is found do nothing

  const targetID = e.target.id; // targeting the id
  const type = e.target.tagName; // targeting the name

  let parentNode;
  let taskList;
  let taskdis; // theere should be an error form two lines
  let tasktype;
  let submitButton;

  //  Targeting or Selecting the Edit Button And Font Awesome Icon as <i>
  if (type === "BUTTON") {
    parentNode = e.target.parentNode.parentNode;
  } else {
    parentNode = e.target.parentNode.parentNode.parentNode;
  }

  //Accessing the Address of the text Box to Edit
  tasktitle = parentNode.childNodes[3].childNodes[3];
  taskdis = parentNode.childNodes[3].childNodes[5];
  tasktype = parentNode.childNodes[3].childNodes[7];
  submitButton = parentNode.childNodes[5].childNodes[1];
    
  // Makes Editable one
  tasktitle.setAttribute("contenteditable", "true");
  taskdis.setAttribute("contenteditable", "true");
  tasktype.setAttribute("contenteditable", "true");

  //needs to be implemented
  submitButton.setAttribute("onclick", "saveEdit.apply(this,arguments)");
  submitButton.removeAttribute("data-bs-toggle"); // removing the open task modal and change into saves changes button
  submitButton.removeAttribute("data-bs-target"); // same as above comments
  submitButton.innerHTML = "Save Changes"; // innerHTML already the button content open task change to save changes button like javascpit to Html
};


const saveEdit = (e) => {
  if (!e) e = window.event; // See the Above same lines to understand this concept

  const targetID = e.target.id; // same here
  const parentNode = e.target.parentNode.parentNode; // targetting the Parentnode as a variable

  //Storing as a Variable
  const tasktitle = parentNode.childNodes[3].childNodes[3];
  const taskdis = parentNode.childNodes[3].childNodes[5];
  const tasktype = parentNode.childNodes[3].childNodes[7];
  const submitButton = parentNode.childNodes[5].childNodes[1];

  // After Editing the Text should be show in ui As well so this
  const updatedData = {
    tasktitle: tasktitle.innerHTML,
    taskdis: taskdis.innerHTML,
    tasktype: tasktype.innerHTML,
  };

  // After Showing UI Save in taskList Array also
  let stateCopy = state.taskList;
  stateCopy = stateCopy.map(
    (task) =>
      task.id === targetID
        ? //then Do this One
          {
            id: task.id,
            title: updatedData.tasktitle,
            description: updatedData.taskdis,
            type: updatedData.taskdis,
            url: task.url,
          }
        : task // else print the task that already present in the storgae
  );

  state.taskList = stateCopy;
  updatelocalstorage();
  console.log(submitButton);

  //After Saving the content in Saves Changes the Open Task (Main Button) will show again so this
  tasktitle.setAttribute("contenteditable", "false");
  taskdis.setAttribute("contenteditable", "false");
  tasktype.setAttribute("contenteditable", "false");
  

  // To run the  Open Task Button Event onclickk is used
  submitButton.setAttribute("onclick", "openTask.apply(this,arguments)");
  submitButton.setAttribute("data-bs-toggle", "modal");
  submitButton.setAttribute("data-bs-target", "#showTask");
  submitButton.innerHTML = "Open Task"
};

const searchTask = (e) => {
  if (!e) e = window.event;

  while (taskContents.firstChild) {
    taskContents.removeChild(taskContents.firstChild);
  }
  const resultData = state.taskList.filter(({ title }) =>
    title.toLowerCase().includes(e.target.value.toLowerCase())
  );

  resultData.map((cardData) =>
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardData))
    );
  };
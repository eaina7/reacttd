"use strict";

let idCounter = 0;
window.addEventListener(
  "drop",
  (e) => {
    e.preventDefault();
  },
  false
);
class ToDoList {
  constructor() {
    this._list = [];
  }

  // find index of Element with given ID
  indexOfElement(id) {
    for (let i = 0; i < this._list.length; i++) {
      if (id === this._list[i].getId()) {
        return i;
      }
    }
  }

  addElement(title) {
    this._list.push(
      new TodoListElement(
        title,
        (id) => this.deleteElement(id),
        (id, newTitle) => this.editElement(id, newTitle),
        (dragId, dropId) => this.moveElement(dragId, dropId)
      )
    );
    this.renderElements();
  }
  deleteElement(id) {
    // console.log(this);
    const index = this.indexOfElement(id); //find index from List 
    this._list.splice(index, 1); //delete element from List

    this.renderElements();
  }
  editElement(id, newTitle) {
    const element = this._list[this.indexOfElement(id)];
    element.setTitle(newTitle);
    this.renderElements();
  }
  moveElement(dragId, dropId) {
    const dragIndex = this.indexOfElement(dragId);
    const dropIndex = this.indexOfElement(dropId);
    const element = this._list.splice(dragIndex, 1)[0];
    this._list.splice(dropIndex,0,element);
    this.renderElements();

  }
  renderElements() {
    const toDoList = document.getElementById("task-list");
    //delete all childs
    toDoList.innerHTML = "";
    //render every individual element
    for (let i = 0; i < this._list.length; i++) {
      toDoList.prepend(this._list[i].render());
    }
  }
}

class TodoListElement {
  constructor(title, deleteHandler, editHandler, dropHandler) {
    this._id = "li-" + idCounter++;
    this._title = title;
    this._deleteHandler = deleteHandler;
    this._editHandler = editHandler;
    this._dropHandler = dropHandler;
    this._checked = false;
    this._isInEditMode = false;
  }

  // -----------------------------------------------
  // getters/setters

  isChecked() {
    return this._checked;
  }
  setChecked(checked) {
    this._checked = checked;
  }
  getTitle() {
    return this._title;
  }
  setTitle(title) {
    this._title = title;
  }
  getId() {
    return this._id;
  }

  // -----------------------------------------------
  // drag and drop functionality

  makeDragable(element) {
    element.draggable = "true";
    element.addEventListener("dragstart", (ev) => {
      ev.dataTransfer.setData("text", element.id);
      element.style.opacity = ".75";
    });
    element.addEventListener("dragend", (ev) => {
      element.style.opacity = "1";
    });
  }
  makeDropable(element) {
    element.addEventListener("dragover", (ev) => {
      ev.preventDefault();
      ev.dataTransfer.dropEffect = "move";
    });
    element.addEventListener("drop", (ev) => {
      let draggedEl = document.getElementById(ev.dataTransfer.getData("text"));
      this._dropHandler(draggedEl.id, element.id);
    });
  }

  // -----------------------------------------------
  // element rendering

  render() {
    const htmlElement = document.createElement("LI");
    htmlElement.id = this._id;

    if (this._checked) {
      htmlElement.classList.add("checked");
    }

    //create input span node
    const inputSpan = document.createElement("INPUT");
    inputSpan.className = "text";
    inputSpan.value = this._title;



  // addEvent-Listener to find out if the return-Key is beeing used on a editable list-Element 
  inputSpan.addEventListener("keydown", (keyInfo) => {
    // console.log('keyInfo: ' + keyInfo);
    // stop editing if the Enter-Key is pressed
    if (keyInfo.keyCode == 13) {
      // console.log('the Return-Key on the Keyboard has the keydown-Number: 13!'); 
      this._editHandler(this._id, inputSpan.value); 
    }
  });
  
    //create confirm button
    const confirmSpan = document.createElement("SPAN");
    confirmSpan.className = "bttn confirm";
    confirmSpan.addEventListener("click", () => {
      if (inputSpan.value.replace(/\s/g, "") == "") {
        alert("task can't be empty");
      } else {
        this._editHandler(this._id, inputSpan.value);
      }
    });

    //create abort button
    const abortSpan = document.createElement("SPAN");
    abortSpan.className = "bttn abort";
    // on CLick switch normal controls with edit controls
    abortSpan.addEventListener("click", () => {
      inputSpan.remove();
      confirmSpan.remove();
      abortSpan.remove();

      htmlElement.appendChild(textSpan);
      htmlElement.appendChild(editSpan);
      htmlElement.appendChild(deleteSpan);
    });

    //create text span node
    const textSpan = document.createElement("SPAN");
    textSpan.className = "text";
    textSpan.appendChild(document.createTextNode(this._title));
    //add checked event listener to li element
    textSpan.addEventListener("click", (ev) => {
      htmlElement.classList.toggle("checked");
      this._checked = !this._checked;
    });
    htmlElement.appendChild(textSpan);

    //create edit button
    const editSpan = document.createElement("SPAN");
    editSpan.className = "bttn edit";
    htmlElement.appendChild(editSpan);
    editSpan.addEventListener("click", () => {
      textSpan.remove();
      editSpan.remove();
      deleteSpan.remove();

      htmlElement.appendChild(inputSpan);
      inputSpan.focus();
      htmlElement.appendChild(confirmSpan);
      htmlElement.appendChild(abortSpan);
    });

    //create delete button
    const deleteSpan = document.createElement("SPAN"); //<span></span>
    deleteSpan.className = "bttn delete"; //<span class ="delete"></span>
    //generate delete button event listener
    deleteSpan.addEventListener("click", () => {
      this._deleteHandler(this._id);
    });
    //add delete button to element
    htmlElement.appendChild(deleteSpan);

    this.makeDragable(htmlElement);
    this.makeDropable(htmlElement);

    return htmlElement;
  }
}

// -----------------------------------------------
// element rendering

const todoList = new ToDoList();
todoList.addElement("Talk about our lord and savior Jesus Christ");
todoList.addElement("Deactivate addblocker");
todoList.addElement("Accept all cookies");
todoList.addElement("Take part in a survey");
todoList.addElement("Skip morning coffee");

//add button-listener
const addBttn = document.getElementById("add");

addBttn.addEventListener("click", (e) => {
  let name = document.querySelector("#task").value;
  e.preventDefault();
  if (name.replace(/\s/g, "") == "") {
    alert("Please enter a task");
  } else {
    todoList.addElement(name);
    document.querySelector("#task").value = "";
  }
});

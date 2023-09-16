let todosContainer = document.getElementById("todosContainer");

function saveTodo(){
    localStorage.setItem("todoList", JSON.stringify(todoList));
}
function getTodo(){
    let stringifiedData = localStorage.getItem('todoList');
    let parsedData = JSON.parse(stringifiedData);
    if (parsedData === null){
        return []
    }
    else{
        return parsedData

    }
}
todoList = getTodo();


let todoCount = todoList.length;
function addTodo(){
    let inputElement = document.getElementById("inputText");
    let inputValue = inputElement.value;
    if (inputValue === ""){
        alert('Please enter a value');
        return;
    }

    todoCount = todoCount +1;
    let newTodo = {
        text : inputValue,
        uniqueNo : todoCount,
        isChecked : false
    }
    todoList.push(newTodo);
    todoGenerator(newTodo)
    inputElement.value = "";

    
}
function onGetSelectedTodo(checkboxId,labelId,todoId){
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    let todoElement = document.getElementById(todoId);
    labelElement.classList.toggle("checked");

    let todoItemIndex = todoList.findIndex(function(eachTodo){
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId){
            return true; 
        }
        else{
            return false;
        }
    });
    let todoObject = todoList[todoItemIndex];
    if(todoObject.isChecked === true){
        todoObject.isChecked = false;
    }else{
        todoObject.isChecked = true;
    }    
}
function onDeleteTodo(todoId){
    let todoElement = document.getElementById(todoId);
    todosContainer.removeChild(todoElement);
    let dltTodoIndex = todoList.findIndex(function(eachTodo){
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId){
            return true; 
        }
        else{
            return false;
        }
    });    
    todoList.splice(dltTodoIndex, 1);
      
}

function todoGenerator(todo){
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId  = "label" + todo.uniqueNo ;


    let liEle = document.createElement("li");
    liEle.classList.add("liContainer");
    liEle.id = todoId;
    todosContainer.appendChild(liEle);


    let inputEle = document.createElement("input");
    inputEle.type = "checkbox"
    inputEle.id = "checkboxId";
    inputEle.checked = todo.isChecked;
    inputEle.onclick = function (){
        onGetSelectedTodo(checkboxId,labelId,todoId)
    }


    liEle.appendChild(inputEle);

    let labelContainerEle = document.createElement("label");
    labelContainerEle.setAttribute("for",checkboxId );  
    labelContainerEle.id = labelId;
    labelContainerEle.classList.add("label-Container")
    labelContainerEle.textContent = todo.text
    if (todo.isChecked === true){
        labelContainerEle.classList.add("checked");
    }
    liEle.appendChild(labelContainerEle);


    let dltContainer = document.createElement("div");
    dltContainer.classList.add("dltContainer");
    labelContainerEle.appendChild(dltContainer);

    let dltIcon = document.createElement("img");
    dltIcon.classList.add("w-5");
    dltIcon.classList.add("dltIcon");
    dltIcon.id = "dltIconId";
    dltIcon.onclick = function(){
        onDeleteTodo(todoId)
    }
    
    dltIcon.src = "/assets/deleteicon.svg";
    dltContainer.appendChild(dltIcon);
}

for(todo of todoList){
    todoGenerator(todo)

}
const rootElm = document.querySelector(".todo-container");
const input = document.querySelector("input");
const baseURL = `https://sleepy-falls-37563.herokuapp.com/api/todo`;


let isTrue = false;

function handleToggle(id, status) {
    let data = {
        todo: {
            isCompleted: !status,
        }
    }

    fetch(baseURL + `/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    }).then(() => main());
}


function displayUI(allTodos) {
        rootElm.innerHTML = "";
        allTodos.forEach((todo) => {
            let li = document.createElement("li");
            li.classList.add("flex", "flex-row", "items-center", "todo-items");

            let div = document.createElement("div");
            div.classList.add("title-container");

            let input = document.createElement("input");
            input.type = "checkbox";
            input.checked = todo.isCompleted;
            input.id = todo._id;
            input.addEventListener("click", () => {
             handleToggle(todo._id, todo.isCompleted);
            });

            let title = document.createElement("h3");
            title.classList.add("ml-6")
            title.innerText = todo.title;

            let editBtn = document.createElement("span");
            editBtn.classList.add("edit-Btn");
            editBtn.innerText= "Double Click to Edit";
            title.addEventListener("dblclick", (e) => {
                updateTodo(e, todo._id);
            });
            
            div.append(input, title, editBtn);
                
            let span = document.createElement("span");
            span.innerText = "❌";
            span.classList.add("ml-4", "block", "cursor-pointer");
            span.addEventListener("click", (e) => {
                deleteTodo(todo._id);
            })
            li.append(div, span);
            rootElm.append(li);
            
        })
        
    
}

function addTodo(event) {
    if(event.keyCode === 13 && event.target.value.trim()) {
        let data = {
            todo: {
                title: `${event.target.value}`,
                isCompleted: false
            }
        }
        
        event.target.value = "";
        fetch(baseURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(() => main());
        
    } 
    
}

function updateTodo(event, id) {
    var data = {todo:{}};
    let input = document.createElement("input");
    input.classList.add("update-input");
                let el = event.target;
                input.value = el.innerText;
                input.type = "text";
                let parent = el.parentElement;
                input.addEventListener("keydown", (e) => {
                    if(e.keyCode === 13 && e.target.value) {
                        let data = {
                            todo: {
                                title: `${e.target.value}`,
                            }
                        }
                        fetch(baseURL + `/${id}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data),
                        }).then(() => main());
                    }
                })
                 input.addEventListener("blur", (e) => {
                    let data = {
                        todo: {
                            title: `${e.target.value}`,
                        }
                    }
                    fetch(baseURL + `/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data),
                    }).then(() => main());
                 })   

                parent.replaceChild(input, el);
    

}

function deleteTodo(id) {
    fetch(baseURL + `/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
       
    }).then(() => main());
}


function main() {
    fetch(baseURL).then((res) => res.json())
    .then((data) => displayUI(data.todos));
}

input.addEventListener("keyup", addTodo);



main();
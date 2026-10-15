const todoList = document.getElementById("todoList");
const itemsLeft = document.getElementById("itemsLeft");


function renderTodos(todos){


    todoList.innerHTML = "";


    todos.forEach(todo => {


        const li = document.createElement("li");

            li.className = "todo-item";

            li.setAttribute("draggable", "true");



        if(todo.completed){

            li.classList.add("completed");

        }



        li.innerHTML = `

        <div class="todo-left">

            <span class="drag">
            ☰
            </span>


            <input
            type="checkbox"
            class="check"
            data-id="${todo.id}"
            ${todo.completed ? "checked":""}
            >

            <span class="todo-title">
                ${todo.title}
            </span>

        </div>


        <div class="actions">

            <button class="edit" data-id="${todo.id}">
                ✏
            </button>


            <button class="delete" data-id="${todo.id}">
                🗑
            </button>


        </div>

        `;


        todoList.appendChild(li);


    });


    updateCounter(todos);

}



function updateCounter(todos){

    const count = todos.filter(
        item => !item.completed
    ).length;


    itemsLeft.innerText =
    `${count} items left`;

}
let todos = getTodos();

let filter = "all";


const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");

const searchInput = document.getElementById("searchInput");

const filters = document.querySelectorAll(".filter");

const clearCompleted = document.getElementById("clearCompleted");



// نمایش اولیه
display();



function display(){

    let result = [...todos];


    // فیلتر وضعیت

    if(filter === "active"){

        result = result.filter(
            todo => !todo.completed
        );

    }


    if(filter === "completed"){

        result = result.filter(
            todo => todo.completed
        );

    }


    // سرچ

    const searchValue = searchInput.value.toLowerCase();


    if(searchValue){

        result = result.filter(todo =>
            todo.title.toLowerCase()
            .includes(searchValue)
        );

    }


    renderTodos(result);

}





// اضافه کردن Todo

addBtn.addEventListener("click",()=>{


    const title = todoInput.value.trim();


    if(title === "") return;



    const todo = {


        id: Date.now(),


        title:title,


        completed:false


    };



    todos.push(todo);



    saveTodos(todos);



    todoInput.value="";



    display();


});





// اضافه با Enter

todoInput.addEventListener("keydown",(e)=>{


    if(e.key==="Enter"){

        addBtn.click();

    }


});






// کلیک روی لیست

todoList.addEventListener("click",(e)=>{


    const id = Number(
        e.target.dataset.id
    );



    // حذف


    if(e.target.classList.contains("delete")){


        todos = todos.filter(
            todo => todo.id !== id
        );


    }





    // ویرایش


    if(e.target.classList.contains("edit")){


        const todo = todos.find(
            item => item.id === id
        );


        const newTitle = prompt(
            "Edit task:",
            todo.title
        );


        if(newTitle){

            todo.title = newTitle;

        }


    }





    // تیک زدن


    if(e.target.classList.contains("check")){


        const todo = todos.find(
            item => item.id === id
        );


        todo.completed =
        e.target.checked;


    }



    saveTodos(todos);


    display();


});







// تغییر فیلتر


filters.forEach(btn=>{


    btn.addEventListener("click",()=>{


        filters.forEach(b=>
            b.classList.remove("active")
        );


        btn.classList.add("active");


        filter = btn.dataset.filter;


        display();


    });


});






// سرچ


searchInput.addEventListener("input",()=>{


    display();


});







// پاک کردن انجام شده‌ها


clearCompleted.addEventListener("click",()=>{


    todos = todos.filter(
        todo => !todo.completed
    );


    saveTodos(todos);


    display();


});

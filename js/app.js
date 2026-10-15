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


    const item =
    e.target.closest(".todo-item");


    item.classList.add("removing");


    setTimeout(()=>{


        todos = todos.filter(
            todo => todo.id !== id
        );


        saveTodos(todos);


        display();


    },400);



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
let draggedItem = null;

todoList.addEventListener("dragstart", (e) => {

    const item = e.target.closest(".todo-item");

    if (!item) return;

    draggedItem = item;

    item.classList.add("dragging");

});

todoList.addEventListener("dragend", (e) => {

    const item = e.target.closest(".todo-item");

    if (item) {
        item.classList.remove("dragging");
    }

    const newOrder = [
        ...todoList.querySelectorAll(".todo-item")
    ].map(item => Number(item.querySelector(".check").dataset.id));

    todos.sort((a, b) =>
        newOrder.indexOf(a.id) - newOrder.indexOf(b.id)
    );

    saveTodos(todos);

});

todoList.addEventListener("dragover", (e) => {

    e.preventDefault();

    const afterElement = getDragAfterElement(todoList, e.clientY);

    if (afterElement == null) {

        todoList.appendChild(draggedItem);

    } else {

        todoList.insertBefore(draggedItem, afterElement);

    }

});

function getDragAfterElement(container, y) {

    const elements = [
        ...container.querySelectorAll(".todo-item:not(.dragging)")
    ];

    return elements.reduce((closest, child) => {

        const box = child.getBoundingClientRect();

        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {

            return {
                offset,
                element: child
            };

        }

        return closest;

    }, {
        offset: Number.NEGATIVE_INFINITY
    }).element;

}
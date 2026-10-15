const STORAGE_KEY = "todo_items";


// گرفتن اطلاعات از LocalStorage
function getTodos() {

    const todos = localStorage.getItem(STORAGE_KEY);

    if (todos) {

        return JSON.parse(todos);

    }

    return [];

}



// ذخیره کردن اطلاعات داخل LocalStorage
function saveTodos(todos) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(todos)
    );

}



// پاک کردن کامل اطلاعات
function clearTodosStorage() {

    localStorage.removeItem(STORAGE_KEY);

}

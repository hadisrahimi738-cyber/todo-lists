const themeBtn = document.getElementById("themeBtn");


// گرفتن تم ذخیره شده
const savedTheme = localStorage.getItem("theme");


if(savedTheme === "dark"){

    document.body.classList.add("dark");

    themeBtn.innerHTML = `
    <i class="fa-solid fa-sun"></i>
    `;

}


// تغییر حالت تم

themeBtn.addEventListener("click",()=>{


    document.body.classList.toggle("dark");


    const isDark = document.body.classList.contains("dark");


    if(isDark){

        localStorage.setItem("theme","dark");


        themeBtn.innerHTML = `
        <i class="fa-solid fa-sun"></i>
        `;

    }

    else{


        localStorage.setItem("theme","light");


        themeBtn.innerHTML = `
        <i class="fa-solid fa-moon"></i>
        `;


    }


});

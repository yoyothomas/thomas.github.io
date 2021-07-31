/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */


function xmyFunction(x) {
  x.classList.toggle("change");
}

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function aumyFunction() {
  document.getElementById("aumyDropdown").classList.toggle("aushow");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.audropbtn')) {
    var audropdowns = document.getElementsByClassName("audropdown-content");
    var i;
    for (i = 0; i < audropdowns.length; i++) {
      var audopenDropdown = audropdowns[i];
      if (audopenDropdown.classList.contains('audshow')) {
        audopenDropdown.classList.remove('audshow');
      }
    }
  }
}


function categoriesddmyFunction() {
  document.getElementById("categoriesddmyDropdown").classList.toggle("categoriesddshow");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.categoriesdddropbtn')) {
    var categoriesdddropdowns = document.getElementsByClassName("categoriesdddropdown-content");
    var i;
    for (i = 0; i < categoriesdddropdowns.length; i++) {
      var categoriesddopenDropdown = categoriesdddropdowns[i];
      if (categoriesddopenDropdown.classList.contains('categoriesddshow')) {
        categoriesddopenDropdown.classList.remove('categoriesddshow');
      }
    }
  }
}

var pay2end = document.querySelector(".pay2end");
var cbt = document.querySelector(".cbt");
 var pay1 = document.querySelector(".pay1");
var pay2 = document.querySelector(".pay2");
var obt = document.querySelector(".obt");
obt.addEventListener('click',()=>{
	pay2.classList.add('show');
	pay1.classList.remove('show');
	pay2end.classList.add('show');
})
cbt.addEventListener('click',()=>{

   pay1.classList.add('show');
	pay2.classList.remove('show');
	pay2end.classList.add('show');
})




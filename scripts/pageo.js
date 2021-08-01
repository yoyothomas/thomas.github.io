/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

var backtotop = document.querySelector(".bt");
backtotop.addEventListener('click',()=>{
window.scrollTo({
  top: 100,
  left: 100,
  behavior: 'smooth'
});

})

function categoriesddmyFunction() {
  document.getElementById("categoriesddmyDropdown").classList.toggle("categoriesddshow");
}
function aumyFunction() {
  document.getElementById("aumyDropdown").classList.toggle("aushow");
}

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
  if (!event.target.matches('.audropbtn')) {
    let audropdowns = document.getElementsByClassName("audropdown-content");
    let o;
    for (o = 0; o < audropdowns.length; o++) {
      var audopenDropdown = audropdowns[o];
      if (audopenDropdown.classList.contains('audshow')) {
        audopenDropdown.classList.remove('audshow');
      }
    }
  }
  if (!event.target.matches('.categoriesdddropbtn')) {
    let categoriesdddropdowns = document.getElementsByClassName("categoriesdddropdown-content");
    let t;
    for (t = 0; t < categoriesdddropdowns.length; t++) {
      var categoriesddopenDropdown = categoriesdddropdowns[t];
      if (categoriesddopenDropdown.classList.contains('categoriesddshow')) {
        categoriesddopenDropdown.classList.remove('categoriesddshow');
      }
    }
  }

}
function xmyFunction(x) {
  x.classList.toggle("change");
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





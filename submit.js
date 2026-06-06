const title=document.getElementById("title");
const button=document.getElementById("changeBtn");
button.addEventListener("click",function(){
	button.textContent="button clicked";
	title.style.color="red";



	document.body.style.backgroundColor="blue";
	document.body.style.color="white";
});
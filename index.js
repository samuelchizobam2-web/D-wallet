const loginBtn= document.getElementById("loginBtn");
const loginOverlay= document.getElementById("loginOverlay")
const closeBtn = document.getElementById("closeBtn");
const continueBtn= document.getElementById("continueBtn");
const username= document.getElementById("username");
const password= document.getElementById("password");
const loginMessage= document.getElementById("loginMessage");
loginBtn.onclick= function() {loginOverlay.style.display="flex";};
closeBtn.onclick= function(){loginOverlay.style.display= "none";};
continueBtn.onclick= function() {if (username.value===""|| password.value===""){loginMessage.textContent= "Please fill in all fields."; loginMessage.style.color ="red";} else{window.location.href="dashboard.html"}
}


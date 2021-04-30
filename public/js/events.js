// 1. Get a Reference to the HTML form element
const form = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
// 2. Make your event handler function
// you want to make this one `async` so you can `await` 
// the fetch requests
// also event handlers ALWAYS take 1 parameter (the event object)
async function registerUser (event) {
  event.preventDefault(); // This stops the browser from reloading the page
  console.log("register");
  const playerName = document.getElementById("playerName").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;
  try{
    const response = await fetch(`${window.location.origin}/register`, {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "body": JSON.stringify({playerName,password,email})
      });
      console.log(response);
        if(response.redirected){
          window.location = response.url;
        }
        else if (response.status === 500) {
            alert("MESSED UP");
        } else {
            alert("An unknown error occured!");
            console.error(response);
        }
    } catch (err){
        console.error(err);
        console.error(response);
    }
  // Now you can do you fetch request and handle the response
 }

 	
async function login (event) {
  try {
    event.preventDefault();
    const response = await fetch(`${window.location.origin}/login`, {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": JSON.stringify({playerName, password})
    });
    if(response.redirected){
      window.location = response.url;
    }
    else if (response.status === 500) {
      alert("MESSED UP");
    } else {
      alert("An unknown error occured!");
      console.error(response);
    }
  } catch (err) {
    console.error(err);
    console.error(response);
  }
}
// 3. Add the event listener for the "submit" event and register
// your event handler
form.addEventListener("submit", registerUser);
loginForm.addEventListener("submit", login);
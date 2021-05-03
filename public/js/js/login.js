const loginForm = document.getElementById("loginForm");
async function login(event) {
    event.preventDefault(); // This stops the browser from reloading the page
    console.log("login");
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value; 
    try{
      const response = await fetch(`${window.location.origin}/login`, {
          "method": "POST",
          "headers": {
            "Content-Type": "application/json"
          },
          "body": JSON.stringify({email,password})
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
    }
loginForm.addEventListener("submit", login);
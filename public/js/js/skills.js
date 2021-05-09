const skillForm = document.getElementById("skillForm");
async function createSkill(event) {
    event.preventDefault(); // This stops the browser from reloading the page
    console.log("createSkill");
    const skillName = document.getElementById("skillName").value;
    const skillDescription = document.getElementById("skillDescription").value; 
    const skillLevel = document.getElementById("skillLevel").value; 
    const skillCategory = document.getElementById("skillCategory").value; 
    const character = document.getElementById(character).value;
    try{
      const response = await fetch(`${window.location.origin}/createSkill`, {
          "method": "POST",
          "headers": {
            "Content-Type": "application/json"
          },
          "body": JSON.stringify({skillName,skillDescription,skillLevel, skillCategory,character})
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
skillForm.addEventListener("submit", createSkill);
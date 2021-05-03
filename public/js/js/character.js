const characterForm = document.getElementById("characterForm");
async function createCharacter(event) {
    event.preventDefault(); // This stops the browser from reloading the page
    console.log("createCharacter");
    const player = document.getElementById(player).value;  
    const name = document.getElementById(name).value; 
    const baseSTR = document.getElementById(baseSTR).value;
    const baseCON = document.getElementById(baseCON).value;
    const baseDEX = document.getElementById(baseDEX).value;
    const baseINT = document.getElementById(baseINT).value;
    const baseWIS =  document.getElementById(baseWIS).value;
    const baseCHA = document.getElementById(baseCHA).value;
    const age = document.getElementById(age).value;
    const height = document.getElementById(height).value;
    const weight =  document.getElementById(weight).value;
    const race = document.getElementById(race).value;
    const background = document.getElementById(background).value;
    const subClass = document.getElementById(subClass).value; 
    const trade = document.getElementById(trade).value;
    const Title = document.getElementById(Title).value;
    const SkillPoints = document.getElementById(SkillPoints).value;
    const EXP = document.getElementById(EXP).value;
    const TNL = document.getElementById(TNL).value;
    const Personality = document.getElementById(Personality).value;
    const Origin  = document.getElementById(Origin).value;
    const Languages = document.getElementById(Languages).value;
    
     
    try{
      const response = await fetch(`${window.location.origin}/createCharacter`, {
          "method": "POST",
          "headers": {
            "Content-Type": "application/json"
          },
          "body": JSON.stringify({player,name, baseSTR, baseCON, baseDEX, baseINT, baseWIS, baseCHA,
            age, height , weight,race, background, subClass,  
          trade, Title, SkillPoints, EXP, TNL , 
          Personality , Origin , Languages })
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
characterForm.addEventListener("submit", createCharacter);
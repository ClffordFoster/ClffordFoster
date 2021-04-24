"use strict";

const express = require("express");
const argon2 = require("argon2");
const app = express();

app.use(express.json());

const { playerModel } = require('./Models/PlayerModel');
const { characterModel } = require("./Models/CharacterModel");
const { skillsModel } = require("./Models/SkillsModel");

const PORT = 8001;

// Handle requests to /users
// Create a new user account
app.post("/register", async (req, res) => {
	console.log("POST /register");

	const {playerName, password, email} = req.body;

	try {
		const passwordHash = await argon2.hash(password, {hashLength: 5});
		const playerAdded = playerModel.createPlayer({
			playerName, 
			passwordHash,
			email
		});
	
		if (playerAdded) {
			res.sendStatus(200); // 200 OK
		} else { // something went wrong
			res.sendStatus(500); // 500 Internal Server Error
		}
	} catch (err) {
		console.error(err);
		return res.sendStatus(500);
	}
});

app.post("/login", async (req, res) => {
	const { email, password } = req.body;

	try {
		const row = playerModel.getPasswordHash(email); 

		if (!row) {
			return res.sendStatus(400);
		}

		const {passwordHash} = row;
		
		if ( await argon2.verify(passwordHash, password) ) {
			return res.sendStatus(200);
		} else {
			return res.sendStatus(400);
		}
	} catch (err) {
		console.error(err);
		return res.sendStatus(500);
	}
});

// Delete a user's account
app.delete("/player/:playerID", (req, res) => {
	console.log("DELETE /players");
	const {playerID} = req.params;
	if (playerModel.deletePlayer(playerID)) {
		res.sendStatus(200);
	} else {
		res.sendStatus(500);
	}
});

app.post("/createCharacter", async (req, res) => {
	console.log("/createCharacter");

	let {name, STR, CON, DEX, INT, WIS, CHA,age, height , weight, background = "", subClass = "",  
	trade= "", Title = "", SkillPoints = "", EXP = "", TNL = "", Personality =  "", Orgin = "" , Languages = "" } = req.body;
	try {
		const characterAdded = playerModel.createPlayer({
			name, 
			STR, 
			CON, 
			DEX, 
			INT, 
			WIS, 
			CHA,
			age, 
			height, 
			weight,
			background,
			subClass,  
			trade, 
			Title, 
			SkillPoints,
			 EXP, 
			 TNL,          
			 Personality, 
			 Orgin , 
			 Languages
		});
	
		if (characterAdded) {
			res.sendStatus(200); // 200 OK
		} else { // something went wrong
			res.sendStatus(500); // 500 Internal Server Error
		}
	} catch (err) {
		console.error(err);
		return res.sendStatus(500);
	}

});


	
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
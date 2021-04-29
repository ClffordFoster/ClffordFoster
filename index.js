"use strict";

const express = require("express");
const argon2 = require("argon2");
const app = express();
const path = require('path');
const session = require("express-session");
const redis = require('redis');	
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const { playerModel } = require('./Models/PlayerModel');
const { characterModel } = require("./Models/CharacterModel");
const { skillsModel } = require("./Models/SkillsModel");

const PORT = 8001;

const sessionConfig = {
	store: new RedisStore({ client: redisClient }),
	secret: "somethingSecret",
	resave: false,
	saveUninitialized: false,
	name: "session", // now it is just a generic name
	cookie: {
	  httpOnly: true,
	  maxAge: 1000 * 60 * 72, // 72 hours
	}
  };

  app.use(session(sessionConfig));

  app.use(express.static(path.join(__dirname, "public"), {
	  extensions: ['html'],
  }));


// Handle requests to /users
// Create a new user account
app.post("/register", async (req, res) => {
	console.log("POST/register");

	const {playerName, password, email} = req.body;
	console.log(req.body);
	try {
		const passwordHash = await argon2.hash(password, {hashLength: 5});
		const playerAdded = playerModel.createPlayer({
			playerName, 
			passwordHash,
			email
		});
	
		if (playerAdded) {
			console.log("PlayerAddedSuccessfully");
			res.redirect("/login");
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
				req.session.regenerate(function(err){
					if(err){
						console.error(err);
						return res.sendStatus(500);
					}
					else{
						const player = playerModel.getPlayerDataByEmail(email);
						if(player){
							req.session.playerID = player.playerID;
							req.session.email = player.email;
							req.session.playerName = player.playerName;
							req.session.role = player.role;
							req.session.isLoggedIn = true;
							res.redirect("/success");
						}
						else{
							return res.sendStatus(500);
					}
				}
			});
			return res.sendStatus(200);
		}else{
			return res.sendStatus(400);
		}
	}catch (err) {
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

	let {name, baseSTR, baseCON, baseDEX, baseINT, baseWIS, baseCHA,age, height , weight, background = "", subClass = "",  
	trade= "", Title = "", SkillPoints = "", EXP = "", TNL = "", Personality =  "", Origin  = "" , Languages = "" } = req.body;
	try {
		const characterAdded = characterModel.createCharacter({
			name, 
			baseSTR, 
			baseCON, 
			baseDEX, 
			baseINT, 
			baseWIS, 
			baseCHA,
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
			 Origin  , 
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

app.post("/createSkill", async (req,res) =>{
	console.log("/createSkill");
	let{skillName,skillDescription,skillLevel,skillCategory } = req.body
		try{
			let skillAdded = skillsModel.createSkill({
				skillName,skillDescription,skillLevel,skillCategory
			});
			if (skillAdded) {
				res.sendStatus(200); // 200 OK
			} else { // something went wrong
				res.sendStatus(500); // 500 Internal Server Error
			}
		} catch (err) {
			console.error(err);
			return res.sendStatus(500);
		}
});

app.post("/createItem", async (req,res) =>{
	console.log("/createItem");
	let{itemName,itemDescription,itemLevel,itemCategory,
		strBonus, conBonus, dexBonus, chaBonus, intBonus, wisBonus, hpBonus,
		spBonus, mpBonus, speedBonus, poiseBonus, perceptionBonus,
		armBonus, evaBonus, tghBonus, drBonus } = req.body
		try{
			let itemAdded = itemsModel.createItem({
				itemName,itemDescription,itemLevel,itemCategory,
				strBonus, conBonus, dexBonus, chaBonus, intBonus, wisBonus, hpBonus,
				spBonus, mpBonus, speedBonus, poiseBonus, perceptionBonus,
				armBonus, evaBonus, tghBonus, drBonus
			});	
			if (itemAdded) {
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
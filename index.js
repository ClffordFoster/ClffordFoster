"use strict";

const express = require("express");
const argon2 = require("argon2");
const app = express();
const path = require('path');
const Joi = require('joi');
const session = require("express-session");
const redis = require('redis');	
const {schemas, VALIDATION_OPTIONS} = require("./validators/allValidators");
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('view engine', 'ejs');

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


  app.get('/', (req,res) =>{
	res.render('index.ejs');
});

app.get('/login', (req,res) =>{
	res.render('login.ejs');
});

app.get('/register', (req,res) =>{
	res.render('register.ejs');
});

app.get('/Hero', (req,res) =>{
	res.render('Hero.ejs');
});


// Handle requests to /users
// Create a new user account
app.post("/register", async (req, res) => {
	console.log("POST/register");

	const {playerName, password, email} = postplayersSchema.validate(req.body);
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
			return res.redirect("/login");
		} else { // something went wrong
			return res.sendStatus(500); // 500 Internal Server Error
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
							res.redirect("/Hero");
						}
						else{
							return res.sendStatus(500);
					}
				}
			});
			
		}else{
			return res.sendStatus(400);
		}
	}catch (err) {
		console.error(err);
		return res.sendStatus(500);
	}
});

app.post("/logout", async (req, res) => {
	if(req.session){
		req.session.destroy(function(err){
			if(err){
				console.error(err);
				return res.sendStatus(500);
			}
			res.redirect("/login");
		});
		
	}
	else{
			return res.redirect("/login");	
		}
});

// Delete a user's account
app.delete("/player/:playerID", (req, res) => {
	if(!req.session||req.session.userID !== userID && req.session.role !== 1){returnres.sendStatus(403);}
	console.log("DELETE /players");
	const {playerID} = req.params;
	if (playerModel.deletePlayer(playerID)) {
		return res.sendStatus(200);
	} else {
		return res.sendStatus(500);
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
			return res.sendStatus(200); // 200 OK
		} else { // something went wrong
			return res.sendStatus(500); // 500 Internal Server Error
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
				return res.sendStatus(200); // 200 OK
			} else { // something went wrong
				return res.sendStatus(500); // 500 Internal Server Error
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
				return res.sendStatus(200); // 200 OK
			} else { // something went wrong
				return res.sendStatus(500); // 500 Internal Server Error
			}
		} catch (err) {
			console.error(err);
			return res.sendStatus(500);
		}
});	
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
"use strict";
const { db } = require("./db");
const uuidV4 = require('uuid').v4; 

class CharacterModel {
    constructor (db) {
        this.db = db;
    }

    createCharacter (Character) {
        try {
            const sql = `
                INSERT INTO Characters 
                    (CharacterID, name, STR, CON, DEX, INT, WIS, CHA) 
                VALUES 
                    (@CharacterID, @name, @STR, @DEX, @INT, @WIS, @CHA)
            `;
            const addCharacterStmt = db.prepare(sql);
            
            Character.CharacterID = uuidV4();
            // attempt to add them to the database
            addCharacterStmt.run(Character);
            return true;
        } catch (err) {          // if there was any error
            console.error(err);  // then log it
            return false;        // return false to indicate failure
     
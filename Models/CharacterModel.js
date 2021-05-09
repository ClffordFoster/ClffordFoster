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
                    (
                        characterID, player, name, baseSTR, baseCON, baseDEX, baseINT, baseWIS, baseCHA,
                        background, age, height , weight,
                        race, subClass,  trade, Title, SkillPoints, EXP, TNL,
                        Personality, Origin  , Languages 
                    ) 
                VALUES 
                    (
                        @characterID, @player, @name, @baseSTR, @baseCON, @baseDEX, @baseINT, @baseWIS, @baseCHA,
                        @background, @age, @height , @weight,
                        @race, @subClass,  @trade, @Title, @SkillPoints, @EXP, @TNL ,
                        @Personality, @Origin , @Languages
                    )
            `;
            const addCharacterStmt = db.prepare(sql);
            
            Character.characterID = uuidV4();
            // attempt to add them to the database
            addCharacterStmt.run(Character);
            return true;
        } catch (err) {          // if there was any error
            console.error(err);  // then log it
            return false;        // return false to indicate failure
        }
    }

    getCharacter (characterID) {
        try {
            const sql = `
                SELECT 
                    characterID, player, name, baseSTR, baseCON, baseDEX, baseINT, baseWIS, baseCHA,
                    background, age, height , weight,
                    race, subClass,  trade, Title, SkillPoints, EXP, TNL,
                    Personality, Origin  , Languages 
                FROM
                    Characters
                WHERE
                    characterID=@characterID
            `;
            db.prepare(sql).get({characterID});
            return true;
        } catch (err) {          // if there was any error
            console.error(err);  // then log it
            return false;        // return false to indicate failure
        }
    }
    getCharacters (player) {
        try {
            const sql = `
                SELECT *
                FROM Characters
                WHERE player=@player
            `;
            const getAllCharactersStmt = db.prepare(sql);
            
            return getAllCharactersStmt.all({player});
        } catch (err) {          // if there was any error
            console.error(err);  // then log it
            return [];        // return false to indicate failure
        }
    }
}



const characterModel = new CharacterModel(db);
exports.characterModel = new CharacterModel(db);

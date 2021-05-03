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
                        CharacterID, player, name, baseSTR, baseCON, baseDEX, baseINT, baseWIS, baseCHA,
                        background, age, height , weight,
                        race, subClass,  trade, Title, SkillPoints, EXP, TNL,
                        Personality, Origin  , Languages 
                    ) 
                VALUES 
                    (
                        @CharacterID, @player, @name, @baseSTR, @baseDEX, @baseINT, @baseWIS, @baseCHA,
                        @background, @age, @height , @weight,
                        @race, @subClass,  @trade, @Title, @SkillPoints, @EXP, @TNL ,
                        @Personality, @Origin , @Languages
                    )
            `;
            const addCharacterStmt = db.prepare(sql);
            
            Character.CharacterID = uuidV4();
            // attempt to add them to the database
            addCharacterStmt.run(Character);
            calcMods(Character.CharacterID);
            return true;
        } catch (err) {          // if there was any error
            console.error(err);  // then log it
            return false;        // return false to indicate failure
        }
    }
}

const characterModel = new CharacterModel(db);
exports.characterModel = new CharacterModel(db);

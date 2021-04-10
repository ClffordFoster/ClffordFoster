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
        }
    }
}

function calcMods() {

    if(STR === 10 || STR === 11){
        STR_MOD = 0;
    }
    else if(STR === 12 || STR === 13){
        STR_MOD = 1;
    }
    else if(STR === 14 || STR === 15){
        STR_MOD = 2;
    }
    else if(STR === 16 || STR === 17){
        STR_MOD = 3;
    }
    else if(STR === 18 || STR === 19){
        STR_MOD = 4;
    }
    else if(STR === 20 || STR === 21){
        STR_MOD = 5;
    }

    else if(STR === 22 || STR === 23){
        STR_MOD = 6;
    }
    else if(STR === 24 || STR === 25){
        STR_MOD = 7;
    }
    else if(STR === 26 || STR === 27){
        STR_MOD = 8;
    }
    else if(STR === 28 || STR === 29){
        STR_MOD = 9;
    }
    else if(STR === 30){
        STR_MOD = 10;
    }

    if(CON === 10 || CON === 11){
        CON_MOD = 0;
    }
    else if(CON === 12 || CON === 13){
        CON_MOD = 1;
    }
    else if(CON === 14 || CON === 15){
        CON_MOD = 2;
    }
    else if(CON === 16 || CON === 17){
        CON_MOD = 3;
    }
    else if(CON === 18 || CON === 19){
        CON_MOD = 4;
    }
    else if(CON === 20 || CON === 21){
        CON_MOD = 5;
    }

    else if(CON === 22 || CON === 23){
        CON_MOD = 6;
    }
    else if(CON === 24 || CON === 25){
        CON_MOD = 7;
    }
    else if(CON === 26 || CON === 27){
        CON_MOD = 8;
    }
    else if(CON === 28 || CON === 29){
        CON_MOD = 9;
    }
    else if(CON === 30){
        CON_MOD = 10;
    }
    
    if(DEX === 10 || DEX === 11){
        DEX_MOD = 0;
    }
    else if(DEX === 12 || DEX === 13){
        DEX_MOD = 1;
    }
    else if(DEX === 14 || DEX === 15){
        DEX_MOD = 2;
    }
    else if(DEX === 16 || DEX === 17){
        DEX_MOD = 3;
    }
    else if(DEX === 18 || DEX === 19){
        DEX_MOD = 4;
    }
    else if(DEX === 20 || DEX === 21){
        DEX_MOD = 5;
    }

    else if(DEX === 22 || DEX === 23){
        DEX_MOD = 6;
    }
    else if(DEX === 24 || DEX === 25){
        DEX_MOD = 7;
    }
    else if(DEX === 26 || DEX === 27){
        DEX_MOD = 8;
    }
    else if(DEX === 28 || DEX === 29){
        DEX_MOD = 9;
    }
    else if(DEX === 30){
        DEX_MOD = 10;
    }

    if(INT === 10 || INT === 11){
        INT_MOD = 0;
    }
    else if(INT === 12 || INT === 13){
        INT_MOD = 1;
    }
    else if(INT === 14 || INT === 15){
        INT_MOD = 2;
    }
    else if(INT === 16 || INT === 17){
        INT_MOD = 3;
    }
    else if(INT === 18 || INT === 19){
        INT_MOD = 4;
    }
    else if(INT === 20 || INT === 21){
        INT_MOD = 5;
    }

    else if(INT === 22 || INT === 23){
        INT_MOD = 6;
    }
    else if(INT === 24 || INT === 25){
        INT_MOD = 7;
    }
    else if(INT === 26 || INT === 27){
        INT_MOD = 8;
    }
    else if(INT === 28 || INT === 29){
        INT_MOD = 9;
    }
    else if(INT === 30){
        INT_MOD = 10;
    }

    if(WIS === 10 || WIS === 11){
        WIS_MOD = 0;
    }
    else if(WIS === 12 || WIS === 13){
        WIS_MOD = 1;
    }
    else if(WIS === 14 || WIS === 15){
        WIS_MOD = 2;
    }
    else if(WIS === 16 || WIS === 17){
        WIS_MOD = 3;
    }
    else if(WIS === 18 || WIS === 19){
        WIS_MOD = 4;
    }
    else if(WIS === 20 || WIS === 21){
        WIS_MOD = 5;
    }

    else if(WIS === 22 || WIS === 23){
        WIS_MOD = 6;
    }
    else if(WIS === 24 || WIS === 25){
        WIS_MOD = 7;
    }
    else if(WIS === 26 || WIS === 27){
        WIS_MOD = 8;
    }
    else if(WIS === 28 || WIS === 29){
        WIS_MOD = 9;
    }
    else if(WIS === 30){
        WIS_MOD = 10;
    }

    if(CHA === 10 || CHA === 11){
        CHA_MOD = 0;
    }
    else if(CHA === 12 || CHA === 13){
        CHA_MOD = 1;
    }
    else if(CHA === 14 || CHA === 15){
        CHA_MOD = 2;
    }
    else if(CHA === 16 || CHA === 17){
        CHA_MOD = 3;
    }
    else if(CHA === 18 || CHA === 19){
        CHA_MOD = 4;
    }
    else if(CHA === 20 || CHA === 21){
        CHA_MOD = 5;
    }

    else if(CHA === 22 || CHA === 23){
        CHA_MOD = 6;
    }
    else if(CHA === 24 || CHA === 25){
        CHA_MOD = 7;
    }
    else if(CHA === 26 || CHA === 27){
        CHA_MOD = 8;
    }
    else if(CHA === 28 || CHA === 29){
        CHA_MOD = 9;

    }
    else if(CHA === 30){
        CHA_MOD = 10;
    }

    HP = CON + STR;
    SP = CON + DEX;
    Speed = 3 + DEX_MOD;
    Perception = 3 + WIS_MOD;
    
    if(INT <= WIS){
        MP = CON + INT;
    }
    else{
        MP = CON + WIS;
    }

}
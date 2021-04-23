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
                        CharacterID, name, STR, CON, DEX, INT, WIS, CHA,
                        ARM, EVA, TGH, DR, background, age, height , weight,
                        race, subClass,  trade, Title, SkillPoints, EXP, TNL ,
                        Personality, Orgin , Languages, 
                    ) 
                VALUES 
                    (
                        @CharacterID, @name, @STR, @DEX, @INT, @WIS, @CHA
                        @ARM, @EVA, @TGH, @DR, @background, @age, @height , @weight,
                        @race, @subClass,  @trade, @Title, @SkillPoints, @EXP, @TNL ,
                        @Personality, @Orgin , @Languages, 
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

function calcMods (characterID) {
    let new_Str_Mod,
    new_Con_Mod,
    new_Dex_Mod,
    new_Int_Mod,
    new_Wis_Mod,
    new_Cha_Mod,
    new_Speed,
    new_Perception,
    new_Hp,
    new_Mp,
    new_Sp;
    const sql = `
    UPDATE Characters
    SET
        STR_MOD = new_Str_Mod
        CON_MOD = new_Con_Mod
        DEX_MOD = new_Dex_Mod
        INT_MOD = new_Int_Mod
        WIS_MOD = new_Wis_Mod
        CHA_MOD = new_Cha_Mod
        Speed = new_Speed
        Perception = new_Perception
        HP = new_Hp
        MP = new_Mp
        SP = new_Sp

    WHERE
    CharacterID=@characterID
    `;

    if(STR === 10 || STR === 11){
        new_Str_Mod = 0;
    }
    else if(STR === 12 || STR === 13){
        new_Str_Mod = 1;
    }
    else if(STR === 14 || STR === 15){
        new_Str_Mod = 2;
    }
    else if(STR === 16 || STR === 17){
        new_Str_Mod = 3;
    }
    else if(STR === 18 || STR === 19){
        new_Str_Mod = 4;
    }
    else if(STR === 20 || STR === 21){
        new_Str_Mod = 5;
    }

    else if(STR === 22 || STR === 23){
        new_Str_Mod = 6;
    }
    else if(STR === 24 || STR === 25){
        new_Str_Mod = 7;
    }
    else if(STR === 26 || STR === 27){
        new_Str_Mod = 8;
    }
    else if(STR === 28 || STR === 29){
        new_Str_Mod = 9;
    }
    else if(STR === 30){
        new_Str_Mod = 10;
    }

    if(CON === 10 || CON === 11){
        new_Con_Mod = 0;
    }
    else if(CON === 12 || CON === 13){
        new_Con_Mod = 1;
    }
    else if(CON === 14 || CON === 15){
        new_Con_Mod = 2;
    }
    else if(CON === 16 || CON === 17){
        new_Con_Mod = 3;
    }
    else if(CON === 18 || CON === 19){
        new_Con_Mod = 4;
    }
    else if(CON === 20 || CON === 21){
        new_Con_Mod = 5;
    }

    else if(CON === 22 || CON === 23){
        new_Con_Mod = 6;
    }
    else if(CON === 24 || CON === 25){
        new_Con_Mod = 7;
    }
    else if(CON === 26 || CON === 27){
        new_Con_Mod = 8;
    }
    else if(CON === 28 || CON === 29){
        new_Con_Mod = 9;
    }
    else if(CON === 30){
        new_Con_Mod = 10;
    }
    
    if(DEX === 10 || DEX === 11){
        new_Dex_Mod = 0;
    }
    else if(DEX === 12 || DEX === 13){
        new_Dex_Mod = 1;
    }
    else if(DEX === 14 || DEX === 15){
        new_Dex_Mod = 2;
    }
    else if(DEX === 16 || DEX === 17){
        new_Dex_Mod = 3;
    }
    else if(DEX === 18 || DEX === 19){
        new_Dex_Mod = 4;
    }
    else if(DEX === 20 || DEX === 21){
        new_Dex_Mod = 5;
    }

    else if(DEX === 22 || DEX === 23){
        new_Dex_Mod = 6;
    }
    else if(DEX === 24 || DEX === 25){
        new_Dex_Mod = 7;
    }
    else if(DEX === 26 || DEX === 27){
        new_Dex_Mod = 8;
    }
    else if(DEX === 28 || DEX === 29){
        new_Dex_Mod = 9;
    }
    else if(DEX === 30){
        new_Dex_Mod = 10;
    }

    if(INT === 10 || INT === 11){
        new_Int_Mod = 0;
    }
    else if(INT === 12 || INT === 13){
        new_Int_Mod = 1;
    }
    else if(INT === 14 || INT === 15){
        new_Int_Mod = 2;
    }
    else if(INT === 16 || INT === 17){
        new_Int_Mod = 3;
    }
    else if(INT === 18 || INT === 19){
        new_Int_Mod = 4;
    }
    else if(INT === 20 || INT === 21){
        new_Int_Mod = 5;
    }

    else if(INT === 22 || INT === 23){
        new_Int_Mod = 6;
    }
    else if(INT === 24 || INT === 25){
        new_Int_Mod = 7;
    }
    else if(INT === 26 || INT === 27){
        new_Int_Mod = 8;
    }
    else if(INT === 28 || INT === 29){
        new_Int_Mod = 9;
    }
    else if(INT === 30){
        new_Int_Mod = 10;
    }

    if(WIS === 10 || WIS === 11){
        new_Wis_Mod = 0;
    }
    else if(WIS === 12 || WIS === 13){
        new_Wis_Mod = 1;
    }
    else if(WIS === 14 || WIS === 15){
        new_Wis_Mod = 2;
    }
    else if(WIS === 16 || WIS === 17){
        new_Wis_Mod = 3;
    }
    else if(WIS === 18 || WIS === 19){
        new_Wis_Mod = 4;
    }
    else if(WIS === 20 || WIS === 21){
        new_Wis_Mod = 5;
    }

    else if(WIS === 22 || WIS === 23){
        new_Wis_Mod = 6;
    }
    else if(WIS === 24 || WIS === 25){
        new_Wis_Mod = 7;
    }
    else if(WIS === 26 || WIS === 27){
        new_Wis_Mod = 8;
    }
    else if(WIS === 28 || WIS === 29){
        new_Wis_Mod = 9;
    }
    else if(WIS === 30){
        new_Wis_Mod = 10;
    }

    if(CHA === 10 || CHA === 11){
        new_Cha_Mod = 0;
    }
    else if(CHA === 12 || CHA === 13){
        new_Cha_Mod = 1;
    }
    else if(CHA === 14 || CHA === 15){
        new_Cha_Mod = 2;
    }
    else if(CHA === 16 || CHA === 17){
        new_Cha_Mod = 3;
    }
    else if(CHA === 18 || CHA === 19){
        new_Cha_Mod = 4;
    }
    else if(CHA === 20 || CHA === 21){
        new_Cha_Mod = 5;
    }

    else if(CHA === 22 || CHA === 23){
        new_Cha_Mod = 6;
    }
    else if(CHA === 24 || CHA === 25){
        new_Cha_Mod = 7;
    }
    else if(CHA === 26 || CHA === 27){
        new_Cha_Mod = 8;
    }
    else if(CHA === 28 || CHA === 29){
        new_Cha_Mod = 9;

    }
    else if(CHA === 30){
        new_Cha_Mod = 10;
    }

    new_Hp = CON + STR;
    new_Sp = CON + DEX;
    new_Speed = 3 + DEX_MOD;
    new_Perception = 3 + WIS_MOD;
    
    if(INT <= WIS){
        new_Mp = CON + INT;
    }
    else{
        new_Mp = CON + WIS;
    }
    db.prepare(sql).run({
         new_Str_Mod,
         new_Con_Mod,
         new_Dex_Mod,
         new_Int_Mod,
         new_Wis_Mod,
         new_Cha_Mod,
         new_Speed,
         new_Perception,
         new_Hp,
         new_Mp,
         new_Sp,
         characterID
    });
    return true;
}
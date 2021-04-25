"use strict";
const { db } = require("./db");
const uuidV4 = require('uuid').v4; 


class PerkModel {
    constructor (db) {
        this.db = db;
    }


    createItem (Perk) {
        try {
                // Prepare the insert statement
                const sql = `INSERT INTO Perks 
                            (perkID, perkName, perkCategory, perkDescription, strBonus,
                            conBonus, dexBonus, chaBonus, intBonus, wisBonus, hpBonus,
                            spBonus, mpBonus, speedBonus, poiseBonus, perceptionBonus,
                            armBonus, evaBonus, tghBonus, drBonus) 
                        VALUES 
                            (@perkID, @perkName, @perkCategory, @perkDescription, @strBonus,
                                @conBonus, @dexBonus, @chaBonus, @intBonus, @wisBonus, @hpBonus,
                                @spBonus, @mpBonus, @speedBonus, @poiseBonus, @perceptionBonus,
                                @armBonus, @evaBonus, @tghBonus, @drBonus)
                `;
                const addPerkStmt = db.prepare(sql);
                
                // Create the Item's id and add it to the Item object
                Perk.perkID = uuidV4();
                // attempt to add them to the database
                addPerkStmt.run(Perk);
                return true;
            } catch (err) {          // if there was any error
                console.error(err);  // then log it
                return false;        // return false to indicate failure
            }
    }
}
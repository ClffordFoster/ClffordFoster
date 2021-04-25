"use strict";
const { db } = require("./db");
const uuidV4 = require('uuid').v4; 


class SkillsModel {
    constructor (db) {
        this.db = db;
    }

    createSkill (Skill) {
        try {
            const sql = `
                INSERT INTO Skills 
                    (skillID, skillName,skillDescription,skillLevel,skillCategory) 
                VALUES 
                    (@skillID, @skillName, @skillDescription, @skillLevel @category)
            `;
            const addSkillsStmt = db.prepare(sql);
            
            Skill.skillID = uuidV4();
            // attempt to add them to the database
            addSkillsStmt.run(Skills);
            return true;
        } catch (err) {          // if there was any error
            console.error(err);  // then log it
            return false;        // return false to indicate failure
        }
    }
}

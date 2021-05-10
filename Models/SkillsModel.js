"use strict";
const { db } = require("./db");
const uuidV4 = require('uuid').v4; 


class SkillsModel {
    constructor (db) {
        this.db = db;
    }

    createSkill (skill) {
        try {
            const sql = `
                INSERT INTO Skills 
                    (skillID, skillName,skillDescription,skillLevel,skillCategory, character) 
                VALUES 
                    (@skillID, @skillName, @skillDescription, @skillLevel, @skillCategory, @character)
            `;
            const addSkillsStmt = db.prepare(sql);
            
            skill.skillID = uuidV4();
            // attempt to add them to the database
            addSkillsStmt.run(skill);
            return true;
        } catch (err) {          // if there was any error
            console.error(err);  // then log it
            return false;        // return false to indicate failure
        }
    }
}

const skillsModel = new SkillsModel(db);
exports.skillsModel = new SkillsModel(db);

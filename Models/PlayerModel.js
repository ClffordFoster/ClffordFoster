"use strict";
const { db } = require("./db");
const uuidV4 = require('uuid').v4; 


class PlayerModel {
    constructor (db) {
        this.db = db;
    }

createPlayer (player) {
    try {
            // Prepare the insert statement
            const sql = `INSERT INTO Players 
                        (playerID, playerName, passwordHash, email) 
                    VALUES 
                        (@playerID, @playerName, @passwordHash, @email)
            `;
            const addPlayerStmt = db.prepare(sql);
            
            // Create the Player's id and add it to the Player object
            player.playerID = uuidV4();
            // attempt to add them to the database
            addPlayerStmt.run(player);
            return true;
        } catch (err) {          // if there was any error
            console.error(err);  // then log it
            return false;        // return false to indicate failure
        }
    }

    changeEmailAddress (newEmailAddr, playerID) {
        try {
            const sql = `
                UPDATE Players
                SET
                    email=@newEmail
                WHERE
                    playerID=@playerID
            `;
            db.prepare(sql).run({
                newEmail: newEmailAddr,
                playerID
            });
            return true;
        } catch (err) {          // if there was any error
            console.error(err);  // then log it
            return false;        // return false to indicate failure
        }
    }

    changePlayername (newPlayername, playerID) {
        try {
            const sql = `
                UPDATE Players
                SET
                    playerName=@newPlayername
                WHERE
                    playerID=@playerID
            `;
            db.prepare(sql).run({
                newPlayername,
                playerID
            });
            return true;
        } catch (err) {          // if there was any error
            console.error(err);  // then log it
            return false;        // return false to indicate failure
        }
    }

    upgradeToAdmin (playerID) {
        try {
            const sql = `
                UPDATE Players
                SET
                    role = 1
                WHERE
                    playerID=@playerID
            `;
            db.prepare(sql).run({playerID});
            return true;
        } catch (err) {          // if there was any error
            console.error(err);  // then log it
            return false;        // return false to indicate failure
        }
    }

    revokeAdmin (playerID) {
        try {
            const sql = `
                UPDATE Players
                SET
                    role = 0
                WHERE
                    playerID=@playerID
            `;
            db.prepare(sql).run({playerID});
            return true;
        } catch (err) {          // if there was any error
            console.error(err);  // then log it
            return false;        // return false to indicate failure
        }
    }

    emailVerified (playerID) {
        try {
            const sql = `
                UPDATE Players
                SET
                    didVerifyEmail=1
                WHERE
                    playerID=@playerID
            `;
            db.prepare(sql).run({playerID});
            return true;
        } catch (err) {          // if there was any error
            console.error(err);  // then log it
            return false;        // return false to indicate failure
        }
    }

    deletePlayer (playerID) {
        try {
            const sql = `
                DELETE FROM Players
                WHERE
                    playerID=@playerID
            `;
            db.prepare(sql).run({playerID});
            return true;
        } catch (err) {          // if there was any error
            console.error(err);  // then log it
            return false;        // return false to indicate failure
        }
    }

    getPasswordHash (email) {
        try {
            return db.prepare(`
                    SELECT passwordHash 
                    FROM Players 
                    WHERE email=@email
                `).get({email});
        } catch (err) {
            return;
        }
    }

    getPlayerData (playerID) {
        try {
            const sql = `
                SELECT 
                    playerID, playerName, passwordHash, 
                    role, email, didVerifyEmail
                FROM
                    Players
                WHERE
                    playerID=@playerID
            `;
            db.prepare(sql).get({playerID});
            return true;
        } catch (err) {          // if there was any error
            console.error(err);  // then log it
            return false;        // return false to indicate failure
        }
    }

    getPlayers () {
        try {
            const sql = `
                SELECT *
                FROM Players
            `;
            const getAllPlayersStmt = db.prepare(sql);
            
            return getAllPlayersStmt.all();
        } catch (err) {          // if there was any error
            console.error(err);  // then log it
            return [];        // return false to indicate failure
        }
    }
}

const playerModel = new PlayerModel(db);
exports.playerModel = new PlayerModel(db);

    
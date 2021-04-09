"use strict";
const { db } = require("./db");
const uuidV4 = require('uuid').v4; 


class PlayerModel {
    constructor (db) {
        this.db = db;
    }

createPlayer (Player) {
    try {
            // Prepare the insert statement
            const sql = `INSERT INTO Players 
                        (PlayerID, Playername, passwordHash, email) 
                    VALUES 
                        (@PlayerID, @Playername, @passwordHash, @email)
            `;
            const addPlayerStmt = db.prepare(sql);
            
            // Create the Player's id and add it to the Player object
            Player.PlayerID = uuidV4();
            // attempt to add them to the database
            addPlayerStmt.run(Player);
            return true;
        } catch (err) {          // if there was any error
            console.error(err);  // then log it
            return false;        // return false to indicate failure
        }
    }

    changeEmailAddress (newEmailAddr, PlayerID) {
        try {
            const sql = `
                UPDATE Players
                SET
                    email=@newEmail
                WHERE
                    PlayerID=@PlayerID
            `;
            db.prepare(sql).run({
                newEmail: newEmailAddr,
                PlayerID
            });
            return true;
        } catch (err) {          // if there was any error
            console.error(err);  // then log it
            return false;        // return false to indicate failure
        }
    }

    changePlayername (newPlayername, PlayerID) {
        try {
            const sql = `
                UPDATE Players
                SET
                    Playername=@newPlayername
                WHERE
                    PlayerID=@PlayerID
            `;
            db.prepare(sql).run({
                newPlayername,
                PlayerID
            });
            return true;
        } catch (err) {          // if there was any error
            console.error(err);  // then log it
            return false;        // return false to indicate failure
        }
    }

    upgradeToAdmin (PlayerID) {
        try {
            const sql = `
                UPDATE Players
                SET
                    role = 1
                WHERE
                    PlayerID=@PlayerID
            `;
            db.prepare(sql).run({PlayerID});
            return true;
        } catch (err) {          // if there was any error
            console.error(err);  // then log it
            return false;        // return false to indicate failure
        }
    }

    revokeAdmin (PlayerID) {
        try {
            const sql = `
                UPDATE Players
                SET
                    role = 0
                WHERE
                    PlayerID=@PlayerID
            `;
            db.prepare(sql).run({PlayerID});
            return true;
        } catch (err) {          // if there was any error
            console.error(err);  // then log it
            return false;        // return false to indicate failure
        }
    }

    emailVerified (PlayerID) {
        try {
            const sql = `
                UPDATE Players
                SET
                    didVerifyEmail=1
                WHERE
                    PlayerID=@PlayerID
            `;
            db.prepare(sql).run({PlayerID});
            return true;
        } catch (err) {          // if there was any error
            console.error(err);  // then log it
            return false;        // return false to indicate failure
        }
    }

    deletePlayer (PlayerID) {
        try {
            const sql = `
                DELETE FROM Players
                WHERE
                    PlayerID=@PlayerID
            `;
            db.prepare(sql).run({PlayerID});
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

    getPlayerData (PlayerID) {
        try {
            const sql = `
                SELECT 
                    PlayerID, PlayerName, passwordHash, 
                    role, email, didVerifyEmail
                FROM
                    Players
                WHERE
                    PlayerID=@PlayerID
            `;
            db.prepare(sql).get({PlayerID});
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

const PlayerModel = new PlayerModel(db);


exports.PlayerModel = new PlayerModel(db);

    
"use strict";
const { db } = require("./db");
const uuidV4 = require('uuid').v4; 


class ItemModel {
    constructor (db) {
        this.db = db;
    }


    createItem (Item) {
        try {
                // Prepare the insert statement
                const sql = `INSERT INTO Items 
                            (itemID, itemName, itemCategory, itemDescription, Bonus ) 
                        VALUES 
                            (@itemID, @itemName, @itemCategory, @itemDescription, @Bonus  )
                `;
                const addItemStmt = db.prepare(sql);
                
                // Create the Item's id and add it to the Item object
                Item.ItemID = uuidV4();
                // attempt to add them to the database
                addItemStmt.run(Item);
                return true;
            } catch (err) {          // if there was any error
                console.error(err);  // then log it
                return false;        // return false to indicate failure
            }
    }
}
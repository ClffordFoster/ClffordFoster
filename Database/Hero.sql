CREATE TABLE IF NOT EXISTS Players (
    playerID TEXT PRIMARY KEY,
    playerName TEXT UNIQUE NOT NULL,
    passwordHash TEXT NOT NULL,
    role INTEGER NOT NULL DEFAULT 0, -- default to "player" role
    email TEXT UNIQUE NOT NULL,
    didVerifyEmail BOOLEAN NOT NULL DEFAULT 0 -- defaults to unverified
);

CREATE TABLE IF NOT EXISTS Characters (
    -- Identifer's 
    name TEXT NOT NULL,
    characterID TEXT PRIMARY KEY,
    playerID TEXT,
    


    

    --Temp Stats 
    HP Integer,
    SP Integer,
    MP Integer,
    Level INTEGER DEFAULT 1, 
    BLOODIED INTEGER, 

    --ATTRIBUTES
    STR CHECK (STR >=1 and STR <= 30) NOT NULL ,
    CON CHECK (CON >=1 and CON <= 30) NOT NULL ,
    DEX CHECK (DEX >=1 and DEX <= 30) NOT NULL,
    INT CHECK (INT  >=1 and INT <= 30) NOT NULL,
    WIS CHECK (WIS >=1 and WIS <= 30) NOT NULL,
    CHA CHECK (CHA >=1 and CHA <= 30) NOT NULL,
   
   --MODIFERS 
    STR_MOD Integer DEFAULT 0,
    CON_MOD Integer DEFAULT 0,
    DEX_MOD Integer DEFAULT 0,
    INT_MOD Integer DEFAULT 0,
    WIS_MOD Integer DEFAULT 0,
    CHA_MOD Integer DEFAULT 0,

    --SOFTSKILLS
    Speed Integer,
    Perception Integer,
    POISE Integer DEFAULT 3,

    -- DEF STATS
    ARM Integer DEFAULT 11,
    EVA INTEGER DEFAULT 10, 
    TGH INTEGER DEFAULT 10, 
    DR INTEGER DEFAULT -1,
    
    --generalInformation
    background TEXT,  
    age TEXT NOT NULL,
    height TEXT NOT NULL,
    weight TEXT NOT NULL,
    race TEXT NOT NULL,
    subClass TEXT, 
    trade TEXT, 
    Title TEXT,
    SkillPoints TEXT,
    EXP TEXT,
    TNL TEXT,
    Personality TEXT, 
    Origin TEXT,
    Languages TEXT, 
    



    -- skills, subclass, perks, and inventory 
    FOREIGN KEY (playerID) REFERENCES Players(playerID)   
);

CREATE TABLE IF NOT EXISTS Skills(
    characterID TEXT,
    skillID TEXT PRIMARY KEY,
    skillName TEXT,
    skillDescription TEXT, 
    skillLevel Integer, 
    category TEXT,
    FOREIGN KEY (characterID) REFERENCES Characters(characterID)  


);

CREATE TABLE IF NOT EXISTS Perks(
    characterID TEXT,
    perkID TEXT PRIMARY KEY,
    perkName TEXT, 
    perkCatergory Text,
    perkDiscription TEXT,
    FOREIGN KEY (characterID) REFERENCES Characters(characterID)  


);

CREATE TABLE IF NOT EXISTS Items(
    characterID TEXT,
    itemID TEXT PRIMARY KEY,
    itemName TEXT,
    itemCategory TEXT,
    itemDescription TEXT,
    FOREIGN KEY (characterID) REFERENCES Characters(characterID)  



);
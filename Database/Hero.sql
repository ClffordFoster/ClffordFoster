CREATE TABLE IF NOT EXISTS Players (
    PlayerID TEXT PRIMARY KEY,
    Playername TEXT UNIQUE NOT NULL,
    passwordHash TEXT NOT NULL,
    role INTEGER NOT NULL DEFAULT 0, -- default to "Player" role
    email TEXT UNIQUE NOT NULL,
    didVerifyEmail BOOLEAN NOT NULL DEFAULT 0 -- defaults to unverified
);

CREATE TABLE IF NOT EXISTS Characters (
    -- Identifer's 
    name TEXT NOT NULL,
    characterID TEXT PRIMARY KEY,
    FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID),

    

    --Temp Stats 
    HP Integer,
    SP Integer,
    MP Integer,
    Level INTEGER DEFAULT 1, 
    BLOODIED INTEGER, 

    --ATTRIBUTES
    STR (STR >=1 and STR <= 30) NOT NULL ,
    CON (CON >=1 and CON <= 30) NOT NULL ,
    DEX (DEX >=1 and DEX <= 30) NOT NULL,
    INT (INT  >=1 and INT <= 30) NOT NULL,
    WIS (WIS >=1 and WIS <= 30) NOT NULL,
    CHA (CHA >=1 and CHA <= 30) NOT NULL,
   
   --MODIFERS 
    STR_MOD Integer DEFAULT 0,
    CON_MOD Integer DEFAULT 0,
    DEX_MOD Integer DEFAULT 0,
    INT_MOD Integer DEFAULT 0,
    WIS_MOD Integer DEFAULT 0,
    CHA_MOD Integer DEFAULT 0,

    --SOFTSKILLS
    Speed Integer,
    Perceptiion Integer,
    POISE Integer DEFAULT 3,

    -- DEF STATS
    ARM Integer DEFAULT 11,
    EVA INTEGER DEFAULT 10, 
    TGH INTEGER DEFAULT 10, 
    DR INTEGER DEFAULT -1 
    
    --generalInformation
    characterbackground TEXT,  
    age TEXT NOT NULL,
    height TEXT NOT NULL,
    weight TEXT NOT NULL,
    race TEXT NOT NULL,
    subClass TEXT, 
    trade TEXT, 
    Title TEXT,
    SkillPoints TEXT,
    EXP Integer,
    TNL Integer,
    Personality TEXT, 
    Orgin TEXT,
    Languages TEXT, 
    



    -- skills, subclass, perks, and inventory 
    FOREIGN KEY (skillID) REFERENCES Skills(skillID),
    FOREIGN KEY (perkID) REFERENCES Perks(perkID),
    FOREIGN KEY (itemID) REFERENCES Items(itemID),
    
);

CREATE TABLE IF NOT EXISTS Skills(
    skillID TEXT PRIMARY KEY,
    skillName TEXT,
    skillDescription TEXT, 
    skillLevel Integer, 
    category TEXT, 



);

CREATE TABLE IF NOT EXISTS Perks(
    perkID TEXT PRIMARY KEY,
    perkName TEXT, 
    perkCatergory Text,
    perkDiscription TEXT,


);

CREATE TABLE IF NOT EXISTS Items(
    itemID TEXT PRIMARY KEY,
    itemName TEXT,
    itemCategory TEXT,
    itemDescription TEXT,
    Bonus           Integer,   



);
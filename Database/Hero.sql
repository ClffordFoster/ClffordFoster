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
    baseHP INTEGER GENERATED ALWAYS AS (
        baseCON +baseSTR
    )STORED,

    HP INTEGER GENERATED ALWAYS AS (
        baseHP +hpBonus
    )STORED,

    baseSP INTEGER GENERATED ALWAYS AS (
        baseCON +baseDEX
    )STORED,

    SP INTEGER GENERATED ALWAYS AS (
        baseSP +spBonus
    )STORED,

     baseMP INTEGER GENERATED ALWAYS AS (
        CASE
            WHEN baseWIS > baseINT
                THEN baseCON + baseWIS
            WHEN baseINT > baseWIS
                THEN baseCON +baseINT
        END
    )STORED,

    MP INTEGER GENERATED ALWAYS AS (
        baseMP +mpBonus
    )STORED,

    Level INTEGER DEFAULT 1, 

    BLOODIED INTEGER GENERATED ALWAYS AS(
        HP / 2
    )STORED,

    --ATTRIBUTES
    baseSTR INTEGER CHECK (baseSTR >=1 and baseSTR <= 30) NOT NULL ,
    baseCON INTEGER CHECK (baseCON >=1 and baseCON <= 30) NOT NULL ,
    baseDEX INTEGER CHECK (baseDEX >=1 and baseDEX <= 30) NOT NULL,
    baseINT INTEGER CHECK (baseINT  >=1 and baseINT <= 30) NOT NULL,
    baseWIS INTEGER CHECK (baseWIS >=1 and baseWIS <= 30) NOT NULL,
    baseCHA INTEGER CHECK (baseCHA >=1 and baseCHA <= 30) NOT NULL,

    --MODIFERS
    STR INTEGER GENERATED ALWAYS AS (
        CASE
            WHEN baseSTR + strBonus > 30
                THEN  30
            ELSE baseSTR + strBonus
        END    
    )STORED,

    str_mod INTEGER GENERATED ALWAYS AS (
        CASE
            WHEN STR = 1
                THEN -5
            WHEN STR BETWEEN 2 AND 3
                THEN -4
            WHEN STR BETWEEN 4 AND 5
                THEN -3
            WHEN STR BETWEEN 6 AND 7
                THEN -2
            WHEN STR BETWEEN 8 AND 9
                THEN -1
            WHEN STR BETWEEN 10 AND 11
                THEN 0
            WHEN STR BETWEEN 12 AND 13
                THEN 1
            WHEN STR BETWEEN 14 AND 15
                THEN 2
            WHEN STR BETWEEN 16 AND 17
                THEN 3
            WHEN STR BETWEEN 18 AND 19
                THEN 4
            WHEN STR BETWEEN 20 AND 21
                THEN 5
            WHEN STR BETWEEN 22 AND 23
                THEN 6
            WHEN STR BETWEEN 24 AND 25
                THEN 7
            WHEN STR BETWEEN 26 AND 27
                THEN 8
            WHEN STR BETWEEN 28 AND 29
                THEN 9
            WHEN STR = 30
                THEN 10
            ELSE -1
        END
    ) STORED,

    CON INTEGER GENERATED ALWAYS AS (
       CASE
            WHEN baseCON + conBonus > 30
                THEN 30
            ELSE baseCON + conBonus
        END    
    )STORED,

    con_mod INTEGER GENERATED ALWAYS AS (
        CASE
            WHEN CON = 1
                THEN -5
            WHEN CON BETWEEN 2 AND 3
                THEN -4
            WHEN CON BETWEEN 4 AND 5
                THEN -3
            WHEN CON BETWEEN 6 AND 7
                THEN -2
            WHEN CON BETWEEN 8 AND 9
                THEN -1
            WHEN CON BETWEEN 10 AND 11
                THEN 0
            WHEN CON BETWEEN 12 AND 13
                THEN 1
            WHEN CON BETWEEN 14 AND 15
                THEN 2
            WHEN CON BETWEEN 16 AND 17
                THEN 3
            WHEN CON BETWEEN 18 AND 19
                THEN 4
            WHEN CON BETWEEN 20 AND 21
                THEN 5
            WHEN CON BETWEEN 22 AND 23
                THEN 6
            WHEN CON BETWEEN 24 AND 25
                THEN 7
            WHEN CON BETWEEN 26 AND 27
                THEN 8
            WHEN CON BETWEEN 28 AND 29
                THEN 9
            WHEN CON = 30
                THEN 10
            ELSE -1
        END
    ) STORED,

    DEX INTEGER GENERATED ALWAYS AS (
        CASE
            WHEN baseDEX + dexBonus > 30
                THEN 30
            ELSE baseDEX + dexBonus
        END    
    )STORED,

    dex_mod INTEGER GENERATED ALWAYS AS (
        CASE
            WHEN DEX = 1
                THEN -5
            WHEN DEX BETWEEN 2 AND 3
                THEN -4
            WHEN DEX BETWEEN 4 AND 5
                THEN -3
            WHEN DEX BETWEEN 6 AND 7
                THEN -2
            WHEN DEX BETWEEN 8 AND 9
                THEN -1
            WHEN DEX BETWEEN 10 AND 11
                THEN 0
            WHEN DEX BETWEEN 12 AND 13
                THEN 1
            WHEN DEX BETWEEN 14 AND 15
                THEN 2
            WHEN DEX BETWEEN 16 AND 17
                THEN 3
            WHEN DEX BETWEEN 18 AND 19
                THEN 4
            WHEN DEX BETWEEN 20 AND 21
                THEN 5
            WHEN DEX BETWEEN 22 AND 23
                THEN 6
            WHEN DEX BETWEEN 24 AND 25
                THEN 7
            WHEN DEX BETWEEN 26 AND 27
                THEN 8
            WHEN DEX BETWEEN 28 AND 29
                THEN 9
            WHEN DEX = 30
                THEN 10
            ELSE -1
        END
    ) STORED,

    INT INTEGER GENERATED ALWAYS AS (
        CASE
            WHEN baseINT + intBonus > 30
                THEN 30
            ELSE baseINT + intBonus
        END    
    )STORED,

    int_mod INTEGER GENERATED ALWAYS AS (
        CASE
            WHEN INT = 1
                THEN -5
            WHEN INT BETWEEN 2 AND 3
                THEN -4
            WHEN INT BETWEEN 4 AND 5
                THEN -3
            WHEN INT BETWEEN 6 AND 7
                THEN -2
            WHEN INT BETWEEN 8 AND 9
                THEN -1
            WHEN INT BETWEEN 10 AND 11
                THEN 0
            WHEN INT BETWEEN 12 AND 13
                THEN 1
            WHEN INT BETWEEN 14 AND 15
                THEN 2
            WHEN INT BETWEEN 16 AND 17
                THEN 3
            WHEN INT BETWEEN 18 AND 19
                THEN 4
            WHEN INT BETWEEN 20 AND 21
                THEN 5
            WHEN INT BETWEEN 22 AND 23
                THEN 6
            WHEN INT BETWEEN 24 AND 25
                THEN 7
            WHEN INT BETWEEN 26 AND 27
                THEN 8
            WHEN INT BETWEEN 28 AND 29
                THEN 9
            WHEN INT = 30
                THEN 10
            ELSE -1
        END
    ) STORED,

    WIS INTEGER GENERATED ALWAYS AS (
        CASE
            WHEN baseWIS + wisBonus > 30
                THEN 30
            ELSE baseWIS + wisBonus
        END    
    )STORED,

    wis_mod INTEGER GENERATED ALWAYS AS (
        CASE
            WHEN WIS = 1
                THEN -5
            WHEN WIS BETWEEN 2 AND 3
                THEN -4
            WHEN WIS BETWEEN 4 AND 5
                THEN -3
            WHEN WIS BETWEEN 6 AND 7
                THEN -2
            WHEN WIS BETWEEN 8 AND 9
                THEN -1

            WHEN WIS BETWEEN 10 AND 11
                THEN 0
            WHEN WIS BETWEEN 12 AND 13
                THEN 1
            WHEN WIS BETWEEN 14 AND 15
                THEN 2
            WHEN WIS BETWEEN 16 AND 17
                THEN 3
            WHEN WIS BETWEEN 18 AND 19
                THEN 4
            WHEN WIS BETWEEN 20 AND 21
                THEN 5
            WHEN WIS BETWEEN 22 AND 23
                THEN 6
            WHEN WIS BETWEEN 24 AND 25
                THEN 7
            WHEN WIS BETWEEN 26 AND 27
                THEN 8
            WHEN WIS BETWEEN 28 AND 29
                THEN 9
            WHEN WIS  = 30
                THEN 10
            ELSE -1
        END
    ) STORED,
    
    CHA INTEGER GENERATED ALWAYS AS (
        CASE
            WHEN baseCHA + chaBonus > 30
                THEN 30
            ELSE baseCHA + chaBonus
        END    
    )STORED,
    cha_mod INTEGER GENERATED ALWAYS AS (
        CASE
            WHEN CHA BETWEEN 10 AND 11
                THEN 0
            WHEN CHA BETWEEN 12 AND 13
                THEN 1
            WHEN CHA BETWEEN 14 AND 15
                THEN 2
            WHEN CHA BETWEEN 16 AND 17
                THEN 3
            WHEN CHA BETWEEN 18 AND 19
                THEN 4
            WHEN CHA BETWEEN 20 AND 21
                THEN 5
            WHEN CHA BETWEEN 22 AND 23
                THEN 6
            WHEN CHA BETWEEN 24 AND 25
                THEN 7
            WHEN CHA BETWEEN 26 AND 27
                THEN 8
            WHEN CHA BETWEEN 28 AND 29
                THEN 9
            WHEN CHA  = 30
                THEN 10
            ELSE -1
        END
    ) STORED,

    --SOFTSKILLS
    baseSpeed INTEGER GENERATED ALWAYS AS (
         dex_mod + 3
    )STORED,

    basePerception INTEGER GENERATED ALWAYS AS (
         wis_mod + 3
    )STORED,

    basePoise INTEGER DEFAULT 3,

    Speed INTEGER GENERATED ALWAYS AS(
        baseSpeed + speedBonus
    )STORED,

    Perception INTEGER GENERATED ALWAYS AS(
        basePerception + perceptionBonus
    )STORED,

     Poise INTEGER GENERATED ALWAYS AS(
        basePoise + poiseBonus
    )STORED,

    -- DEF STATS
    baseARM Integer DEFAULT 11,
    ARM INTEGER GENERATED ALWAYS AS (
        baseARM + armBonus 
    )STORED,

    baseEVA INTEGER GENERATED ALWAYS AS(
        CASE
            WHEN INT > DEX
                THEN 10 + int_mod
            WHEN DEX > INT
                THEN 10 + dex_mod
        END
    )STORED,

    EVA INTEGER GENERATED ALWAYS AS (
        baseEVA + evaBonus 
    )STORED,


     baseTGH INTEGER GENERATED ALWAYS AS(
        CASE
            WHEN STR > CON
                THEN 10 + str_mod
            WHEN CON > STR
                THEN 10 + con_mod
        END
    )STORED,

    TGH INTEGER GENERATED ALWAYS AS (
        baseTGH + tghBonus 
    )STORED,

    baseDR INTEGER DEFAULT -1,
    DR INTEGER GENERATED ALWAYS AS (
        baseDR + drBonus 
    )STORED,

    --Bonus
    strBonus INTEGER DEFAULT 0,
    conBonus INTEGER DEFAULT 0,
    dexBonus INTEGER DEFAULT 0,
    chaBonus INTEGER DEFAULT 0,
    intBonus INTEGER DEFAULT 0,
    wisBonus INTEGER DEFAULT 0,
    hpBonus INTEGER DEFAULT 0,
    spBonus  INTEGER DEFAULT 0,
    mpBonus INTEGER DEFAULT 0,
    speedBonus INTEGER DEFAULT 0,
    poiseBonus INTEGER DEFAULT 0,
    perceptionBonus INTEGER DEFAULT 0,
    armBonus INTEGER DEFAULT 0,
    evaBonus INTEGER DEFAULT 0, 
    tghBonus INTEGER DEFAULT 0, 
    drBonus INTEGER DEFAULT 0,
    
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
    skillCategory TEXT,
    FOREIGN KEY (characterID) REFERENCES Characters(characterID)  
);

CREATE TABLE IF NOT EXISTS Perks(
    characterID TEXT,
    perkID TEXT PRIMARY KEY,
    perkName TEXT, 
    perkCatergory Text,
    perkDiscription TEXT,
    --Bonus
    strBonus INTEGER DEFAULT 0,
    conBonus INTEGER DEFAULT 0,
    dexBonus INTEGER DEFAULT 0,
    chaBonus INTEGER DEFAULT 0,
    intBonus INTEGER DEFAULT 0,
    wisBonus INTEGER DEFAULT 0,
    hpBonus INTEGER DEFAULT 0,
    spBonus  INTEGER DEFAULT 0,
    mpBonus INTEGER DEFAULT 0,
    speedBonus INTEGER DEFAULT 0,
    poiseBonus INTEGER DEFAULT 0,
    perceptionBonus INTEGER DEFAULT 0,
    armBonus INTEGER DEFAULT 0,
    evaBonus INTEGER DEFAULT 0, 
    tghBonus INTEGER DEFAULT 0, 
    drBonus INTEGER DEFAULT 0,
    FOREIGN KEY (characterID) REFERENCES Characters(characterID)  
);

CREATE TABLE IF NOT EXISTS Items(
    characterID TEXT,
    itemID TEXT PRIMARY KEY,
    itemName TEXT NOT NULL,
    itemCategory TEXT NOT NULL,
    itemDescription TEXT NOT NULL,
    
    --BONUS
    strBonus INTEGER DEFAULT 0,
    conBonus INTEGER DEFAULT 0,
    dexBonus INTEGER DEFAULT 0,
    chaBonus INTEGER DEFAULT 0,
    intBonus INTEGER DEFAULT 0,
    wisBonus INTEGER DEFAULT 0,
    hpBonus INTEGER DEFAULT 0,
    spBonus  INTEGER DEFAULT 0,
    mpBonus INTEGER DEFAULT 0,
    speedBonus INTEGER DEFAULT 0,
    poiseBonus INTEGER DEFAULT 0,
    perceptionBonus INTEGER DEFAULT 0,
    armBonus INTEGER DEFAULT 0,
    evaBonus INTEGER DEFAULT 0, 
    tghBonus INTEGER DEFAULT 0, 
    drBonus INTEGER DEFAULT 0,
    FOREIGN KEY (characterID) REFERENCES Characters(characterID)  
);

CREATE TABLE IF NOT EXISTS INVENTORY(
    characterID TEXT,
    itemID TEXT, 
    equipped BOOLEAN
);
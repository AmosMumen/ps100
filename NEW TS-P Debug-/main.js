'use strict';
// Merged Protoss Scripts v1.09a
/*
*
*
*       //////////  //////////  //////////  //////////  //////////  //////////  //////////
*       //      //  //      //  //      //      //      //      //  //          //
*       //      //  //     //   //      //      //      //      //  //          //
*       /////////   ////////    //      //      //      //      //  //////////  //////////
*       //          //    \\    //      //      //      //      //          //          //
*       //          //     \\   //      //      //      //      //          //          //
*       //          //      \\  //////////      //      //////////  //////////  //////////
*
*       Templar Collective      -==[ Version 1.09a]==- 
*           by: AmOs // MuMen // James Bowen ]-[ 20-2-2019
*           towers by: Orlet
*           script usages from: Muon's Overmind
*                               Orlet's snippets Spawn switch / Tech level switch / Body Creator function
*                               Misc @Screeps Slack chat
*                               
*
*                         (({{ Screeps MMO Public Server edition }}))  --  Current use: Shard 3 (20 cpu) - (Now Includes Empty Bucket Throttle) + (Market System - BETA)
*                                                                                                                       (Boost Labs - BETA)
*                                            ***  Live  ***
*/



/* 
*                --------====[[[[[[[[[[[[  FLAGS -=-  Index of Flags and Operations  ]]]]]]]]]]]]====----------
*
*                PURPLE   ------
*                   Purple // Purple  -  Summon Claimer and send to Flagged room to CLAIM room controller
*
*                   Purple // White   -  Summon Claimer and send to Flagged room to RESERVE room controller (Harvesting)
*
*
*                BLUE    -------
*                    Blue // Green   -  Summon Healer Templar and send to Flagged room.  Heals wounded - selects a melee friendly to follow if present.
*                                        Otherwise - If present -->  Goes to flag HealerMover (White/White) and maintains position healing any who are near.baseBuilder
*
*                    Blue // Purple  -  Summon Melee Zealot and send to Flagged room to defend / hold room / Attack anything directly on the position of
*                                        flag StrikeTeam (White/White)
*
*
*                YELLOW  -------
*                    Yellow // Cyan  -  Summon Builder and send to Flagged room. Will respawn in the same room by dropping this flag before death.
*                                        Performs building and repairing functions.
*
*                    Yellow // Blue  -  Summon Harvesting Team -  1 Probe per source(Requires Containers) 1 Assimilator to move the energy back to the room of origin.
*                                        Each of the team members will drop this flag before death - ensuring their respawn and reallocation to the target room.
*
*                    Yellow // Orange - Summon Two Builders and send to Flagged room.  Same builder operation as Yellow // Cyan flag.  Only 1 builder will respawn.
*
*                    Yellow // Brown  - Summon Two Assimilators and send to Flagged room.  Same function as Yellow // Orange flag. Before death these will drop the
*                                        flag Yellow // Blue which will summon the Harvesting Team (Probes and Assmiliator(1)).
*
*
*                ORANGE ------
*                    Orange // Orange - Summon Power Creep into Flagged room.  Must have Power Spawn in room. Name of this Flag is the Power Creep's name.                        
*
*
*                RED     -------
*                    Red // Blue -  Summon a small Zealot(Cannon Fodder) and send to Flagged room.  Name of this Flag determines the base of origin
*
*                    Red // Purple - Summon small Zealot ---  Name of this Flag determines the base of origin
*
*                    Red // Blue   - Summon Zealot as Source Keeper Sentry (Requires summoning a Healer Templer also Blue // Green)
*                                     Name of this Flag determines the base of origin
*
*
*                WHITE   --------                room.name -->  Destination Room Name
*                    White // White - Miscellanious Named Flags 
*                                        ('Trade-' + room.name) --  Manually transfer resources room to room.  Example:  'Trade-E11N11'   Placed in room E5N5 sends TO E11N11.
*                                                                       Placement Selection:   energy by default (any room position except the listed below)
*                                                                                                pos x: 10, y: 10  -  send Power
*                                                                                                    x: 20, y: 20  -  send Hydrogen  (More to come)
*
*                                        ('Build-')  --  Place on the first spawn of the room.  Builds 10x10 base, requires 10x10 available squares (First spawn on bottom left of 10x10)
*                                        ('Nuke-' + room.name)  --  Launch Nuke to Destination room - performs exactly as Trade-  flag does.  Name with Destination,  place in room of origin. 
*                                        ('Idle-' + powerCreep.name) -- Lock in Idle position for Power Creep.  Generally a strategic position adjcent to Storage Structure.
*                                        ('Power-Assim')  -- Lock into room memory the location for Power Assimilator post. Generally off the roads - adjcent to Terminal or Power Spawn(or between them both)
*                                        ('Boost-Here') -- Once labs are built - use this flag to lock into room memory the location among the labs for creeps to recieve boosting.
*                                        ('StrikeTeam')  --  Marks the target for all available Zealot types to attack to.
*                                        ('HealerMover')  --  Lock in position for Healers 
*
*                    White // Yellow - Link Flags  ('AssimLink' + room.name), ('Link1-' + room.name) ('Link2-' + room.name)
*
*                    White // Purple - Set upgrader's fixed position
*
*
*
*
 */
















//-=-=-=-=-=-=-=-=-=-=--=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-\\
/*    _  _  _                      _______                      _             
*    | || || |                    (_______)                _   (_)            
*    | || || | ____  ____ ____     _____ _   _ ____   ____| |_  _  ___  ____  
*    | ||_|| |/ _  |/ ___)  _ \   |  ___) | | |  _ \ / ___)  _)| |/ _ \|  _ \ 
*    | |___| ( ( | | |   | | | |  | |   | |_| | | | ( (___| |__| | |_| | | | |
*     \______|\_||_|_|   | ||_/   |_|    \____|_| |_|\____)\___)_|\___/|_| |_|
*                        |_|                                                  
*//// Warp(Spawn) Manager \\\\ -=============================================-  
const warpVisuals = function () {

    if (!Memory.utils || !Memory.utils.warpVisuals) {

        if (!Memory.utils) Memory.utils = {};
        Memory.utils.warpVisuals = {};

        Memory.utils.warpVisuals['probe'] = { icon: '☀️  ', x: 0.86, y: 0.25 };
        Memory.utils.warpVisuals['probefar'] = { icon: '🔀☀️ ', x: 0.86, y: 0.25 };
        Memory.utils.warpVisuals['assimfar'] = { icon: '🔀📦 ', x: 0.86, y: 0.25 };
        Memory.utils.warpVisuals['bldfar'] = { icon: '🔀🔨 ', x: 0.86, y: 0.25 };
        Memory.utils.warpVisuals['assim'] = { icon: '📦  ', x: 0.86, y: 0.25 };
        Memory.utils.warpVisuals['upgrader'] = { icon: '🔮  ', x: 0.86, y: 0.25 };
        Memory.utils.warpVisuals['builder'] = { icon: '🔨  ', x: 0.84, y: 0.25 };
        Memory.utils.warpVisuals['unique'] = { icon: '🛠️ ', x: 0.86, y: 0.25 };
        Memory.utils.warpVisuals['extraction'] = { icon: '🔩 ', x: 0.86, y: 0.25 };
        Memory.utils.warpVisuals['pwrassim'] = { icon: '⭕ ', x: 0.86, y: 0.25 };
        Memory.utils.warpVisuals['zealotfar'] = { icon: '🔱  ', x: 0.88, y: 0.25 };
        Memory.utils.warpVisuals['smallzealot'] = { icon: '🔱  ', x: 0.88, y: 0.25 };
        Memory.utils.warpVisuals['templarpriest'] = { icon: '🔱  ', x: 0.88, y: 0.25 };

    }

    for (const name in Game.spawns) {
        const spawn = Game.spawns[name];

        if (spawn.spawning) {
            
            const spawningCreep = Game.creeps[spawn.spawning.name];
            const final = Math.floor(spawn.spawning.remainingTime * 100 / spawn.spawning.needTime + (-100)) * -1;

            let roles = Memory.utils.warpVisuals[spawningCreep.memory.role];

            if (!Memory.utils.warpVisuals[spawningCreep.memory.role]) roles = Memory.utils.warpVisuals['unique'];

            spawn.room.visual.text(roles.icon + final + '%', spawn.pos.x + roles.x, spawn.pos.y + 0.25,
                        { align: 'center', opacity: 0.9 });
            
        }
    }
};












const warpUnitsV2 = function (pW) {

    /// Spawn Variables \\\ -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    let dSource; // Desired Source Target
    let dContX;
    let dContY;
    let ii;

    if (pW.memory.timers === undefined) {
        pW.memory.myRoom = 1;
        pW.memory.timers = {};
        pW.memory.timers.gtCycle = 1;
        // --===>> Probe Time to Live Call Advance (Default: 80 ticks)
        // Currently - change this in Memory tab    \\    
        pW.memory.timers.probeTimer = 80;
        pW.memory.timers.energyAttackTimer = 1;
        pW.memory.timers.upgrade = true;
        
        pW.memory.repairs = 250000;
        pW.memory.containers = {};
        pW.memory.links = {};

        if (Memory.observatory === undefined) {
            Memory.observatory = {};
            Memory.observatory.home = {};
        }

    }

    if (pW.memory.labs === undefined) {

        pW.memory.labs = {};
        pW.memory.labs.loc = {};
        pW.memory.labs.boosting = false;

    }

    if (pW.memory.utils === undefined) {

        pW.memory.utils = {};
        pW.memory.utils['storing'] = { storageFill: true, terminalFill: true };
        pW.memory.utils.boosting = {};
        pW.memory.utils.boosting['probe'] = { boost: false };
        pW.memory.utils.boosting['probefar'] = { boost: false };
        pW.memory.utils.boosting['assimfar'] = { boost: false };
        pW.memory.utils.boosting['bldfar'] = { boost: false };
        pW.memory.utils.boosting['assim'] = { boost: false };
        pW.memory.utils.boosting['upgrader'] = { boost: false };
        pW.memory.utils.boosting['builder'] = { boost: false };
        pW.memory.utils.boosting['unique'] = { boost: false };
        pW.memory.utils.boosting['pwrassim'] = { boost: false };
        pW.memory.utils.boosting['extraction'] = { boost: false };
        pW.memory.utils.boosting['zealotfar'] = { boost: false };
        pW.memory.utils.boosting['smallzealot'] = { boost: false };
        pW.memory.utils.boosting['templarpriest'] = { boost: false };
        pW.memory.utils.boosting['stalker'] = { boost:false };

    }


    if (pW.storage && !pW.memory.utils['storing'].storageFill && pW.storage.store['energy'] < 10000) pW.memory.utils['storing'].storageFill = true;
    if (pW.storage && pW.memory.utils['storing'].storageFill && pW.storage.store['energy'] > 950000) pW.memory.utils['storing'].storageFill = false;

    if (pW.terminal && !pW.memory.utils['storing'].terminalFill && pW.terminal.store['energy'] < 50000) pW.memory.utils['storing'].terminalFill = true;
    if (pW.terminal && pW.memory.utils['storing'].terminalFill && pW.terminal.store['energy'] > 100000) pW.memory.utils['storing'].terminalFill = false;


    if (pW.memory.labs.type && Game.time % 5 === 0) {

        let i = 0;
        /* pW.memory.labs.type.Dismantel,
        pW.memory.labs.type.MOVE,
        pW.memory.labs.type.TOUGH; */

        const labs = [pW.memory.labs.type.ATTACK,
        pW.memory.labs.type.Harvest,
        pW.memory.labs.type.Capacity,
        pW.memory.labs.type.Ranged,
        pW.memory.labs.type.Build,
        pW.memory.labs.type.Heal,
        pW.memory.labs.type.Upgrade];

        while (i < labs.length) {

            if (Game.getObjectById(labs[i]).mineralAmount === 3000) {

                switch (i) {

                    case 0:
                        pW.memory.utils.boosting['zealotfar'].boost = true;
                        pW.memory.utils.boosting['smallzealot'].boost = true;
                        break;

                    case 1:
                        pW.memory.utils.boosting['probe'].boost = true;
                        pW.memory.utils.boosting['extraction'].boost = true;
                        break;

                    case 2:
                        pW.memory.utils.boosting['assimfar'].boost = true;
                        pW.memory.utils.boosting['assim'].boost = true;
                        break;

                    case 3:
                        pW.memory.utils.boosting['stalker'].boost = true;
                        break;

                    case 4:
                        pW.memory.utils.boosting['builder'].boost = true;
                        pW.memory.utils.boosting['bldfar'].boost = true;
                        break;

                    case 5:
                        pW.memory.utils.boosting['templarpriest'].boost = true;
                        break;

                    case 6:
                        pW.memory.utils.boosting['upgrader'].boost = true;

                }

            }

            if (Game.getObjectById(labs[i]).mineralAmount < 60) {

                switch (i) {

                    case 0:
                        pW.memory.utils.boosting['zealotfar'].boost = false;
                        pW.memory.utils.boosting['smallzealot'].boost = false;
                        break;

                    case 1:
                        pW.memory.utils.boosting['probe'].boost = false;
                        pW.memory.utils.boosting['extraction'].boost = false;
                        break;

                    case 2:
                        pW.memory.utils.boosting['assimfar'].boost = false;
                        pW.memory.utils.boosting['assim'].boost = false;
                        break;

                    case 3:
                        pW.memory.utils.boosting['stalker'].boost = false;
                        break;

                    case 4:
                        pW.memory.utils.boosting['builder'].boost = false;
                        pW.memory.utils.boosting['bldfar'].boost = false;
                        break;

                    case 5:
                        pW.memory.utils.boosting['templarpriest'].boost = false;
                        break;

                    case 6:
                        pW.memory.utils.boosting['upgrader'].boost = false;

                }

            }

            i++;
        }

    }

            








    // Hostile Creeps   ------   War zone   -------   Safe Mode Setup \\

    if (Game.flags.EnergyAttackOn && Game.flags.EnergyAttackOn.pos.roomName === name) {
        if (Game.time > pW.memory.timers.energyAttackTimer) {
            pW.createFlag(25, 25, 'HealRoom', COLOR_BLUE, COLOR_GREEN);
            Game.flags.HealRoom.setPosition(new RoomPosition(30, 3, 'E13N14'));
        }
        if (Game.time === pW.memory.timers.energyAttackTimer + 3) {
            pW.createFlag(25, 25, '' + pW.name + '', COLOR_RED, COLOR_PURPLE);
        }
        if (Game.time > pW.memory.timers.energyAttackTimer + 3) {
            Game.flags[pW.name].setPosition(new RoomPosition(30, 3, 'E13N13'));
            pW.memory.timers.energyAttackTimer = Game.time + 1508;
        }
    }



    if (Game.time % 3 === 0) {
        const hAC = pW.find(FIND_HOSTILE_CREEPS, {
            filter: s => ((s.getActiveBodyparts(ATTACK) > 0 ||
                s.getActiveBodyparts(CLAIM) > 0 ||
                s.getActiveBodyparts(RANGED_ATTACK) > 0)) && 
                s.owner.username !== 'Deltazulu' && s.owner.username !== 'TungstenShield' && s.owner.username !== 'FaMoS'});

        if (hAC[0]) {

            const towers = _.sum(Game.structures, t => t.room.name === pW.name && t.structureType === 'tower' && t.energy > 350);
            if (towers < 3) pW.createFlag(hAC[0].pos.x, hAC[0].pos.y, pW.name, COLOR_BLUE, COLOR_PURPLE);  

            if (Game.time % 20 === 0) {

                if (pW.memory.SafeMode === undefined) {
                    pW.memory.SafeMode = 1;
                    return;
                }
                if (pW.memory.SafeMode > 0) { 
                    if (pW.memory.SafeMode >= 7) pW.controller.activateSafeMode();
                    pW.memory.SafeMode++;               
                }
            }
        }



        if (!hAC[0]) { 
            pW.memory.SafeMode = undefined;
            if (Game.flags[pW.name] && Game.flags[pW.name].color === COLOR_BLUE) Game.flags[pW.name].remove();
        }
    }
    //======================================//




















    // Working Creep count on each source Unique(1-3) or Probe(4-8)
    const srcxp = _.sum(Game.creeps, (c) => c.memory.role === 'probe' && c.memory.wSource === pW.memory.src1Id);
    const srcyp = _.sum(Game.creeps, (c) => c.memory.role === 'probe' && c.memory.wSource === pW.memory.src2Id);

    /// Role End of Life Timers ///
    const probetimer = _.filter(Game.creeps, (c) => c.memory.role === 'probe' && c.room.name === pW.name && c.ticksToLive < pW.memory.timers.probeTimer);

    /// Role Counts ///
    const upgraders = _.sum(Game.creeps, (c) => c.memory.role === 'upgrader' && c.room.name === pW.name);
    const builders = _.sum(Game.creeps, (c) => c.memory.role === 'builder' && c.room.name === pW.name);
    const repairs = _.sum(Game.creeps, (c) => c.memory.role === 'repairs' && c.room.name === pW.name);
    const probes = _.sum(Game.creeps, (c) => c.memory.role === 'probe' && c.room.name === pW.name);
    const assim = _.sum(Game.creeps, (c) => c.memory.role === 'assim' && c.room.name === pW.name);
    const probesfar = _.sum(Game.creeps, (c) => c.memory.role === 'probefar' && c.memory.hroom === pW.name);
    const builderfar = _.sum(Game.creeps, (c) => c.memory.role === 'bldfar' && c.memory.hroom === pW.name);
    const assimfar = _.sum(Game.creeps, (c) => c.memory.role === 'assimfar' && c.memory.hroom === pW.name);
    const extraction = _.sum(Game.creeps, (c) => c.memory.role === 'extraction' && c.room.name === pW.name);
    const pwrassim = _.sum(Game.creeps, (c) => c.memory.role === 'pwrassim' && c.room.name === pW.name);

    /// Towers && Misc ///
    const towers = _.sum(Game.structures, (t) => t.structureType === 'tower' && t.room.name === pW.name);
    const construct = pW.find(FIND_MY_CONSTRUCTION_SITES); // Site count for Builder Role Production    

    /// Room Visual Log -==-
    pW.visual.text("-=(AmOs Clan)=-", 25, 0, { align: 'center', opacity: 0.4 });
    pW.visual.text(" 🏰:  " + pW.name, 25, 1, { align: 'center', opacity: 0.4 });
    pW.visual.text(" ⚡️:  " + pW.energyAvailable + "/" + pW.energyCapacityAvailable, 25, 2, { align: 'center', opacity: 0.4 });
    pW.visual.text(" ☀️:  " + probes, 1, 1, { align: 'left', opacity: 0.4 });
    pW.visual.text(" 📦:  " + assim, 1, 2, { align: 'left', opacity: 0.4 });
    pW.visual.text(" 🔨:  " + builders, 1, 4, { align: 'left', opacity: 0.4 });
    pW.visual.text(" 🔮:  " + upgraders, 1, 3, { align: 'left', opacity: 0.4 });
    pW.visual.text(" 🔀 ☀️:  " + probesfar, 42, 1, { align: 'left', opacity: 0.4 });
    pW.visual.text(" 🔀 📦:  " + assimfar, 42, 2, { align: 'left', opacity: 0.4 });
    pW.visual.text(" 🔀 🔨:  " + builderfar, 42, 3, { align: 'left', opacity: 0.4 });
    pW.visual.text(" 🔧:  " + repairs, 1, 5, { align: 'left', opacity: 0.4 });
    pW.visual.text(" 🌠:  " + towers, 25, 3, { align: 'right', opacity: 0.4 });
    pW.visual.text(" 🚧:  " + construct.length, 25, 4, { align: 'right', opacity: 0.4 });
    new RoomVisual(pW.name).rect(21.5, -0.75, 7, 1, { fill: 'transparent', stroke: '#f24' });












    /// ---- Room Loop Inner Cycle - Update Essential Information \\\ ----  Cycle Begins ----
    if (Game.time > pW.memory.timers.gtCycle) {
        pW.memory.stage = pW.controller.level; // Controller Level Stored for Creeps use

        // Establish Mineral Deposits
        const minerals = pW.find(FIND_MINERALS);
        if (minerals[0]) {
            if (pW.memory.mineral === undefined) pW.memory.mineral = {};
            pW.memory.mineral = minerals[0].id;

            const exts = _.filter(Game.structures, e => e.room.name === pW.name && e.structureType === 'extractor');
            if (exts[0]) {
                if (pW.memory.extractor === undefined) pW.memory.extractor = {};
                pW.memory.extractor = exts[0].id;
            }
        }

        // Establish Multiple Source.Id into Variables to compare against working creeps
        const sources = pW.find(FIND_SOURCES); // Room Sources
        // Divide id into room memory --
        if (sources.length > 0) {
            pW.memory.src1Id = sources[0].id;
            const scA = sources[0].pos.findInRange(FIND_STRUCTURES, 1, { filter: { structureType: STRUCTURE_CONTAINER } });
            if (scA[0] === undefined && pW.memory.baseBuilder !== undefined && pW.memory.baseBuilder.containers.scA === 1) {
                pW.memory.baseBuilder.containers.scA = 0;
                pW.memory.baseBuilder.timers.buildTimer = 0;
            }
            if (scA[0]) {
                if (pW.memory.containers.s1ContA === undefined) { pW.memory.containers.s1ContA = {} }
                pW.memory.containers.s1ContA.goX = scA[0].pos.x;
                pW.memory.containers.s1ContA.goY = scA[0].pos.y;
            }

            if (sources[1]) {
                pW.memory.src2Id = sources[1].id;
                const scB = sources[1].pos.findInRange(FIND_STRUCTURES, 1, { filter: { structureType: STRUCTURE_CONTAINER } });
                if (scB[0] === undefined && pW.memory.baseBuilder !== undefined && pW.memory.baseBuilder.containers.scB === 1) {
                    pW.memory.baseBuilder.containers.scB = 0;
                    pW.memory.baseBuilder.timers.buildTimer = 0;
                }
                if (scB[0]) {
                    if (pW.memory.containers.s2ContB === undefined) { pW.memory.containers.s2ContB = {} }
                    pW.memory.containers.s2ContB.goX = scB[0].pos.x;
                    pW.memory.containers.s2ContB.goY = scB[0].pos.y;
                }

                if (sources[2]) {
                    pW.memory.src3Id = sources[2].id;

                    if (sources[3]) {
                        pW.memory.src4Id = sources[3].id;
                    }
                }
            }
        }

        /// Links Established
        const upLinkFound = pW.controller.pos.findInRange(FIND_STRUCTURES, 3, { filter: { structureType: STRUCTURE_LINK } });
        if (upLinkFound[0] === undefined && pW.memory.baseBuilder !== undefined && pW.memory.baseBuilder.links.cLink === 1) { 
            pW.memory.baseBuilder.links.cLink = 0;
            pW.memory.baseBuilder.timers.buildTimer = 0;
        }

        if (upLinkFound[0]) {
            
            pW.memory.links.upgrader = upLinkFound[0].id;
            
            if (upLinkFound.length > 1) {
                pW.memory.links.upgrader = pW.controller.pos.findClosestByRange(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_LINK } }).id;
                
            }
            

            if (!Game.flags['AssimLink-'+pW.name]) {
                const linkComplete0 = sources[0].pos.findInRange(FIND_STRUCTURES, 3, { filter: { structureType: STRUCTURE_LINK } });
                const linkComplete1 = sources[1].pos.findInRange(FIND_STRUCTURES, 3, { filter: { structureType: STRUCTURE_LINK } });
    
                if (linkComplete0[0]) {
                    linkComplete0[0].pos.createFlag('AssimLink-'+pW.name, COLOR_WHITE, COLOR_YELLOW);
                }
    
                if (linkComplete1[0]) {
                    linkComplete1[0].pos.createFlag('AssimLink-'+pW.name, COLOR_WHITE, COLOR_YELLOW);
                }
            }
        }


        if (pW.controller.level === 8) {
            const pwr = _.filter(Game.structures, s => s.room.name === pW.name && s.structureType === 'powerSpawn')[0];
            if (pwr) pW.memory.powerSpawn = pwr.id;

            const nuke = _.filter(Game.structures, s => s.room.name === pW.name && s.structureType === 'nuker')[0];
            if (nuke) pW.memory.nuke = nuke.id;


            if (pW.memory.labs && pW.memory.labs.type) {
                pW.memory.timers.gtCycle = Game.time + 30000; ///  --->>  Room Level is 8 AND Labs have been built / stored to memeory - set room cycle to 30k ticks to conserve cpu
                return;
            }
        }


        /// Set Game time cycle these updates
        pW.memory.timers.gtCycle = Game.time + 1000;       
        return;
    }
    // -----=-=-=-=-=-=-=-=-=-  End Inner Cycle -=-=-=-=-=-=-=-=-=-=-=-=--=----- //











    /// -------  If room energy is less than 300, skip to the next room ------ \\\
    if (pW.energyAvailable < 300) return;



    /// Establishing Available Spawn  -=***=-
    const spawn = _.filter(Game.spawns, s => s.room.name === pW.name && !s.spawning)[0];

    if (spawn === undefined) return;
    //------------------------------------------------------------------------------\\


    /// --  Process Room Power -- \\\
    if (pW.memory.powerSpawn) {
        const pS = Game.getObjectById(pW.memory.powerSpawn);
        if (pS.power > 0 && pS.energy > 49) pS.processPower();
    }








    ///////  Begin Warping \\\\\\\


    /// Emergency Warp in Probes ☀️☀️ --- contingency plan to restore functions ///
    if (probes < 1 && Game.time % 10 === 0) {
        if (pW.energyAvailable < getEnergyStatus(spawn) * 200) {
            // Count of creeps attending Source 1,2  - set to dSource(Desired Source)
            if (srcxp < 1) { dSource = pW.memory.src1Id }
            else if (srcyp < 1) { dSource = pW.memory.src2Id }
            else if (srcxp > 0 && srcyp > 0 && probetimer.length > 0) { dSource = probetimer[0].memory.wSource }
            // Set containters and links by sources - set to dCont and dLink
            if (dSource === undefined || pW.memory.containers.s1ContA === undefined) { console.log('Alert! Build Containers!!'); return }
            if (dSource === pW.memory.src1Id) { dContX = pW.memory.containers.s1ContA.goX; dContY = pW.memory.containers.s1ContA.goY }
            if (dSource === pW.memory.src2Id) { dContX = pW.memory.containers.s2ContB.goX; dContY = pW.memory.containers.s2ContB.goY }
            if (dContX === undefined) return;
            warpProbe(spawn, 1, 'Probe-' + Game.time.toString(36), { memory: { role: 'probe', wSource: dSource, x: dContX, y: dContY } });
            return;
        }
    }

    /// Emergency Warp in Assimilator 📦📦 --- contingency plan to restore base functions ///
    if (assim < 1 && Game.time % 20 === 0) {
        if (pW.energyAvailable < getEnergyStatus(spawn) * 200) {
            warpAssim(spawn, 1, getName(), { memory: { role: 'assim' } });
            return;
        }
    }








    //////  Standard Units  \\\\\\

    /// Warp Probes ///  ☀️☀️☀️☀️☀️☀️ ---- Dedicated Mining Probe - (No CARRY parts -- Drops Energy into Containers) ----
    if (probes < 3 && probetimer.length > 0 || probes < 2) {
        // Count of creeps attending Source 1 or 2 - dSource
        if (srcxp < 1) { dSource = pW.memory.src1Id }
        else if (srcyp < 1) { dSource = pW.memory.src2Id }
        else if (srcxp > 0 && srcyp > 0 && probetimer.length > 0) { dSource = probetimer[0].memory.wSource }
        // Set containters by sources - dCont
        if (dSource === undefined || pW.memory.containers.s1ContA === undefined) { console.log('Alert! Build Containers!!'); return }
        if (dSource === pW.memory.src1Id) { dContX = pW.memory.containers.s1ContA.goX; dContY = pW.memory.containers.s1ContA.goY }
        if (dSource === pW.memory.src2Id) { dContX = pW.memory.containers.s2ContB.goX; dContY = pW.memory.containers.s2ContB.goY }
        if (dContX === undefined) { return }
        warpProbe(spawn, getEnergyStatus(spawn), 'Probe-' + Game.time.toString(36), { memory: { role: 'probe', wSource: dSource, x: dContX, y: dContY } });
        return;
    }

    /// Warp Assimilators ///  📦📦📦📦📦📦  ---- Dedicated Energy Transporter.  Assimilates collected energy into usable energy ----
    if (probes > 0 && assim < 2) {
        ii = 1;
        const fdr = pW.find(FIND_DROPPED_RESOURCES, { filter: d => d.resourceType === RESOURCE_ENERGY && d.energy > 2200 });

        if (fdr[0]) ii = 2;
        if (fdr[0] && fdr[0].energy > 2900) ii = 3;
        if (assim < ii){ 
            warpAssim(spawn, getEnergyStatus(spawn), getName(), { memory: { role: 'assim', fillStorage: true } });
            return;
        }
    }

    /// Warp Archons ///  🔮🔮🔮🔮🔮🔮 ---- Dedicated Controller Upgrader (Uses Link / Storage primary)
    if (upgraders < 1 && assim > 0 && pW.energyAvailable === pW.energyCapacityAvailable) {   
        if (pW.controller.level === 8 && pW.controller.ticksToDowngrade < 60000 || pW.controller.level <= 7) {
            pW.memory.timers.upgrade = true;
        }

        else if (pW.controller.level === 8 && pW.controller.ticksToDowngrade > 195000 ) {
            pW.memory.timers.upgrade = false;
        }

        if (pW.memory.timers.upgrade) {
            warpArchon(spawn, getEnergyStatus(spawn), getName(), { memory: { role: 'upgrader' } });
            return;
        }
    }

    /// Warp Builders ///  🔨🔨🔨🔨🔨🔨 ----  Performs Building Fuction until 0 sites remain - Switches to Repairs Function
    if (builders < 1 && construct.length > 0 || builders < 2 && construct.length > 24) {
        warpWorker(spawn, getEnergyStatus(spawn), getName(), { memory: { role: 'builder' } });
        return;
    }

    /// Warp Power Assimilators ///  ⭕⭕⭕    ---- Dedicated Power Transporter.  Assimilates collected power into Power Spawn Processing ----
    if (pW.memory.powerSpawn && pW.energyAvailable === pW.energyCapacityAvailable && pW.terminal.store['power'] > 1300 && pW.terminal.store['energy'] > 50000 && pwrassim < 1) {         
        spawn.spawnCreep(createBody("2c2m"), getName(), { memory: { role: 'pwrassim', moving: true, type: 'p' } });
            return;      
    }

    /// Warp Mineral Miners ///  🔩🔩🔩    ----  Works Extractor for Mineral Resources
    if (pW.memory.extractor !== undefined && pW.energyAvailable === pW.energyCapacityAvailable && extraction < 1) {
        if (Game.getObjectById(pW.memory.mineral).ticksToRegeneration > 40) return;
        warpExtractor(spawn, getEnergyStatus(spawn), getName(), { memory: { role: 'extraction' } });
        return;
    }
    
};














const warpUnitsV1 = function (pW) {
    /// Spawn Variables \\\ -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    let dSource; // Desired Source Target

    //  --===>>  Game Time Inner Loop Recycles (Default: 1000 ticks)
    // Cycle variable found at end of the Inner Loop just below here \\
    if (pW.memory.timers === undefined) {
        pW.memory.myRoom = 1;
        pW.memory.timers = {};
        pW.memory.timers.gtCycle = 1;
        // --===>> Probe Time to Live Call Advance (Default: 80 ticks)
        // Currently - change this in Memory tab    \\    
        pW.memory.timers.probeTimer = 80;
        pW.memory.timers.energyAttackTimer = 1;
        pW.memory.timers.upgrade = true;
        pW.memory.repairs = 250000;
        pW.memory.containers = {};
        pW.memory.links = {};
    };

    if (Game.time % 3 === 0) {
        const hAC = pW.find(FIND_HOSTILE_CREEPS, {
                    filter: s => ((s.getActiveBodyparts(ATTACK) > 0 ||
                        s.getActiveBodyparts(CLAIM) > 0 ||
                        s.getActiveBodyparts(RANGED_ATTACK) > 0)) && 
                        s.owner.username !== 'Deltazulu' && s.owner.username !== 'TungstenShield' && s.owner.username !== 'FaMoS'});

        if (hAC[0]) pW.createFlag(hAC[0].pos.x, hAC[0].pos.y, pW.name, COLOR_BLUE, COLOR_PURPLE);      

        if (!hAC[0]) { 
            pW.memory.SafeMode = undefined;
            if (Game.flags[pW.name] && Game.flags[pW.name].color === COLOR_BLUE) Game.flags[pW.name].remove();
        }

        if(hAC[0] && Game.time % 20 === 0) { 
            
            if (pW.memory.SafeMode === undefined) {
                pW.memory.SafeMode = 1;
                return;
            }
            if (pW.memory.SafeMode > 0) { 
                pW.memory.SafeMode++;
                if (pW.memory.SafeMode >= 5) pW.controller.activateSafeMode();
            }
        }
    }
    //======================================//


    // Working Creep count on each source Unique(1-3) or Probe(4-8)
    const srcxu = _.sum(Game.creeps, (c) => c.memory.role === 'unique' && c.memory.wSource === pW.memory.src1Id);
    const srcyu = _.sum(Game.creeps, (c) => c.memory.role === 'unique' && c.memory.wSource === pW.memory.src2Id);

    /// Room Visual Log -==-
    pW.visual.text("-=(AmOs Clan)=-", 25, 0, { align: 'center', opacity: 0.4 });
    pW.visual.text(" 🏰:  " + pW.name, 25, 1, { align: 'center', opacity: 0.4 });
    pW.visual.text(" ⚡️:  " + pW.energyAvailable + "/" + pW.energyCapacityAvailable, 25, 2, { align: 'center', opacity: 0.4 });
    pW.visual.text(" 🛠️:  " + srcxu, 1, 1, { align: 'left', opacity: 0.4 });
    pW.visual.text(" 🛠️:  " + srcyu, 1, 2, { align: 'left', opacity: 0.4 });
    new RoomVisual(pW.name).rect(21.5, -0.75, 7, 1, { fill: 'transparent', stroke: '#f24' });


    /// ---- Room Loop Inner Cycle - Update Essential Information \\\ ----  Cycle Begins ----
    if (Game.time > pW.memory.timers.gtCycle) {
        pW.memory.stage = pW.controller.level; // Controller Level Stored for Creeps use

        // Establish Mineral Deposits
        const minerals = pW.find(FIND_MINERALS);
        if (minerals[0]) {
            if (pW.memory.mineral === undefined) pW.memory.mineral = {};
            pW.memory.mineral = minerals[0].id;
        }
        
        // Establish Multiple Source.Id into Variables to compare against working creeps
        const sources = pW.find(FIND_SOURCES); // Room Sources
        // Divide id into room memory --
        if (sources.length > 0) {
            pW.memory.src1Id = sources[0].id;
            const scA = sources[0].pos.findInRange(FIND_STRUCTURES, 1, { filter: { structureType: STRUCTURE_CONTAINER } });
            if (scA.length > 0) {
                if (pW.memory.containers.s1ContA === undefined) { pW.memory.containers.s1ContA = {} };
                pW.memory.containers.s1ContA.goX = scA[0].pos.x;
                pW.memory.containers.s1ContA.goY = scA[0].pos.y;
            }

            if (sources[1]) {
                pW.memory.src2Id = sources[1].id;
                const scB = sources[1].pos.findInRange(FIND_STRUCTURES, 1, { filter: { structureType: STRUCTURE_CONTAINER } });
                if (scB.length > 0) {
                    if (pW.memory.containers.s2ContB === undefined) { pW.memory.containers.s2ContB = {} };
                    pW.memory.containers.s2ContB.goX = scB[0].pos.x;
                    pW.memory.containers.s2ContB.goY = scB[0].pos.y;
                }

                if (sources[2]) {
                    pW.memory.src3Id = sources[2].id;
                }
            }
        }

        /// Set Game time cycle these updates
        pW.memory.timers.gtCycle = Game.time + 1000;
        return;
    }
    // -----=-=-=-=-=-=-=-=-=-  End Inner Cycle -=-=-=-=-=-=-=-=-=-=-=-=--=----- //

    /// -------  If room energy is less than 300, skip to the next room ------ \\\
    if (pW.energyAvailable < 300) return;

    /// Establishing Available Spawn  ---- Fresh attempt - Hopefully multi-room capable.  -=***=-
    const spawnPoint = _.filter(Game.spawns, s => s.room.name === pW.name && !s.spawning)[0];
    if (spawnPoint === undefined) return;
    //------------------------------------------------------------------------------\\

    ///////  Begin Warping \\\\\\\

    /// Warp Emergency Stage 1-2 Probe/Worker contingency to restore functions
    if (srcxu < 1 && srcyu < 1 && Game.time % 10 === 0) {
        // Count of creeps at Sources
        if (srcxu < 1) { dSource = pW.memory.src1Id }
        else if (srcyu < 1) { dSource = pW.memory.src2Id }
        warpWorker(spawnPoint, 1, 'Probe-' + Game.time.toString(36), { memory: { role: 'unique', wSource: dSource, wSpawn: spawnPoint.id } });
        return;
    }

    /// Warp Stage 1-2 Unique Probe/Worker to begin base building
    if (srcxu < 2 || srcyu < 3) {
        // Count of creeps at Sources
        if (srcxu < 2) { dSource = pW.memory.src1Id }
        else if (srcyu < 3) { dSource = pW.memory.src2Id }
        warpWorker(spawnPoint, getEnergyStatus(spawnPoint), 'Probe-' + Game.time.toString(36), { memory: { role: 'unique', wSource: dSource, wSpawn: spawnPoint.id } });
        return;
    }
};













const roomNotMine = function (pW) {

    /// ---- Room Loop Cycle - Update Essential Information \\\
    if (pW.memory.timers === undefined) {
        pW.memory.timers = {}
        pW.memory.timers.gtCycle = 1;
        if (pW.find(FIND_HOSTILE_STRUCTURES, { 
            filter: (s) => ( s.structureType !== ('controller' || 'container' || 'road' || 'extractor' || 'terminal' || 'powerBank') ) })[0]) {
                pW.memory.hostileRoom = 1;
            }
    }

    if (Game.time % 3 === 0) {

        const hAC = pW.find(FIND_HOSTILE_CREEPS, {
            filter: s => ((s.getActiveBodyparts(ATTACK) > 0 ||
                s.getActiveBodyparts(RANGED_ATTACK) > 0)) && 
                s.owner.username !== 'Deltazulu' && s.owner.username !== 'TungstenShield' && s.owner.username !== 'FaMoS'});

        if(hAC[0]) pW.createFlag(hAC[0].pos.x, hAC[0].pos.y, pW.name, COLOR_BLUE, COLOR_PURPLE);
    }

    if (Game.time > pW.memory.timers.gtCycle) {

        if (pW.controller) {
            pW.memory.stage = pW.controller.level; // Controller Level Stored for Creeps use
        }

        // Establish Mineral Deposits
        const minerals = pW.find(FIND_MINERALS);
        if (minerals[0]) {
            if (pW.memory.mineral === undefined) pW.memory.mineral = {};
            pW.memory.mineral = minerals[0].id;

            const exts = _.filter(Game.structures, e => e.room.name === pW.name && e.structureType === 'extractor');
            if (exts[0]) {
                if (pW.memory.extractor === undefined) pW.memory.extractor = {};
                pW.memory.extractor = exts[0].id;
            }
            
        }

        // Establish Multiple Source.Id into Variables to compare against working creeps
        const sources = pW.find(FIND_SOURCES); // Room Sources
        // Divide id into room memory --
        if (sources[0]) {
            pW.memory.src1Id = sources[0].id;
            if (pW.memory.containers === undefined) {
                pW.memory.containers = {};
            }
            const scA = sources[0].pos.findInRange(FIND_STRUCTURES, 1, { filter: { structureType: STRUCTURE_CONTAINER } });
            if (scA[0]) {
                if (pW.memory.containers.s1ContA === undefined) { pW.memory.containers.s1ContA = {} }
                pW.memory.containers.s1ContA.goX = scA[0].pos.x;
                pW.memory.containers.s1ContA.goY = scA[0].pos.y;
            }
            if (sources[1]) {
                pW.memory.src2Id = sources[1].id;
                const scB = sources[1].pos.findInRange(FIND_STRUCTURES, 1, { filter: { structureType: STRUCTURE_CONTAINER } });
                if (scB[0]) {
                    if (pW.memory.containers.s2ContB === undefined) { pW.memory.containers.s2ContB = {} }
                    pW.memory.containers.s2ContB.goX = scB[0].pos.x;
                    pW.memory.containers.s2ContB.goY = scB[0].pos.y;
                }

                if (sources[2]) {
                    pW.memory.src3Id = sources[2].id;

                    if (sources[3]) {
                        pW.memory.src4Id = sources[3].id;

                        if (sources[4]) {
                            pW.memory.src5Id = sources[4].id;

                            if (sources[5]) {
                                pW.memory.src6Id = sources[5].id;
                            }
                        }
                    }
                }
            }
        }

        /// Set Game time cycle these updates
        pW.memory.timers.gtCycle = Game.time + 1000;
        return;
    }
};













/*              ______     ______     ______     __    __        __         ______     ______     ______  
*              /\  == \   /\  __ \   /\  __ \   /\ "-./  \      /\ \       /\  __ \   /\  __ \   /\  == \ 
*              \ \  __<   \ \ \/\ \  \ \ \/\ \  \ \ \-./\ \     \ \ \____  \ \ \/\ \  \ \ \/\ \  \ \  _-/ 
*               \ \_\ \_\  \ \_____\  \ \_____\  \ \_\ \ \_\     \ \_____\  \ \_____\  \ \_____\  \ \_\   
*                \/_/ /_/   \/_____/   \/_____/   \/_/  \/_/      \/_____/   \/_____/   \/_____/   \/_/   
*/
const roomLoops = function () {

    for (const name in Game.rooms) {

        if (Game.rooms[name].controller) {
            if (Game.rooms[name].controller.my) {
                if (Game.rooms[name].controller.level > 2) {
                    warpUnitsV2(Game.rooms[name]);
                    continue;
                }
                if (Game.rooms[name].controller.level < 3) {
                    warpUnitsV1(Game.rooms[name]);
                    continue;
                }
            }
        }
        roomNotMine(Game.rooms[name]);
    }
};














/*
// New tower script file - Credit to Orlet    ---=================[Pew / Pew / Pew]===================---
*
*
*
*   //////////  //////////  //          //////////  //////////              //////////  //////////  \\        //  //////////  //////////  //////////
*   //      //  //      //  //          //              //                      //      //      //  ||        ||  //          //     //   //
*   //      //  //     //   //          //              //                      //      //      //  ||  //\\  ||  //          //    //    //
*   //      //  ////////    //          ///////         //      //////////      //      //      //  ||  || || ||  ////////    ///////     //////////
*   //      //  //    \\    //          //              //                      //      //      //  ||  || || ||  //          //   \\             //
*   //      //  //     \\   //          //              //                      //      //      //  \\  || || ||  //          //    \\            //
*   //////////  //      \\  //////////  /////////       //                      //      //////////   \\//   \\//  /////////   //     \\   //////////
*
*                                       
*                                       
*/
const photonCannons = function () {
    for (const name in Game.rooms) {

        // fetch towers first, so we don't search for them every single time
        const towers = _.filter(Game.structures, t => t.room.name === name && t.structureType === 'tower' && t.energy > 9);

        // no towers? move on to next room
        if (towers[0] === undefined) continue;

        // find hostiles
         const invaderCreep = Game.rooms[name].find(FIND_HOSTILE_CREEPS, {
            filter: s => s.owner.username !== 'Deltazulu' && s.owner.username !== 'TungstenShield' && s.owner.username !== 'FaMoS'});

        if (invaderCreep[0]) {

            const healers = _.filter(invaderCreep, c => c.getActiveBodyparts(HEAL) > 0);
            if (healers[0]) {

                const towersReady = _.sum(Game.structures, t => t.room.name === name && t.structureType === 'tower' && t.energy > 400);
                const towersTotal = _.sum(Game.structures, t => t.room.name === name && t.structureType === 'tower');

                if (!towers[0].room.memory.timers.towersFiring && towersReady === towersTotal) towers[0].room.memory.timers.towersFiring = true;
                if (towers[0].room.memory.timers.towersFiring && towers.length < towersTotal) towers[0].room.memory.timers.towersFiring = false;

                // against enemy healers - allow all towers to have energy before firing
                if (!towers[0].room.memory.timers.towersFiring) continue;

                // pew and move on to next room
                towers.forEach((tower) => { tower.attack(healers[0]) });
                continue;
            }

            // pew and move on to next room
            towers.forEach((tower) => { tower.attack(invaderCreep[0]) });
            continue;
        }

        const powerCreepers = Game.rooms[name].find(FIND_HOSTILE_POWER_CREEPS, {
            filter: s => s.owner.username !== 'Deltazulu' && s.owner.username !== 'TungstenShield' && s.owner.username !== 'FaMoS'});

        if (powerCreepers[0]) {

            // pew and move on to next room
            towers.forEach((tower) => { tower.attack(powerCreepers[0]) });
            continue;
        }


        // catch ramparts
        const earlyRamparts = _.filter(Game.structures, s => s.room.name === name && s.structureType === 'rampart' && s.hits < 1500);
        if (earlyRamparts[0]) {
            // pew and move on to next room
            towers.forEach((tower) => { tower.repair(earlyRamparts[0]) });
            continue;
        }

        // repair structures including roads & containers
        const damagedStructure = Game.rooms[name].find(FIND_STRUCTURES, {filter: s => s.hits < s.hitsMax && s.hits < Game.rooms[name].memory.repairs});
        if (damagedStructure[0]) {
            // pew and move on to next room
            towers.forEach((tower) => { tower.repair(damagedStructure[0]) });
            continue;
        }

        // heal creeps
        const damagedCreep = _.filter(Game.creeps, c => c.room.name === name && c.hits < c.hitsMax);
        if (damagedCreep[0]) {
            // pew and move on to next room
            towers.forEach((tower) => { tower.heal(damagedCreep[0]) });
            continue;
        }

        const damagedPowerCreep = _.filter(Game.powerCreeps, c => c.ticksToLive && c.room.name === name && c.hits < c.hitsMax);
        if (damagedPowerCreep[0]) {
            // pew and move on to next room
            towers.forEach((tower) => { tower.heal(damagedPowerCreep[0]) });
            continue;
        }

        // fortify walls and ramparts
        if (Game.rooms[name].controller.level === 8 && Game.rooms[name].energyAvailable === Game.rooms[name].energyCapacityAvailable) {
            if ( _.filter(Game.structures, t => t.room.name === name && t.structureType === 'tower' && t.energy < t.energyCapacity)[0]) {
                // Room Towers energy insufficent to raise walls / ramparts move to next room
                continue;
            }
            // criteria met - RCL 8 && Room / Room Towers at full capacity raise by 1k and move on to next room
            else Game.rooms[name].memory.repairs = Game.rooms[name].memory.repairs + 1000;
        }
    }
};












/*                 __         __     __   __     __  __     ______    
*                 /\ \       /\ \   /\ "-.\ \   /\ \/ /    /\  ___\   
*                 \ \ \____  \ \ \  \ \ \-.  \  \ \  _"-.  \ \___  \  
*                  \ \_____\  \ \_\  \ \_\\"\_\  \ \_\ \_\  \/\_____\ 
*                   \/_____/   \/_/   \/_/ \/_/   \/_/\/_/   \/_____/ 
*/                                                      
////  TO-DO:  Fine tune logic by carving out variables/excess if statments and directly addressing objects \\
const linkSystem = function () {

    for (const name in Game.rooms) {

        if (Game.rooms[name].memory.links === undefined) continue;

        const upLink = Game.getObjectById(Game.rooms[name].memory.links.upgrader);

        if (upLink !== null) {

            if (Game.flags['AssimLink-' + name] === undefined || Game.flags['AssimLink-' + name].memory.link === undefined) continue;

            if (upLink.energy < 799) Game.getObjectById(Game.flags['AssimLink-' + name].memory.link).transferEnergy(upLink);

            if (Game.flags['Link1-' + name] === undefined || Game.flags['Link1-' + name].memory.link === undefined) continue;

            if (upLink.energy < 799) Game.getObjectById(Game.flags['Link1-' + name].memory.link).transferEnergy(upLink);

            if (Game.flags['Link2-' + name] === undefined || Game.flags['Link2-' + name].memory.link === undefined) continue;

            if (upLink.energy < 799) Game.getObjectById(Game.flags['Link2-' + name].memory.link).transferEnergy(upLink);

        }
    }
};













/*                 ______   ______     ______     __    __     __     __   __     ______     __        
*                 /\__  _\ /\  ___\   /\  == \   /\ "-./  \   /\ \   /\ "-.\ \   /\  __ \   /\ \       
*                 \/_/\ \/ \ \  __\   \ \  __<   \ \ \-./\ \  \ \ \  \ \ \-.  \  \ \  __ \  \ \ \____  
*                    \ \_\  \ \_____\  \ \_\ \_\  \ \_\ \ \_\  \ \_\  \ \_\\"\_\  \ \_\ \_\  \ \_____\ 
*                     \/_/   \/_____/   \/_/ /_/   \/_/  \/_/   \/_/   \/_/ \/_/   \/_/\/_/   \/_____/ 
*/                                                                                     
const terminalSystem = function (f) {

    for (const name in Game.rooms) {
        const r = Game.rooms[name];

        if (f.memory.hroom !== name) continue;

        if (f !== undefined) {
            f.memory.memoryCheck = undefined;

            if (f.pos.roomName === name) {
                let xyz = f.name.slice(6);
                console.log(' Terminal System Function - Target Room: ' + xyz + '  Origin Room: ' + f.memory.hroom + '  Resource: ' + f.memory.send);
                f.setPosition(new RoomPosition(25, 25, xyz));
                continue;
            }

           

            switch (f.memory.send) {

                case 'e':

                const i = Game.market.calcTransactionCost(r.terminal.store['energy'], name, f.pos.roomName);
                if (r.terminal.send('energy', r.terminal.store['energy'] - i, f.pos.roomName, 'Energy Sent') === OK) f.remove(); // Send Energy (Default)

                return;

                case 'p':

                if (r.terminal.send('power', r.terminal.store['power'], f.pos.roomName, 'Power Sent') === OK) f.remove(); // Send Power (Place Flag: x 10, y: 10)

                return;

                case 'h':

                if (r.terminal.send('H', r.terminal.store['H'], f.pos.roomName, 'Hydrogen Sent') === OK) f.remove(); // Send Hydrogen (Place Flag: x 20, y: 20)

                return;

            }

            

            

        }
    }
};









/*                     __   __     __  __     __  __     ______    
*                     /\ "-.\ \   /\ \/\ \   /\ \/ /    /\  ___\   
*                     \ \ \-.  \  \ \ \_\ \  \ \  _"-.  \ \  __\   
*                      \ \_\\"\_\  \ \_____\  \ \_\ \_\  \ \_____\ 
*                       \/_/ \/_/   \/_____/   \/_/\/_/   \/_____/  
*/                                            
const nukerSystem = function (f) {

    for (const name in Game.rooms) {

        if (f !== undefined) {

            f.memory.memoryCheck = undefined;

            const xyz = f.name.slice(5);
            f.setPosition(25, 25, xyz);

            if (f.pos.roomName !== xyz) continue;
                
            
            const nuker = Game.getObjectById(Game.rooms[f.memory.hroom].memory.nuke);
            if (nuker.launchNuke(new RoomPosition(f.pos.x, f.pos.y, f.pos.roomName)) === OK) f.remove();
        }
    }
};








/*             ______     ______     ______     ______     ______     __   __   ______     ______   ______     ______     __  __    
*             /\  __ \   /\  == \   /\  ___\   /\  ___\   /\  == \   /\ \ / /  /\  __ \   /\__  _\ /\  __ \   /\  == \   /\ \_\ \   
*             \ \ \/\ \  \ \  __<   \ \___  \  \ \  __\   \ \  __<   \ \ \'/   \ \  __ \  \/_/\ \/ \ \ \/\ \  \ \  __<   \ \____ \  
*              \ \_____\  \ \_____\  \/\_____\  \ \_____\  \ \_\ \_\  \ \__|    \ \_\ \_\    \ \_\  \ \_____\  \ \_\ \_\  \/\_____\ 
*               \/_____/   \/_____/   \/_____/   \/_____/   \/_/ /_/   \/_/      \/_/\/_/     \/_/   \/_____/   \/_/ /_/   \/_____/ 
 */                                                                                                                      
const observatory = function () {

    if (!_.filter(Game.flags, fl => fl.name.slice(0,6) === 'Scout-')) return;

    const observer = _.filter(Game.structures, s => s.structureType === 'observer');

    if (observer[0]) {

        observer.forEach((o) => {

            if (Memory.observatory.home[o.room.name] === undefined) {

                Memory.observatory.home[o.room.name] = {};
                Memory.observatory.home[o.room.name].observeRoom = {};
                Memory.observatory.home[o.room.name].nextRoom = {};

                Memory.observatory.home[o.room.name].observeRoom = 'A';
                Memory.observatory.home[o.room.name].nextRoom = 'B';

            }


            const flag = Game.flags['Scout-' + Memory.observatory.home[o.room.name].observeRoom + '-' + o.room.name];

            if (flag === undefined) {

                if (Memory.observatory.home[o.room.name].observeRoom = 'A') return;

                Memory.observatory.home[o.room.name].observeRoom = 'A';
                Memory.observatory.home[o.room.name].nextRoom = 'B';

                return;

            }

            o.observeRoom(flag.pos.roomName);

            switch (Memory.observatory.home[o.room.name].nextRoom) {

                case 'A':
                    Memory.observatory.home[o.room.name].observeRoom = 'A'; // Begin Searching Rooms Per Tick
                    Memory.observatory.home[o.room.name].nextRoom = 'B';
                    break;

                case 'B':
                    Memory.observatory.home[o.room.name].observeRoom = 'B';
                    Memory.observatory.home[o.room.name].nextRoom = 'C';
                    break;

                case 'C':
                    Memory.observatory.home[o.room.name].observeRoom = 'C';
                    Memory.observatory.home[o.room.name].nextRoom = 'D';
                    break;

                case 'D':
                    Memory.observatory.home[o.room.name].observeRoom = 'D';
                    Memory.observatory.home[o.room.name].nextRoom = 'E';
                    break;

                case 'E':
                    Memory.observatory.home[o.room.name].observeRoom = 'E';
                    Memory.observatory.home[o.room.name].nextRoom = 'F';
                    break;

                case 'F':
                    Memory.observatory.home[o.room.name].observeRoom = 'F';
                    Memory.observatory.home[o.room.name].nextRoom = 'G';
                    break;

                case 'G':
                    Memory.observatory.home[o.room.name].observeRoom = 'G';
                    Memory.observatory.home[o.room.name].nextRoom = 'H';
                    break

                case 'H':
                    Memory.observatory.home[o.room.name].observeRoom = 'H';
                    Memory.observatory.home[o.room.name].nextRoom = 'A'; // Start Over
                    break;

            }

        });

    }

    for (const name in Game.rooms) {
        const r = Game.rooms[name];
        if (r.controller) continue;

        const bank = r.find(FIND_STRUCTURES, { filter: (c) => (c.structureType === 'powerBank') });

        if (bank[0] === undefined) continue;

        if (bank[0].ticksToDecay > 3750) {

            //const hos = r.find(FIND_HOSTILE_CREEPS, { filter: (c) => (c.getActiveBodyparts(ATTACK) > 4) });
            //if (hos[0]) continue;

            if (Game.flags['StrikeTeam'] === undefined) {
                r.createFlag(bank.pos, 'StrikeTeam');
                r.createFlag(bank.pos, 'DarkOne-2', COLOR_BLUE, COLOR_RED);
                r.createFlag(bank.pos, 'Healer-2', COLOR_BLUE, COLOR_GREEN);
            }

        }

        if (bank[0].hits < 6000) {

            r.createFlag(bank.pos, undefined, COLOR_YELLOW, COLOR_BROWN);

        }
    }

};












/*                             __         ______     ______     ______     ______     ______     ______   ______     ______     __  __    
*                             /\ \       /\  __ \   /\  == \   /\  __ \   /\  == \   /\  __ \   /\__  _\ /\  __ \   /\  == \   /\ \_\ \   
*                             \ \ \____  \ \  __ \  \ \  __<   \ \ \/\ \  \ \  __<   \ \  __ \  \/_/\ \/ \ \ \/\ \  \ \  __<   \ \____ \  
*                              \ \_____\  \ \_\ \_\  \ \_____\  \ \_____\  \ \_\ \_\  \ \_\ \_\    \ \_\  \ \_____\  \ \_\ \_\  \/\_____\ 
*                               \/_____/   \/_/\/_/   \/_____/   \/_____/   \/_/ /_/   \/_/\/_/     \/_/   \/_____/   \/_/ /_/   \/_____/ 
*/                                                                                                    
const laboratory = function (c) {

    for (const n in Game.rooms) {
        const r = Game.rooms[n];

        if (r.memory.labs === undefined) {
            r.memory.labs = {};
            r.memory.labs.loc = {};
            r.memory.labs.boosting = false;
        }

        const lab = _.filter(Game.structures, s => s.structureType === 'lab' && s.room.name === n && s.energy > 19 && s.mineralAmount > 29);

        if (lab[0] === undefined) {
            r.memory.labs.boosting = false;
            continue;
        }

        if (r.memory.labs.type === undefined) {

            const LCOUNT = _.filter(Game.structures, s => s.structureType === 'lab' && s.room.name === n);
            if (LCOUNT.length === 10) {
                r.memory.labs.type = {};
                r.memory.labs.type.ATTACK = LCOUNT[0].id;
                r.memory.labs.type.Harvest = LCOUNT[1].id;
                r.memory.labs.type.Capacity = LCOUNT[2].id;
                r.memory.labs.type.Ranged = LCOUNT[3].id;
                r.memory.labs.type.Build = LCOUNT[4].id;
                r.memory.labs.type.Heal = LCOUNT[5].id;
                r.memory.labs.type.Dismantel = LCOUNT[6].id;
                r.memory.labs.type.MOVE = LCOUNT[7].id;
                r.memory.labs.type.Upgrade = LCOUNT[8].id;
                r.memory.labs.type.TOUGH = LCOUNT[9].id;
            }

        }

        r.memory.labs.boosting = true;
        if (c === undefined) {
            
            const labCheck = [
                Game.getObjectById(r.memory.labs.type.ATTACK),
                Game.getObjectById(r.memory.labs.type.Harvest),
                Game.getObjectById(r.memory.labs.type.Capacity),
                Game.getObjectById(r.memory.labs.type.Ranged),
                Game.getObjectById(r.memory.labs.type.Build),
                Game.getObjectById(r.memory.labs.type.Heal),
                Game.getObjectById(r.memory.labs.type.Upgrade)
            ];

            let lc = 0;

            while (lc < 7) {

                switch (lc) {

                    case 0:
                        if (labCheck[0].mineralAmount > 29) {
                            r.memory.utils.boosting['zealotfar'].boost = true;
                        }
                        else {
                            r.memory.utils.boosting['zealotfar'].boost = false;
                        }

                        break;

                    case 1:
                        if (labCheck[1].mineralAmount > 29) {
                            r.memory.utils.boosting['probe'].boost = true;
                            r.memory.utils.boosting['extraction'].boost = true;
                        }
                        else {
                            r.memory.utils.boosting['probe'].boost = false;
                            r.memory.utils.boosting['extraction'].boost = false;
                        }

                        break;

                    case 2:
                        if (labCheck[2].mineralAmount > 29) {
                            r.memory.utils.boosting['assim'].boost = true;
                            r.memory.utils.boosting['assimfar'].boost = true;
                            r.memory.utils.boosting['pwrassim'].boost = true;
                        }
                        else {
                            r.memory.utils.boosting['assim'].boost = false;
                            r.memory.utils.boosting['assimfar'].boost = false;
                            r.memory.utils.boosting['pwrassim'].boost = false;
                        }
                        break;

                    case 3:
                        if (labCheck[3].mineralAmount > 29) {
                            r.memory.utils.boosting['stalker'].boost = true;
                        }
                        else {
                            r.memory.utils.boosting['stalker'].boost = false;
                        }
                        break;

                    case 4:
                        if (labCheck[4].mineralAmount > 29) {
                            r.memory.utils.boosting['bldfar'].boost = true;
                            r.memory.utils.boosting['builder'].boost = true;
                        }
                        else {
                            r.memory.utils.boosting['bldfar'].boost = false;
                            r.memory.utils.boosting['builder'].boost = false;
                        }
                        break;

                    case 5:
                        if (labCheck[5].mineralAmount > 29) {
                            r.memory.utils.boosting['templarpriest'].boost = true;
                        }
                        else {
                            r.memory.utils.boosting['templarpriest'].boost = false;
                        }
                        break;

                    case 6:
                        if (labCheck[6].mineralAmount > 29) {
                            r.memory.utils.boosting['upgrader'].boost = true;
                        }
                        else {
                            r.memory.utils.boosting['upgrader'].boost = false;
                        }
                        break;

                }

                lc++;

            }

            continue;
        }


        if (c.pos.x > r.memory.labs.loc.x + 2 || c.pos.x < r.memory.labs.loc.x - 2 || c.pos.y > r.memory.labs.loc.y + 2 || c.pos.y < r.memory.labs.loc.y - 2) return;

        let i = 0;
        let b = 0;

        while (i < lab.length) {

            

            switch (c.memory.role) {

                case 'probe':
                    if (lab[i].mineralType === 'XUHO2') {
                        if (lab[i].boostCreep(c, 1) === OK) c.memory.boosted = true;
                    }
                    break;

                case 'assim':
                case 'assimfar':
                case 'pwrassim':
                    if (lab[i].mineralType === 'XKH2O') {
                        if (lab[i].boostCreep(c, 2) === OK) b++;
                    }

                    if (lab[i].mineralType === 'XZHO2') {
                        if (lab[i].boostCreep(c, 1) === OK) b++;
                    }

                    if (b > 1) c.memory.boosted = true;
                    break;

                case 'zealotfar':
                    if (lab[i].mineralType === 'XUH2O') {
                        if (lab[i].boostCreep(c, 1) === OK) b++;
                    }

                    if (lab[i].mineralType === 'XZHO2') {
                        if (lab[i].boostCreep(c, 1) === OK) b++;
                    }

                    if (lab[i].mineralType === 'XGHO2') {
                        if (lab[i].boostCreep(c) === OK) b++;
                    }

                    if (b > 1) c.memory.boosted = true;
                    break;

                case 'bldfar':
                case 'builder':
                    if (lab[i].mineralType === 'XLH2O') {
                        if (lab[i].boostCreep(c, 2) === OK) b++;
                    }

                    if (lab[i].mineralType === 'XKH2O') {
                        if (lab[i].boostCreep(c, 2) === OK) b++;
                    }

                    if (lab[i].mineralType === 'XZHO2') {
                        if (lab[i].boostCreep(c, 1) === OK) b++;
                    }

                    if (b > 1) c.memory.boosted = true;
                    break;

                case 'templarpriest':
                    if (lab[i].mineralType === 'XLHO2') {
                        if (lab[i].boostCreep(c, 1) === OK) b++;
                    }

                    if (lab[i].mineralType === 'XZHO2') { 
                        if (lab[i].boostCreep(c, 1) === OK) b++;
                    }

                    if (b > 1) c.memory.boosted = true;
                    break;

                case 'stalker':
                    if (lab[i].mineralType === 'XKHO2') {
                        if (lab[i].boostCreep(c, 1) === OK) b++;
                    }

                    if (lab[i].mineralType === 'XZHO2') {
                        if (lab[i].boostCreep(c, 1) === OK) b++;
                    }

                    if (lab[i].mineralType === 'XGHO2') {
                        if (lab[i].boostCreep(c) === OK) b++;
                    }

                    if (b > 1) c.memory.boosted = true;
                    break;

                case 'extraction':
                    if (lab[i].mineralType === 'XUHO2') {
                        if (lab[i].boostCreep(c) === OK) b++;
                    }

                    if (lab[i].mineralType === 'XKH2O') {
                        if (lab[i].boostCreep(c) === OK) b++;
                    }

                    if (b > 1) c.memory.boosted = true;
                    break;

            }

            console.log(' Lab Testing:  ' +b);
            i++;

        }
    }
};













                                    
/*                        __    __     ______     ______     __  __     ______     ______      ______     __  __     ______     ______   ______     __    __    
*                        /\ "-./  \   /\  __ \   /\  == \   /\ \/ /    /\  ___\   /\__  _\    /\  ___\   /\ \_\ \   /\  ___\   /\__  _\ /\  ___\   /\ "-./  \   
*                        \ \ \-./\ \  \ \  __ \  \ \  __<   \ \  _"-.  \ \  __\   \/_/\ \/    \ \___  \  \ \____ \  \ \___  \  \/_/\ \/ \ \  __\   \ \ \-./\ \  
*                         \ \_\ \ \_\  \ \_\ \_\  \ \_\ \_\  \ \_\ \_\  \ \_____\    \ \_\     \/\_____\  \/\_____\  \/\_____\    \ \_\  \ \_____\  \ \_\ \ \_\ 
*                          \/_/  \/_/   \/_/\/_/   \/_/ /_/   \/_/\/_/   \/_____/     \/_/      \/_____/   \/_____/   \/_____/     \/_/   \/_____/   \/_/  \/_/ 
*/                                                                                                                                        
const marketSystem = function () {

    if (Memory.market === undefined) {

        Memory.market = {};
        Memory.market.marketReset = Game.time + 77730000;

        Memory.market.primary = {};

        Memory.market.base = {};
        Memory.market.tier3 = {};

        Memory.market.primary['energy'] = {lowestPriceKey: 1, highestPriceKey: 1};
        Memory.market.primary['power'] = {lowestPriceKey: 0.3, highestPriceKey: 0.5};
        Memory.market.primary['ops'] = {lowestPriceKey: 1, highestPriceKey: 0.1};

        Memory.market.base['H'] = { lowestPriceKey: 0.3, highestPriceKey: 0.22 };
        Memory.market.base['O'] = { lowestPriceKey: 5, highestPriceKey: 0.1 };
        Memory.market.base['U'] = { lowestPriceKey: 5, highestPriceKey: 0.1 };
        Memory.market.base['L'] = { lowestPriceKey: 5, highestPriceKey: 0.1 };
        Memory.market.base['K'] = { lowestPriceKey: 5, highestPriceKey: 0.1 };
        Memory.market.base['Z'] = { lowestPriceKey: 5, highestPriceKey: 0.1 };
        Memory.market.base['X'] = { lowestPriceKey: 5, highestPriceKey: 0.1 };
        Memory.market.base['G'] = { lowestPriceKey: 3.5, highestPriceKey: 0.1 };

        Memory.market.tier3['XUH2O'] = { lowestPriceKey: 5, highestPriceKey: 0.1 };    // + 300% (ATTACK)
        Memory.market.tier3['XUHO2'] = { lowestPriceKey: 5, highestPriceKey: 0.1 };    // + 600% Harvest (WORK)
        Memory.market.tier3['XKH2O'] = { lowestPriceKey: 5, highestPriceKey: 0.1 };    // + 150 Capacity (CARRY)
        Memory.market.tier3['XKHO2'] = { lowestPriceKey: 5, highestPriceKey: 0.1 };    // + 300% (RANGED_ATTACK)
        Memory.market.tier3['XLH2O'] = { lowestPriceKey: 5, highestPriceKey: 0.1 };    // + 100% Repair / Build (WORK)
        Memory.market.tier3['XLHO2'] = { lowestPriceKey: 5, highestPriceKey: 0.1 };    // + 300% Heal / Ranged Heal (HEAL)
        Memory.market.tier3['XZH2O'] = { lowestPriceKey: 5, highestPriceKey: 0.1 };    // + 300% Dismantel (WORK)
        Memory.market.tier3['XZHO2'] = { lowestPriceKey: 5, highestPriceKey: 0.1 };    // + 300% (MOVE)
        Memory.market.tier3['XGH2O'] = { lowestPriceKey: 5, highestPriceKey: 0.1 };    // + 100% Upgrade Controller (WORK)
        Memory.market.tier3['XGHO2'] = { lowestPriceKey: 5, highestPriceKey: 0.1 };    // + 70% Damage Reduction (TOUGH)

    }

    for (const name in Game.rooms) {
        const r = Game.rooms[name];

        if (!r.terminal || r.terminal.cooldown > 0 || r.terminal.store['energy'] < 40000) continue;

        if (r.memory.labs.type && Game.market.credits > 100000 && _.sum(r.terminal.store) < 300000) {   //  If Labs are Installed(Memorized) - Check for Minerals in room Terminal.

            const minType = ['XUH2O', 'XUHO2', 'XKH2O', 'XKHO2', 'XLH2O', 'XLHO2', 'XZH2O', 'XZHO2', 'XGH2O', 'XGHO2'];

            let i = 0;

            while (i < 10) {

                if (!r.terminal.store[minType[i]]) {

                    const buy = Game.market.getAllOrders(order => order.resourceType === minType[i] && order.type === 'sell' &&
                        Game.market.calcTransactionCost(5000, name, order.roomName) < 40000);

                    if (buy[0]) {

                        const minKey = _.min(Object.keys(buy), o => buy[o].price);

                        if (buy[minKey].price < Memory.market.tier3[minType[i]].lowestPriceKey) Memory.market.tier3[minType[i]].lowestPriceKey = buy[minKey].price;


                        if (buy[minKey].price < Memory.market.tier3[minType[i]].lowestPriceKey * 1.5) {
                            Game.market.deal(buy[minKey].id, 5000, name);
                            i = 10;
                        }

                    }
                }

                i++;

            }

        }


        if ((!r.terminal.store['power'] || r.terminal.store['power'] < 1400) && Game.market.credits > 30000 && _.sum(r.terminal.store) < 285000) { // Check for and/or Replace Power

            const buyPower = Game.market.getAllOrders(order => order.resourceType === 'power' && order.type === 'sell' &&
                Game.market.calcTransactionCost(15000, name, order.roomName) < 40000);

            if (buyPower[0]) {

                const minKey = _.min(Object.keys(buyPower), o => buyPower[o].price);

                if (buyPower[minKey].price < Memory.market.primary['power'].lowestPriceKey) Memory.market.primary['power'].lowestPriceKey = buyPower[minKey].price;

                if (buyPower[minKey].price < Memory.market.primary['power'].lowestPriceKey * 1.5) Game.market.deal(buyPower[minKey].id, 15000, name);

            }
        }

        if ((!r.terminal.store['G'] || r.terminal.store['G'] < 100) && Game.market.credits > 930000 && _.sum(r.terminal.store) < 285000) { // Check for and/or Replace Power

            const buyG = Game.market.getAllOrders(order => order.resourceType === 'G' && order.type === 'sell' &&
                Game.market.calcTransactionCost(5000, name, order.roomName) < 40000);

            if (buyG[0]) {

                const minKey = _.min(Object.keys(buyG), o => buyG[o].price);

                if (buyG[minKey].price < Memory.market.base['G'].lowestPriceKey) Memory.market.base['G'].lowestPriceKey = buyG[minKey].price;

                if (buyG[minKey].price < Memory.market.base['G'].lowestPriceKey * 1.5) Game.market.deal(buyG[minKey].id, 5000, name);

            }
        }





        if (_.sum(r.terminal.store) > 90000) { // Check Terminal Storage before selling

            const minType = ['H', 'O', 'U', 'L', 'K', 'Z', 'X', 'G']; // Mineral Types

            let i = 0;

            while (i < 8) {

                if (r.terminal.store[minType[i]] >= 30000) { // Check Mineral Type in Storage (if 30,000+ sell)

                    const sale = Game.market.getAllOrders(order => order.resourceType === minType[i] && order.type === 'buy' &&
                        Game.market.calcTransactionCost(30000, name, order.roomName) < 40000);

                    if (sale[0]) {

                        const maxKey = _.max(Object.keys(sale), o => sale[o].price);

                        if (sale[maxKey].price > Memory.market.base[minType[i]].highestPriceKey) Memory.market.base[minType[i]].highestPriceKey = sale[maxKey].price;

                        if (sale[maxKey].price > Memory.market.base[minType[i]].highestPriceKey / 1.185) {
                            if (Game.market.deal(sale[maxKey].id, 30000, name) === OK)  i = 10;                       
                        }

                    }
                }

                i++;

            }

        }


        if (r.terminal.store['ops'] >= 10000) { // Sell Ops

            console.log(r.name + '  Market System Test Ops: ' + r.terminal.store['ops'] + r.terminal.store['energy']);

            const sale = Game.market.getAllOrders(order => order.resourceType === 'ops' && order.type === 'buy' &&
                Game.market.calcTransactionCost(10000, name, order.roomName) < 40000);

            if (sale[0]) {

                const maxKey = _.max(Object.keys(sale), o => sale[o].price);

                if (sale[maxKey].price > Memory.market.primary['ops'].highestPriceKey) Memory.market.primary['ops'].highestPriceKey = sale[maxKey].price;

                console.log(maxKey + sale[maxKey].price);
                if (sale[maxKey].price > Memory.market.primary['ops'].highestPriceKey / 1.185) Game.market.deal(sale[maxKey].id, 10000, name);

            }
        }
    }

    if (Game.time > Memory.market.marketReset) Memory.market = undefined;
};


















/*                                        ___    _____  ____   _____  _____    _____  __ __  _____  _____  __ ___   ___           
*                               ___  ___ |  _|  /   __\/  _/  /  _  \/   __\  /     \/  |  \/   __\/     \|  |  /  |_  | ___  ___ 
*                              <___><___>| |_   |   __||  |---|  _  ||  |_ |  |  |--||  _  ||   __||  |--||  _ <    _| |<___><___>
*                                   <___>|___|  \__/   \_____/\__|__/\_____/  \_____/\__|__/\_____/\_____/|__|__\  |___|<___>     
*/
const getBases = function (flag) {

    let dyR;
    let zyi;
    let tries;
    let lastRoom;
    const bases = _.filter(Game.rooms, (room) => room.memory.myRoom === 1);

    if (bases[0] === undefined) { 
        constole.log('getBases: Returning, no bases for this flag. ' + flag); 
        return;
    }

    zyi = 5;
    tries = 0;
    while (tries < 3) {

        bases.forEach((room) => {
            const route = Game.map.findRoute(room.name, flag.pos.roomName);
            dyR = route.length;

            if (dyR < zyi) { zyi = dyR; lastRoom = room.name }
            if (dyR === 0) { tries = 5 }
        });

        tries++;
    }

    return _.filter(Game.spawns, s => s.room.name === lastRoom && !s.spawning && s.room.energyAvailable > s.room.energyCapacityAvailable / 2)[0];
};







/*                    _____     _      _____ _     _         _   _         
*                    |   __|___| |_   |     | |_  |_|___ ___| |_|_|_ _ ___ 
*                    |  |  | -_|  _|  |  |  | . | | | -_|  _|  _| | | | -_|
*                    |_____|___|_|    |_____|___|_| |___|___|_| |_|\_/|___|
*                                               |___|                      
 */
const getObjective = function () {

    let i;
    let wS;
    let wcX;
    let wcY;
    let fcc;
    let xbase;

    for (const name in Game.flags) {
        const flag = Game.flags[name];

        if (flag.memory.memoryCheck === undefined) {

            switch (flag.color) {

                // Base operations -===========================================================================================-
                case COLOR_PURPLE:
                    switch (flag.secondaryColor) {
            
                        case COLOR_PURPLE:
                            /// Warp Claimers ///     ----====[ Claim ]====----
                            if ( _.sum(Game.creeps, (c) => c.memory.role === 'claimer' && c.memory.troom === flag.pos.roomName) < 1 ) {
                                xbase = getBases(flag);
                                if (xbase === undefined) continue;
            
                                warpClaimer(xbase, getEnergyStatus(xbase), getName(),
                                    { memory: { role: 'claimer', status: 'claiming', hroom: xbase.room.name, troom: flag.pos.roomName } });
                                flag.remove();
                            }
                            continue;
            
                        //case COLOR_YELLOW:
                        //return new DirectiveSKOutpost(flag);
            
                        case COLOR_WHITE:
                            /// Warp Claimers ///  ----====[ Reserve ]====----
                            if (flag.memory.setTime === undefined) flag.memory.setTime = Game.time;
                            if (flag.memory.setTime >= Game.time - 850) continue;
                            if ( _.sum(Game.creeps, (c) => c.memory.role === 'claimer' && c.memory.troom === flag.pos.roomName) > 0 ) { flag.remove(); continue }
            
                            xbase = getBases(flag);
                            if (xbase === undefined) continue;
            
                            warpClaimer(xbase, getEnergyStatus(xbase), getName(), { memory: { role: 'claimer', status: 'reserving', hroom: xbase.room.name, troom: flag.pos.roomName, x: flag.pos.x, y: flag.pos.y } });
                            continue;
            
                        //case COLOR_GREY:
                        //return new DirectiveColonize(flag);
            
                        //case COLOR_GREEN:
                           /* /// Drop Ramparts on structures ///  --==[Fortify]==--
                            xbase = getBases(flag);
                            const cstrmp = Game.rooms[base].find(FIND_STRUCTURES);
                            unitCount = _.reject(cstrmp, { structureType: STRUCTURE_WALL, structureType: STRUCTURE_RAMPART, structureType: STRUCTURE_ROAD });
                            unitCount.forEach((ss) => { xbase.room.createConstructionSite(ss.pos.x, ss.pos.y, STRUCTURE_RAMPART) });
                            flag.remove();
                            continue;*/
            
                    }
                    continue;
            
                // Offensive operations -=================================================================================-
                case COLOR_RED:
                    switch (flag.secondaryColor) {
            
                        case COLOR_RED:
                            /// Warp Group Small Zealots --Assault Force-- ///
                            fcc = _.sum(Game.creeps, (c) => c.memory.role === 'smallzealot' &&
                                c.memory.hroom === flag.name &&
                                c.memory.troom === flag.pos.roomName);
                            if (fcc > 0) { flag.remove(); continue }
                            xb = _.filter(Game.spawns, s => s.room.name === flag.pos.roomName && !s.spawning &&
                                s.room.energyAvailable > s.room.energyCapacityAvailable / 2);
                            if (!xb[0]) continue;
            
                            warpSmallZealot(xb[0], 5, 'Zealot-' + Game.time.toString(36),
                                { memory: { role: 'smallzealot', hroom: flag.name, troom: flag.pos.roomName, atkX: flag.pos.x, atkY: flag.pos.y } });
                            continue;
            
                        //case COLOR_CYAN:
                        //return new DirectiveDestroy(flag);
            
                        case COLOR_PURPLE:
                            /// Warp Group Small Zealots --Assault Force-- ///
                            fcc = _.sum(Game.creeps, (c) => c.memory.role === 'smallzealot' &&
                                c.memory.hroom === flag.name &&
                                c.memory.troom === flag.pos.roomName);
                            if (fcc > 0) { flag.remove(); continue }
                            xb = _.filter(Game.spawns, s => s.room.name === flag.pos.roomName && !s.spawning &&
                                s.room.energyAvailable > s.room.energyCapacityAvailable / 2);
                            if (!xb[0]) continue;
            
                            warpSmallZealot(xb[0], 3, 'Zealot-' + Game.time.toString(36),
                                { memory: { role: 'smallzealot', hroom: flag.name, troom: flag.pos.roomName, atkX: flag.pos.x, atkY: flag.pos.y } });
                            continue;
            
                        case COLOR_BLUE:
                            /// Warp Zealot Sentry --Source Keeper Force-- ///
                            fcc = _.sum(Game.creeps, (c) => c.memory.role === 'zealotfar' &&
                                c.memory.hroom === flag.name &&
                                c.memory.troom === flag.pos.roomName);
                            if (fcc > 0) { flag.remove(); continue }
                            xb = _.filter(Game.spawns, s => s.room.name === flag.pos.roomName && !s.spawning &&
                                s.room.energyAvailable > s.room.energyCapacityAvailable / 2);
                            if (xbase === undefined) continue;
            
                            warpSmallZealot(xb[0], getEnergyStatus(xb[0]), 'Zealot-' + Game.time.toString(36),
                                { memory: { role: 'zealotfar', hroom: flag.name, troom: flag.pos.roomName, x: flag.pos.x, y: flag.pos.y, status: 'sk' } });
                            continue;
                    }
                    continue;
            
                // Defensive operations -=================================================================================-
                case COLOR_BLUE:
                    switch (flag.secondaryColor) {
            
                        case COLOR_BLUE:
                            /// Warp Long Range Stalkers(Ranged Attack) ///
                            i = 0;
                            fcc = _.sum(Game.creeps, (c) => c.memory.role === 'stalker' && c.memory.troom === flag.pos.roomName);

                            //if (flag.name === '2' || '3' || '4' || '5' || '6' || '7' || '8' || '9') i = flag.name;
                            if (flag.name.slice(0, 7) === 'Ranged-') i =  flag.name.slice(7);
                            

                            if (fcc > i) { 
                                flag.remove(); 
                                continue; 
                            }

                            xbase = getBases(flag);
                            if (xbase === undefined) continue;
            
                            warpStalker(xbase, getEnergyStatus(xbase), 'Stalker-' + Game.time.toString(36),
                                { memory: { role: 'stalker', hroom: xbase.room.name, troom: flag.pos.roomName, x: flag.pos.x, y: flag.pos.y } });
                            continue;  

                        case COLOR_RED:
                            /// Warp Dark Ones (30 Attack Parts - Melee) ///
                            i = 0;
                            fcc = _.sum(Game.creeps, (c) => c.memory.role === 'darkone' && c.memory.troom === flag.pos.roomName);

                            //if (flag.name === '2' || '3' || '4' || '5' || '6' || '7' || '8' || '9') i = flag.name;
                            if (flag.name.slice(0, 8) === 'DarkOne-') i =  flag.name.slice(8);
                            
                            if (fcc > i) { 
                                flag.remove(); 
                                continue; 
                            }

                            xbase = getBases(flag);
                            if (xbase === undefined) continue;
                            if(xbase.room.energyAvailable < 7500) continue;

                            xbase.spawnCreep(createBody("20m30a"), 'DarkOne-' + Game.time.toString(36),
                            { memory: { role: 'darkone', hroom: xbase.room.name, troom: flag.pos.roomName, x: flag.pos.x, y: flag.pos.y } });
                            continue;
            
                        case COLOR_GREEN:
                            /// Warp Long Range Defense Templar Healers ///
                            i = 0;
                            fcc = _.sum(Game.creeps, (c) => c.memory.role === 'templarpriest' && c.memory.troom === flag.pos.roomName);

                            if (flag.name.slice(0, 7) === 'Healer-') i =  flag.name.slice(7);
                            if (fcc > i) { flag.remove(); continue }
            
                            xbase = getBases(flag);
                            if (xbase === undefined) continue;
            
                            warpTemplar(xbase, getEnergyStatus(xbase), 'Templar-' + Game.time.toString(36),
                                { memory: { role: 'templarpriest', hroom: xbase.room.name, troom: flag.pos.roomName, x: flag.pos.x, y: flag.pos.y } });
                            continue;
            
                        case COLOR_PURPLE:
                            /// Warp Long Range Defense Zealots ///
                            i = 0;
                            fcc = _.sum(Game.creeps, (c) => c.memory.role === 'zealotfar' && c.memory.troom === flag.pos.roomName);

                            if (flag.name.slice(0, 7) === 'Zealot-') i =  flag.name.slice(7);
                            if (fcc > i) { flag.remove(); continue }

                            xbase = getBases(flag);
                            if (xbase === undefined) continue;
            
                            warpZealot(xbase, getEnergyStatus(xbase), 'Zealot-' + Game.time.toString(36),
                                { memory: { role: 'zealotfar', hroom: xbase.room.name, troom: flag.pos.roomName, x: flag.pos.x, y: flag.pos.y } });
                            continue;
                    }
                    continue;
                
                // Power Creep operations -======================================================================================-
                case COLOR_ORANGE:
                    switch (flag.secondaryColor) {
                        case COLOR_ORANGE:
                            
                            if(Game.powerCreeps[flag.name].spawn(Game.getObjectById(flag.room.memory.powerSpawn)) === OK) flag.remove();

                        //case COLOR_BLUE:
                            //return new DirectiveNukeResponse(flag);
                    }
                    continue; 
            
                // Resource operations -=========================================================================================-
                case COLOR_YELLOW:
                    switch (flag.secondaryColor) {
            
                        //case COLOR_YELLOW:
                        //return new DirectiveHarvest(flag);
            
                        case COLOR_CYAN:
                            /// Warp Single Long Range Regular Builder /// ****** YELLOW / CYAN ******
                            fcc = _.sum(Game.creeps, (c) => c.memory.role === 'bldfar' && c.memory.troom === flag.pos.roomName);
                            if (fcc > 0) { flag.remove(); continue }
            
                            xbase = getBases(flag);
                            if (xbase === undefined) continue;
            
                            warpWorker(xbase, getEnergyStatus(xbase), getName(), { memory: { role: 'bldfar', hroom: xbase.room.name, troom: flag.pos.roomName } });
                            continue;
            
                        case COLOR_ORANGE:
                            /// Warp Dual Long Range Builders /// ****** YELLOW / ORANGE ******
                            i = 1; // Default of 1 (any number of builders greater than 1 removes flag)
                            if (flag.name.slice(0, 10) === 'FarBuilder-') {
                                i = flag.name.slice(10); //  Flag name includes number to reach to remove flag and cease calling units I.E. 'FarBuilder-4' will call 4 additional builders(5 total)
                                console.log('Far Builder Flag Numbering Test: ' + i);
                            }

                            fcc = _.sum(Game.creeps, (c) => c.memory.role === 'bldfar' && c.memory.troom === flag.pos.roomName);
                            if (fcc > i) { flag.remove(); continue }
            
                            xbase = getBases(flag);
                            if (xbase === undefined) continue;
            
                            warpWorker(xbase, getEnergyStatus(xbase), getName(), { memory: { role: 'bldfar', hroom: xbase.room.name, troom: flag.pos.roomName } });
                            continue;
            
                        case COLOR_BLUE:
                            /// Warp Long Range Probes /// ****** YELLOW / BLUE
                            i = 1;
                            wS = Memory.rooms[flag.pos.roomName].src1Id;
                            wcX = Memory.rooms[flag.pos.roomName].containers.s1ContA.goX;
                            wcY = Memory.rooms[flag.pos.roomName].containers.s1ContA.goY;
                            const probescount = _.sum(Game.creeps, (c) => c.memory.role === 'probefar' && c.memory.troom === flag.pos.roomName);
                            const prbsrc1 = _.sum(Game.creeps, (c) => c.memory.role === 'probefar' && c.memory.wSrc === wS);
            
                            if (Memory.rooms[flag.pos.roomName].src2Id !== undefined && Memory.rooms[flag.pos.roomName].containers.s2ContB !== undefined) {
                                i = 2;
                                const prbsrc2 = _.sum(Game.creeps, (c) => c.memory.role === 'probefar' && c.memory.wSrc === Memory.rooms[flag.pos.roomName].src2Id);
                                if (prbsrc2 < 1 && prbsrc1 > 0) {
                                    wS = Memory.rooms[flag.pos.roomName].src2Id;
                                    wcX = Memory.rooms[flag.pos.roomName].containers.s2ContB.goX;
                                    wcY = Memory.rooms[flag.pos.roomName].containers.s2ContB.goY;
                                }
            
                            }
            
                            if (probescount < i) {
                                xbase = getBases(flag);
                                if (xbase === undefined) continue;
            
                                warpProbe(xbase, getEnergyStatus(xbase), 'Probe-' + Game.time.toString(36), 
                                { memory: { role: 'probefar', hroom: xbase.room.name, troom: flag.pos.roomName, wSrc: wS, x: wcX, y: wcY } });
                                continue;
                            }
            
                            /// Warp Long Range Assimilators /// ****** YELLOW / BLUE ******
                            const assimcount = _.sum(Game.creeps, (c) => c.memory.role === 'assimfar' &&
                                c.memory.troom === flag.pos.roomName);
                            if (probescount >= i && assimcount > 0 && Game.time % 2 === 0) { flag.remove(); continue }
                            if (assimcount < 1) {
                                xbase = getBases(flag);
                                if (xbase === undefined) continue;
            
                                warpAssim(xbase, getEnergyStatus(xbase), 'Assimilator-' + Game.time.toString(36), { memory: { role: 'assimfar', hroom: xbase.room.name, troom: flag.pos.roomName } })
                                continue;
                            }
                            continue;
            
                        case COLOR_BROWN:
            
                            /// Additional Long Range Assimilation ///   ****** YELLOW / BROWN ******
                            fcc = _.sum(Game.creeps, (c) => c.memory.role === 'assimfar' && c.memory.troom === flag.pos.roomName);
                            if (fcc > 1) { flag.remove(); continue }
                            xbase = getBases(flag);
                            if (xbase === undefined) continue;
            
                            warpAssim(xbase, getEnergyStatus(xbase), 'Assimilator-' + Game.time.toString(36), { memory: { role: 'assimfar', hroom: xbase.room.name, troom: flag.pos.roomName } })
                            continue;
                    }
                    continue;
                /*               
                // Terminal operations -===================================================================================-
                    case COLOR_BROWN:
                        switch (flag.secondaryColor) {
                            case COLOR_RED:
                                return new DirectiveTerminalEvacuateState(flag);
                            case COLOR_ORANGE:
                                return new DirectiveTerminalEmergencyState(flag);
                            case COLOR_YELLOW:
                                return new DirectiveTerminalRebuildState(flag);
                        }
                        continue;
                        
                // Targeting colors -=========================================================================================-
                    case COLOR_GREY:
                        switch (flag.secondaryColor) {
                            case COLOR_ORANGE:
                                return new DirectiveTargetSiege(flag);
                            case COLOR_YELLOW:
                                return new DirectiveDismantle(flag);
                        }
                        continue;*/
            
                // Room planning operations -=============[Neutral Flags - memoryCheck: true to ignore in future checks]====================-
                case COLOR_WHITE:
            
                    flag.memory.memoryCheck = 1;
                    // WHITE/PURPLE - Archon(Upgrader) Position Set
                    // WHITE/WHITE - Non-Function Named Flags ]|[ HealerMover - Lock Healer into position / Trade-RoomName - Send Resources / Nuke-RoomName - Launch Nuke
            
                    switch (flag.secondaryColor) {
            
                        case COLOR_WHITE:
                            if (flag.name.slice(0, 6) === 'Trade-') {

                                if (flag.memory.hroom === undefined) flag.memory.hroom = flag.pos.roomName;

                                if (flag.memory.send === undefined) {

                                    flag.memory.send = 'e';

                                    if (flag.pos.x === 10 && flag.pos.y === 10) flag.memory.send = 'p';

                                    if (flag.pos.x === 20 && flag.pos.y === 20) flag.memory.send = 'h';

                                }

                                terminalSystem(flag);
                                continue;
                            }

                            if (flag.name === 'Boost-Here') {
                                const r = Game.rooms[flag.pos.roomName];

                                if (r.memory.labs === undefined) {
                                    r.memory.labs = {};
                                    r.memory.labs.loc = {};
                                    r.memory.labs.boosting = false;
                                }

                                r.memory.labs.loc.x = flag.pos.x;
                                r.memory.labs.loc.y = flag.pos.y;
                                flag.remove();
                                continue;
                            }

                            if (flag.name === 'Power-Assim') {
                                const r = Game.rooms[flag.pos.roomName];

                                if (r.memory.lockSpots === undefined) r.memory.lockSpots = {};

                                if (r.memory.lockSpots.pwrAssim === undefined) r.memory.lockSpots.pwrAssim = {};

                                r.memory.lockSpots.pwrAssim.x = flag.pos.x;
                                r.memory.lockSpots.pwrAssim.y = flag.pos.y;
                                flag.remove();
                                continue;
                            }

                            if (flag.name.slice(0, 5) === 'Idle-') {
                                const r = Game.rooms[flag.pos.roomName];
                                const pC = Game.powerCreeps[flag.name.slice(5)];

                                if (pC === undefined) {
                                    console.log (' Error:  Undefined Power Creep:  '+flag.name.slice(5)+ '  - Flag removed.');
                                    flag.remove();
                                    continue;
                                }

                                if (r.memory.lockSpots === undefined) r.memory.lockSpots = { pwrAssim: {}, pwrCreep: {} };

                                if (r.memory.lockSpots.pwrCreep === undefined) r.memory.lockSpots.pwrCreep = {};

                                r.memory.lockSpots.pwrCreep[pC.name] = {};


                                r.memory.lockSpots.pwrCreep[pC.name].x = flag.pos.x;
                                r.memory.lockSpots.pwrCreep[pC.name].y = flag.pos.y;
                                flag.remove();
                                continue;
                            }

                            if (flag.name.slice(0, 5) === 'Nuke-') {
                                flag.memory.hroom = flag.pos.roomName;
                                nukerSystem(flag);
                                continue;
                            }
            
                            if (flag.name.slice(0, 6) === 'Build-') {
                                flag.room.memory.baseBuilder = {}
                                flag.room.memory.baseBuilder.buildname = flag.name;
                                flag.room.memory.baseBuilder.pos = {}
                                flag.room.memory.baseBuilder.pos.x = flag.pos.x;
                                flag.room.memory.baseBuilder.pos.y = flag.pos.y;
                                flag.room.memory.baseBuilder.timers = {};
                                flag.room.memory.baseBuilder.links = {};
                                flag.room.memory.baseBuilder.containers = {};
                            }
                            continue;

                        case COLOR_YELLOW:
                            /// Mark Links to be filled by Assimilators
                            const found = flag.pos.lookFor(LOOK_STRUCTURES);
                            if (found.length > 0) {
                                if (found[0].structureType === 'link') {
                                    flag.memory.link = found[0].id;
                                    continue;
                                }
                                if (found[1].structureType === 'link') {
                                    flag.memory.link = found[1].id;
                                    continue;
                                }
                            }
                            continue;

                        case COLOR_GREY:
                            roomRoads(flag);
                            continue;
            /*
                        case COLOR_GREEN:
                            return new DirectiveRPHatchery(flag);
                        case COLOR_BLUE:
                            return new DirectiveRPCommandCenter(flag);
                        case COLOR_RED:
                            return new DirectiveRPBunker(flag); */
                    }
            }
        }
    }
};  // END of function ------------------------------------------------------------------------------------------------------------



















/*                                             ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄            ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄ 
*                                             ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌          ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
*                                             ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌▐░▌          ▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀ 
*                                             ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌          ▐░▌          ▐░▌          
*                                             ▐░█▄▄▄▄▄▄▄█░▌▐░▌       ▐░▌▐░▌          ▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄ 
*                                             ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░▌          ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
*                                             ▐░█▀▀▀▀█░█▀▀ ▐░▌       ▐░▌▐░▌          ▐░█▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀█░▌
*                                             ▐░▌     ▐░▌  ▐░▌       ▐░▌▐░▌          ▐░▌                    ▐░▌
*                                             ▐░▌      ▐░▌ ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄█░▌
*                                             ▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
*                                             ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀ 
*/                                                                 
const roles = function () {

    for (const name in Game.creeps) {
        const creep = Game.creeps[name];

        if (creep.spawning) continue;

        if (creep.ticksToLive > 1488) {

            if (creep.ticksToLive > 1498) creep.say(cSpeak(6), [true]);

            if (creep.room.memory.labs.type && creep.room.memory.utils.boosting[creep.memory.role].boost  && !creep.memory.boosted) {
                creep.moveTo(creep.room.memory.labs.loc.x, creep.room.memory.labs.loc.y, { ignoreCreeps: true });
                if (creep.ticksToLive < 1497) laboratory(creep);
                continue;
            }
        }


        if (creep.ticksToLive < 2) creep.say(cSpeak(8), [true]);

        switch (creep.memory.role) {




/*                                   ___  __ ___      ____  ____   __  ____  ____      ___ __  ___      
*                                ___(___)/ //  _)    (  _ \(  _ \ /  \(  _ \(  __)    (_  \\ \(___)___  
*                               (___)___( ( ) (_      ) __/ )   /(  O )) _ ( ) _)      _) ( ) )___(___) 
*                                   (___)\_\\___)    (__)  (__\_) \__/(____/(____)    (___//_/(___)     
*/
            case 'probe':

                if (Game.time % Math.floor(Math.random() * (40 - 4) + 2) === 0) creep.say(cSpeak(6), [true]);
                
                if (creep.pos.x !== creep.memory.x || creep.pos.y !== creep.memory.y) {
                    creep.moveTo(creep.memory.x, creep.memory.y, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 10 });
                    continue;
                }

                creep.harvest(Game.getObjectById(creep.memory.wSource), RESOURCE_ENERGY);
                continue;




/*                                   ___  __ ___      ____  __   ____    ____  ____   __  ____  ____      ___ __  ___      
*                                ___(___)/ //  _)    (  __)/ _\ (  _ \  (  _ \(  _ \ /  \(  _ \(  __)    (_  \\ \(___)___  
*                               (___)___( ( ) (_      ) _)/    \ )   /   ) __/ )   /(  O )) _ ( ) _)      _) ( ) )___(___) 
*                                   (___)\_\\___)    (__) \_/\_/(__\_)  (__)  (__\_) \__/(____/(____)    (___//_/(___)     
*/
            case 'probefar':

                if (creep.room.name === creep.memory.troom && (creep.ticksToLive < 2 || creep.hits < 100)) creep.pos.createFlag(undefined, COLOR_YELLOW, COLOR_BLUE);

                if (Game.time % Math.floor(Math.random() * (40 - 4) + 2) === 0) creep.say(cSpeak(6), [true]);

                if (creep.room.name !== creep.memory.troom) {
                    creep.moveTo(new RoomPosition(creep.memory.x, creep.memory.y, creep.memory.troom), { reusePath: 50 });
                    continue;
                }

                if (creep.room.name === creep.memory.troom) {

                    if (creep.pos.x !== creep.memory.x || creep.pos.y !== creep.memory.y) {
                        creep.moveTo(creep.memory.x, creep.memory.y, { visualizePathStyle: { stroke: '#ffaa00' },reusePath: 10 });
                        continue;
                    }

                    creep.harvest(Game.getObjectById(creep.memory.wSrc), RESOURCE_ENERGY);
                }
                continue;








/*                              ___  __ ___      ____  __   ____     __   ____  ____  __  _  _  __  __     __  ____  __  ____      ___ __  ___      
*                           ___(___)/ //  _)    (  __)/ _\ (  _ \   / _\ / ___)/ ___)(  )( \/ )(  )(  )   / _\(_  _)/  \(  _ \    (_  \\ \(___)___  
*                          (___)___( ( ) (_      ) _)/    \ )   /  /    \\___ \\___ \ )( / \/ \ )( / (_/\/    \ )( (  O ))   /     _) ( ) )___(___) 
*                              (___)\_\\___)    (__) \_/\_/(__\_)  \_/\_/(____/(____/(__)\_)(_/(__)\____/\_/\_/(__) \__/(__\_)    (___//_/(___)     
*/
            case 'assimfar':


                if (creep.room.name === creep.memory.troom && (creep.ticksToLive < 2 || creep.hits < 100)) {

                    const drpChk = creep.room.find(FIND_DROPPED_RESOURCES, { 
                        filter: d => d.power > 2000 || d.energy > 2000 });

                    if (drpChk[0]){

                        creep.pos.createFlag(undefined, COLOR_YELLOW, COLOR_BROWN);

                    }

                    else {

                        creep.pos.createFlag(undefined, COLOR_YELLOW, COLOR_BLUE);

                    }

                }
                
                if (Game.time % Math.floor(Math.random() * (40 - 4) + 5) === 0) creep.say(cSpeak(6), [true]);

                if (creep.memory.storing && creep.carry.energy === 0) {
                    creep.memory.storing = false;
                    creep.say('🔄 collect', [true]);
                }

                if (!creep.memory.storing && _.sum(creep.carry) === creep.carryCapacity) {
                    creep.memory.storing = true;
                    creep.say('🚧 storing', [true]);
                }

                if (creep.memory.storing) {

                    if (creep.room.name !== creep.memory.hroom) {

                        creep.moveTo(new RoomPosition(19, 23, creep.memory.hroom), { reusePath: 50 }); 
                        continue; 

                    }

                    if (creep.room.name === creep.memory.hroom) {

                        if (creep.carry.energy > 0) {

                            const targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                                filter: t => (t.structureType === 'extension' ||
                                    t.structureType === 'spawn' ||
                                    t.structureType === 'powerSpawn' ||
                                    t.structureType === 'nuker') && t.energy < t.energyCapacity ||
                                    t.structureType === 'container' && t.store[RESOURCE_ENERGY] < t.storeCapacity ||
                                    t.structureType === 'link' && t.energy < 750 ||
                                    t.structureType === 'tower' && t.energy < 900 });

                            if (targets) {

                                if (creep.transfer(targets, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                    creep.moveTo(targets, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 15 });
                                }

                                continue;
                            }
                        }

                        if (creep.carry['power']) {

                            const targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                                filter: p => (p.structureType === 'powerSpawn' && p.power < p.powerCapacity) ||
                                p.structureType === 'storage' && t.store[RESOURCE_POWER] < p.storeCapacity ||
                                p.structureType === 'terminal' && t.store[RESOURCE_POWER] < p.storeCapacity});

                            if (targets) {

                                if (creep.transfer(targets, RESOURCE_POWER) === ERR_NOT_IN_RANGE) {
                                    creep.moveTo(targets, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 15 });
                                }

                                continue;
                            }
                        }

                        if (creep.memory.hroom === creep.memory.troom) {
                            if (creep.carry.power === 0 && Game.time % 5 === 0) creep.memory.role = 'assim';
                        }
                    }
                } 
                
                else {

                    if (creep.room.name !== creep.memory.troom) { 
                        creep.moveTo(new RoomPosition(28, 35, creep.memory.troom), { reusePath: 50 }); 
                        continue;
                    }

                    if (creep.room.name === creep.memory.troom) {

                        const dep = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, { 
                            filter: d => d.power > 10 || d.energy > (creep.carryCapacity / 2) });

                        if (dep) {

                            if (dep.resourceType === 'energy') {
                                if (creep.pickup(dep, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                    creep.moveTo(dep, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 15 });
                                }
                                continue;
                            }

                            if (dep.resourceType === 'power') {
                                if (creep.pickup(dep, RESOURCE_POWER) === ERR_NOT_IN_RANGE) {
                                    creep.moveTo(dep, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 15 });
                                }
                                continue;
                            }
                        }

                        const sources = creep.pos.findClosestByRange(FIND_STRUCTURES, { 
                            filter: s => s.structureType === 'container' && s.store[RESOURCE_ENERGY] >= creep.carryCapacity });

                        if (sources) {

                            if (creep.withdraw(sources, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 15 });

                            }

                            continue;
                        }

                        else {

                            if (creep.pos.x === 0 || creep.pos.y === 0 || creep.pos.x === 49 || creep.pos.y === 49) {
                                creep.moveTo(Math.floor(Math.random() * (40 - 1) + 1), Math.floor(Math.random() * (40 - 1) + 1), { reusePath: 0 });

                            }
                            
                        }
                    }
                }
                continue;






/*                                   ___  __ ___       __   ____  ____  __  _  _  __  __     __  ____  __  ____      ___ __  ___      
*                                ___(___)/ //  _)     / _\ / ___)/ ___)(  )( \/ )(  )(  )   / _\(_  _)/  \(  _ \    (_  \\ \(___)___  
*                               (___)___( ( ) (_     /    \\___ \\___ \ )( / \/ \ )( / (_/\/    \ )( (  O ))   /     _) ( ) )___(___) 
*                                   (___)\_\\___)    \_/\_/(____/(____/(__)\_)(_/(__)\____/\_/\_/(__) \__/(__\_)    (___//_/(___)     
*/
            case 'assim':

                if (Game.time % Math.floor(Math.random() * (40 - 4) + 3) === 0) creep.say(cSpeak(6), [true]);

                if (creep.memory.moving && creep.carry.energy === 0) {
                    creep.memory.moving = false;
                    creep.say('🔄 collect', [true]);
                }

                if (!creep.memory.moving && creep.carry.energy === creep.carryCapacity) {
                    creep.memory.moving = true;
                    creep.say('📦 store', [true]);
                }

                if (creep.memory.moving) {
                    const targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: s => (s.structureType === 'extension' ||
                            s.structureType === 'powerSpawn' ||
                            s.structureType === 'spawn' ||
                            s.structureType === 'lab' ||
                            s.structureType === 'nuker') && s.energy < s.energyCapacity ||
                            s.structureType === 'link' && s.id !== creep.room.memory.links.upgrader && s.energy < 100 ||
                            s.structureType === 'tower' && s.energy < 400 });

                    if (targets) {
                        if (creep.transfer(targets, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
                        }
                        continue;
                    }

                    if (creep.room.storage && creep.room.memory.utils['storing'].storageFill) {           
                            if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.storage, { visualizePathStyle: { stroke: '#F3FF43' }, reusePath: 15 });
                            }
                            continue;                       
                    }

                    if (creep.room.terminal) {
                        if (creep.room.terminal.store[RESOURCE_ENERGY] < 100000) {
                            if (creep.transfer(creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.terminal, { visualizePathStyle: { stroke: '#F3FF43' }, reusePath: 15 });
                            }
                            continue;
                        }
                    }
                }

                else {

                    const dropenergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, { filter: d => d.resourceType === RESOURCE_ENERGY && d.energy > creep.carryCapacity / 8 });

                    if (dropenergy && !creep.carry['H'] && !creep.carry['G']) {

                        if (creep.pickup(dropenergy, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(dropenergy, { visualizePathStyle: { stroke: '#F3FF43' }, reusePath: 10 });                       
                        }

                        continue;

                    }                    

                    const bins = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: s => s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >= creep.carryCapacity });

                    if (creep.withdraw(bins, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(bins, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 10 });
                        continue;

                    }

                    if (creep.room.terminal && creep.room.terminal.store[RESOURCE_ENERGY] > 108000) {

                            if (creep.withdraw(creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.terminal, { visualizePathStyle: { stroke: '#F3FF43' }, reusePath: 15 });
                            }
                            continue;
                        
                    }

                    if (creep.room.memory.nuke && creep.room.terminal.store['G'] && _.sum(creep.carry) === 0) {

                        const nuke = Game.getObjectById(creep.room.memory.nuke);

                        if (nuke.ghodium < 5000) {

                            if (!creep.carry['G'] && creep.withdraw(creep.room.terminal, 'G') === ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.storage, { visualizePathStyle: { stroke: '#F3FF43' }, reusePath: 15 });
                            }
                            continue;
                        }

                        if (creep.carry['G'] > 0 ) {

                            if (creep.transfer(nuke, 'G') === ERR_NOT_IN_RANGE) {
                                creep.moveTo(nuke, { visualizePathStyle: { stroke: '#F3FF43' }, reusePath: 15 });
                            }
                            continue;
                        }

                    }


                    if (creep.room.storage) {

                        if (creep.room.storage.store['H'] > 0 && _.sum(creep.carry) === 0 && creep.room.terminal && _.sum(creep.room.terminal.store) < 285000 ) {

                            if (creep.withdraw(creep.room.storage, 'H') === ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.storage, { visualizePathStyle: { stroke: '#F3FF43' }, reusePath: 15 });
                            }
                            continue;
                        }

                        if (creep.carry['H'] > 0 ) {

                            if (creep.transfer(creep.room.terminal, 'H') === ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.terminal, { visualizePathStyle: { stroke: '#F3FF43' }, reusePath: 15 });
                            }
                            continue;
                        }

                        if (!creep.room.memory.utils['storing'].storageFill || creep.room.storage.store[RESOURCE_ENERGY] > 2000 && creep.room.energyAvailable < 2000) {
                            if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.storage, { visualizePathStyle: { stroke: '#F3FF43' }, reusePath: 15 });
                            }
                            continue;
                        }
                    }

                    const notlost = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, { filter: d => d.resourceType === RESOURCE_ENERGY && d.energy > 100 });

                        if (notlost && creep.pickup(notlost, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(notlost, { visualizePathStyle: { stroke: '#F3FF43' }, reusePath: 10 });                       
                        }
                }
                continue;




/*                                   ___  __ ___     ____  __   ____    ____  _  _  __  __    ____  ____  ____     ___ __  ___      
*                                ___(___)/ //  _)   (  __)/ _\ (  _ \  (  _ \/ )( \(  )(  )  (    \(  __)(  _ \   (_  \\ \(___)___  
*                               (___)___( ( ) (_     ) _)/    \ )   /   ) _ () \/ ( )( / (_/\ ) D ( ) _)  )   /    _) ( ) )___(___) 
*                                   (___)\_\\___)   (__) \_/\_/(__\_)  (____/\____/(__)\____/(____/(____)(__\_)   (___//_/(___)     
*/
            case 'bldfar':
                if (creep.ticksToLive < 2 || creep.hits < 100) {
                    creep.pos.createFlag(undefined, COLOR_YELLOW, COLOR_CYAN);
                }

                if (creep.room.name === creep.memory.hroom && creep.carry.energy < 50) {
                    const bins = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: s => s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >= creep.carryCapacity });
                    if (bins) {
                        if (creep.withdraw(bins, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(bins, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 25 });
                        }
                        continue;
                    }
                }

                if (creep.room.name !== creep.memory.troom) {
                    creep.moveTo(new RoomPosition(30, 2, creep.memory.troom), { reusePath: 40 });
                    continue;
                }

                if (creep.room.name === creep.memory.troom) {
                    if (creep.memory.building && creep.carry.energy === 0) {
                        creep.memory.building = false;
                        creep.say('🔄 collect', [true]);
                    }

                    if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
                        creep.memory.building = true;
                        creep.say('🚧 build', [true]);
                    }

                    if (creep.memory.building) {

                        const targets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                        if (targets) {
                            if (creep.build(targets) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(targets, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 15 });
                            }
                            continue;
                        }

                        const repairs = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: s => s.hits < 200000 && s.structureType === 'rampart' ||
                                s.hits < s.hitsMax && s.hitsMax < 251000 ||
                                s.hits < 1000000 && s.hits < s.hitsMax && s.structureType === 'constructedWall' });

                        if (repairs) {
                            if (creep.repair(repairs) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(repairs, { visualizePathStyle: { stroke: '#0000FF' }, reusePath: 15, range: 3 });
                            }
                            continue;
                        }

                        if (creep.room.controller.my) {
                            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.controller, {visualizePathStyle: { stroke: '#ffffff' }, reusePath: 15 });
                            }
                            continue;
                        }
                    }

                    else {

                        const dropped = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                            filter: d => d.resourceType === RESOURCE_ENERGY && d.energy > 50 });

                        if (dropped) {
                            if (creep.pickup(dropped, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(dropped, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 20 });
                            }
                            continue;
                        }

                        const containers = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: s => s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >= creep.carryCapacity });

                        if (containers) {
                            if (creep.withdraw(containers, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(containers, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 15 });
                            }
                            continue;
                        }

                        const sources = creep.pos.findClosestByRange(FIND_SOURCES, { filter: ss => ss.energy > 0 });
                        if (creep.harvest(sources, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 15 });
                        }
                        continue;
                        
                    }

                    if (Game.time % 3 === 0) {

                        const roads = creep.pos.lookFor(LOOK_STRUCTURES);
                        if(roads[0] && roads[0].structureType === 'road') {

                            creep.move(Math.floor(Math.random() * (7 + 1)));

                        }
                    }

                }
                continue;




/*                                       ___  __ ___       __   ____  _  _   ___  __   __ _      ___ __  ___      
*                                    ___(___)/ //  _)     / _\ (  _ \/ )( \ / __)/  \ (  ( \    (_  \\ \(___)___  
*                                   (___)___( ( ) (_     /    \ )   /) __ (( (__(  O )/    /     _) ( ) )___(___) 
*                                       (___)\_\\___)    \_/\_/(__\_)\_)(_/ \___)\__/ \_)__)    (___//_/(___)     
*/
            case 'upgrader':

                if (creep.memory.upgrading && creep.carry.energy === 0) {
                    creep.memory.upgrading = false;
                    creep.say('🔄 collect', [true]);
                }
                if (!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
                    creep.memory.upgrading = true;
                    creep.say('⚡ energize', [true]);
                }
                if (creep.memory.upgrading) {
                    if (Game.time % Math.floor(Math.random() * (40 - 4) + 4) === 0) { creep.say(cSpeak(7), [true]) }

                    if (creep.room.controller.sign && creep.room.controller.sign.username !== creep.room.controller.owner.username) {
                        creep.signController(creep.room.controller, ' 👽 ');
                    }

                    const uC = _.filter(Game.flags, f => f.color === COLOR_WHITE && f.secondaryColor === COLOR_PURPLE && f.pos.roomName === creep.room.name);
                    if (uC.length > 0) {
                        creep.upgradeController(creep.room.controller);
                        if (creep.pos.x !== uC[0].pos.x || creep.pos.y !== uC[0].pos.y) {
                            creep.moveTo(uC[0], { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 10 });
                        }
                        continue;
                    }

                    if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
                        continue;
                    }

                } 
                
                else {

                    if (creep.room.memory.links.upgrader !== undefined) {
                        const upLink = Game.getObjectById(creep.room.memory.links.upgrader);
                        if (upLink.energy > 0) {
                            if (creep.withdraw(upLink, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(upLink, {visualizePathStyle: { stroke: '#F3FF43' }, reusePath: 10 });
                            }
                            continue;
                        }
                    }

                    if (creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] > 0) {
                        if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 10 });
                        }
                        continue;
                    }

                    const bins = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: s => s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 198 });
                    if (creep.withdraw(bins, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(bins, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 10 });
                    }
                    continue;
                }
                continue;




/*                                       ___  __ ___      ____  _  _  __  __    ____  ____  ____      ___ __  ___      
*                                    ___(___)/ //  _)    (  _ \/ )( \(  )(  )  (    \(  __)(  _ \    (_  \\ \(___)___  
*                                   (___)___( ( ) (_      ) _ () \/ ( )( / (_/\ ) D ( ) _)  )   /     _) ( ) )___(___) 
*                                       (___)\_\\___)    (____/\____/(__)\____/(____/(____)(__\_)    (___//_/(___)     
*/
            case 'builder':
                if (creep.memory.building && creep.carry.energy === 0) {
                    creep.memory.building = false;
                    creep.say('🔄 collect', [true]);
                }
                if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
                    creep.memory.building = true;
                    creep.say('🚧 build', [true]);
                }
                if (creep.memory.building) {

                    const targets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                    if (targets) {
                        if (creep.build(targets) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets, { visualizePathStyle: { stroke: '#0000FF' }, reusePath: 10, range: 3 });
                        }
                        continue;
                    }

                    if (Game.time % 10 === 0 && !targets) {
                        creep.say('Repair!'); creep.memory.role = 'repairs';
                        continue;
                    }

                } else {

                    const dropped = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                        filter: d => d.resourceType === RESOURCE_ENERGY && d.energy > 350 });

                    if (dropped) {
                        if (creep.pickup(dropped, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(dropped, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 20 });
                        }
                        continue;
                    }

                    const bins = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: s => s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >= creep.carryCapacity });
                    if (bins != null) {
                        if (creep.withdraw(bins, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(bins, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 10 });
                        }
                        continue;
                    }

                    const sources = creep.pos.findClosestByRange(FIND_SOURCES);
                    if (sources) {
                        if (creep.harvest(sources, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 10 });
                        }
                        continue;
                    }
                }
                continue;




/*                              ___  __ ___      ____  ____  ____   __   __  ____      _    ____  __  ____  ____  __  ____  _  _      ___ __  ___      
*                           ___(___)/ //  _)    (  _ \(  __)(  _ \ / _\ (  )(  _ \    / )  (  __)/  \(  _ \(_  _)(  )(  __)( \/ )    (_  \\ \(___)___  
*                          (___)___( ( ) (_      )   / ) _)  ) __//    \ )(  )   /   / /    ) _)(  O ))   /  )(   )(  ) _)  )  /      _) ( ) )___(___) 
*                              (___)\_\\___)    (__\_)(____)(__)  \_/\_/(__)(__\_)  (_/    (__)  \__/(__\_) (__) (__)(__)  (__/      (___//_/(___)     
*/
            case 'repairs':

                if (creep.memory.repairing && creep.carry.energy === 0) {
                    creep.memory.repairing = false;
                    creep.say('🔄 collect', [true]);
                }
                if (!creep.memory.repairing && creep.carry.energy === creep.carryCapacity) {
                    creep.memory.repairing = true;
                    creep.say('🚧 repair', [true]);
                }
                if (creep.memory.repairing) {
                    // --------================== |||||   Attempt to reduce CPU usage choosing lowest hitpoints STRUCTURE_RAMPART to repair |||||==============--------
                    let tries;
                    let rxyz;
                    let rTargets;
                    tries = 0;
                    rxyz = 1000;
                    do {
                        rTargets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: (s) => (s.structureType === STRUCTURE_RAMPART && s.hits <= rxyz) });
                        rxyz = rxyz * 2;
                        tries++;
                    } while (!rTargets && tries < 15);

                    if (rTargets) {
                        if (creep.repair(rTargets) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(rTargets, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10, range: 3 });
                        }
                        continue;
                    }

                    tries = 0;
                    rxyz = 1000;
                    do {
                        rTargets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: (s) => (s.structureType === STRUCTURE_WALL && s.hits <= rxyz ) });
                        rxyz = rxyz * 2;
                        tries++;
                    } while (!rTargets && tries < 15);

                    if (rTargets) {
                        if (creep.repair(rTargets) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(rTargets, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10, range: 3 });
                        }
                        continue;
                    }

                    tries = 0;
                    rxyz = 1000;
                    do {
                        rTargets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: (s) => (s.hits <= rxyz && s.hits < s.hitsMax) });
                        rxyz = rxyz * 2;
                        tries++;
                    } while (!rTargets && tries < 15);

                    if (rTargets) {
                        if (creep.repair(rTargets) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(rTargets, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10, range: 3 });
                        }
                        continue;
                    }

                } else {

                    const dropenergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                        filter: (d) => { return (d.resourceType === RESOURCE_ENERGY && d.energy > 50) } });
                    if (dropenergy) {
                        if (creep.pickup(dropenergy, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(dropenergy, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
                        }
                        continue;
                    }

                    const sources = creep.pos.findClosestByRange(FIND_SOURCES, { filter: (ss) => { return (ss.energy > 50) } });
                    if (creep.harvest(sources, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' },reusePath: 10 });
                    }
                    continue;
                }
                continue;




/*                                       ___  __ ___      ____  ____   __   __     __  ____      ___ __  ___      
*                                    ___(___)/ //  _)    (__  )(  __) / _\ (  )   /  \(_  _)    (_  \\ \(___)___  
*                                   (___)___( ( ) (_      / _/  ) _) /    \/ (_/\(  O ) )(       _) ( ) )___(___) 
*                                       (___)\_\\___)    (____)(____)\_/\_/\____/ \__/ (__)     (___//_/(___)     
*/
            case 'zealotfar':

                if (Game.time % Math.floor(Math.random() * (40 - 4) + 6) === 0) creep.say(cSpeak(6), [true]);

                if (creep.room.name !== creep.memory.troom) {

                    if(creep.hits < creep.hitsMax) creep.heal(creep);

                    creep.moveTo(new RoomPosition(creep.memory.x, creep.memory.y, creep.memory.troom), { reusePath: 50 });
                    continue;
                }

                if (creep.room.name === creep.memory.troom) {

                    const goFlag = Game.flags['Guard-' + creep.room.name];
                    if (goFlag) {
                        creep.moveTo(goFlag, { reusePath: 10 });

                        const hostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                        if (hostile && hostile.owner.username != 'Deltazulu') {
                            creep.attack(hostile);
                        }
                    
                        continue;
                    }

                    const closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                    if (closestHostile && closestHostile.owner.username != 'Deltazulu') {
                        if (creep.attack(closestHostile) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(closestHostile);
                        }
                        continue;
                    }

                    const closestInjuredUnit = creep.pos.findClosestByRange(FIND_MY_CREEPS, { filter: (c) => (c.hits < c.hitsMax) });
                    if (closestInjuredUnit) {
                        if (creep.heal(closestInjuredUnit) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(closestInjuredUnit, { reusePath: 10 });
                            creep.rangedHeal(closestHostile);
                        }
                        continue;
                    } 

                    const strikeFlag = Game.flags['StrikeTeam'];
                    if (strikeFlag) {
                        if (creep.memory.troom !== strikeFlag.pos.roomName) creep.memory.troom = strikeFlag.pos.roomName;

                        const structs = strikeFlag.pos.lookFor(LOOK_STRUCTURES);
                        if(structs[0]) {
                            if (creep.attack(structs[0]) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(strikeFlag);
                                if (structs[0].structureType === 'powerBank' && structs[0].hits < 6000) {
                                    creep.room.createFlag(structs[0].pos, undefined, COLOR_YELLOW, COLOR_BROWN);
                                }
                            }
                            continue;
                        }

                        const creepz = strikeFlag.pos.lookFor(LOOK_CREEPS);
                        if(creepz[0]) {
                            if (creep.attack(creepz[0]) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(strikeFlag);
                            }
                            continue;
                        }

                        if(!structs[0] && !creepz[0]) strikeFlag.remove();
                    }

                    if (Game.time % 3 === 0) {

                        const roads = creep.pos.lookFor(LOOK_STRUCTURES);
                        if(roads[0] && roads[0].structureType === 'road')  creep.move(Math.floor(Math.random() * (7 + 1)));

                        const removeFlags = _.filter(Game.flags, f => f.pos.roomName === creep.room.name && f.color === COLOR_BLUE && f.secondaryColor === COLOR_PURPLE);
                        if (removeFlags.length > 0) {
                            removeFlags[0].remove();
                        }

                    }
                }
                continue;




/*                                       ___  __ ___      _  _    __ _    __     __     _  _    ____      ___ __  ___      
*                                    ___(___)/ //  _)    / )( \  (  ( \  (  )   /  \   / )( \  (  __)    (_  \\ \(___)___  
*                                   (___)___( ( ) (_     ) \/ (  /    /   )(   (  O )  ) \/ (   ) _)      _) ( ) )___(___) 
*                                       (___)\_\\___)    \____/  \_)__)  (__)   \__\)  \____/  (____)    (___//_/(___)     
*/
            case 'unique':
                /// Unique Probe -- Mines --> Stores --> Builds -- > Repairs

                if (creep.memory.storing && creep.carry.energy === 0) {
                    creep.memory.storing = false;
                    creep.say('🔄 mining');
                }
                if (!creep.memory.storing && creep.carry.energy === creep.carryCapacity) {
                    creep.memory.storing = true;
                    creep.say('🚧 storing');
                }

                ///  Storing  >>>>   ---[ BUILDING and REPAIRING ]---
                if (creep.memory.storing && creep.room.energyAvailable === creep.room.energyCapacityAvailable) {

                    if (creep.room.controller.level > 1) {

                        const buildsite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                        if (buildsite) {
                            if (creep.build(buildsite) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(buildsite, { visualizePathStyle: { stroke: '#0000FF' }, reusePath: 10, range: 3 });
                            }
                            continue;
                        }

                        const repairstr = creep.pos.findInRange(FIND_STRUCTURES, 5, {
                            filter: (s) => (s.hits < 1000 && s.structureType === 'constructedWall' ||
                                s.hits < 13000 && s.structureType === 'rampart') });
                        if (repairstr.length > 0) {
                            if (creep.repair(repairstr[0]) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(repairstr[0], { reusePath: 10, visualizePathStyle: { stroke: '#ffffff' }, range: 3 });
                            }
                            continue;
                        }

                        const repairst = creep.pos.findInRange(FIND_STRUCTURES, 5, { filter: (s) => (s.hits < 251000 && s.hits < s.hitsMax) });
                        if (repairst.length > 0) {
                            if (creep.repair(repairst[0]) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(repairst[0], { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10, range: 3 });
                            }
                            continue;
                        }

                        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
                        }
                        continue;
                    }

                    if (creep.room.controller.level === 1) {
                        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
                        }
                        continue;
                    }
                    continue;
                }

                /// Storing >>>>>       --- Extensions // Spawns // Towers(Direct) OR Containers(In-Direct) -  By Closest to ---                                              
                if (creep.memory.storing && creep.room.energyAvailable < creep.room.energyCapacityAvailable) {

                    if (creep.room.controller.level === 1) {

                        const targets = Game.getObjectById(creep.memory.wSpawn);
                        if (creep.transfer(targets, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
                        }
                        continue;
                    }

                    if (creep.room.controller.level > 1) {

                        const dfltT = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: (s) => {
                                return (s.structureType === STRUCTURE_EXTENSION ||
                                    s.structureType === STRUCTURE_SPAWN) && s.energy < s.energyCapacity ||
                                    (s.structureType === STRUCTURE_TOWER) && s.energy < 501 } });
                        if (dfltT) {
                            if (creep.transfer(dfltT, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(dfltT, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
                            }
                        }
                        continue;
                    }
                }
                ///  -  Not Storing - Mine Source                                     
                else {

                    const dropenergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, { filter: (d) => { return (d.resourceType === RESOURCE_ENERGY && d.energy > 50) } });
                    if (dropenergy) {
                        if (creep.pickup(dropenergy, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(dropenergy);
                        }
                        continue;
                    }

                    const source = Game.getObjectById(creep.memory.wSource);
                    if (creep.harvest(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 10 });
                    }
                    continue;
                }
                continue;








/*                                                ___  ___     ___  __     __   __  _  _  ____  ____    ___  ___      
*                                             ___(___)/  _)   / __)(  )   / _\ (  )( \/ )(  __)(  _ \  (_  \(___)___  
*                                            (___)___ ) (_   ( (__ / (_/\/    \ )( / \/ \ ) _)  )   /   _) ( ___(___) 
*                                                (___)\___)   \___)\____/\_/\_/(__)\_)(_/(____)(__\_)  (___/(___)     
*/
            case 'claimer':

                if (Game.time % Math.floor(Math.random() * (40 - 4) + 7) === 0) creep.say(cSpeak(6), [true]);

                if (creep.room.name !== creep.memory.troom) { 
                    creep.moveTo(new RoomPosition(creep.memory.x, creep.memory.y, creep.memory.troom), { reusePath: 50 });
                    continue; 
                }

                if (creep.room.name === creep.memory.troom) {

                    if (creep.memory.status === 'reserving') {

                        if (creep.ticksToLive < 2 || creep.hits < 100) {
                            creep.pos.createFlag(undefined, COLOR_PURPLE, COLOR_WHITE);
                        }

                        if (creep.reserveController(creep.room.controller) === ERR_NOT_IN_RANGE) creep.moveTo(creep.room.controller, { reusePath: 50 });
                        continue;
                    }

                    if (creep.memory.status === 'claiming') {

                        if (creep.claimController(creep.room.controller) === ERR_NOT_IN_RANGE) creep.moveTo(creep.room.controller, { reusePath: 50 });
                        continue;

                    }

                    if (creep.memory.status === 'attacking') {
                        if (creep.attackController(creep.room.controller) === ERR_NOT_IN_RANGE) creep.moveTo(creep.room.controller, { reusePath: 50 });
                    }
                    continue;
                }
                continue;






/*                                   ___  __ ___      ____  _  _   __   __    __      ____  ____   __   __     __  ____      ___ __  ___      
*                                ___(___)/ //  _)    / ___)( \/ ) / _\ (  )  (  )    (__  )(  __) / _\ (  )   /  \(_  _)    (_  \\ \(___)___  
*                               (___)___( ( ) (_     \___ \/ \/ \/    \/ (_/\/ (_/\   / _/  ) _) /    \/ (_/\(  O ) )(       _) ( ) )___(___) 
*                                   (___)\_\\___)    (____/\_)(_/\_/\_/\____/\____/  (____)(____)\_/\_/\____/ \__/ (__)     (___//_/(___)     
*/
            case 'smallzealot':
                //////// -=-=-=-=-=-=-=-=-=-=-  Code intended to provoke enemy towers into expelling energy into creep on the boarder getting healed outside the room -=-=-=-=-=-=-=-=-
                if (Game.time % Math.floor(Math.random() * (40 - 4) + 8) === 0) creep.say(cSpeak(6), [true]);

                if (creep.room.name !== creep.memory.troom) {
                    if (creep.hits < creep.hitsMax) {
                        const healer = creep.pos.findClosestByRange(FIND_MY_CREEPS, { filter: (c) => (c.getActiveBodyparts(HEAL) > 0) });
                        creep.moveTo(healer, { reusePath: 8 });
                        continue;
                    }
                    creep.moveTo(new RoomPosition(33, 8, creep.memory.troom), { reusePath: 10 });
                    continue;
                }
                if (creep.room.name === creep.memory.troom) {
                    if (creep.hits < creep.hitsMax) {
                        creep.moveTo(new RoomPosition(3, 44, creep.memory.hroom), { reusePath: 10 });
                        continue;
                    }
                    const closestEnemyRampart = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                        filter: (s) => (s.structureType === 'rampart') });

                    if (closestEnemyRampart) {
                        if (creep.dismantle(closestEnemyRampart) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(closestEnemyRampart, { reusePath: 3 });
                        }
                        continue;
                    }

                    const closestEnemyStructure = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
                    if (closestEnemyStructure) {
                        if (creep.attack(closestEnemyStructure) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(closestEnemyStructure, { reusePath: 3 });
                        }
                        continue;
                    }
                    const closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                    if (closestHostile) {
                        if (creep.attack(closestHostile) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(closestHostile, { reusePath: 3 });
                        }
                        continue;
                    }
                }
                continue;





/*                                   ___  __ ___      ____  ____  _  _  ____  __     __   ____      ___ __  ___      
*                                ___(___)/ //  _)    (_  _)(  __)( \/ )(  _ \(  )   / _\ (  _ \    (_  \\ \(___)___  
*                               (___)___( ( ) (_       )(   ) _) / \/ \ ) __// (_/\/    \ )   /     _) ( ) )___(___) 
*                                   (___)\_\\___)     (__) (____)\_)(_/(__)  \____/\_/\_/(__\_)    (___//_/(___)     
*/
            case 'templarpriest':
                if (Game.time % Math.floor(Math.random() * (40 - 4) + 9) === 0) creep.say(cSpeak(6), [true]);

                if (creep.room.name !== creep.memory.troom) {
                    creep.moveTo(new RoomPosition(creep.memory.x, creep.memory.y, creep.memory.troom), { reusePath: 50 });
                    continue;
                }

                if (creep.room.name === creep.memory.troom) {

                    if (Game.flags.HealerMover) {
                        creep.moveTo(Game.flags.HealerMover, { reusePath: 10 });
                        if (Game.flags.HealerMover.pos.roomName !== creep.memory.troom) {
                            creep.memory.troom = Game.flags.HealerMover.pos.roomName;
                            creep.memory.goX = Game.flags.HealerMover.pos.x;
                            creep.memory.goY = Game.flags.HealerMover.pos.y;
                        }


                        const theInjured = creep.pos.findClosestByRange(FIND_MY_CREEPS, { filter: (c) => (c.hits < c.hitsMax) });
                        if (theInjured) {
                            if (creep.heal(theInjured) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(theInjured, { reusePath: 20, range: 5 });
                                creep.rangedHeal(theInjured);
                            }
                            continue;
                        }
                    }

                    const closestInjuredUnit = creep.pos.findClosestByRange(FIND_MY_CREEPS, { filter: (c) => (c.hits < c.hitsMax) });
                    if (closestInjuredUnit) {
                        if (creep.heal(closestInjuredUnit) === ERR_NOT_IN_RANGE) {
                            creep.rangedHeal(closestInjuredUnit);
                            creep.moveTo(closestInjuredUnit, { reusePath: 20 });
                        }
                        continue;
                    }

                    if (creep.memory.follow === undefined) {
                        const followit = _.filter(Game.creeps, c => c.room.name === creep.room.name && c.getActiveBodyparts(ATTACK) > 0 ||
                            c.room.name === creep.room.name && c.getActiveBodyparts(RANGED_ATTACK) > 0);
                        if (followit[0] === undefined) continue;
                        creep.memory.follow = followit[0].name;
                    }

                    if (creep.memory.follow !== undefined) {

                        if (!Game.creeps[creep.memory.follow]) {
                            creep.memory.follow = undefined;
                            continue;
                        }

                        if (Game.creeps[creep.memory.follow]) {
                            if (creep.memory.troom !== Game.creeps[creep.memory.follow].room.name) creep.memory.troom = Game.creeps[creep.memory.follow].room.name;
                            if (creep.heal(Game.creeps[creep.memory.follow]) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(Game.creeps[creep.memory.follow], { reusePath: 20 });
                                creep.rangedHeal(Game.creeps[creep.memory.follow]);
                            }
                            continue;

                        }
                    }
                }
                continue;





/*                           ___  ___    ____  ____  __   __    __ _  ____  ____    ___  ___      
*                        ___(___)/  _)  / ___)(_  _)/ _\ (  )  (  / )(  __)(  _ \  (_  \(___)___  
*                       (___)___ ) (_   \___ \  )( /    \/ (_/\ )  (  ) _)  )   /   _) ( ___(___) 
*                           (___)\___)  (____/ (__)\_/\_/\____/(__\_)(____)(__\_)  (___/(___)     
*/                    
                case 'stalker':

                if (Game.time % Math.floor(Math.random() * (40 - 4) + 10) === 0) creep.say(cSpeak(6), [true]);

                if (creep.room.name !== creep.memory.troom) {
                    creep.moveTo(new RoomPosition(creep.memory.x, creep.memory.y, creep.memory.troom), { reusePath: 50 });
                    continue;
                }

                if (creep.room.name === creep.memory.troom) {

                    if (creep.hits === creep.hitsMax) creep.memory.healthy = true;
                    if (creep.hits < 70) creep.memory.healthy = false;
                    if (creep.memory.healthy === false) continue;

                    const closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                    if (closestHostile && closestHostile.owner.username != 'Deltazulu') {
                        if (creep.rangedAttack(closestHostile) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(closestHostile);
                        }
                        continue;
                    }

                    const goFlag = Game.flags['Guard-' + creep.room.name];
                    if (goFlag) {
                        creep.moveTo(goFlag, { reusePath: 10 });
                        continue;
                    }

                    const strikeFlag = Game.flags['StrikeTeam'];
                    if (strikeFlag) {
                        if (creep.memory.troom !== strikeFlag.pos.roomName) creep.memory.troom = strikeFlag.pos.roomName;

                        const structs = strikeFlag.pos.lookFor(LOOK_STRUCTURES);
                        if(structs[0]) {
                            if (creep.rangedAttack(structs[0]) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(strikeFlag);
                                if (structs[0].hits < 3000) creep.room.createFlag(structs[0].pos, undefined, COLOR_YELLOW, COLOR_BROWN);
                            }
                            continue;
                        }

                        const creepz = strikeFlag.pos.lookFor(LOOK_CREEPS);
                        if(creepz[0]) {
                            if (creep.rangedAttack(creepz[0]) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(strikeFlag);
                            }
                            continue;
                        }

                        if(!structs[0] && !creepz[0]) strikeFlag.remove();
                    }

                    if (Game.time % 3 === 0) {
                        creep.moveTo(Math.floor(Math.random() * (40 - 1) + 1), Math.floor(Math.random() * (40 - 1) + 1), { plainCost: 0, reusePath: 0 });
                        }
                    }
                continue;





                
/*                     ___  ___    ____   __   ____  __ _     __   __ _  ____    ___  ___      
*                  ___(___)/  _)  (    \ / _\ (  _ \(  / )   /  \ (  ( \(  __)  (_  \(___)___  
*                 (___)___ ) (_    ) D (/    \ )   / )  (   (  O )/    / ) _)    _) ( ___(___) 
*                     (___)\___)  (____/\_/\_/(__\_)(__\_)   \__/ \_)__)(____)  (___/(___)     
*/    
                case 'darkone':

                if (Game.time % Math.floor(Math.random() * (40 - 4) + 12) === 0) creep.say(cSpeak(6), [true]);

                if (creep.room.name !== creep.memory.troom) {
                    creep.moveTo(new RoomPosition(creep.memory.x, creep.memory.y, creep.memory.troom), { reusePath: 50 });
                    continue;
                }

                if (creep.room.name === creep.memory.troom) {

                    if (creep.hits === creep.hitsMax) creep.memory.healthy = true;
                    if (creep.hits < 70) creep.memory.healthy = false;
                    if (creep.memory.healthy === false) continue;

                    const closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                    if (closestHostile && closestHostile.owner.username != 'Deltazulu') {
                        if (creep.attack(closestHostile) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(closestHostile);
                        }
                        continue;
                    }

                    const goFlag = Game.flags['Guard-' + creep.room.name];
                    if (goFlag) {
                        creep.moveTo(goFlag, { reusePath: 10 });
                        continue;
                    }

                    const strikeFlag = Game.flags['StrikeTeam'];
                    if (strikeFlag) {
                        if (creep.memory.troom !== strikeFlag.pos.roomName) creep.memory.troom = strikeFlag.pos.roomName;

                        const structs = strikeFlag.pos.lookFor(LOOK_STRUCTURES);
                        if(structs[0]) {
                            if (creep.attack(structs[0]) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(strikeFlag);
                                if (structs[0].hits < 3000) creep.room.createFlag(structs[0].pos, undefined, COLOR_YELLOW, COLOR_BROWN);
                            }
                            continue;
                        }

                        const creepz = strikeFlag.pos.lookFor(LOOK_CREEPS);
                        if(creepz[0]) {
                            if (creep.attack(creepz[0]) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(strikeFlag);
                            }
                            continue;
                        }

                        if(!structs[0] && !creepz[0]) strikeFlag.remove();
                    }

                    if (Game.time % 3 === 0) {
                        creep.moveTo(Math.floor(Math.random() * (40 - 1) + 1), Math.floor(Math.random() * (40 - 1) + 1), { plainCost: 0, reusePath: 0 });
                        }
                    }
                continue;







/*                           ___  ___    ____  _  _  ____  ____   __    ___  ____  __  ____    ___  ___      
*                        ___(___)/  _)  (  __)( \/ )(_  _)(  _ \ / _\  / __)(_  _)/  \(  _ \  (_  \(___)___  
*                       (___)___ ) (_    ) _)  )  (   )(   )   //    \( (__   )( (  O ))   /   _) ( ___(___) 
*                           (___)\___)  (____)(_/\_) (__) (__\_)\_/\_/ \___) (__) \__/(__\_)  (___/(___)     
*/                 

                case 'extraction':

                if (Game.time % Math.floor(Math.random() * (40 - 4) + 11) === 0) creep.say(cSpeak(6), [true]);

                if (creep.memory.moving && _.sum(creep.carry) === 0) {
                    creep.memory.moving = false;
                    creep.say('🔄 extract', [true]);
                }

                if (!creep.memory.moving && _.sum(creep.carry) === creep.carryCapacity) {
                    creep.memory.moving = true;
                    creep.say('📦 store', [true]);
                }

                if (creep.memory.moving) {
                    const targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: s => (s.structureType === 'terminal' ||
                            s.structureType === 'storage') && _.sum(s.store) < s.storeCapacity });

                    if (targets) {
                        const mine = Game.getObjectById(creep.room.memory.mineral);
                        
                        if (creep.transfer(targets, mine.mineralType) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });                            
                        }
                        continue;
                    }
                }
                
                else {

                    const mine = Game.getObjectById(creep.room.memory.mineral);

                    if (_.sum(creep.carry) === 0) {

                        const dr = creep.pos.lookFor('resources')[0];

                        if (dr) {
                            creep.pickup(dr, dr.resourceType);
                            continue;
                        }

                    }                  

                    if (mine.ticksToRegeneration > 1000) {

                        if (_.sum(creep.carry) > 0) {

                            creep.memory.moving = true;
                            continue;

                        }
                        creep.memory.role = 'upgrader';
                        continue;

                    }

                    if (creep.harvest(mine, mine.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(mine, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 10 });

                    }
                }
                continue;







                
/*                                        ___  ___    ____   __   _  _  ____  ____     __   ____  ____  __  _  _  __  __     __  ____  __  ____    ___  ___      
*                                     ___(___)/  _)  (  _ \ /  \ / )( \(  __)(  _ \   / _\ / ___)/ ___)(  )( \/ )(  )(  )   / _\(_  _)/  \(  _ \  (_  \(___)___  
*                                    (___)___ ) (_    ) __/(  O )\ /\ / ) _)  )   /  /    \\___ \\___ \ )( / \/ \ )( / (_/\/    \ )( (  O ))   /   _) ( ___(___) 
*                                        (___)\___)  (__)   \__/ (_/\_)(____)(__\_)  \_/\_/(____/(____/(__)\_)(_/(__)\____/\_/\_/(__) \__/(__\_)  (___/(___)     
*/                            
                case 'pwrassim':

                if (Game.time % Math.floor(Math.random() * (40 - 4) + 11) === 0) creep.say(cSpeak(6), [true]);

                if (creep.memory.moving && _.sum(creep.carry) === 0) {

                    const pS = Game.getObjectById(creep.room.memory.powerSpawn);

                    creep.memory.type = false;

                    if (pS.energy < 4500) creep.memory.type = 'energy';

                    if (pS.power < 1) {

                        creep.memory.type = 'power';
                    }

                    else {

                        if (creep.room.memory.labs.type && !creep.memory.type) {

                            if (creep.memory.waitTime && Game.time < creep.memory.waitTime) continue;

                            const labSet = [creep.room.memory.labs.type.ATTACK, creep.room.memory.labs.type.Harvest, creep.room.memory.labs.type.Capacity, creep.room.memory.labs.type.Ranged, creep.room.memory.labs.type.Build, creep.room.memory.labs.type.Heal, creep.room.memory.labs.type.Dismantel, creep.room.memory.labs.type.MOVE, creep.room.memory.labs.type.Upgrade, creep.room.memory.labs.type.TOUGH];
                            const minType = ['XUH2O', 'XUHO2', 'XKH2O', 'XKHO2', 'XLH2O', 'XLHO2', 'XZH2O', 'XZHO2', 'XGH2O', 'XGHO2'];

                            let i = 0;

                            while (i < 10) {

                                const lab = Game.getObjectById(labSet[i]);

                                if ((!lab.mineralAmount || lab.mineralAmount < 30 ) && creep.room.terminal.store[minType[i]] > 0) {
                                    creep.memory.type = minType[i];
                                    creep.memory.lab = labSet[i];
                                    i = 10;
                                }

                                if (i === 9) creep.memory.waitTime = Game.time + 10;

                                i++;
                            }
                        }
                    }

                    creep.memory.moving = false;
                    creep.say('🔄 collect', [true]);

                }

                if (!creep.memory.moving && _.sum(creep.carry) === creep.carryCapacity) {
                    creep.memory.moving = true;
                    creep.say('📦 store', [true]);
                }

                if (creep.memory.moving) {  //   Moving Material to appropriate destinations

                    if (creep.memory.type === 'power' || creep.memory.type === 'energy') {

                        const pwr = Game.getObjectById(creep.room.memory.powerSpawn);

                        if (pwr.energy > 5000 - creep.carry.energy) {

                            if (creep.transfer(creep.room.terminal, 'energy') === ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.terminal, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 10 });
                                continue;
                            }

                        }

                        if (creep.transfer(pwr, creep.memory.type) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(pwr, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 10 });
                            continue;
                        }

                    }

                    else { // Not Power or Energy - Must be Minerals for Labs

                        const target = Game.getObjectById(creep.memory.lab);
                        if (creep.transfer(target, creep.memory.type) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 10 });
                            continue;
                        }

                    }

                }



                else {   //   Not Moving Material -  Checking Material Sources -  Power / Energy / Minerals

                    if (creep.memory.type === 'power' || creep.memory.type === 'energy') {

                        const pwr = Game.getObjectById(creep.room.memory.powerSpawn);

                        if (pwr.power < 1 && creep.withdraw(creep.room.terminal, creep.memory.type, 100) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.terminal, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
                            continue;
                        }

                        if (pwr.power > 0 && pwr.energy < 5000 - creep.carry.energy && creep.withdraw(creep.room.terminal, creep.memory.type) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.terminal, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
                            continue;
                        }

                        else { // Power or Energy is not needed - Move into Idle position if not already there and Check Moving Destinations again

                            if (creep.room.memory.lockSpots && creep.room.memory.lockSpots.pwrAssim && (creep.pos.x !== creep.room.memory.lockSpots.pwrAssim.x || creep.pos.y !== creep.room.memory.lockSpots.pwrAssim.y)) {
                                creep.moveTo(creep.room.memory.lockSpots.pwrAssim.x, creep.room.memory.lockSpots.pwrAssim.y, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
                            }

                            creep.memory.moving = true;
                        }

                        continue;
                    }

                    else {

                        if (creep.withdraw(creep.room.terminal, creep.memory.type) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.terminal, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
                        }

                        if (creep.carry[creep.memory.type] > 0) {
                            creep.memory.moving = true;
                            creep.say('📦 store', [true]);
                        }

                        else {

                            if (creep.room.memory.lockSpots && creep.room.memory.lockSpots.pwrAssim && creep.room.memory.lockSpots.pwrAssim.x && (creep.pos.x !== creep.room.memory.lockSpots.pwrAssim.x || creep.pos.y !== creep.room.memory.lockSpots.pwrAssim.y)) {
                                creep.moveTo(creep.room.memory.lockSpots.pwrAssim.x, creep.room.memory.lockSpots.pwrAssim.y, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
                                continue;
                            }
                            
                            creep.memory.moving = true;

                        }

                        continue;

                    }

                }
continue;
        }
    }
};










/*                                ___  ___    ____   __   _  _  ____  ____     ___  ____  ____  ____  ____    ___  ___      
*                             ___(___)/  _)  (  _ \ /  \ / )( \(  __)(  _ \   / __)(  _ \(  __)(  __)(  _ \  (_  \(___)___  
*                            (___)___ ) (_    ) __/(  O )\ /\ / ) _)  )   /  ( (__  )   / ) _)  ) _)  ) __/   _) ( ___(___) 
*                                (___)\___)  (__)   \__/ (_/\_)(____)(__\_)   \___)(__\_)(____)(____)(__)    (___/(___)     
*/
const pwrCreeps = function () {

    for (const n in Game.powerCreeps) {

        const pC = Game.powerCreeps[n];

        if (pC.ticksToLive === undefined || !pC.ticksToLive) continue;

        if (pC.className === 'operator' && pC.ticksToLive > 0) {

            if (pC.powers[PWR_GENERATE_OPS] && pC.powers[PWR_GENERATE_OPS].cooldown === 0) {
                pC.usePower(PWR_GENERATE_OPS);
            }

            const pS = Game.getObjectById(pC.room.memory.powerSpawn);

            if (Game.time % Math.floor(Math.random() * (40 - 4) + 21) === 0) pC.say(cSpeak(6), [true]);

            if (!pC.room.controller.isPowerEnabled) {
                if (pC.enableRoom(pC.room.controller) === ERR_NOT_IN_RANGE) {
                    pC.moveTo(pC.room.controller, { reusePath: 20, ignoreRoads: true, swampCost: 1 });
                    continue;
                }
            }

            if (pC.ticksToLive < 90) {
                if (pC.renew(pS) === ERR_NOT_IN_RANGE) {
                    pC.moveTo(pS, { reusePath: 20, ignoreRoads: true, swampCost: 1 });
                    continue;
                }
            }

            if (pC.powers[PWR_OPERATE_EXTENSION] && pC.powers[PWR_OPERATE_EXTENSION].cooldown === 0) {             
                
                if(pC.room.storage && pC.room.storage.store[RESOURCE_ENERGY] > 2000 && pC.room.energyAvailable < 11800) {
                    
                    if (pC.usePower(PWR_OPERATE_EXTENSION, pC.room.storage) === ERR_NOT_IN_RANGE) {
                        pC.moveTo(pC.room.storage, { reusePath: 10, ignoreRoads: true, swampCost: 1 });
                        continue;
                    }
                }
            }

            if (pC.powers[PWR_REGEN_SOURCE] && pC.powers[PWR_REGEN_SOURCE].cooldown === 0) {

                if (pC.room.memory.src1Id) {

                    const source0 = Game.getObjectById(pC.room.memory.src1Id);

                    if (!source0.effects || !source0.effects[0]) {

                        if (pC.usePower(PWR_REGEN_SOURCE, source0) === ERR_NOT_IN_RANGE) {
                            pC.moveTo(source0, { reusePath: 10, ignoreRoads: true, swampCost: 1 });
                            continue;
                        }

                    }

                    if (pC.room.memory.src2Id) {

                        const source1 = Game.getObjectById(pC.room.memory.src2Id);

                        if (!source1.effects || !source1.effects[0]) {

                            if (pC.usePower(PWR_REGEN_SOURCE, source1) === ERR_NOT_IN_RANGE) {
                                pC.moveTo(source1, { reusePath: 10, ignoreRoads: true, swampCost: 1 });
                                continue;
                            }

                        }

                    }

                }
            }


            if (pC.memory.generate === true) {

                if (pC.room.storage && pC.carry['ops'] === pC.carryCapacity) {

                    if (pC.transfer(pC.room.storage, 'ops') === ERR_NOT_IN_RANGE) {
                        pC.moveTo(pC.room.storage, { reusePath: 10, ignoreRoads: true, swampCost: 1 });
                        continue;
                    }
                }

                if (pC.room.storage.store['ops'] > pC.carryCapacity * 2) pC.memory.generate = false;

                if (pC.room.memory.lockSpots && pC.room.memory.lockSpots.pwrCreep && pC.room.memory.lockSpots.pwrCreep[pC.name]) {
                    if (pC.pos.x !== pC.room.memory.lockSpots.pwrCreep[pC.name].x || pC.pos.y !== pC.room.memory.lockSpots.pwrCreep[pC.name].y)
                    pC.moveTo(pC.room.memory.lockSpots.pwrCreep[pC.name].x, pC.room.memory.lockSpots.pwrCreep[pC.name].y, { reusePath: 10, ignoreRoads: true, swampCost: 1 });
                }

                continue;

            }

            if (!pC.memory.generate || pC.memory.generate === false) {

                if (!pC.room.storage.store['ops'] || pC.room.storage.store['ops'] < 1000) pC.memory.generate = true;

                if (pC.room.storage.store['ops'] > 200 && _.sum(pC.carry) < 250) {

                    if (pC.withdraw(pC.room.storage, 'ops') === ERR_NOT_IN_RANGE) {
                        pC.moveTo(pC.room.storage, { reusePath: 10, ignoreRoads: true, swampCost: 1 });
                        continue;
                    }
                }

            }

            if (pC.powers[PWR_OPERATE_TOWER] && pC.powers[PWR_OPERATE_TOWER].cooldown === 0 && pC.carry['ops'] > 10) {
                const tower = _.filter(Game.structures, t => t.room.name === pC.room.name && t.structureType === 'tower' && t.energy > 9);
                let maxKey = _.max(Object.keys(tower), o => tower[o].energy); 
                
                if (tower[maxKey] && tower[maxKey].effects && tower[maxKey].effects[0]) {
                    let x = 0;

                    while (x < tower.length) {

                        x++;
                        if (maxKey > 0) maxKey--;
                        if (maxKey < 0) maxKey = tower.length - 1;
                        if (!tower[maxKey].effects) x = 10;
                        if (tower[maxKey].effects && !tower[maxKey].effects[0]) x = 10;

                    }

                }
                
                if (pC.usePower(PWR_OPERATE_TOWER, tower[maxKey]) === ERR_NOT_IN_RANGE) {
                    pC.moveTo(tower[maxKey], { reusePath: 10, ignoreRoads: true, swampCost: 1, range: 3 });
                    continue;
                }
            }
            
            if(pC.powers[PWR_OPERATE_SPAWN] && pC.powers[PWR_OPERATE_SPAWN].cooldown === 0 && pC.carry['ops'] > 100) {
                const spawn = _.filter(Game.structures, s => s.room.name === pC.room.name && s.structureType === 'spawn');
                let x = 0;
                let s = 0;

                if (spawn[x]) {

                    if (spawn[x].effects && spawn[x].effects[x]) {
    
                        while (s < spawn.length) {
                               
                            if (!spawn[x].effects) s = 5;
                            if (spawn[x] && spawn[x].effects && !spawn[x].effects[0]) s = 5;
                            x++;
                            s++;
    
                        }
    
                    }
    
                    if (spawn[x] && pC.usePower(PWR_OPERATE_SPAWN, spawn[x]) === ERR_NOT_IN_RANGE) {
                        pC.moveTo(spawn[x], { reusePath: 10, ignoreRoads: true, swampCost: 1, range: 3 });
                        continue;
                    }

                }

            }

            if(pC.powers[PWR_OPERATE_POWER] && pC.powers[PWR_OPERATE_POWER].cooldown === 0 && pC.carry['ops'] > 200 && pC.room.terminal.store['energy'] > 55000 && pC.room.terminal.store['power'] > 6000) {
                
                if (pC.usePower(PWR_OPERATE_POWER, pS) === ERR_NOT_IN_RANGE) {
                    pC.moveTo(pS, { reusePath: 10, ignoreRoads: true, swampCost: 1, range: 3 });
                    continue;
                }

            }

            if (pC.room.terminal && ( _.sum(pC.room.terminal.store)) > 299000 && pC.carry['ops'] === pC.carryCapacity) {

                if (pC.transfer(pC.room.terminal, 'ops') === ERR_NOT_IN_RANGE) {
                    pC.moveTo(pC.room.terminal, { reusePath: 10, ignoreRoads: true, swampCost: 1 });
                    continue;
                }
            }

           // if (Game.flags['Idle-001']) pC.moveTo(Game.flags['Idle-001'], { reusePath: 10, ignoreRoads: true, swampCost: 1 });
           if (pC.room.memory.lockSpots && pC.room.memory.lockSpots.pwrCreep && pC.room.memory.lockSpots.pwrCreep[pC.name]) {
               if (pC.pos.x !== pC.room.memory.lockSpots.pwrCreep[pC.name].x || pC.pos.y !== pC.room.memory.lockSpots.pwrCreep[pC.name].y)
               pC.moveTo(pC.room.memory.lockSpots.pwrCreep[pC.name].x, pC.room.memory.lockSpots.pwrCreep[pC.name].y, { reusePath: 10, ignoreRoads: true, swampCost: 1 });
           }
          
        }
        continue;
    }
}
















/*       ______  ______           ___       __   ________  ________  ________        ________   _______      ___    ___ ___  ___  ________           ______  ______      
*       |\   ___\\___   \        |\  \     |\  \|\   __  \|\   __  \|\   __  \      |\   ___  \|\  ___ \    |\  \  /  /|\  \|\  \|\   ____\         |\   ___\\___   \    
*       \ \  \__\|___|\  \       \ \  \    \ \  \ \  \|\  \ \  \|\  \ \  \|\  \     \ \  \\ \  \ \   __/|   \ \  \/  / | \  \\\  \ \  \___|_        \ \  \__\|___|\  \   
*        \ \  \      \ \  \       \ \  \  __\ \  \ \   __  \ \   _  _\ \   ____\     \ \  \\ \  \ \  \_|/__  \ \    / / \ \  \\\  \ \_____  \        \ \  \      \ \  \  
*         \ \  \____ _\_\  \       \ \  \|\__\_\  \ \  \ \  \ \  \\  \\ \  \___|      \ \  \\ \  \ \  \_|\ \  /     \/   \ \  \\\  \|____|\  \        \ \  \____ _\_\  \ 
*          \ \______\\______\       \ \____________\ \__\ \__\ \__\\ _\\ \__\          \ \__\\ \__\ \_______\/  /\   \    \ \_______\____\_\  \        \ \______\\______\
*           \|______\|______|        \|____________|\|__|\|__|\|__|\|__|\|__|           \|__| \|__|\|_______/__/ /\ __\    \|_______|\_________\        \|______\|______|
*                                                                                                           |__|/ \|__|             \|_________|                         
*/
const getEnergyStatus = function (spawn) {
    const energyStatus = spawn.room.energyCapacityAvailable;

    if (energyStatus >= 6000)
        return 8;

    if (energyStatus >= 3000)
        return 7;

    if (energyStatus >= 2000)
        return 6;

    if (energyStatus >= 1000)
        return 5;

    if (energyStatus >= 800)
        return 4;

    if (energyStatus >= 600)
        return 3;

    if (energyStatus >= 400)
        return 2;

    return 1;
};








// warp in Worker (Stage 1 Miner / Builder / Repairs)
const warpWorker = function (spawn, tier, name, memory) {

   /*  const bpc = ["w2c2m","w2c2m","2w2c2m","3w3c3m","4w4c4m","5w5c5m","9w9c9m","12w12c12m","16w17c17m"];

    spawn.spawnCreep(createBody(bpc[tier]), name, memory); */

    switch (tier) {
        case 8: // 3300e -- the ultimate worker
            spawn.spawnCreep(createBody("16w17c17m"), name, memory);
            break;

        case 7: // 2400e
            spawn.spawnCreep(createBody("12w12c12m"), name, memory);
            break;

        case 6: // 1800e
            spawn.spawnCreep(createBody("9w9c9m"), name, memory);
            break;

        case 5: // 1000e
            spawn.spawnCreep(createBody("5w5c5m"), name, memory);
            break;

        case 4: // 800e
            spawn.spawnCreep(createBody("4w4c4m"), name, memory);
            break;

        case 3: // 600e
            spawn.spawnCreep(createBody("3w3c3m"), name, memory);
            break;

        case 2: // 400e
            spawn.spawnCreep(createBody("2w2c2m"), name, memory);
            break;

        case 1: // 300e
            spawn.spawnCreep(createBody("w2c2m"), name, memory);
            break;
    }
};







// warp in Probe (Miner)
const warpProbe = function (spawn, tier, name, memory) {

    switch (tier) {
        case 4: // 650e
            spawn.spawnCreep(createBody("5w3m"), name, memory);
            break;

        case 3: // 600e
            spawn.spawnCreep(createBody("5w2m"), name, memory);
            break;

        case 2: // 400e
            spawn.spawnCreep(createBody("3w2m"), name, memory);
            break;

        case 1: // 300e
            spawn.spawnCreep(createBody("2w2m"), name, memory);
            break;

        default: // 650e
            spawn.spawnCreep(createBody("5w3m"), name, memory);
            break;
    }
};








// warp in Assimilator (Hauler)
const warpAssim = function (spawn, tier, name, memory) {

    switch (tier) {
        case 8: // 2500e -- the ultimate Assimilator
            spawn.spawnCreep(createBody("33c17m"), name, memory);
            break;

        case 7: // 1800e
            spawn.spawnCreep(createBody("24c12m"), name, memory);
            break;

        case 6: // 1800e
            spawn.spawnCreep(createBody("18c9m"), name, memory);
            break;

        case 5: // 750e
            spawn.spawnCreep(createBody("10c5m"), name, memory);
            break;

        case 4: // 600e
            spawn.spawnCreep(createBody("8c4m"), name, memory);
            break;

        case 3: // 450e
            spawn.spawnCreep(createBody("6c3m"), name, memory);
            break;

        default: // 300e
            spawn.spawnCreep(createBody("4c2m"), name, memory);
            break;
    }
};








// warp in Archon(Upgrader)    
const warpArchon = function (spawn, tier, name, memory) {

    switch (tier) {
        case 8: // 4100e -- the ultimate upgrader
            spawn.spawnCreep(createBody("15w10c8m"), name, memory);
            break;

        case 7: // 2400e
            spawn.spawnCreep(createBody("16w12c4m"), name, memory);
            break;

        case 6: // 1900e
            spawn.spawnCreep(createBody("12w8c6m"), name, memory);
            break;

        case 5: // 1200e
            spawn.spawnCreep(createBody("8w4c4m"), name, memory);
            break;

        case 4: // 800e
            spawn.spawnCreep(createBody("4w4c4m"), name, memory);
            break;

        case 3: // 600e
            spawn.spawnCreep(createBody("3w3c3m"), name, memory);
            break;

        case 2: // 400e
            spawn.spawnCreep(createBody("2w2c2m"), name, memory);
            break;

        case 1: // 300e
            spawn.spawnCreep(createBody("w2c2m"), name, memory);
            break;
    }
};






// warp in Archon(Upgrader)    
const warpExtractor = function (spawn, tier, name, memory) {

    switch (tier) {
        case 8: // 4100e -- the ultimate extractor
            spawn.spawnCreep(createBody("32w10c8m"), name, memory);
            break;

        case 7: // 2400e
            spawn.spawnCreep(createBody("16w12c4m"), name, memory);
            break;

        case 6: // 1900e
            spawn.spawnCreep(createBody("12w8c6m"), name, memory);
            break;

        default: // 1200e
            spawn.spawnCreep(createBody("8w4c4m"), name, memory);
            break;
       
    }
};







// warp in Claimer    
const warpClaimer = function (spawn, tier, name, memory) {

    switch (tier) {
        case 8: // 3250e -- the ultimate upgrader
            spawn.spawnCreep(createBody("5x5m"), name, memory);
            break;

        case 7: // 2600e
            spawn.spawnCreep(createBody("4x4m"), name, memory);
            break;

        case 6: // 1950e
            spawn.spawnCreep(createBody("3x3m"), name, memory);
            break;

        default: // 1300e
            spawn.spawnCreep(createBody("2x2m"), name, memory);
            break;
    }
};







// warp in Zealot (Melee Warrior)
const warpZealot = function (spawn, tier, name, memory) {

    switch (tier) {
        case 8: // 3760e -- the ultimate damage
            spawn.spawnCreep(createBody("1t17m30a2h"), name, memory);
            break;

        case 7: // 2890e
            spawn.spawnCreep(createBody("10t25m13a2h"), name, memory);
            break;

        case 6: // 2040e
            spawn.spawnCreep(createBody("8t20m12a"), name, memory);
            break;

        case 5: // 950e
            spawn.spawnCreep(createBody("5t10m5a"), name, memory);
            break;

        case 4: // 780e
            spawn.spawnCreep(createBody("6m6a"), name, memory);
            break;

        case 3: // 520e
            spawn.spawnCreep(createBody("4m4a"), name, memory);
            break;

        default: // 410e
            spawn.spawnCreep(createBody("4m3a"), name, memory);
            break;
    }
};










// warp in Stalker (Range Warrior)
const warpStalker = function (spawn, tier, name, memory) {

    switch (tier) {
        case 8: // 5000e -- the ultimate damage
            spawn.spawnCreep(createBody("25m25r"), name, memory);
            break;

        case 7: // 4000e
            spawn.spawnCreep(createBody("20m20r"), name, memory);
            break;

        case 6: // 2400e
            spawn.spawnCreep(createBody("12m12r"), name, memory);
            break;

        default: // 800e
            spawn.spawnCreep(createBody("4m4r"), name, memory);
            break;
    }
};









// warp in Zealot (Melee Warrior)
const warpSmallZealot = function (spawn, tier, name, memory) {

    switch (tier) {
        case 8: // 3760e -- melee fodder class
            spawn.spawnCreep(createBody("1t2h30a17m"), name, memory);
            break;

        case 7: // 2890e
            spawn.spawnCreep(createBody("10t13a25m2h"), name, memory);
            break;

        case 6: // 2020e
            spawn.spawnCreep(createBody("12t22m8w"), name, memory);
            break;

        case 5: // 1020e
            spawn.spawnCreep(createBody("12t14m2w"), name, memory);
            break;

        case 4: // 780e
            spawn.spawnCreep(createBody("13t13m"), name, memory);
            break;

        default: // 600e
            spawn.spawnCreep(createBody("10t10m"), name, memory);
            break;
    }
};








// warp in Templar (Healer)
const warpTemplar = function (spawn, tier, name, memory) {

    switch (tier) {
        case 8: // 7500e -- the ultimate Healer
            spawn.spawnCreep(createBody("25m25h"), name, memory);
            break;

        case 7: // 2400e
            spawn.spawnCreep(createBody("8m8h"), name, memory);
            break;

        case 6: // 1800e
            spawn.spawnCreep(createBody("6m6h"), name, memory);
            break;

        case 5: // 650e
            spawn.spawnCreep(createBody("3m2h"), name, memory);
            break;

        default: // 600e
            spawn.spawnCreep(createBody("2m2h"), name, memory);
            break;
    }
};








                        ///  All logic found in warpNexus/createBody - credit to Orlet - Most especially this array below
                    /*             
                        * Unpack a bodypart string into creep body part array
                        *
                        * -- Modded -- createCreepBodyArray now -> createBody
                        *  MOVE - "M"
                        *  WORK - "W"
                        *  CARRY - "C"
                        *  ATTACK - "A"
                        *  RANGED_ATTACK - "R"
                        *  HEAL - "H"
                        *  CLAIM - "X" or "K" --- note the special character
                        *  TOUGH - "T"
                        *
                        * Example 1: let body = Game.utils.createCreepBodyArray("6W1C1M");
                        * Example 2: let body = Game.utils.createCreepBodyArray("WWWWWWCM");
                        * Example 3: let body = Game.utils.createCreepBodyArray("6WCM");
                        *
                        * And using the expandBodyArrayString format:
                        * Example 3: let body = Game.utils.createCreepBodyArray("5(WCM)");
                        */

const createBody = function (bodyString) {

    let bodyObject;
    let partCounter;
    let i;
    let j;
    let part;

    // body object LUT
    bodyObject =
        {

            m: MOVE,
            w: WORK,
            c: CARRY,
            a: ATTACK,
            r: RANGED_ATTACK,
            h: HEAL,
            x: CLAIM,
            k: CLAIM,
            t: TOUGH
        }

    // parse and expand the string into array of body bits
    const bodyArray = new Array();

    partCounter = 0;

    for (i = 0; i < bodyString.length; i++) {
        if (isNaN(bodyString[i])) {

            // it's a letter
            if (partCounter === 0)
                partCounter = 1;

            part = bodyObject[bodyString[i]];

            // error?
            if (part === undefined) {
                partCounter = 0;
                continue;
            }

            // expand!
            for (j = 0; j < partCounter; j++)
                bodyArray.push(part);

            partCounter = 0;
        }
        else {
            // it's a number
            partCounter = partCounter * 10 + parseInt(bodyString[i]);
        }
    }
    return bodyArray;
};








/*                                        _   _                              ___           _                  _          
*                                        ( ) ( )                            (  _`\        (_ )               ( )_        
*                                 ______ | `\| |   _ _   ___ ___     __     | (_(_)   __   | |    __     ___ | ,_)______ 
*                                (______)| , ` | /'_` )/' _ ` _ `\ /'__`\   `\__ \  /'__`\ | |  /'__`\ /'___)| | (______)
*                                        | |`\ |( (_| || ( ) ( ) |(  ___/   ( )_) |(  ___/ | | (  ___/( (___ | |_        
*                                        (_) (_)`\__,_)(_) (_) (_)`\____)   `\____)`\____)(___)`\____)`\____)`\__)       
*/
const getName = function () {

    const names1 = ["Tassadar", "Aiden", "Liam", "Fenix", "Aldaris", "Taldarin", "Jayden", "Karax", "Urun", "Adun", "Caden", "Kaldalis", "Karass", "Zeratul", "Caleb", "Mohandar", "Mojo", "Elijah", "Ulrezaj", "Alarak", "Ma Lash", "Nyon", "Felanis", "Talandar", "Clolarion", "Kizrath", "Aedus", "Heiberg", "Mertick", "Minos", "Dabiri", "Danimoth", "Demioch", "Pagan", "Edullon", "Eredas", "Gantrithor", "Eli", "Zyrkhan", "Animeth", "Hych", "Kan", "Axxath", "Tutus", "Ertyr", "Xioldol", "Dhamas", "Ful", "Aldinyn", "Gor", "Zith", "Xox", "Igith", "Aldazres", "Kyr", "Khurkus", "Ghitath", "Khar", "Ghel", "Ogren", "Kixxath", "Xiodeth", "Erazrech", "Onugrus", "Diath", "Zyth", "Diadal", "Tigin", "Dildrath", "Agdanath", "Indiotuch", "Dhox", "Khech", "Ganos", "Zaldel", "Ildros", "Xal Dan", "Zemos", "Kydos", "Oger", "Xavier", "Umymul", "Khyl", "Gyrkas", "Kumor", "Xeroch", "Aminoth", "Amedryx", "Irotoch", "Denor", "Dhiamys", "Edech", "Declan", "Kedoxus", "Anydalis", "Endazris", "Collues", "Mateo", "Micah", "Ellios", "Char Les", "Cay Ce", "Lex Ri", "Var Oli"];
    const names2 = ["Rohana", "Selendis", "Raszagal", "Talis", "Vorazun", "Ava", "Ji nara", "Eri", "Meri", "Kyrea", "Lasarra", "Hyreh", "Adonzi", "Ghyzsa", "Ziaryth", "Tiria", "Golla", "Ella", "Teszu", "Syno", "Aaliyah", "Fulno", "Hetun", "Zilgo", "Yrsygy", "Anea", "Aria", "Sasrin", "Kydus", "Lila", "Erede", "Adalyn", "Azroszu", "Erura", "Eta", "Tyte", "Gosryn", "Indaras", "Arindrel", "Ellygi", "Erille", "Nilzi", "Ealgoth", "Norae", "Mila", "Ryllial", "Healdath", "Ianygu", "Idada", "Idunzu", "Maya", "Mygi", "Yndy", "Zynol", "Elena", "Ruto", "Aru", "Hedy", "Itigath", "Ynzoty", "Alaina", "Otenzu", "Yzsello", "Oldryh", "Urza", "Geru", "Keirae", "Erundu", "Re Gan", "Mollae", "Nindrah", "Azso", "Nyguh", "Enzosrean", "Odidyh", "Arsyte", "Evae", "Akice", "Elianae", "Fadyl", "Dhuni", "Ghoxi", "Gondyn", "Tille", "Kaelyn", "Zeszyl", "Yta", "Fiatia", "Aldelzae", "Tyda", "Tozsa", "Adialli", "Sodae", "Kigu", "Kygo", "Viviae", "Jul Ana", "Gianna", "Sky Ter", "Jor Dyn", "Bezeal", "Rae Gin", "Searithe", "Leyora"];

    let name;
    let isNameTaken;
    let nameArray;
    let tries = 0;
    do {
        nameArray = Math.random() > .5 ? names1 : names2;
        name = nameArray[Math.floor(Math.random() * nameArray.length)];

        if (tries > 3) {
            name += nameArray[Math.floor(Math.random() * nameArray.length)];
        }

        tries++;
        isNameTaken = Game.creeps[name] !== undefined;
    } while (isNameTaken);

    return name;
};










/*                         e88   e88   e88   888 88e                                     dP"8 888     ,e,         888      888         88e   88e   88e   
*                         d888  d888  d888   888 888D  e88 88e   e88 88e  888 888 8e    C8b Y 888 ee   "   ,e e,  888  e88 888  dP"Y   888b  888b  888b  
*                        e8888 e8888 e8888   888 88"  d888 888b d888 888b 888 888 88b    Y8b  888 88b 888 d88 88b 888 d888 888 C88b    8888e 8888e 8888e 
*                        88888 88888 88888   888 b,   Y888 888P Y888 888P 888 888 888   b Y8D 888 888 888 888   , 888 Y888 888  Y88D   88888 88888 88888 
*                        "8888 "8888 "8888   888 88b,  "88 88"   "88 88"  888 888 888   8edP  888 888 888  "YeeP" 888  "88 888 d,dP    8888" 8888" 8888" 
*                         Y888  Y888  Y888                                                                                             888P  888P  888P  
*                          "88   "88   "88                                                                                             88"   88"   88"   
*/
const roomShields = function (f) {
   
    const initCheck = _.filter(Game.structures, s => s.room.name === f.pos.roomName && s.structureType === 'rampart' && s.hits < s.room.memory.repairs);
    if (initCheck[0] !== undefined) return;

    ///  RCL-3 Shield Around Base ///
    if (f.room.controller.level >= 3) {
        f.room.createConstructionSite(f.pos.x - 1, f.pos.y, STRUCTURE_RAMPART);
        f.room.createConstructionSite(f.pos.x - 1, f.pos.y + 1, STRUCTURE_RAMPART);
        f.room.createConstructionSite(f.pos.x, f.pos.y + 1, STRUCTURE_RAMPART);
        if (f.room.memory.baseBuilder.timers.ramsTimer + 2500 < Game.time) {
            f.room.createConstructionSite(f.pos.x + 1, f.pos.y + 1, STRUCTURE_RAMPART);
            f.room.createConstructionSite(f.pos.x + 2, f.pos.y + 1, STRUCTURE_RAMPART);
            f.room.createConstructionSite(f.pos.x + 3, f.pos.y + 1, STRUCTURE_RAMPART);
            if (f.room.memory.baseBuilder.timers.ramsTimer + 5000 < Game.time) {
                f.room.createConstructionSite(f.pos.x + 4, f.pos.y + 1, STRUCTURE_RAMPART);
                f.room.createConstructionSite(f.pos.x + 5, f.pos.y + 1, STRUCTURE_RAMPART);
                f.room.createConstructionSite(f.pos.x + 6, f.pos.y + 1, STRUCTURE_RAMPART);
                if (f.room.memory.baseBuilder.timers.ramsTimer + 7500 < Game.time) {
                    f.room.createConstructionSite(f.pos.x + 7, f.pos.y + 1, STRUCTURE_RAMPART);
                    f.room.createConstructionSite(f.pos.x + 8, f.pos.y + 1, STRUCTURE_RAMPART);
                    f.room.createConstructionSite(f.pos.x + 9, f.pos.y + 1, STRUCTURE_RAMPART);
                    if (f.room.memory.baseBuilder.timers.ramsTimer + 10000 < Game.time) {
                        f.room.createConstructionSite(f.pos.x + 10, f.pos.y + 1, STRUCTURE_RAMPART);
                        f.room.createConstructionSite(f.pos.x + 10, f.pos.y + 1, STRUCTURE_RAMPART);
                        f.room.createConstructionSite(f.pos.x + 10, f.pos.y, STRUCTURE_RAMPART);
                        if (f.room.memory.baseBuilder.timers.ramsTimer + 12500 < Game.time) {
                            f.room.createConstructionSite(f.pos.x + 10, f.pos.y - 1, STRUCTURE_RAMPART);
                            f.room.createConstructionSite(f.pos.x + 10, f.pos.y - 2, STRUCTURE_RAMPART);
                            f.room.createConstructionSite(f.pos.x + 10, f.pos.y - 3, STRUCTURE_RAMPART);
                            if (f.room.memory.baseBuilder.timers.ramsTimer + 15000 < Game.time) {
                                f.room.createConstructionSite(f.pos.x + 10, f.pos.y - 4, STRUCTURE_RAMPART);
                                f.room.createConstructionSite(f.pos.x + 10, f.pos.y - 5, STRUCTURE_RAMPART);
                                f.room.createConstructionSite(f.pos.x + 10, f.pos.y - 6, STRUCTURE_RAMPART);
                                if (f.room.memory.baseBuilder.timers.ramsTimer + 17500 < Game.time) {
                                    f.room.createConstructionSite(f.pos.x + 10, f.pos.y - 7, STRUCTURE_RAMPART);
                                    f.room.createConstructionSite(f.pos.x + 10, f.pos.y - 8, STRUCTURE_RAMPART);
                                    f.room.createConstructionSite(f.pos.x + 10, f.pos.y - 9, STRUCTURE_RAMPART);
                                    if (f.room.memory.baseBuilder.timers.ramsTimer + 20000 < Game.time) {
                                        f.room.createConstructionSite(f.pos.x + 9, f.pos.y - 9, STRUCTURE_RAMPART);
                                        f.room.createConstructionSite(f.pos.x + 8, f.pos.y - 9, STRUCTURE_RAMPART);
                                        f.room.createConstructionSite(f.pos.x + 7, f.pos.y - 9, STRUCTURE_RAMPART);
                                        if (f.room.memory.baseBuilder.timers.ramsTimer + 22500 < Game.time) {
                                            f.room.createConstructionSite(f.pos.x + 6, f.pos.y - 9, STRUCTURE_RAMPART);
                                            f.room.createConstructionSite(f.pos.x + 5, f.pos.y - 9, STRUCTURE_RAMPART);
                                            f.room.createConstructionSite(f.pos.x + 4, f.pos.y - 9, STRUCTURE_RAMPART);
                                            if (f.room.memory.baseBuilder.timers.ramsTimer + 25000 < Game.time) {
                                                f.room.createConstructionSite(f.pos.x + 3, f.pos.y - 9, STRUCTURE_RAMPART);
                                                f.room.createConstructionSite(f.pos.x + 2, f.pos.y - 9, STRUCTURE_RAMPART);
                                                f.room.createConstructionSite(f.pos.x + 1, f.pos.y - 9, STRUCTURE_RAMPART);
                                                if (f.room.memory.baseBuilder.timers.ramsTimer + 27500 < Game.time) {
                                                    f.room.createConstructionSite(f.pos.x, f.pos.y - 9, STRUCTURE_RAMPART);
                                                    f.room.createConstructionSite(f.pos.x, f.pos.y - 8, STRUCTURE_RAMPART);
                                                    f.room.createConstructionSite(f.pos.x, f.pos.y - 7, STRUCTURE_RAMPART);
                                                    if (f.room.memory.baseBuilder.timers.ramsTimer + 30000 < Game.time) {
                                                        f.room.createConstructionSite(f.pos.x, f.pos.y - 6, STRUCTURE_RAMPART);
                                                        f.room.createConstructionSite(f.pos.x, f.pos.y - 5, STRUCTURE_RAMPART);
                                                        f.room.createConstructionSite(f.pos.x, f.pos.y - 4, STRUCTURE_RAMPART);
                                                        if (f.room.memory.baseBuilder.timers.ramsTimer + 32500 < Game.time) {
                                                            f.room.createConstructionSite(f.pos.x, f.pos.y - 3, STRUCTURE_RAMPART);
                                                            f.room.createConstructionSite(f.pos.x, f.pos.y - 2, STRUCTURE_RAMPART);
                                                            f.room.createConstructionSite(f.pos.x, f.pos.y - 1, STRUCTURE_RAMPART);
                                                            if (f.room.memory.baseBuilder.timers.ramsTimer + 35000 < Game.time) {
                                                                f.room.createConstructionSite(f.pos.x, f.pos.y, STRUCTURE_RAMPART);
                                                                f.room.createConstructionSite(f.pos.x - 1, f.pos.y - 5, STRUCTURE_RAMPART);
                                                                f.room.createConstructionSite(f.pos.x - 1, f.pos.y - 4, STRUCTURE_RAMPART);
                                                                if (f.room.memory.baseBuilder.timers.ramsTimer + 37500 < Game.time) {
                                                                    f.room.createConstructionSite(f.pos.x - 1, f.pos.y - 3, STRUCTURE_RAMPART);
                                                                    f.room.createConstructionSite(f.pos.x - 1, f.pos.y - 2, STRUCTURE_RAMPART);
                                                                    f.room.createConstructionSite(f.pos.x - 1, f.pos.y - 1, STRUCTURE_RAMPART);
                                                                    f.room.memory.baseBuilder.timers.ramsTimer = Game.time + 3500;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /////// RCL-5 //////
    if (f.room.controller.level >= 5) {
        f.room.createConstructionSite(f.pos.x + 1, f.pos.y, STRUCTURE_RAMPART);
        f.room.createConstructionSite(f.pos.x + 2, f.pos.y, STRUCTURE_RAMPART);
        f.room.createConstructionSite(f.pos.x + 3, f.pos.y, STRUCTURE_RAMPART);
        if (f.room.memory.baseBuilder.timers.ramsTimer + 2500 < Game.time) {
            f.room.createConstructionSite(f.pos.x + 4, f.pos.y, STRUCTURE_RAMPART);
            f.room.createConstructionSite(f.pos.x + 5, f.pos.y, STRUCTURE_RAMPART);
            f.room.createConstructionSite(f.pos.x + 6, f.pos.y, STRUCTURE_RAMPART);
            if (f.room.memory.baseBuilder.timers.ramsTimer + 5000 < Game.time) {
                f.room.createConstructionSite(f.pos.x + 7, f.pos.y, STRUCTURE_RAMPART);
                f.room.createConstructionSite(f.pos.x + 8, f.pos.y, STRUCTURE_RAMPART);
                f.room.createConstructionSite(f.pos.x + 9, f.pos.y, STRUCTURE_RAMPART);
                if (f.room.memory.baseBuilder.timers.ramsTimer + 7500 < Game.time) {
                    f.room.createConstructionSite(f.pos.x + 9, f.pos.y - 1, STRUCTURE_RAMPART);
                    f.room.createConstructionSite(f.pos.x + 9, f.pos.y - 2, STRUCTURE_RAMPART);
                    f.room.createConstructionSite(f.pos.x + 9, f.pos.y - 3, STRUCTURE_RAMPART);
                    if (f.room.memory.baseBuilder.timers.ramsTimer + 10000 < Game.time) {
                        f.room.createConstructionSite(f.pos.x + 9, f.pos.y - 4, STRUCTURE_RAMPART);
                        f.room.createConstructionSite(f.pos.x + 9, f.pos.y - 5, STRUCTURE_RAMPART);
                        f.room.createConstructionSite(f.pos.x + 9, f.pos.y - 6, STRUCTURE_RAMPART);
                        if (f.room.memory.baseBuilder.timers.ramsTimer + 12500 < Game.time) {
                            f.room.createConstructionSite(f.pos.x + 9, f.pos.y - 7, STRUCTURE_RAMPART);
                            f.room.createConstructionSite(f.pos.x + 9, f.pos.y - 8, STRUCTURE_RAMPART);
                            f.room.createConstructionSite(f.pos.x + 8, f.pos.y - 8, STRUCTURE_RAMPART);
                            if (f.room.memory.baseBuilder.timers.ramsTimer + 15000 < Game.time) {
                                f.room.createConstructionSite(f.pos.x + 7, f.pos.y - 8, STRUCTURE_RAMPART);
                                f.room.createConstructionSite(f.pos.x + 6, f.pos.y - 8, STRUCTURE_RAMPART);
                                f.room.createConstructionSite(f.pos.x + 5, f.pos.y - 8, STRUCTURE_RAMPART);
                                if (f.room.memory.baseBuilder.timers.ramsTimer + 17500 < Game.time) {
                                    f.room.createConstructionSite(f.pos.x + 4, f.pos.y - 8, STRUCTURE_RAMPART);
                                    f.room.createConstructionSite(f.pos.x + 3, f.pos.y - 8, STRUCTURE_RAMPART);
                                    f.room.createConstructionSite(f.pos.x + 2, f.pos.y - 8, STRUCTURE_RAMPART);
                                    if (f.room.memory.baseBuilder.timers.ramsTimer + 20000 < Game.time) {
                                        f.room.createConstructionSite(f.pos.x + 1, f.pos.y - 8, STRUCTURE_RAMPART);
                                        f.room.createConstructionSite(f.pos.x + 1, f.pos.y - 7, STRUCTURE_RAMPART);
                                        f.room.createConstructionSite(f.pos.x + 1, f.pos.y - 6, STRUCTURE_RAMPART);
                                        if (f.room.memory.baseBuilder.timers.ramsTimer + 22500 < Game.time) {
                                            f.room.createConstructionSite(f.pos.x + 1, f.pos.y - 5, STRUCTURE_RAMPART);
                                            f.room.createConstructionSite(f.pos.x + 1, f.pos.y - 4, STRUCTURE_RAMPART);
                                            f.room.createConstructionSite(f.pos.x + 1, f.pos.y - 3, STRUCTURE_RAMPART);
                                            if (f.room.memory.baseBuilder.timers.ramsTimer + 27500 < Game.time) {
                                                f.room.createConstructionSite(f.pos.x + 1, f.pos.y - 2, STRUCTURE_RAMPART);
                                                f.room.createConstructionSite(f.pos.x + 1, f.pos.y - 1, STRUCTURE_RAMPART);
                                                f.room.memory.baseBuilder.timers.ramsTimer = Game.time + 3500;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /////// RCL-6 ///////
    if (f.room.controller.level >= 6) {
        f.room.createConstructionSite(f.pos.x + 2, f.pos.y - 1, STRUCTURE_RAMPART);
        f.room.createConstructionSite(f.pos.x + 3, f.pos.y - 1, STRUCTURE_RAMPART);
        f.room.createConstructionSite(f.pos.x + 4, f.pos.y - 1, STRUCTURE_RAMPART);
        if (f.room.memory.baseBuilder.timers.ramsTimer + 2500 < Game.time) {
            f.room.createConstructionSite(f.pos.x + 5, f.pos.y - 1, STRUCTURE_RAMPART);
            f.room.createConstructionSite(f.pos.x + 6, f.pos.y - 1, STRUCTURE_RAMPART);
            f.room.createConstructionSite(f.pos.x + 7, f.pos.y - 1, STRUCTURE_RAMPART);
            if (f.room.memory.baseBuilder.timers.ramsTimer + 5000 < Game.time) {
                f.room.createConstructionSite(f.pos.x + 8, f.pos.y - 1, STRUCTURE_RAMPART);
                f.room.createConstructionSite(f.pos.x + 8, f.pos.y - 2, STRUCTURE_RAMPART);
                f.room.createConstructionSite(f.pos.x + 8, f.pos.y - 3, STRUCTURE_RAMPART);
                if (f.room.memory.baseBuilder.timers.ramsTimer + 7500 < Game.time) {
                    f.room.createConstructionSite(f.pos.x + 8, f.pos.y - 4, STRUCTURE_RAMPART);
                    f.room.createConstructionSite(f.pos.x + 8, f.pos.y - 5, STRUCTURE_RAMPART);
                    f.room.createConstructionSite(f.pos.x + 8, f.pos.y - 6, STRUCTURE_RAMPART);
                    if (f.room.memory.baseBuilder.timers.ramsTimer + 10000 < Game.time) {
                        f.room.createConstructionSite(f.pos.x + 8, f.pos.y - 7, STRUCTURE_RAMPART);
                        f.room.createConstructionSite(f.pos.x + 7, f.pos.y - 7, STRUCTURE_RAMPART);
                        f.room.createConstructionSite(f.pos.x + 6, f.pos.y - 7, STRUCTURE_RAMPART);
                        if (f.room.memory.baseBuilder.timers.ramsTimer + 12500 < Game.time) {
                            f.room.createConstructionSite(f.pos.x + 5, f.pos.y - 7, STRUCTURE_RAMPART);
                            f.room.createConstructionSite(f.pos.x + 4, f.pos.y - 7, STRUCTURE_RAMPART);
                            f.room.createConstructionSite(f.pos.x + 3, f.pos.y - 7, STRUCTURE_RAMPART);
                            if (f.room.memory.baseBuilder.timers.ramsTimer + 15000 < Game.time) {
                                f.room.createConstructionSite(f.pos.x + 2, f.pos.y - 7, STRUCTURE_RAMPART);
                                f.room.createConstructionSite(f.pos.x + 2, f.pos.y - 6, STRUCTURE_RAMPART);
                                f.room.createConstructionSite(f.pos.x + 2, f.pos.y - 5, STRUCTURE_RAMPART);
                                if (f.room.memory.baseBuilder.timers.ramsTimer + 17500 < Game.time) {
                                    f.room.createConstructionSite(f.pos.x + 2, f.pos.y - 4, STRUCTURE_RAMPART);
                                    f.room.createConstructionSite(f.pos.x + 2, f.pos.y - 3, STRUCTURE_RAMPART);
                                    f.room.createConstructionSite(f.pos.x + 2, f.pos.y - 2, STRUCTURE_RAMPART);
                                    f.room.memory.baseBuilder.timers.ramsTimer = Game.time + 3500;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /////// RCL-7 ///////
    if (f.room.controller.level >= 7) {
        f.room.createConstructionSite(f.pos.x + 3, f.pos.y - 2, STRUCTURE_RAMPART);
        f.room.createConstructionSite(f.pos.x + 4, f.pos.y - 2, STRUCTURE_RAMPART);
        f.room.createConstructionSite(f.pos.x + 5, f.pos.y - 2, STRUCTURE_RAMPART);
        if (f.room.memory.baseBuilder.timers.ramsTimer + 2500 < Game.time) {
            f.room.createConstructionSite(f.pos.x + 6, f.pos.y - 2, STRUCTURE_RAMPART);
            f.room.createConstructionSite(f.pos.x + 7, f.pos.y - 2, STRUCTURE_RAMPART);
            f.room.createConstructionSite(f.pos.x + 7, f.pos.y - 3, STRUCTURE_RAMPART);
            if (f.room.memory.baseBuilder.timers.ramsTimer + 5000 < Game.time) {
                f.room.createConstructionSite(f.pos.x + 7, f.pos.y - 4, STRUCTURE_RAMPART);
                f.room.createConstructionSite(f.pos.x + 7, f.pos.y - 5, STRUCTURE_RAMPART);
                f.room.createConstructionSite(f.pos.x + 7, f.pos.y - 6, STRUCTURE_RAMPART);
                if (f.room.memory.baseBuilder.timers.ramsTimer + 7500 < Game.time) {
                    f.room.createConstructionSite(f.pos.x + 6, f.pos.y - 6, STRUCTURE_RAMPART);
                    f.room.createConstructionSite(f.pos.x + 5, f.pos.y - 6, STRUCTURE_RAMPART);
                    f.room.createConstructionSite(f.pos.x + 4, f.pos.y - 6, STRUCTURE_RAMPART);
                    if (f.room.memory.baseBuilder.timers.ramsTimer + 10000 < Game.time) {
                        f.room.createConstructionSite(f.pos.x + 3, f.pos.y - 6, STRUCTURE_RAMPART);
                        f.room.createConstructionSite(f.pos.x + 3, f.pos.y - 5, STRUCTURE_RAMPART);
                        f.room.createConstructionSite(f.pos.x + 3, f.pos.y - 4, STRUCTURE_RAMPART);
                        if (f.room.memory.baseBuilder.timers.ramsTimer + 12500 < Game.time) {
                            f.room.createConstructionSite(f.pos.x + 3, f.pos.y - 3, STRUCTURE_RAMPART);
                            f.room.memory.baseBuilder.timers.ramsTimer = Game.time + 3500;
                        }
                    }
                }
            }
        }
    }


    //////// RCL-8 Final Shields ///////
    if (f.room.controller.level === 8) {
        f.room.createConstructionSite(f.pos.x + 4, f.pos.y - 3, STRUCTURE_RAMPART);
        f.room.createConstructionSite(f.pos.x + 5, f.pos.y - 3, STRUCTURE_RAMPART);
        f.room.createConstructionSite(f.pos.x + 6, f.pos.y - 3, STRUCTURE_RAMPART);
        if (f.room.memory.baseBuilder.timers.ramsTimer + 2500 < Game.time) {
            f.room.createConstructionSite(f.pos.x + 6, f.pos.y - 4, STRUCTURE_RAMPART);
            f.room.createConstructionSite(f.pos.x + 6, f.pos.y - 5, STRUCTURE_RAMPART);
            f.room.createConstructionSite(f.pos.x + 4, f.pos.y - 5, STRUCTURE_RAMPART);
            if (f.room.memory.baseBuilder.timers.ramsTimer + 5000 < Game.time) {
                f.room.createConstructionSite(f.pos.x + 4, f.pos.y - 4, STRUCTURE_RAMPART);
                f.room.createConstructionSite(f.pos.x + 5, f.pos.y - 4, STRUCTURE_RAMPART);
                f.room.memory.baseBuilder.timers.ramsTimer = Game.time + 3500;
            }
        }
    }

};








const roomLinks = function (f) {

    if (f.room.memory.baseBuilder.links.cLink !== 1) {
        const cLink = f.room.controller.pos.findInRange(FIND_STRUCTURES, 1, { filter: { structureType: STRUCTURE_LINK } });
        if (cLink[0] === undefined) {
            let path = f.room.findPath(f.pos, f.room.controller.pos, { maxOps: 1200, ignoreCreeps: true, range: 1 });
            let i = 0;
            let d = 0;
            console.log('Testing cLink Pather xyz: ' + path.length, '  X: ' + path[0].x, '  Y: ' + path[0].y)
            if(f.room.memory.baseBuilder.links === undefined) f.room.memory.baseBuilder.links = {};
            if(f.room.createConstructionSite(path[path.length - 1].x, path[path.length - 1].y, STRUCTURE_LINK) === OK) f.room.memory.baseBuilder.links.cLink = 1;
            while (i < path.length - 1) {
                d++;
                f.room.createConstructionSite(path[path.length - d].x, path[path.length - d].y, STRUCTURE_ROAD);
                i++;
            }
            
        }
    }

    if (f.room.memory.baseBuilder.links.aLink !== 1) {
        const closerSource = f.pos.findClosestByRange(FIND_SOURCES);
        const uSource = f.room.find(FIND_SOURCES);
        const source1 = _.reject(uSource, { id: closerSource.id })[0];
        const aLink = source1.pos.findInRange(FIND_STRUCTURES, 1, { filter: { structureType: STRUCTURE_LINK } });
        if (aLink[0] === undefined) {
            let path = f.room.findPath(f.pos, source1.pos, { maxOps: 600, ignoreCreeps: true, range: 2 });
            let i = 0;
            let d = 0;
            let x = 0;
            let lx = path[path.length - 1].x;
            let ly = path[path.length - 1].y;
            //console.log('Testing aLink Pather xyz: ' + path.length, '  X: ' + path[0].x, '  Y: ' + path[0].y)

            while (x < 21) {
                const found = f.room.lookForAt(LOOK_STRUCTURES, lx, ly);
                if (found[0] === undefined) {
                    if(f.room.createConstructionSite(lx,ly, STRUCTURE_LINK) === OK) f.room.memory.baseBuilder.links.aLink = 1;
                    x = 21;
                }

                let n = Math.random() < 0.5 ? (Math.random() < 0.5 ? -1 : 1): 0;
                let p = Math.random() < 0.5 ? (Math.random() < 0.5 ? -1 : 1): 0;
                lx = path[path.length - 1].x + n;
                ly = path[path.length - 1].y + p;
                x++
                
            }

            while (i < path.length - 1) {
                d++;
                f.room.createConstructionSite(path[path.length - d].x, path[path.length - d].y, STRUCTURE_ROAD);
                i++;
            }
        }
    }
    f.room.memory.timers.gtCycle = 0;
};








const roomContainers = function (f) {

    if (f.room.memory === undefined) return;

        const source1 = f.pos.findClosestByRange(FIND_SOURCES);
        const scA = source1.pos.findInRange(FIND_STRUCTURES, 1, { filter: { structureType: STRUCTURE_CONTAINER } });
        if (scA[0] === undefined) {
            let path = f.room.findPath(f.pos, source1.pos, { maxOps: 600, ignoreCreeps: true, range: 1 });
            let i = 0;
            let d = 0;
            if(f.room.memory.baseBuilder.containers === undefined) f.room.memory.baseBuilder.containers = {};
            if(f.room.createConstructionSite(path[path.length - 1].x, path[path.length - 1].y, STRUCTURE_CONTAINER) === OK) f.room.memory.baseBuilder.containers.scA = 1;
            while (i < path.length - 1) {
                d++;
                f.room.createConstructionSite(path[path.length - d].x, path[path.length - d].y, STRUCTURE_ROAD);
                i++;
            }  
        }

        if (f.room.memory.src2Id !== undefined) {
            const uSource = f.room.find(FIND_SOURCES);
            const source2 = _.reject(uSource, { id: source1.id })[0];     
            const scB = source2.pos.findInRange(FIND_STRUCTURES, 1, { filter: { structureType: STRUCTURE_CONTAINER } });
            //console.log('Testing Container Source check:  ' +uSource, '  '+source2, '  '+ scB[0]+scB+source1)
            if (scB[0] === undefined) {
                let path = f.room.findPath(f.pos, source2.pos, { maxOps: 600, ignoreCreeps: true, range: 1 });
                let i = 0;
                let d = 0;
                if(f.room.createConstructionSite(path[path.length - 1].x, path[path.length - 1].y, STRUCTURE_CONTAINER) === OK) f.room.memory.baseBuilder.containers.scB = 1;
                while (i < path.length - 1) {
                    d++;
                    f.room.createConstructionSite(path[path.length - d].x, path[path.length - d].y, STRUCTURE_ROAD);
                    i++;
                }
            }
        }
    f.room.memory.timers.gtCycle = 0;
};









const roomRoads = function (f) {

    if (f.room.memory === undefined) return;
    const roadEnd = Game.flags['RoadEnd'];
    const path = f.room.findPath(f.pos, roadEnd.pos, { maxOps: 1200, ignoreCreeps: true });
    let d = 0;
    while (d < path.length - 1) {
        d++;
        f.room.createConstructionSite(path[path.length - d].x, path[path.length - d].y, STRUCTURE_ROAD);
    }

    f.room.memory.timers.gtCycle = 0;
    roadEnd.remove();
    f.remove();
};









const roomPlans = function () {

    for (const name in Game.flags) {

        if (Game.flags[name].name.slice(0, 6) === 'Build-') {

            switch (Game.flags[name].room.controller.level) {

                case 8:
                    if (Game.time < Game.flags[name].room.memory.baseBuilder.timers.buildTimer && Game.flags[name].room.memory.baseBuilder.timers.buildTimer !== undefined) continue;
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 3, Game.flags[name].pos.y, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 4, Game.flags[name].pos.y - 1, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 5, Game.flags[name].pos.y, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 10, Game.flags[name].pos.y - 1, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 10, Game.flags[name].pos.y, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 10, Game.flags[name].pos.y + 1, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 9, Game.flags[name].pos.y + 1, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 8, Game.flags[name].pos.y + 1, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 8, Game.flags[name].pos.y, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 7, Game.flags[name].pos.y, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 1, Game.flags[name].pos.y + 1, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x, Game.flags[name].pos.y - 6, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 6, Game.flags[name].pos.y - 1, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 1, Game.flags[name].pos.y - 6, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 8, Game.flags[name].pos.y - 4, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 4, Game.flags[name].pos.y - 2, STRUCTURE_TOWER);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 6, Game.flags[name].pos.y - 4, STRUCTURE_TOWER);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 7, Game.flags[name].pos.y - 5, STRUCTURE_TOWER);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 1, Game.flags[name].pos.y - 3, STRUCTURE_POWER_SPAWN);                   
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x, Game.flags[name].pos.y - 4, STRUCTURE_SPAWN);
                    if (Game.flags[name].room.controller.progress > 25000) {
                        Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 1, Game.flags[name].pos.y - 2, STRUCTURE_NUKER);
                        Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 5, Game.flags[name].pos.y - 1, STRUCTURE_LAB);
                        Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 5, Game.flags[name].pos.y + 1, STRUCTURE_LAB);
                        Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 6, Game.flags[name].pos.y, STRUCTURE_LAB);
                        Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 6, Game.flags[name].pos.y + 1, STRUCTURE_LAB);
                        Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 7, Game.flags[name].pos.y + 1, STRUCTURE_OBSERVER);
                    }
                    Game.flags[name].room.memory.baseBuilder.timers.buildTimer = Game.time + 200;

                case 7:
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x, Game.flags[name].pos.y - 3, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x, Game.flags[name].pos.y - 5, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x - 1, Game.flags[name].pos.y - 2, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x - 1, Game.flags[name].pos.y - 4, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 1, Game.flags[name].pos.y - 4, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 2, Game.flags[name].pos.y - 3, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 7, Game.flags[name].pos.y - 4, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 9, Game.flags[name].pos.y - 5, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 10, Game.flags[name].pos.y - 5, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 10, Game.flags[name].pos.y - 4, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 10, Game.flags[name].pos.y - 3, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 9, Game.flags[name].pos.y - 3, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 9, Game.flags[name].pos.y - 2, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 8, Game.flags[name].pos.y - 2, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 9, Game.flags[name].pos.y - 1, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 7, Game.flags[name].pos.y - 1, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 5, Game.flags[name].pos.y - 3, STRUCTURE_TOWER);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x, Game.flags[name].pos.y - 2, STRUCTURE_SPAWN);
                    if (Game.flags[name].room.controller.progress > 25000) {
                        Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 3, Game.flags[name].pos.y + 1, STRUCTURE_LAB);
                        Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 4, Game.flags[name].pos.y, STRUCTURE_LAB);
                        Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 4, Game.flags[name].pos.y + 1, STRUCTURE_LAB);
                    }

                case 6:
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 6, Game.flags[name].pos.y - 3, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 7, Game.flags[name].pos.y - 2, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 8, Game.flags[name].pos.y - 3, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 9, Game.flags[name].pos.y - 4, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 8, Game.flags[name].pos.y - 1, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 9, Game.flags[name].pos.y, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 9, Game.flags[name].pos.y - 7, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 10, Game.flags[name].pos.y - 7, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 8, Game.flags[name].pos.y - 6, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 9, Game.flags[name].pos.y - 6, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 8, Game.flags[name].pos.y - 5, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 7, Game.flags[name].pos.y - 4, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 7, Game.flags[name].pos.y - 3, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 5, Game.flags[name].pos.y - 2, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 6, Game.flags[name].pos.y - 2, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 6, Game.flags[name].pos.y - 1, STRUCTURE_EXTENSION);
                    if (Game.flags[name].room.controller.progress > 50000) {
                        Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 2, Game.flags[name].pos.y, STRUCTURE_LAB);
                        Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 2, Game.flags[name].pos.y + 1, STRUCTURE_LAB);
                        Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 3, Game.flags[name].pos.y - 1, STRUCTURE_LAB);
                    }
                    if (Game.flags[name].room.controller.progress > 25000) {
                        Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 1, Game.flags[name].pos.y - 1, STRUCTURE_TERMINAL);
                    }

                case 5:
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 9, Game.flags[name].pos.y - 8, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 8, Game.flags[name].pos.y - 7, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 7, Game.flags[name].pos.y - 6, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 6, Game.flags[name].pos.y - 5, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 5, Game.flags[name].pos.y - 6, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 5, Game.flags[name].pos.y - 7, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 6, Game.flags[name].pos.y - 6, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 7, Game.flags[name].pos.y - 7, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 7, Game.flags[name].pos.y - 8, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 8, Game.flags[name].pos.y - 8, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 8, Game.flags[name].pos.y - 9, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 9, Game.flags[name].pos.y - 9, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 10, Game.flags[name].pos.y - 9, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 10, Game.flags[name].pos.y - 8, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 5, Game.flags[name].pos.y - 5, STRUCTURE_TOWER);
                    if (Game.flags[name].room.memory.baseBuilder.links.aLink !== 1 || Game.flags[name].room.memory.baseBuilder.links.cLink !== 1) roomLinks(Game.flags[name]);
                    

                case 4:
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 2, Game.flags[name].pos.y - 8, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 2, Game.flags[name].pos.y - 9, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 3, Game.flags[name].pos.y - 7, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 3, Game.flags[name].pos.y - 8, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 4, Game.flags[name].pos.y - 8, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 4, Game.flags[name].pos.y - 9, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 5, Game.flags[name].pos.y - 9, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 6, Game.flags[name].pos.y - 9, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 6, Game.flags[name].pos.y - 8, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 6, Game.flags[name].pos.y - 7, STRUCTURE_EXTENSION);
                    if (Game.flags[name].room.controller.progress > 10000) {
                        Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 3, Game.flags[name].pos.y - 3, STRUCTURE_STORAGE);
                    }

                case 3:
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 4, Game.flags[name].pos.y - 7, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 5, Game.flags[name].pos.y - 8, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 3, Game.flags[name].pos.y - 4, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 3, Game.flags[name].pos.y - 5, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 2, Game.flags[name].pos.y - 5, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 2, Game.flags[name].pos.y - 6, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 4, Game.flags[name].pos.y - 6, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 4, Game.flags[name].pos.y - 4, STRUCTURE_TOWER);
                    /////////// Raise Ramparts ////////////
                    if (Game.flags[name].room.memory.baseBuilder.timers.ramsTimer === undefined) Game.flags[name].room.memory.baseBuilder.timers.ramsTimer = Game.time + 5500;
                    if(Game.time % 2 === 0) {
                        Game.flags[name].room.createConstructionSite(Game.flags[name].room.memory.containers.s1ContA.goX, Game.flags[name].room.memory.containers.s1ContA.goY, STRUCTURE_RAMPART);
                        Game.flags[name].room.createConstructionSite(Game.flags[name].room.memory.containers.s2ContB.goX, Game.flags[name].room.memory.containers.s2ContB.goY, STRUCTURE_RAMPART);
                        if (Game.flags[name].room.controller.progress > 5000) {
                            if(Game.flags[name].room.memory.baseBuilder.timers.ramsTimer < Game.time) roomShields(Game.flags[name]);
                        }
                    }
                   
                case 2:
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x, Game.flags[name].pos.y - 7, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x, Game.flags[name].pos.y - 8, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x, Game.flags[name].pos.y - 9, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 1, Game.flags[name].pos.y - 7, STRUCTURE_EXTENSION);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 1, Game.flags[name].pos.y - 9, STRUCTURE_EXTENSION);
                    /////////// Build Containers ////////////
                    if(Game.flags[name].room.controller.progress > 44900){
                        if(Game.flags[name].room.memory.baseBuilder.containers.scA !== 1 || Game.flags[name].room.memory.baseBuilder.containers.scB !== 1) roomContainers(Game.flags[name]);
                    }

                case 1:
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 1, Game.flags[name].pos.y, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x, Game.flags[name].pos.y + 1, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x - 1, Game.flags[name].pos.y, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x, Game.flags[name].pos.y - 1, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 2, Game.flags[name].pos.y - 1, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 3, Game.flags[name].pos.y - 2, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 4, Game.flags[name].pos.y - 3, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 5, Game.flags[name].pos.y - 4, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 4, Game.flags[name].pos.y - 5, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 3, Game.flags[name].pos.y - 6, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 2, Game.flags[name].pos.y - 7, STRUCTURE_ROAD);
                    Game.flags[name].room.createConstructionSite(Game.flags[name].pos.x + 1, Game.flags[name].pos.y - 8, STRUCTURE_ROAD);
                    break;
            }
        }

    }
};












/*                       ______     ______     ______     ______     ______      ______     ______   ______     ______     __  __    
*                       /\  ___\   /\  == \   /\  ___\   /\  ___\   /\  == \    /\  ___\   /\  == \ /\  ___\   /\  __ \   /\ \/ /    
*                       \ \ \____  \ \  __<   \ \  __\   \ \  __\   \ \  _-/    \ \___  \  \ \  _-/ \ \  __\   \ \  __ \  \ \  _"-.  
*                        \ \_____\  \ \_\ \_\  \ \_____\  \ \_____\  \ \_\       \/\_____\  \ \_\    \ \_____\  \ \_\ \_\  \ \_\ \_\ 
*                         \/_____/   \/_/ /_/   \/_____/   \/_____/   \/_/        \/_____/   \/_/     \/_____/   \/_/\/_/   \/_/\/_/                                                                                                             
*/
const cSpeak = function (code) {

    if (code === 6) {    // -- Warping In / Moving / Working
        const casewords = ['Yes boss', 'Good to go', 'Go on', 'InnerPeace', 'To work', 'Narmal'];
        return casewords[Math.floor(Math.random() * (5 + 1))];
    }

    if (code === 7) {    // -- Upgrading Controller
        const casewords = ['The Void', 'o//', 'Templars!', 'AIUR!', 'En Taro', '☯ ', '✝', ' 🛐', '⚛', ' 🎇', ' 🔆', '♾', '✨'];
        return casewords[Math.floor(Math.random() * (12 + 1))];
    }

    if (code === 8) {    // -- End of life-span
        const casewords = ['Aiur calls', 'Expiring', 'To Aiur', '😱 ', '💀 ', 'Farewell', '👻', '⛔'];
        return casewords[Math.floor(Math.random() * (7 + 1))];
    }

    else { // --==<<{[[[ We - Are - One ]]]}>>==--
        return 'We Are One';
    }

};











module.exports.loop = function () {
'use strict'
/*                                                        _                             _         
*                                                 __  __ |   |\/| _ . _   |   _  _  _    | __  __ 
*                                                     -- |_  |  |(_||| )  |__(_)(_)|_)  _| --     
*                                                                                  |              
*/
    if (Memory.throttle) {

        if (Game.cpu.bucket === 10000) {
            Memory.throttle = false;
        }
        return;        
    }

    if (Game.cpu.bucket < 100) {
        Memory.throttle = true;
        return;
    }


    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    };
    for (const name in Memory.flags) {
        if (!Game.flags[name]) {
            delete Memory.flags[name];
        }
    };

/*                            _                                           __                  __                    __            _         
*                     __  __ |   |  | _  _ _   |\/| _  _  _  _  _ _   /  |__)|_  _ |_ _  _   /   _  _  _  _  _  _  /   _ || _ _|   | __  __ 
*                         -- |_  |/\|(_|| |_)  |  |(_|| )(_|(_)(-|   /   |   | )(_)|_(_)| )  \__(_|| )| )(_)| )_)  \__(_|||(-(_|  _| --     
*                                         |                 _/                                                                              
*/
    roles();
    pwrCreeps();
    roomLoops();
    warpVisuals();
    photonCannons();
    observatory();

    if (Game.time % 7 === 0) {
        getObjective();
    }

    if (Game.time % 9 === 0) {
        linkSystem();
        roomPlans();
        marketSystem();
        laboratory();
    }

};















const warpUnitsV3 = function (pW) {

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
            warpProbe(spawn, 1, 'Probe-' + Game.time.toString(36), { memory: { role: 'probe', wSource: dSource, sContX: dContX, sContY: dContY } });
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
        warpProbe(spawn, getEnergyStatus(spawn), 'Probe-' + Game.time.toString(36), { memory: { role: 'probe', wSource: dSource, sContX: dContX, sContY: dContY } });
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

        else if (pW.controller.level === 8 && pW.controller.ticksToDowngrade === 200000 ) {
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
        pW.memory.labs = {};
        pW.memory.labs.loc = {};
        pW.memory.labs.boosting = false;
        pW.memory.repairs = 250000;
        pW.memory.containers = {};
        pW.memory.links = {};

        if (Memory.observatory === undefined) {
            Memory.observatory = {};
            Memory.observatory.home = {};
        }
    }



    // War zone - Safe Mode Setup //
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
            warpProbe(spawn, 1, 'Probe-' + Game.time.toString(36), { memory: { role: 'probe', wSource: dSource, sContX: dContX, sContY: dContY } });
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
        warpProbe(spawn, getEnergyStatus(spawn), 'Probe-' + Game.time.toString(36), { memory: { role: 'probe', wSource: dSource, sContX: dContX, sContY: dContY } });
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

        else if (pW.controller.level === 8 && pW.controller.ticksToDowngrade === 200000 ) {
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
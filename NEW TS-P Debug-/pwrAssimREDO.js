
switch (r) {












case 'pwrassim':

if (Game.time % Math.floor(Math.random() * (40 - 4) + 11) === 0) creep.say(cSpeak(6), [true]);

if (creep.memory.moving && _.sum(creep.carry) === 0) {

    creep.memory.moving = false;
    creep.say('🔄 collect', [true]);

    const pS = Game.getObjectById(creep.room.memory.powerSpawn);
    if (pS.energy < 4500) creep.memory.type = 'e';
    if (pS.power < 1) {
        creep.memory.type = 'p';
    }

    else {

        if (creep.room.memory.labs.type) {

            const lab0 = Game.getObjectById(creep.room.memory.labs.type.ATTACK);
            if (lab0.mineralAmount === 0 && creep.room.terminal.store['XUH2O'] > 0) {
                creep.memory.type = 'XUH2O';
                creep.memory.lab = creep.room.memory.labs.type.ATTACK;
                continue;
            }

            const lab1 = Game.getObjectById(creep.room.memory.labs.type.Harvest);
            if (lab1.mineralAmount === 0 && creep.room.terminal.store['XUHO2'] > 0) {
                creep.memory.type = 'XUHO2';
                creep.memory.lab = creep.room.memory.labs.type.Harvest;
                continue;
            }

            const lab2 = Game.getObjectById(creep.room.memory.labs.type.Capacity);
            if (lab2.mineralAmount === 0 && creep.room.terminal.store['XKH2O'] > 0) {
                creep.memory.type = 'XKH2O';
                creep.memory.lab = creep.room.memory.labs.type.Capacity;
                continue;
            }

            const lab3 = Game.getObjectById(creep.room.memory.labs.type.Ranged);
            if (lab3.mineralAmount === 0 && creep.room.terminal.store['XKHO2'] > 0) {
                creep.memory.type = 'XKHO2';
                creep.memory.lab = creep.room.memory.labs.type.Ranged;
                continue;
            }

            const lab4 = Game.getObjectById(creep.room.memory.labs.type.Build);
            if (lab4.mineralAmount === 0 && creep.room.terminal.store['XLH2O'] > 0) {
                creep.memory.type = 'XLH2O';
                creep.memory.lab = creep.room.memory.labs.type.Build;
                continue;
            }

            const lab5 = Game.getObjectById(creep.room.memory.labs.type.Heal);
            if (lab5.mineralAmount === 0 && creep.room.terminal.store['XLHO2'] > 0) {
                creep.memory.type = 'XLHO2';
                creep.memory.lab = creep.room.memory.labs.type.Heal;
                continue;
            }

            const lab6 = Game.getObjectById(creep.room.memory.labs.type.Dismantel);
            if (lab6.mineralAmount === 0 && creep.room.terminal.store['XZH2O'] > 0) {
                creep.memory.type = 'XZH2O';
                creep.memory.lab = creep.room.memory.labs.type.Dismantel;
                continue;
            }

            const lab7 = Game.getObjectById(creep.room.memory.labs.type.MOVE);
            if (lab7.mineralAmount === 0 && creep.room.terminal.store['XZHO2'] > 0) {
                creep.memory.type = 'XZHO2';
                creep.memory.lab = creep.room.memory.labs.type.MOVE;
                continue;
            }

            const lab8 = Game.getObjectById(creep.room.memory.labs.type.Upgrade);
            if (lab8.mineralAmount === 0 && creep.room.terminal.store['XGH2O'] > 0) {
                creep.memory.type = 'XGH2O';
                creep.memory.lab = creep.room.memory.labs.type.Upgrade;
                continue;
            }

            const lab9 = Game.getObjectById(creep.room.memory.labs.type.TOUGH);
            if (lab9.mineralAmount === 0 && creep.room.terminal.store['XGHO2'] > 0) {
                creep.memory.type = 'XGHO2';
                creep.memory.lab = creep.room.memory.labs.type.TOUGH;
                continue;
            }
        }
    }
}

if (!creep.memory.moving && _.sum(creep.carry) === creep.carryCapacity) {
    creep.memory.moving = true;
    creep.say('📦 store', [true]);
}

if (creep.memory.moving) {

    if (creep.memory.type === 'p' || !creep.memory.type) {

        const pwr = Game.getObjectById(creep.room.memory.powerSpawn);
        
        if (creep.transfer(pwr, 'power') === ERR_NOT_IN_RANGE) {
            creep.moveTo(pwr, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 10 });
            continue;
        }

    }

    if (creep.memory.type === 'e') {

        const pwr = Game.getObjectById(creep.room.memory.powerSpawn);

        if (pwr.energy < 4500 && creep.transfer(pwr, 'energy') === ERR_NOT_IN_RANGE) {
            creep.moveTo(pwr, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 10 });
            continue;
        }

        if (pwr.energy > 4500) {

            if (creep.transfer(creep.room.terminal, 'energy') === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.terminal, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 10 });
                continue;
            }

        }
    }

    else {

        const target = Game.getObjectById(creep.memory.lab);
        if (creep.transfer(target, creep.memory.type) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 10 });
            continue;
        }

    }

}



else {

    if (creep.memory.type === 'p' || !creep.memory.type) {

        const pwr = Game.getObjectById(creep.room.memory.powerSpawn);

        if (pwr.power < 1 && creep.withdraw(creep.room.terminal, 'power', 100) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.terminal, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
        }

        else {

            if (creep.room.memory.lockSpots && creep.room.memory.lockSpots.pwrAssim) {
                creep.moveTo(creep.room.memory.lockSpots.pwrAssim.x, creep.room.memory.lockSpots.pwrAssim.y, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
            }

            creep.memory.moving = true;
        }

        continue;
    }

    if (creep.memory.type === 'e') {

        const pwr = Game.getObjectById(creep.room.memory.powerSpawn);

        if (pwr.power > 0 && pwr.energy < 4500 && creep.withdraw(creep.room.terminal, 'energy') === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.terminal, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
        }

        else {

            if (creep.room.memory.lockSpots && creep.room.memory.lockSpots.pwrAssim) {
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

            if (creep.room.memory.lockSpots && creep.room.memory.lockSpots.pwrAssim) {
                creep.moveTo(creep.room.memory.lockSpots.pwrAssim.x, creep.room.memory.lockSpots.pwrAssim.y, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
            }
        }
        continue;

    }                    

}
continue;


















}















































switch (r) {












    case 'pwrassim':

        if (Game.time % Math.floor(Math.random() * (40 - 4) + 11) === 0) creep.say(cSpeak(6), [true]);

        if (creep.memory.moving && _.sum(creep.carry) === 0) {

            creep.memory.moving = false;
            creep.say('🔄 collect', [true]);

            const pS = Game.getObjectById(creep.room.memory.powerSpawn);

            if (pS.energy < 4500) creep.memory.type = 'e';

            if (pS.power < 1) {

                creep.memory.type = 'p';
            }

            else {

                if (creep.room.memory.labs.type) {

                    const labSet = [creep.room.memory.labs.type.ATTACK, creep.room.memory.labs.type.Harvest, creep.room.memory.labs.type.Capacity, creep.room.memory.labs.type.Ranged, creep.room.memory.labs.type.Build, creep.room.memory.labs.type.Heal, creep.room.memory.labs.type.Dismantel, creep.room.memory.labs.type.MOVE, creep.room.memory.labs.type.Upgrade, creep.room.memory.labs.type.TOUGH];
                    const minType = ['XUH2O', 'XUHO2', 'XKH2O', 'XKHO2', 'XLH2O', 'XLHO2', 'XZH2O', 'XZHO2', 'XGH2O', 'XGHO2'];

                    let i = 0;

                    while (i < 10) {

                        const lab = Game.getObjectById(labSet[i]);

                        if ((!lab.mineralAmount || lab.mineralAmount < 30 ) && creep.room.terminal.store[minType[i]] > 0) {
                            creep.memory.type = minType[i];
                            creep.memory.lab = labSet[i];
                            continue;
                        }

                        i++;

                    }
                }
            }
        }

        if (!creep.memory.moving && _.sum(creep.carry) === creep.carryCapacity) {
            creep.memory.moving = true;
            creep.say('📦 store', [true]);
        }

        if (creep.memory.moving) {  //   Moving Material to appropriate destinations

            if (creep.memory.type === 'p') {

                const pwr = Game.getObjectById(creep.room.memory.powerSpawn);

                if (creep.transfer(pwr, 'power') === ERR_NOT_IN_RANGE) {
                    creep.moveTo(pwr, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 10 });
                    continue;
                }

            }

            if (creep.memory.type === 'e') {

                const pwr = Game.getObjectById(creep.room.memory.powerSpawn);

                if (pwr.energy < 4500 && creep.transfer(pwr, 'energy') === ERR_NOT_IN_RANGE) {
                    creep.moveTo(pwr, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 10 });
                    continue;
                }

                if (pwr.energy > 4500) {

                    if (creep.transfer(creep.room.terminal, 'energy') === ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.terminal, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 10 });
                        continue;
                    }

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

            if (creep.memory.type === 'p') {

                const pwr = Game.getObjectById(creep.room.memory.powerSpawn);

                if (pwr.power < 1 && creep.withdraw(creep.room.terminal, 'power', 100) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.terminal, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
                }

                else { // Power is not needed - Move into Idle position if not already there and Check Moving Destinations again

                    if (creep.room.memory.lockSpots && creep.room.memory.lockSpots.pwrAssim && (creep.pos.x !== creep.room.memory.lockSpots.pwrAssim.x || creep.pos.y !== creep.room.memory.lockSpots.pwrAssim.y)) {
                        creep.moveTo(creep.room.memory.lockSpots.pwrAssim.x, creep.room.memory.lockSpots.pwrAssim.y, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
                    }

                    creep.memory.moving = true;
                }

                continue;
            }

            if (creep.memory.type === 'e') { // Check Power hasn't fallen to 0 and Energy for processing 

                const pwr = Game.getObjectById(creep.room.memory.powerSpawn);

                if (pwr.power > 0 && pwr.energy < 4500 && creep.withdraw(creep.room.terminal, 'energy') === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.terminal, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
                }

                else { // Energy is not needed - Move into Idle position if not already there and Check Moving Destinations again

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

                    if (creep.room.memory.lockSpots && creep.room.memory.lockSpots.pwrAssim && (creep.pos.x !== creep.room.memory.lockSpots.pwrAssim.x || creep.pos.y !== creep.room.memory.lockSpots.pwrAssim.y)) {
                        creep.moveTo(creep.room.memory.lockSpots.pwrAssim.x, creep.room.memory.lockSpots.pwrAssim.y, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
                    }

                }

                continue;

            }

        }
        continue;


















}
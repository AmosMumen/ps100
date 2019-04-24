


const pwrCreeps = function () {

    for (const n in Game.powerCreeps) {

        const pC = Game.powerCreeps[n];

        if (pC.ticksToLive === undefined) continue;

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

            if (pC.powers[PWR_OPERATE_TOWER] && pC.powers[PWR_OPERATE_TOWER].cooldown === 0) {
                const tower = _.filter(Game.structures, t => t.room.name === pC.room.name && t.structureType === 'tower' && t.energy > 100);
                const maxKey = _.max(Object.keys(tower), o => tower[o].energy);
                if (pC.usePower(PWR_OPERATE_TOWER, tower[maxKey]) === ERR_NOT_IN_RANGE) {
                    pC.moveTo(tower[maxKey], { reusePath: 10, ignoreRoads: true, swampCost: 1 });
                    continue;
                }
            }
            
            if (pC.powers[PWR_OPERATE_EXTENSION] && pC.powers[PWR_OPERATE_EXTENSION].cooldown === 0) {
                if(pC.room.storage && pC.room.storage.store[RESOURCE_ENERGY] > 650000 && pC.room.energyAvailable < 9000) {
                    
                    if (pC.usePower(PWR_OPERATE_EXTENSION, pC.room.storage) === ERR_NOT_IN_RANGE) {
                        pC.moveTo(pC.room.storage, { reusePath: 10, ignoreRoads: true, swampCost: 1 });
                        continue;
                    }
                }
            }
            
            if(pC.powers[PWR_OPERATE_SPAWN] && pC.powers[PWR_OPERATE_SPAWN].cooldown === 0) {
                const spawn = _.filter(Game.structures, s => s.room.name === pC.room.name && s.structureType === 'spawn');
                pC.usePower(PWR_OPERATE_SPAWN, spawn[0]);
            }

        }
        continue;
    }
}
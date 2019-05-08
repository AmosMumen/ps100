






const warpVisuals = function () {

    if (!Memory.utils || !Memory.utils.warpVisuals) {

        if (!Memory.utils) Memory.utils = {};
        Memory.utils.warpVisuals = {};

        Memory.utils.warpVisuals['probe'] = { icon: '☀️  ', x: '0.86', y: '0.25' };
        Memory.utils.warpVisuals['probefar'] = { icon: '🔀☀️ ', x: '0.86', y: '0.25' };
        Memory.utils.warpVisuals['assimfar'] = { icon: '🔀📦 ', x: '0.86', y: '0.25' };
        Memory.utils.warpVisuals['bldfar'] = { icon: '🔀🔨 ', x: '0.86', y: '0.25' };
        Memory.utils.warpVisuals['assim'] = { icon: '📦  ', x: '0.86', y: '0.25' };
        Memory.utils.warpVisuals['upgrader'] = { icon: '🔮  ', x: '0.86', y: '0.25' };
        Memory.utils.warpVisuals['builder'] = { icon: '🔨  ', x: '0.84', y: '0.25' };
        Memory.utils.warpVisuals['unique'] = { icon: '🛠️ ', x: '0.86', y: '0.25' };
        Memory.utils.warpVisuals['extraction'] = { icon: '🔩 ', x: '0.86', y: '0.25' };
        Memory.utils.warpVisuals['pwrassim'] = { icon: '⭕ ', x: '0.86', y: '0.25' };
        Memory.utils.warpVisuals['zealotfar'] = { icon: '🔱  ', x: '0.88', y: '0.25' };
        Memory.utils.warpVisuals['smallzealot'] = { icon: '🔱  ', x: '0.88', y: '0.25' };
        Memory.utils.warpVisuals['templarpriest'] = { icon: '🔱  ', x: '0.88', y: '0.25' };

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









































const warpVisuals = function () {

   
    for (const name in Game.spawns) {
        const spawn = Game.spawns[name];
        if (spawn.spawning) {
            const spawningCreep = Game.creeps[spawn.spawning.name];
            const final = Math.floor(spawn.spawning.remainingTime * 100 / spawn.spawning.needTime + (-100)) * -1;


            switch (spawningCreep.memory.role) {

                case 'probefar':
                    spawn.room.visual.text('🔀☀️ ' + final + '%', spawn.pos.x + 0.86, spawn.pos.y + 0.25,
                        { align: 'center', opacity: 0.8 });
                    break;

                case 'assimfar':
                    spawn.room.visual.text('🔀📦 ' + final + '%', spawn.pos.x + 0.86, spawn.pos.y + 0.25,
                        { align: 'center', opacity: 0.8 });
                    break;

                case 'probe':
                    spawn.room.visual.text('☀️  ' + final + '%', spawn.pos.x + 0.86, spawn.pos.y + 0.25,
                        { align: 'center', opacity: 0.8 });
                    break;

                case 'assim':
                    spawn.room.visual.text('📦  ' + final + '%', spawn.pos.x + 0.86, spawn.pos.y + 0.25,
                        { align: 'center', opacity: 0.8 });
                    break;

                case 'bldfar':
                    spawn.room.visual.text('🔀🔨 ' + final + '%', spawn.pos.x + 0.86, spawn.pos.y + 0.25,
                        { align: 'center', opacity: 1 });
                    break;

                case 'upgrader':
                    spawn.room.visual.text('🔮  ' + final + '%', spawn.pos.x + 0.86, spawn.pos.y + 0.25,
                        { align: 'center', opacity: 0.8 });
                    break;

                case 'builder':
                    spawn.room.visual.text('🔨  ' + final + '%', spawn.pos.x + 0.84, spawn.pos.y + 0.25,
                        { align: 'center', opacity: 0.8 });
                    break;

                case 'unique':
                    spawn.room.visual.text('🛠️ ' + final + '%', spawn.pos.x + 0.86, spawn.pos.y + 0.25,
                        { align: 'center', opacity: 1 });
                    break;

                case 'extraction':
                    spawn.room.visual.text('🔩 ' + final + '%', spawn.pos.x + 0.86, spawn.pos.y + 0.25,
                        { align: 'center', opacity: 1 });
                    break;

                case 'pwrassim':
                    spawn.room.visual.text('⭕ ' + final + '%', spawn.pos.x + 0.86, spawn.pos.y + 0.25,
                        { align: 'center', opacity: 1 });
                    break;

                case 'zealotfar':                   
                case 'smallzealot':                   
                case 'templarpriest':
                    spawn.room.visual.text('🔱  ' + final + '%', spawn.pos.x + 0.88, spawn.pos.y + 0.25,
                        { align: 'center', opacity: 0.8 });
                    break;

                default:
                    spawn.room.visual.text('🛠️' + spawningCreep.memory.role + ' ' + final + '%', spawn.pos.x + 1, spawn.pos.y,
                        { align: 'left', opacity: 0.8 });
            }
        }
    }
};
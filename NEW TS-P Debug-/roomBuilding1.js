
















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


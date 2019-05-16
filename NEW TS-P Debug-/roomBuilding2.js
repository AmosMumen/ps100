



















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

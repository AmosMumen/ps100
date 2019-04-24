
















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
        if (c === undefined) return;

        if (c.pos.x > r.memory.labs.loc.x + 2 || c.pos.x < r.memory.labs.loc.x - 2 || c.pos.y > r.memory.labs.loc.y + 2 || c.pos.y < r.memory.labs.loc.y - 2) return;

        let i = 0;

        while (i < lab.length) {

            switch (c.memory.role) {

                case 'probe':

                    if (lab[i].mineralType === 'XUHO2') {

                        const boosted = _.filter(c.body, b => b.type === 'work' && !b.boost)[0];
                        if (boosted && lab[i].boostCreep(c, 1) === OK) c.memory.boosted = true;

                    }

                    break;

                case 'assim':
                case 'assimfar':
                case 'pwrassim':

                    if (lab[i].mineralType === 'XKH2O') {

                        const boosted = _.filter(c.body, b => b.type === 'carry' && !b.boost)[0];
                        if (boosted && lab[i].boostCreep(c, 2) === OK) c.memory.boosted = true;

                    }

                    if (lab[i].mineralType === 'XZHO2') {

                        const boosted = _.filter(c.body, b => b.type === 'move' && !b.boost)[0];
                        if (boosted && lab[i].boostCreep(c, 1) === OK) c.memory.boosted = true;

                    }

                    break;

                case 'zealotfar':

                    if (lab[i].mineralType === 'XUH2O') {

                        const boosted = _.filter(c.body, b => b.type === 'attack' && !b.boost)[0];
                        if (boosted && lab[i].boostCreep(c, 1) === OK) c.memory.boosted = true;

                    }

                    if (lab[i].mineralType === 'XZHO2') {

                        const boosted = _.filter(c.body, b => b.type === 'move' && !b.boost)[0];
                        if (boosted) lab[i].boostCreep(c, 1);

                    }

                    if (lab[i].mineralType === 'XGHO2') {

                        const boosted = _.filter(c.body, b => b.type === 'tough' && !b.boost)[0];
                        if (boosted) lab[i].boostCreep(c);

                    }

                    break;

                case 'extractor':

                    if (lab[i].mineralType === 'XUHO2') {

                        const boosted = _.filter(c.body, b => b.type === 'work' && !b.boost)[0];
                        if (boosted && lab[i].boostCreep(c) === OK) c.memory.boosted = true;

                    }

                    if (lab[i].mineralType === 'XZHO2') {

                        const boosted = _.filter(c.body, b => b.type === 'move' && !b.boost)[0];
                        if (boosted) lab[i].boostCreep(c, 2);

                    }

                    if (lab[i].mineralType === 'XKH2O') {

                        const boosted = _.filter(c.body, b => b.type === 'carry' && !b.boost)[0];
                        if (boosted) lab[i].boostCreep(c);

                    }

                    break;

            }

            i++;

        }
    }
};




















































































const laboratory = function (c) {

    for (const n in Game.rooms) {
        const r = Game.rooms[n];

        if (r.memory.labs === undefined) {
            r.memory.labs = {};
            r.memory.labs.loc = {};
            r.memory.labs.boosting = false;
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

        const lab = _.filter(Game.structures, s => s.structureType === 'lab' && s.room.name === n && s.energy > 19 && s.mineralAmount > 29);

        if (lab[0] === undefined) {
            r.memory.labs.boosting = false;
            continue;
        }

        r.memory.labs.boosting = true;
        if (c === undefined) return;

        lab.forEach((l) => {

                    switch (c.memory.role) {

                        case 'probe':

                        console.log('Lab Testing: ' + l + '  Creep: ' + c.name); 
                            if (l.mineralType === 'XUHO2') {

                                const boosted = _.filter(c.body, b => b.type === 'work' && !b.boost)[0];
                                if (boosted && l.boostCreep(c, 1) === OK) c.memory.boosted = true;

                                console.log(l.boostCreep(c))
                            }

                            break;

                        case 'pwrassim':
                        case 'assimfar':
                        case 'assim':

                        console.log('Lab Testing:  ' + l + '  Creep: ' + c.name); 
                            if (l.mineralType === 'XKH2O') {

                                const boosted = _.filter(c.body, b => b.type === 'carry' && !b.boost)[0];
                                if (boosted && l.boostCreep(c, 2) === OK) c.memory.boosted = true;

                            }

                            if (l.mineralType === 'XZHO2') {

                                const boosted = _.filter(c.body, b => b.type === 'move' && !b.boost)[0];
                                if (boosted && l.boostCreep(c, 1) === OK) c.memory.boosted = true;
            
                            }

                            break;

                        case 'zealotfar':

                        console.log('Lab Testing: ' + l + '  Creep: ' + c.name); 
                            if (l.mineralType === 'XUH2O') {

                                const boosted = _.filter(c.body, b => b.type === 'attack' && !b.boost)[0];
                                if (boosted && l.boostCreep(c, 1) === OK) c.memory.boosted = true;

                            }

                            if (l.mineralType === 'XZHO2') {

                                const boosted = _.filter(c.body, b => b.type === 'move' && !b.boost)[0];
                                if (boosted) l.boostCreep(c, 1);

                            }

                            if (l.mineralType === 'XGHO2') {

                                const boosted = _.filter(c.body, b => b.type === 'tough' && !b.boost)[0];
                                if (boosted) l.boostCreep(c);

                            }

                            break;

                        case 'extractor':

                        console.log('Lab Testing: ' + l + '  Creep: ' + c.name); 
                            if (l.mineralType === 'XUHO2') {

                                const boosted = _.filter(c.body, b => b.type === 'work' && !b.boost)[0];
                                if (boosted && l.boostCreep(c) === OK) c.memory.boosted = true;

                            }

                            if (l.mineralType === 'XZHO2') {

                                const boosted = _.filter(c.body, b => b.type === 'move' && !b.boost)[0];
                                if (boosted) l.boostCreep(c, 2);

                            }

                            if (l.mineralType === 'XKH2O') {

                                const boosted = _.filter(c.body, b => b.type === 'carry' && !b.boost)[0];
                                if (boosted) l.boostCreep(c);

                            }

                            break;

                    }      
        });
    }
};

















const marketSystem = function () {

    if (Memory.market === undefined) {

        Memory.market = {};
        Memory.market.marketReset = Game.time + 30000;

        Memory.market.sale = {};            Memory.market.purchase = {};

        Memory.market.sale.energy = {};     Memory.market.purchase.energy = {};
        Memory.market.sale.power = {};      Memory.market.purchase.power = {};
        Memory.market.sale.ops = {};        Memory.market.purchase.ops = {};

        Memory.market.sale.base = {};       Memory.market.purchase.base = {};
        Memory.market.sale.tier3 = {};      Memory.market.purchase.tier3 = {};

        Memory.market.sale.base.H = {};     Memory.market.purchase.base.H = {};
        Memory.market.sale.base.O = {};     Memory.market.purchase.base.O = {};
        Memory.market.sale.base.U = {};     Memory.market.purchase.base.U = {};
        Memory.market.sale.base.L = {};     Memory.market.purchase.base.L = {};
        Memory.market.sale.base.K = {};     Memory.market.purchase.base.K = {};
        Memory.market.sale.base.Z = {};     Memory.market.purchase.base.Z = {};
        Memory.market.sale.base.X = {};     Memory.market.purchase.base.X = {};
        Memory.market.sale.base.G = {};     Memory.market.purchase.base.G = {};
        

        Memory.market.sale.tier3.XUH2O = {};    Memory.market.purchase.tier3.XUH2O = {};    // + 300% (ATTACK)
        Memory.market.sale.tier3.XUHO2 = {};    Memory.market.purchase.tier3.XUHO2 = {};    // + 600% Harvest (WORK)
        Memory.market.sale.tier3.XKH2O = {};    Memory.market.purchase.tier3.XKH2O = {};    // + 150 Capacity (CARRY)
        Memory.market.sale.tier3.XKHO2 = {};    Memory.market.purchase.tier3.XKHO2 = {};    // + 300% (RANGED_ATTACK)
        Memory.market.sale.tier3.XLH2O = {};    Memory.market.purchase.tier3.XLH2O = {};    // + 100% Repair / Build (WORK)
        Memory.market.sale.tier3.XLHO2 = {};    Memory.market.purchase.tier3.XLHO2 = {};    // + 300% Heal / Ranged Heal (HEAL)
        Memory.market.sale.tier3.XZH2O = {};    Memory.market.purchase.tier3.XZH2O = {};    // + 300% Dismantel (WORK)
        Memory.market.sale.tier3.XZHO2 = {};    Memory.market.purchase.tier3.XZHO2 = {};    // + 300% (MOVE)
        Memory.market.sale.tier3.XGH2O = {};    Memory.market.purchase.tier3.XGH2O = {};    // + 100% Upgrade Controller (WORK)
        Memory.market.sale.tier3.XGHO2 = {};    Memory.market.purchase.tier3.XGHO2 = {};    // + 70% Damage Reduction (TOUGH)

    }

    for (const name in Game.rooms) {
        const r = Game.rooms[name];

        if (!r.terminal || r.terminal.cooldown > 0 || r.terminal.store['energy'] < 29000) continue;

        if (Game.market.credits > 30000 && _.sum(r.terminal.store) < 300000) {


            if (r.memory.labs.type) {

            const minType = ['XUH2O', 'XUHO2', 'XKH2O', 'XKHO2', 'XLH2O', 'XLHO2', 'XZH2O', 'XZHO2', 'XGH2O', 'XGHO2'];

            let i = 0;

            while (i < 10) {

            if (!r.terminal.store[minType[i]]) { //  If Labs are Installed(Memorized) - Check for Minerals in room Terminal.

                const buy = Game.market.getAllOrders(order => order.resourceType === minType[i] && order.type === 'sell' &&
                    Game.market.calcTransactionCost(5000, name, order.roomName) < 29000);

                if (buy[0]) {

                    const minKey = _.min(Object.keys(buy), o => buy[o].price);

                    if (Memory.market.purchase.tier3[minType[i]].lowestPriceKey === undefined || buy[minKey].price < Memory.market.purchase.tier3[minType[i]].lowestPriceKey) {
                        Memory.market.purchase.tier3[minType[i]].lowestPriceKey = buy[minKey].price;
                    }

                    if (buy[minKey].price < Memory.market.purchase.tier3[minType[i]].lowestPriceKey * 1.5) {
                        
                        Game.market.deal(buy[minKey].id, 5000, name);
                        i = 10;
                    }

                }
            }

            i++;

        }
    }

       

            if (r.terminal.store['power'] < 1000) {

                const buyPower = Game.market.getAllOrders(order => order.resourceType === 'power' && order.type === 'sell' &&
                    Game.market.calcTransactionCost(15000, name, order.roomName) < 29000);

                if (buyPower[0]) {

                    const minKey = _.min(Object.keys(buyPower), o => buyPower[o].price);

                    if (Memory.market.purchase.power.lowestPriceKey === undefined || buyPower[minKey].price < Memory.market.purchase.power.lowestPriceKey) {
                        Memory.market.purchase.power.lowestPriceKey = buyPower[minKey].price;
                    }

                    if (buyPower[minKey].price < Memory.market.purchase.power.lowestPriceKey * 1.5) Game.market.deal(buyPower[minKey].id, 15000, name);

                }
            }
        }







        if (r.terminal.store['H'] >= 30000) {

            console.log(r.name + '  Market System Test: ' + r.terminal.store['H'] + r.terminal.store['energy']);

            const sale = Game.market.getAllOrders(order => order.resourceType === 'H' && order.type === 'buy' &&
                Game.market.calcTransactionCost(30000, name, order.roomName) < 29000);

            if (sale[0]) {

                const maxKey = _.max(Object.keys(sale), o => sale[o].price);

                if(Memory.market.sale.base.H.highestPrice === undefined || sale[maxKey].price > Memory.market.sale.base.H.highestPrice) {
                    Memory.market.sale.base.H.highestPrice = sale[maxKey].price;
                }

                console.log(maxKey + sale[maxKey].price);
                if (sale[maxKey].price > Memory.market.sale.base.H.highestPrice / 1.185) Game.market.deal(sale[maxKey].id, 30000, name);

            }
        }

        if (r.terminal.store['ops'] >= 10000) {

            console.log(r.name + '  Market System Test Ops: ' + r.terminal.store['ops'] + r.terminal.store['energy']);

            const sale = Game.market.getAllOrders(order => order.resourceType === 'ops' && order.type === 'buy' &&
                Game.market.calcTransactionCost(10000, name, order.roomName) < 29000);

            if (sale[0]) {

                const maxKey = _.max(Object.keys(sale), o => sale[o].price);

                if(Memory.market.sale.ops.highestPrice === undefined || sale[maxKey].price > Memory.market.sale.ops.highestPrice) {
                    Memory.market.sale.ops.highestPrice = sale[maxKey].price;
                }

                console.log(maxKey + sale[maxKey].price);
                if (sale[maxKey].price > Memory.market.sale.ops.highestPrice / 1.185) Game.market.deal(sale[maxKey].id, 10000, name);

            }
        }
    }

    if (Game.time > Memory.market.marketReset) Memory.market = undefined;
};





















































































const marketSystem = function () {

    if (Memory.market === undefined) {

        Memory.market = {};
        Memory.market.marketReset = Game.time + 30000;

        Memory.market.sale = {};            Memory.market.purchase = {};

        Memory.market.sale.energy = {};     Memory.market.purchase.energy = {};
        Memory.market.sale.power = {};      Memory.market.purchase.power = {};
        Memory.market.sale.ops = {};        Memory.market.purchase.ops = {};

        Memory.market.sale.base = {};       Memory.market.purchase.base = {};
        Memory.market.sale.tier3 = {};      Memory.market.purchase.tier3 = {};

        Memory.market.sale.base.H = {};     Memory.market.purchase.base.H = {};
        Memory.market.sale.base.O = {};     Memory.market.purchase.base.O = {};
        Memory.market.sale.base.U = {};     Memory.market.purchase.base.U = {};
        Memory.market.sale.base.L = {};     Memory.market.purchase.base.L = {};
        Memory.market.sale.base.K = {};     Memory.market.purchase.base.K = {};
        Memory.market.sale.base.Z = {};     Memory.market.purchase.base.Z = {};
        Memory.market.sale.base.X = {};     Memory.market.purchase.base.X = {};
        Memory.market.sale.base.G = {};     Memory.market.purchase.base.G = {};
        

        Memory.market.sale.tier3.XUH2O = {};    Memory.market.purchase.tier3.XUH2O = {};    // + 300% (ATTACK)
        Memory.market.sale.tier3.XUHO2 = {};    Memory.market.purchase.tier3.XUHO2 = {};    // + 600% Harvest (WORK)
        Memory.market.sale.tier3.XKH2O = {};    Memory.market.purchase.tier3.XKH2O = {};    // + 150 Capacity (CARRY)
        Memory.market.sale.tier3.XKHO2 = {};    Memory.market.purchase.tier3.XKHO2 = {};    // + 300% (RANGED_ATTACK)
        Memory.market.sale.tier3.XLH2O = {};    Memory.market.purchase.tier3.XLH2O = {};    // + 100% Repair / Build (WORK)
        Memory.market.sale.tier3.XLHO2 = {};    Memory.market.purchase.tier3.XLHO2 = {};    // + 300% Heal / Ranged Heal (HEAL)
        Memory.market.sale.tier3.XZH2O = {};    Memory.market.purchase.tier3.XZH2O = {};    // + 300% Dismantel (WORK)
        Memory.market.sale.tier3.XZHO2 = {};    Memory.market.purchase.tier3.XZHO2 = {};    // + 300% (MOVE)
        Memory.market.sale.tier3.XGH2O = {};    Memory.market.purchase.tier3.XGH2O = {};    // + 100% Upgrade Controller (WORK)
        Memory.market.sale.tier3.XGHO2 = {};    Memory.market.purchase.tier3.XGHO2 = {};    // + 70% Damage Reduction (TOUGH)

    }

    for (const name in Game.rooms) {
        const r = Game.rooms[name];

        if (!r.terminal || r.terminal.cooldown > 0 || r.terminal.store['energy'] < 29000) continue;

        if (Game.market.credits > 30000 && _.sum(r.terminal.store) < 300000) {

            if (!r.terminal.store['XUHO2'] && r.memory.labs.type) { // WORK - Harvest Boost 

                const buy = Game.market.getAllOrders(order => order.resourceType === 'XUHO2' && order.type === 'sell' &&
                    Game.market.calcTransactionCost(5000, name, order.roomName) < 29000);

                if (buy[0]) {

                    const minKey = _.min(Object.keys(buy), o => buy[o].price);

                    if (Memory.market.purchase.tier3.XUHO2.lowestPriceKey === undefined || buy[minKey].price < Memory.market.purchase.tier3.XUHO2.lowestPriceKey) {
                        Memory.market.purchase.tier3.XUHO2.lowestPriceKey = buy[minKey].price;
                    }

                    if (buy[minKey].price < Memory.market.purchase.tier3.XUHO2.lowestPriceKey * 1.5) Game.market.deal(buy[minKey].id, 5000, name);

                }
            }

            if (!r.terminal.store['XKH2O'] && r.memory.labs.type) { // CARRY - Capacity Boost 

                const buy = Game.market.getAllOrders(order => order.resourceType === 'XKH2O' && order.type === 'sell' &&
                    Game.market.calcTransactionCost(5000, name, order.roomName) < 29000);

                if (buy[0]) {

                    const minKey = _.min(Object.keys(buy), o => buy[o].price);

                    if (Memory.market.purchase.tier3.XKH2O.lowestPriceKey === undefined || buy[minKey].price < Memory.market.purchase.tier3.XKH2O.lowestPriceKey) {
                        Memory.market.purchase.tier3.XKH2O.lowestPriceKey = buy[minKey].price;
                    }

                    if (buy[minKey].price < Memory.market.purchase.tier3.XKH2O.lowestPriceKey * 1.5) Game.market.deal(buy[minKey].id, 5000, name);

                }
            }

            if (!r.terminal.store['XZHO2'] && r.memory.labs.type) { // MOVE - Fatigue Reduction   

                const buy = Game.market.getAllOrders(order => order.resourceType === 'XZHO2' && order.type === 'sell' &&
                    Game.market.calcTransactionCost(5000, name, order.roomName) < 29000);

                if (buy[0]) {

                    const minKey = _.min(Object.keys(buy), o => buy[o].price);

                    if (Memory.market.purchase.tier3.XZHO2.lowestPriceKey === undefined || buy[minKey].price < Memory.market.purchase.tier3.XZHO2.lowestPriceKey) {
                        Memory.market.purchase.tier3.XZHO2.lowestPriceKey = buy[minKey].price;
                    }

                    if (buy[minKey].price < Memory.market.purchase.tier3.XZHO2.lowestPriceKey * 1.5) Game.market.deal(buy[minKey].id, 5000, name);

                }
            }

            if (!r.terminal.store['XUH2O'] && r.memory.labs.type) { // ATTACK - Dmg Boost   

                const buy = Game.market.getAllOrders(order => order.resourceType === 'XUH2O' && order.type === 'sell' &&
                    Game.market.calcTransactionCost(5000, name, order.roomName) < 29000);

                if (buy[0]) {

                    const minKey = _.min(Object.keys(buy), o => buy[o].price);

                    if (Memory.market.purchase.tier3.XUH2O.lowestPriceKey === undefined || buy[minKey].price < Memory.market.purchase.tier3.XUH2O.lowestPriceKey) {
                        Memory.market.purchase.tier3.XUH2O.lowestPriceKey = buy[minKey].price;
                    }

                    if (buy[minKey].price < Memory.market.purchase.tier3.XUH2O.lowestPriceKey * 1.5) Game.market.deal(buy[minKey].id, 5000, name);

                }
            }

            if (!r.terminal.store['XGHO2'] && r.memory.labs.type) { // TOUGH - Dmg Reduction

                const buy = Game.market.getAllOrders(order => order.resourceType === 'XGHO2' && order.type === 'sell' &&
                    Game.market.calcTransactionCost(5000, name, order.roomName) < 29000);

                if (buy[0]) {

                    const minKey = _.min(Object.keys(buy), o => buy[o].price);

                    if (Memory.market.purchase.tier3.XGHO2.lowestPriceKey === undefined || buy[minKey].price < Memory.market.purchase.tier3.XGHO2.lowestPriceKey) {
                        Memory.market.purchase.tier3.XGHO2.lowestPriceKey = buy[minKey].price;
                    }

                    if (buy[minKey].price < Memory.market.purchase.tier3.XGHO2.lowestPriceKey * 1.5) Game.market.deal(buy[minKey].id, 5000, name);

                }
            }



            if (r.terminal.store['power'] < 1000) {

                const buyPower = Game.market.getAllOrders(order => order.resourceType === 'power' && order.type === 'sell' &&
                    Game.market.calcTransactionCost(15000, name, order.roomName) < 29000);

                if (buyPower[0]) {

                    const minKey = _.min(Object.keys(buyPower), o => buyPower[o].price);

                    if (Memory.market.purchase.power.lowestPriceKey === undefined || buyPower[minKey].price < Memory.market.purchase.power.lowestPriceKey) {
                        Memory.market.purchase.power.lowestPriceKey = buyPower[minKey].price;
                    }

                    if (buyPower[minKey].price < Memory.market.purchase.power.lowestPriceKey * 1.5) Game.market.deal(buyPower[minKey].id, 15000, name);

                }
            }
        }







        if (r.terminal.store['H'] >= 30000) {

            console.log(r.name + '  Market System Test: ' + r.terminal.store['H'] + r.terminal.store['energy']);

            const sale = Game.market.getAllOrders(order => order.resourceType === 'H' && order.type === 'buy' &&
                Game.market.calcTransactionCost(30000, name, order.roomName) < 29000);

            if (sale[0]) {

                const maxKey = _.max(Object.keys(sale), o => sale[o].price);

                if(Memory.market.sale.base.H.highestPrice === undefined || sale[maxKey].price > Memory.market.sale.base.H.highestPrice) {
                    Memory.market.sale.base.H.highestPrice = sale[maxKey].price;
                }

                console.log(maxKey + sale[maxKey].price);
                if (sale[maxKey].price > Memory.market.sale.base.H.highestPrice / 1.185) Game.market.deal(sale[maxKey].id, 30000, name);

            }
        }

        if (r.terminal.store['ops'] >= 10000) {

            console.log(r.name + '  Market System Test Ops: ' + r.terminal.store['ops'] + r.terminal.store['energy']);

            const sale = Game.market.getAllOrders(order => order.resourceType === 'ops' && order.type === 'buy' &&
                Game.market.calcTransactionCost(10000, name, order.roomName) < 29000);

            if (sale[0]) {

                const maxKey = _.max(Object.keys(sale), o => sale[o].price);

                if(Memory.market.sale.ops.highestPrice === undefined || sale[maxKey].price > Memory.market.sale.ops.highestPrice) {
                    Memory.market.sale.ops.highestPrice = sale[maxKey].price;
                }

                console.log(maxKey + sale[maxKey].price);
                if (sale[maxKey].price > Memory.market.sale.ops.highestPrice / 1.185) Game.market.deal(sale[maxKey].id, 10000, name);

            }
        }
    }

    if (Game.time > Memory.market.marketReset) Memory.market = undefined;
};
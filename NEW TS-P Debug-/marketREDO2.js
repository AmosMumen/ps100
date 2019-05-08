




















const marketSystem = function () {

    if (Memory.market === undefined) {

        Memory.market = {};
        Memory.market.marketReset = Game.time + 30000;

        Memory.market.primary = {};

        Memory.market.base = {};
        Memory.market.tier3 = {};

        Memory.market.primary['energy'] = {};
        Memory.market.primary['power'] = {};
        Memory.market.primary['ops'] = {};

        Memory.market.base['H'] = { lowestPriceKey: 5, highestPriceKey: 0.1 };
        Memory.market.base['O'] = { lowestPriceKey: 5, highestPriceKey: 0.1 };
        Memory.market.base['U'] = { lowestPriceKey: 5, highestPriceKey: 0.1 };
        Memory.market.base['L'] = { lowestPriceKey: 5, highestPriceKey: 0.1 };
        Memory.market.base['K'] = { lowestPriceKey: 5, highestPriceKey: 0.1 };
        Memory.market.base['Z'] = { lowestPriceKey: 5, highestPriceKey: 0.1 };
        Memory.market.base['X'] = { lowestPriceKey: 5, highestPriceKey: 0.1 };
        Memory.market.base['G'] = { lowestPriceKey: 5, highestPriceKey: 0.1 };

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

        if (r.memory.labs.type && Game.market.credits > 600000 && _.sum(r.terminal.store) < 300000) {   //  If Labs are Installed(Memorized) - Check for Minerals in room Terminal.

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





















































const marketSystem = function () {

    if (Memory.market === undefined) {

        Memory.market = {};
        Memory.market.marketReset = Game.time + 30000;

        Memory.market.sale = {}; Memory.market.purchase = {};

        Memory.market.sale.energy = {}; Memory.market.purchase.energy = {};
        Memory.market.sale.power = {}; Memory.market.purchase.power = {};
        Memory.market.sale.ops = {}; Memory.market.purchase.ops = {};

        Memory.market.sale.base = {}; Memory.market.purchase.base = {};
        Memory.market.sale.tier3 = {}; Memory.market.purchase.tier3 = {};

        Memory.market.sale.base.H = {}; Memory.market.purchase.base.H = {};
        Memory.market.sale.base.O = {}; Memory.market.purchase.base.O = {};
        Memory.market.sale.base.U = {}; Memory.market.purchase.base.U = {};
        Memory.market.sale.base.L = {}; Memory.market.purchase.base.L = {};
        Memory.market.sale.base.K = {}; Memory.market.purchase.base.K = {};
        Memory.market.sale.base.Z = {}; Memory.market.purchase.base.Z = {};
        Memory.market.sale.base.X = {}; Memory.market.purchase.base.X = {};
        Memory.market.sale.base.G = {}; Memory.market.purchase.base.G = {};

        Memory.market.sale.tier3.XUH2O = {}; Memory.market.purchase.tier3['XUH2O'] = {};    // + 300% (ATTACK)
        Memory.market.sale.tier3.XUHO2 = {}; Memory.market.purchase.tier3['XUHO2'] = {};    // + 600% Harvest (WORK)
        Memory.market.sale.tier3.XKH2O = {}; Memory.market.purchase.tier3['XKH2O'] = {};    // + 150 Capacity (CARRY)
        Memory.market.sale.tier3.XKHO2 = {}; Memory.market.purchase.tier3['XKHO2'] = {};    // + 300% (RANGED_ATTACK)
        Memory.market.sale.tier3.XLH2O = {}; Memory.market.purchase.tier3['XLH2O'] = {};    // + 100% Repair / Build (WORK)
        Memory.market.sale.tier3.XLHO2 = {}; Memory.market.purchase.tier3['XLHO2'] = {};    // + 300% Heal / Ranged Heal (HEAL)
        Memory.market.sale.tier3.XZH2O = {}; Memory.market.purchase.tier3['XZH2O'] = {};    // + 300% Dismantel (WORK)
        Memory.market.sale.tier3.XZHO2 = {}; Memory.market.purchase.tier3['XZHO2'] = {};    // + 300% (MOVE)
        Memory.market.sale.tier3.XGH2O = {}; Memory.market.purchase.tier3['XGH2O'] = {};    // + 100% Upgrade Controller (WORK)
        Memory.market.sale.tier3.XGHO2 = {}; Memory.market.purchase.tier3['XGHO2'] = {};    // + 70% Damage Reduction (TOUGH)

    }

    for (const name in Game.rooms) {
        const r = Game.rooms[name];

        if (!r.terminal || r.terminal.cooldown > 0 || r.terminal.store['energy'] < 40000) continue;

        if (r.memory.labs.type && Game.market.credits > 600000 && _.sum(r.terminal.store) < 300000) {   //  If Labs are Installed(Memorized) - Check for Minerals in room Terminal.

                const minType = ['XUH2O', 'XUHO2', 'XKH2O', 'XKHO2', 'XLH2O', 'XLHO2', 'XZH2O', 'XZHO2', 'XGH2O', 'XGHO2'];

                let i = 0;

                while (i < 10) {

                    if (!r.terminal.store[minType[i]]) { 

                        const buy = Game.market.getAllOrders(order => order.resourceType === minType[i] && order.type === 'sell' &&
                            Game.market.calcTransactionCost(5000, name, order.roomName) < 40000);

                        if (buy[0]) {

                            const minKey = _.min(Object.keys(buy), o => buy[o].price);

                            if (Memory.market.purchase.tier3[minType[i]] === undefined || buy[minKey].price < Memory.market.purchase.tier3[minType[i]].lowestPriceKey) {
                                Memory.market.purchase.tier3[minType[i]] = {};
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


        if ((!r.terminal.store['power'] || r.terminal.store['power'] < 1400) && Game.market.credits > 30000 && _.sum(r.terminal.store) < 285000) { // Check for and/or Replace Power

            const buyPower = Game.market.getAllOrders(order => order.resourceType === 'power' && order.type === 'sell' &&
                Game.market.calcTransactionCost(15000, name, order.roomName) < 40000);

            if (buyPower[0]) {

                const minKey = _.min(Object.keys(buyPower), o => buyPower[o].price);

                if (Memory.market.purchase.power.lowestPriceKey === undefined || buyPower[minKey].price < Memory.market.purchase.power.lowestPriceKey) {
                    Memory.market.purchase.power.lowestPriceKey = buyPower[minKey].price;
                }

                if (buyPower[minKey].price < Memory.market.purchase.power.lowestPriceKey * 1.5) Game.market.deal(buyPower[minKey].id, 15000, name);

            }
        }




        if (r.terminal.store['H'] >= 30000) { // Sell Hydrogen

            console.log(r.name + '  Market System Test: ' + r.terminal.store['H'] + r.terminal.store['energy']);

            const sale = Game.market.getAllOrders(order => order.resourceType === 'H' && order.type === 'buy' &&
                Game.market.calcTransactionCost(30000, name, order.roomName) < 40000);

            if (sale[0]) {

                const maxKey = _.max(Object.keys(sale), o => sale[o].price);

                if (Memory.market.sale.base.H.highestPrice === undefined || sale[maxKey].price > Memory.market.sale.base.H.highestPrice) {
                    Memory.market.sale.base.H.highestPrice = sale[maxKey].price;
                }

                console.log(maxKey + sale[maxKey].price);
                if (sale[maxKey].price > Memory.market.sale.base.H.highestPrice / 1.185) Game.market.deal(sale[maxKey].id, 30000, name);

            }
        }

        if (r.terminal.store['ops'] >= 10000) { // Sell Ops

            console.log(r.name + '  Market System Test Ops: ' + r.terminal.store['ops'] + r.terminal.store['energy']);

            const sale = Game.market.getAllOrders(order => order.resourceType === 'ops' && order.type === 'buy' &&
                Game.market.calcTransactionCost(10000, name, order.roomName) < 29000);

            if (sale[0]) {

                const maxKey = _.max(Object.keys(sale), o => sale[o].price);

                if (Memory.market.sale.ops.highestPrice === undefined || sale[maxKey].price > Memory.market.sale.ops.highestPrice) {
                    Memory.market.sale.ops.highestPrice = sale[maxKey].price;
                }

                console.log(maxKey + sale[maxKey].price);
                if (sale[maxKey].price > Memory.market.sale.ops.highestPrice / 1.185) Game.market.deal(sale[maxKey].id, 10000, name);

            }
        }
    }

    if (Game.time > Memory.market.marketReset) Memory.market = undefined;
};
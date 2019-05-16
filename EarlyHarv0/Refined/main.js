`use strict`;
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleHarvester2 = require('role.harvester2');
const roleUpgrader2 = require('role.upgrader2');

module.exports.loop = function () {

    for(const name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    console.log('Harvesters: ' + harvesters.length);
    
    const harvesters2 = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester2');
    console.log('Harvesters2: ' + harvesters2.length);
    
    const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
    console.log('Upgraders: ' + upgraders.length);
    
    const upgraders2 = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader2');
    console.log('Upgraders2: ' + upgraders2.length);
    
    const builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
    console.log('Builders: ' + builders.length);

    if(harvesters.length < 1) {
        const newName = 'Harvester' + harvesters.length;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'harvester'}});
    }
    
    if(harvesters2.length < 1) {
        const newName = 'Harvester2' + harvesters2.length;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'harvester2'}});
    }
    
    if(upgraders.length < 1) {
        const newName = 'Upgrader' + upgraders.length;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'upgrader'}});
    }
    
     if(upgraders2.length < 1) {
        const newName = 'Upgrader2' + upgraders2.length;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'upgrader2'}});
    }
    
    if(builders.length < 1) {
        const newName = 'Builder' + builders.length;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'builder'}});
    }
    
    if(Game.spawns['Spawn1'].spawning) { 
        const spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text('🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

   for(const name in Game.rooms) {
        console.log('Room ' + name + ' has ' + Game.rooms[name].energyAvailable + ' energy');
    }
   
    for(const name in Game.creeps) {
        const creep = Game.creeps[name];
        
        if (creep.spawning) continue;
        
        if(creep.memory.role === 'harvester') roleHarvester.run(creep);
        
        if(creep.memory.role === 'harvester2') roleHarvester2.run(creep);
        
        if(creep.memory.role === 'upgrader') roleUpgrader.run(creep);
        
        if(creep.memory.role === 'upgrader2') roleUpgrader2.run(creep);
        
        if(creep.memory.role === 'builder') roleBuilder.run(creep);
        
    }
}

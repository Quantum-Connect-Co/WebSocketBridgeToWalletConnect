// import * as readline from 'node:readline/promises';
// import { stdin as input, stdout as output } from 'node:process';
// import {LOG} from '../logging/logging.js';
// import { clients } from '../units/unreal_server.js';

var readline = require("node:readline/promises");
var stdin = require("node:process");
var LOG = require("../logging/logging.js").LOG;
var clients = require("../data/clients").clients;


const rl = readline.createInterface({ 
    input: process.stdin,
    output: process.stdout,
});

var methods = new Map([
    [`history`, history],
    [`clear_history`, clear_history],
    [`clients`, get_clients],
    [`delete_client`, delete_client_by_uuid]
]);

function get_clients(args){
    if(clients.size > 0){
        var counter = 0;
        clients.forEach((key, value) => { 
            LOG.COMMAND(`(${counter}) -> ${value}`);
            counter++;
        });
    }
    else{ LOG.COMMAND(`not clients`); }
}

function history(args){ LOG.COMMAND(`${rl.history}`); }

function clear_history(args) { 
    LOG.COMMAND(`clear history`);
    rl.history = [];
 };

function delete_client_by_uuid(args){
    clients.delete(`${args[0]}`);
    LOG.COMMAND(`delete ${args[0]}`);
}

rl.on('line', (input) => {
    var str = pasreStr(input);
    try { methods.get(`${str.command}`)(str.args); }
    catch(e){ LOG.COMMAND_ERROR(`${input} ${e.message} ${e.name}`); }
});

function pasreStr(str){
    var splits = str.split(' ', 3);
    return {
        command: splits[0],
        args: [splits[1], splits[2]],
    };
}

var script = {
    rl 
}
module.exports = {rl};


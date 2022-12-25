import WebSocket, {WebSocketServer} from 'ws';
import {randomUUID} from 'crypto';
import {unreal_client} from './unreal_client.js';
import {LOG} from '../logging/logging.js';

import {json_rpc_request} from '../json_rpc/json_rpc_request.js';
import {json_rpc_response} from '../json_rpc/json_rpc_response.js'

var server = new WebSocketServer({ port: 8080 });
var clients = new Map();

class unreal_server {

    constructor(){
        unreal_server_on_connection(server, clients);
    }
};


function unreal_server_on_connection(server, clients){
    server.on('connection', (client, req) => {
        var uuid = randomUUID();
        var u_client = new unreal_client(client, uuid);
        clients.set(uuid, u_client);
        LOG.SERVER(`new client connected [${uuid}]`);

        client.send(json_rpc_response({
            id: uuid,
            jsonrpc: "2.0",
            result: {method: "bridge_socket_open" }
        }));
    });
};






export { unreal_server, clients };
const WebSocket = require('ws').Server;
const { createServer } = require("https");
const fs = require("fs");

var randomUUID = require("crypto").randomUUID;
var unreal_client = require("./unreal_client.js").unreal_client;
var LOG = require("../logging/logging.js").LOG;
var json_rpc_request = require("../json_rpc/json_rpc_request.js").json_rpc_request;
var json_rpc_response = require("../json_rpc/json_rpc_response.js").json_rpc_response;
var clients = require("../data/clients").clients;


const server = createServer({
            cert: fs.readFileSync('cert/cert.pem'),
            key: fs.readFileSync('cert/key.pem'),
});

const socket = new WebSocket({server});
server.listen(7456);



class unreal_server {

    constructor(){
        unreal_server_on_connection(socket, clients);
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
    console.error("Server started");
};

module.exports = {unreal_server};

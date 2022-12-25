import { WebSocket } from 'ws';
import {LOG} from '../logging/logging.js';
import {unreal_wc_client} from './unreal_wc_client.js';
import { clients } from './unreal_server.js';

class unreal_client {
    wc_client = null;

    constructor(client, uuid){
        this.client = client;
        this.uuid = uuid;
        on_get_message(this);
        on_close(this);
    }
}


function create_wc_client(data, unreal_client){

    LOG.UCLIENT("creating wc client",unreal_client.uuid);
    console.log(JSON.parse(data));
    unreal_client.wc_client = new unreal_wc_client(
        JSON.parse(data).params.bridge,
        unreal_client
    );
};

function wallet_connect_session_request(data, unreal_client){
    LOG.UCLIENT("wallet_connect_session_request",unreal_client.uuid);
    console.log(JSON.parse(data).params[0]);
    unreal_client.wc_client.send_message(JSON.parse(data).params[0]);
}


function eth_send_transaction(data, unreal_client){
    LOG.UCLIENT("eth_send_transaction", unreal_client.uuid);
    console.log(JSON.parse(data).params[0]);
    unreal_client.wc_client.send_message(JSON.parse(data).params[0]);
}

function wallet_connect_ack(data, unreal_client){
    LOG.UCLIENT("wallet_connect_ack", unreal_client.uuid);
    console.log(JSON.parse(data).params[0]);
    unreal_client.wc_client.send_message(JSON.parse(data).params[0]);
}

var methods = new Map([
    ['create_wc_client',               create_wc_client              ],
    ['wallet_connect_session_request', wallet_connect_session_request],
    [`eth_send_transaction`,           eth_send_transaction          ],
    [`wallet_connect_ack`,             wallet_connect_ack            ]
]);


function on_close(unreal_client){
    unreal_client.client.on('close', (event) => 
    {
        clients.delete(unreal_client.uuid);
        LOG.UCLIENT(`close`, unreal_client.uuid);
    });
}

function on_get_message(unreal_client){
    unreal_client.client.on('message', (data) => {
        try { 
            if(JSON.parse(`${data}`).id != unreal_client.uuid){
                throw new Error("uuid not correct");
            }
            methods.get(JSON.parse(`${data}`).method)(data, unreal_client); 
        }
        catch(e) { LOG.UCLIENT_ERROR(`${e.message} ${e.name}`, unreal_client.uuid); } 
    });
};


export {unreal_client};
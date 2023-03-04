var WebSocket = require("ws");
var LOG = require("../logging/logging.js").LOG;
var json_rpc_response = require("../json_rpc/json_rpc_response.js").json_rpc_response;


class unreal_wc_client{

    constructor(bridge, unreal_client){
        this.unreal_client = unreal_client;
        this.uuid = unreal_client.uuid;
        this.client = new WebSocket(generateWcConnectUrl(bridge));

        this.client.onopen = function() {
            LOG.WCLIENT("Wallet Connect - success connected", unreal_client.uuid);
            unreal_client.client.send(json_rpc_response({
                id: unreal_client.uuid,
                jsonrpc: "2.0",
                result: {method: "wallet_connect_socket_open"}
            }));
        };

        this.client.onclose = function(event) {
            if (event.wasClean) {
                LOG.WCLIENT("Connection closed cleanly", unreal_client.uuid);
                unreal_client.client.send(json_rpc_response({
                    id: unreal_client.uuid,
                    jsonrpc: "2.0",
                    result: {method: "wallet_connect_closed_cleanly"}
                }));
            } 
            else {
                LOG.WCLIENT_ERROR("Connection failure", unreal_client.uuid);
                unreal_client.client.send(json_rpc_response({
                    id: unreal_client.uuid,
                    jsonrpc: "2.0",
                    result: {method: "wallet_connect_connection_failure"}
                }));
            };
            LOG.WCLIENT(`code: ${event.code} reason: ${event.reason}`, unreal_client.uuid);
            this.IsConnected = false;
        };

        this.client.onmessage = function(event) {
            LOG.WCLIENT(`get data`, unreal_client.uuid);
            
            // console.log({
            //     id: unreal_client.uuid,
            //     jsonrpc: "2.0",
            //     result: {method: "wallet_connect_response", data: event.data} 
            // });
            try{
                console.log(JSON.parse(event.data));
                unreal_client.client.send(json_rpc_response({
                    id: unreal_client.uuid,
                    jsonrpc: "2.0",
                    result: {method: "wallet_connect_response", data: event.data} 
                }));
            }
            catch{
                console.log(event.data);
                unreal_client.client.send(event.data);
            }
            
        };
        
        this.client.onerror = function(error) {
            LOG.WCLIENT_ERROR(error.message, unreal_client.uuid);
            unreal_client.client.send(json_rpc_response({
                id: unreal_client.uuid,
                jsonrpc: "2.0",
                result: {method: "wallet_connect_error"}
            }));
        };
    }
    send_message(msg){
        try{
            this.client.send(JSON.stringify(msg));
        }
        catch(error){
            LOG.WCLIENT_ERROR(error.message, this.unreal_client.uuid);
        }
    }
};

function generateWcConnectUrl(bridge){
    return `wss://${bridge}.bridge.walletconnect.org`;
};

module.exports = {unreal_wc_client};
// EXAMPLE RESPONSE
//     id: 1,
//     jsonrpc: "2.0",
//     result: "bridge_socket_open"



function json_rpc_response(response){
    return JSON.stringify(response);
}



// var script = {
//     json_rpc_response
// }
module.exports = {json_rpc_response};


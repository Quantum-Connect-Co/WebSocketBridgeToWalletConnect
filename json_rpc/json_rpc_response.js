// EXAMPLE RESPONSE
//     id: 1,
//     jsonrpc: "2.0",
//     result: "bridge_socket_open"



function json_rpc_response(response){
    return JSON.stringify(response);
}

export {json_rpc_response};
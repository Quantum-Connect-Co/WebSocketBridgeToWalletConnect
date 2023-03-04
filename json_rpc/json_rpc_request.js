// EXAMPLE REQUEST
// {
//     "params": params
//     "id": 1
//     "jsonrpc": "2.0",
//     "method": "subtract",
// }

function json_rpc_request(request){
    return JSON.stringify(request);
}

// var script = {
//     json_rpc_request
// }
module.exports =  {json_rpc_request};

//   "params": params
//     "id": 1
//     "jsonrpc": "2.0",
//     "method": "subtract",
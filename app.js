var json_rpc_request = require("./json_rpc/json_rpc_request.js").json_rpc_request;
var json_rpc_response = require("./json_rpc/json_rpc_response.js").json_rpc_response;
var unreal_server = require("./units/unreal_server.js").unreal_server;
var rl = require("./console_commands/console_commands.js").rl;

var server = new unreal_server();


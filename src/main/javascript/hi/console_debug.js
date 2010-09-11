function ConsoleDebug(){
}

ConsoleDebug.prototype.receivedCommand = function (command){
	logger.log("<<<" + command);
}

ConsoleDebug.prototype.sendedCommand = function (command){
	logger.log(">>>" + command);
}

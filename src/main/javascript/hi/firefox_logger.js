function FireFoxLogger(){
	this.consoleService = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
}

FireFoxLogger.prototype.log = function (msg){
	this.consoleService.logStringMessage(msg);
}

var logger = new FireFoxLogger();
function FireFoxSocketConnection (msn) {
	this.msn = msn;
	this.transportService = Components.classes["@mozilla.org/network/socket-transport-service;1"].getService(Components.interfaces.nsISocketTransportService);
}

FireFoxSocketConnection.prototype.getSocket = function() {}

FireFoxSocketConnection.prototype.connect = function(host, port){
	this.transport = this.transportService.createTransport(null, 0, host, port, null);
	this.outputStream = this.transport.openOutputStream(0, 0, 0);
	this.stream = this.transport.openInputStream(0, 0, 0);
	this.inputStream = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance(Components.interfaces.nsIScriptableInputStream);
	this.inputStream.init(this.stream);
	var pump = Components.classes["@mozilla.org/network/input-stream-pump;1"].createInstance(Components.interfaces.nsIInputStreamPump);
	pump.init(this.stream, -1, -1, 0, 0, false);
	pump.asyncRead(this, null);
}

FireFoxSocketConnection.prototype.disconnect = function(){
}

FireFoxSocketConnection.prototype.send = function (cmd) {
	var suc = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
	suc.charset = "utf-8";
	var command = suc.ConvertFromUnicode(cmd);
	this.outputStream.write(command, command.length);
}

FireFoxSocketConnection.prototype.nextCommand = function () {
	return null;
}

FireFoxSocketConnection.prototype.onStartRequest = function (request, context) {
}

FireFoxSocketConnection.prototype.onStopRequest = function (request, context, result) {
}

FireFoxSocketConnection.prototype.onDataAvailable = function (request, context, inputStream, offset, count){
	var sis = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance (Components. interfaces. nsIScriptableInputStream);
	sis.init(inputStream);
	var str = sis.read(count);
	var suc = Components. classes ["@mozilla.org/intl/scriptableunicodeconverter"].createInstance (Components. interfaces. nsIScriptableUnicodeConverter);
	suc.charset = "utf-8";
	var product = suc.ConvertToUnicode(str);
	logger.log("<<<" + product);	
	this.msn.execute(product);
}

FireFoxSocketConnection.prototype.hasMoreCommands = function() {
	return false;
}

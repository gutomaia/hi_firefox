var hi = function () {
	var prefManager = null; //Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
	var initialized = false;
	var username = null;
	var password = null;	
	var msn = null;
	return {
		init : function () {
			
			//var pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.myextensionname.");
			//debugObj.mode = pref.getCharPref("DebugMode");

			//var autoRun = prefManager.getBoolPref("extensions.linktargetfinder.autorun");
			//if (autoRun) {
			//	linkTargetFinder.run();
			//}
			logger.log("HI_FIREFOX INITIATED");
		},
		boot : function () {
			//gBrowser.addEventListener("load", this.init, false);
		},		
		login: function() {
			this.msn = new Msnp8();
			this.msn.addCommandListener(new ConsoleDebug());
			this.msn.setAuthenticationHandle(new XHRTweener());
			this.msn.setConnectionHandle(new FireFoxSocketConnection(this.msn));
			this.msn.login("hellowgmn@hotmail.com","123456");
		}
	};
}();

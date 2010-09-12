var hi = function() {
	var prefs = null; 
	var initialized = false;
	var username = null;
	var password = null;
	var msn = null;
	return {
		init : function() {
			this.initialized = true;
			this.prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.net.guto.hellow.hi.firefox.");
			this.msn = new Msnp8();
			this.msn.setConnectionHandle(new FireFoxSocketConnection(this.msn));
			this.msn.setAuthenticationHandle(new XHRTweener());
			//this._contactList = new ContactList();
			this.msn.addCommandListener(new ConsoleDebug());
			//this.msn.addContactListener(this._contactList);
			//this.msn.addPresenceListener(this._contactList);
			logger.log("HI_FIREFOX INITIATED");
		},
		boot : function() {
			// gBrowser.addEventListener("load", this.init, false);
		},
		login : function() {
			if (!this._initialized)
				this.init();
			try {
				this.username = this.prefs.getCharPref("username");
				this.password = this.prefs.getCharPref("password");
			}catch(e){
			}
			if (this.username!=null && this.password !=null){
				this.msn.login(this.username, this.password);
			}else{
				this.notify("sem usuario","ahahah");
			}
			
			this.notify("teste","offline");
		},
		notify : function(title, msg) {
			try {
				Components.classes['@mozilla.org/alerts-service;1'].getService(
						Components.interfaces.nsIAlertsService)
						.showAlertNotification(null, title, msg, false, '',
								null)
			} catch (e) {
				logger.log("problema");
				var image = null
				var win = Components.classes['@mozilla.org/embedcomp/window-watcher;1']
						.getService(Components.interfaces.nsIWindowWatcher)
						.openWindow(null,
								'chrome://global/content/alerts/alert.xul',
								'_blank', 'chrome,titlebar=no,popup=yes', null)
				win.arguments = [ image, title, msg, false, '' ]
			}
		}
	};
}();
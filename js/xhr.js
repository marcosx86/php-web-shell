/**
 * XMLHttpRequest Wrapper Object
 * @author gabe@fijiwebdesign.com
 * @copyright www.fijiwebdesign.com
 */
phpshell.xhr = function(method, url, callback, async) {
	this._init(method, url, callback, async);
};
phpshell.xhr.prototype = {
	
	/**
	 * Output Logging function
	 */
	debug: function(str) {},
	
	/**
	 * Constructor
	 * @param {String} method
	 * @param {String} url
	 * @param {Function} callback
	 * @param {Bool} async
	 */
	_init: function(method, url, callback, async) {
		if (method && url && callback) {
			this.req(method, url, callback, async);	
		}
	},
	
	/**
	 * Holds IEs XHR ActiveX version
	 */
	ie_activex: false,
	
	/**
	 * Returns the platform dependent XHR Instance
	 */
	getXHR: function() {
		if (window.XMLHttpRequest) {
	        return new XMLHttpRequest();
	    } else if (window.ActiveXObject) {
	        if (ajaxchat.req.ie_activex) {
	            return new ActiveXObject(ajaxchat.req.ie_activex);
	        } else {
			    var axs = [
					"Msxml2.XMLHTTP.6.0", 
					"Msxml2.XMLHTTP.5.0", 
					"Msxml2.XMLHTTP.4.0", 
					"MSXML2.XMLHTTP.3.0", 
					"MSXML2.XMLHTTP",
					"Microsoft.XMLHTTP"
				];
	            for (var i = 0; i < axs.length ; i++) {
	                try {
	                    var xhr = new ActiveXObject(axs[i]);
	                    if (self.xhr) {
	                        ajaxchat.req.ie_activex = axs[i];
							return xhr;
	                        break;
	                    }
	                }
	                catch (e) {/* next */}
	            }
	        }
	    }
		return false;
	},
	
	/**
	 * Create XMLHttpRequest
	 * @param {String} method
	 * @param {String} url
	 * @param {Function} callback
	 * @param {Bool} async
	 */
	req: function(method, url, callback, async) {
		// closure
	    var self = this;
	    self.xhr = this.getXHR();
	    self.callback = callback;
		method = method.toUpperCase();
		
	    // handles state changes
	    self.xhr.onreadystatechange = function( ) {
			try {
				self.callback(self);
			} catch(e) {
				alert(e);
			}
	    }
	
	    self.xhr.open(method, url, (async === false ? false : true));
	
	    if (method == "POST") {
	        self.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	        self.xhr.setRequestHeader("Method", "POST " + url + " HTTP/1.1");
	    }
		
		this.debug('new '+method+': '+url);
		
	    return self.xhr;
	},
	
	/**
	 * Stringify Object Parameters
	 * @param {Object} parameters
	 */
	stringifyParams: function(data) {
		// stringify data
		var params = '';
		for(var x in data) {
			if (data.hasOwnProperty(x)) {
				params += '&'+this.encode(x)+'='+this.encode(data[x].toString());
			}
		}
		return params;
	},
	
	/**
	 * Send the XHR request
	 * @param {Mixed} Data. Can be an Object to strigify or String Data
	 */
	send: function (data) {
		if (typeof(data) != 'string') {
			data = this.stringifyParams(data);
		}
		this.debug('sending:'+data);
		this.xhr.send(data);
	},
	
	/**
	 * Encode a url parameter
	 * @param {String} str
	 */
	encode: function(str) {
		return encodeURIComponent ? encodeURIComponent(str) : escape(str);
	}
};

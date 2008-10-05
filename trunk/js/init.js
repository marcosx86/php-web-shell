/**
 * PHP Shell
 * @author gabe@fijiwebdesign.com
 * @copyright www.fijiwebdesign.com
 */

phpshell.client = {
	// initiate
	init: function() {
		window.onload = function() {
			var input = document.getElementById('cmd');
			input.onkeyup = function(e) {
				e = (!e) ? window.event : e;
	    		target = (!e.target) ? e.srcElement : e.target;
				// enter pressed, without shift
				if (!e.shiftKey && e.keyCode == 13) {
					phpshell.client.sendCommand(this.value);
					input.value = '';
				}
			};
		};
	},
	// send a command
	sendCommand: function(str) {
		if (str) {
			var php = document.getElementById('php').checked ? '1' : '0';
			var xhr = new phpshell.xhr;
			xhr.req('POST', 'exec.php', phpshell.client.receiveResp);
			xhr.send({
				cmd: str,
				php: php,
				time: new Date().getTime().toString()
			});
		}
	},
	// get resp
	receiveResp: function(req) {
		if (req.xhr.readyState == 4) {
			var resp = req.xhr.responseText;
			if (resp) {
				var results = document.getElementById('results');
				var result = document.createElement('div');
				results.appendChild(document.createTextNode(resp));
				results.appendChild(result);
				
				phpshell.client.autoScroll(results, 500);
			}
		}
		
	},
	
	autoScroll: function(el, offset) {
		if (!offset) offset = 100;
	    var y = el.scrollTop; // vertical scroll offset
	    var h = el.scrollHeight; // height of div
	    var c = el.clientHeight; // scroll bar height
	    if (h < (y + c + offset)) {
	        el.scrollTop += 1000; // scroll down
	    }
	}
};

// load
phpshell.client.init();

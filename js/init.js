/**
 * PHP Shell
 * @author gabe@fijiwebdesign.com
 * @copyright www.fijiwebdesign.com
 */

phpshell.client = {
	// initiate
	init: function() {
		window.onload = function() {
			
			// get dom references
			phpshell.client.cursor = document.getElementById('phpshell-cursor');
			phpshell.client.input = document.getElementById('phpshell-input');
			phpshell.client.hiddeninput = document.getElementById('phpshell-hinput');
			phpshell.client.shell = document.getElementById('phpshell-shell');
			phpshell.client.results = document.getElementById('phpshell-results');
			
			// activate shell if user clicks on it
			phpshell.client.shell.onclick = function(e) {
				e = e || window.event;
				phpshell.client.active = true;
				phpshell.client.setCursorBlink(true);
				phpshell.client.hiddeninput.focus();
				e.cancelBubble = true;
				if (e.stopPropagation) e.stopPropagation();
			};
			// if user clicks anywhere else, deactivate shell
			document.onclick = function() {
				phpshell.client.active = false;
				phpshell.client.setCursorBlink(false);
			};
			// catch all keypresses
			document.onkeyup = function(e) {
				if (!phpshell.client.active) {
					return;
				}
				e = e || window.event;
	    		target = e.srcElement || e.target;
				// enter pressed, without shift
				if (!e.shiftKey && e.keyCode == 13) {
					// get current input
					var input = phpshell.client.getInput();
					// add command to screen
					var prompt = phpshell.client.exec_as_php() ? 'php$ ' : '$ ';
					phpshell.client.addEntry(prompt+input);
					// execute command
					phpshell.client.sendCommand(input);
					phpshell.client.setInput('');
					phpshell.client.clearHiddenInput();
				} else {
					phpshell.client.addInput(phpshell.client.getHiddenInput());
					phpshell.client.clearHiddenInput();
				}
				if (e.keyCode == 8) {
					phpshell.client.removeLastCharInput();
					phpshell.client.removeLastCharHiddenInput();
				}
			};
		};
	},
	
	setInput: function(str) {
		phpshell.client.input.innerHTML = str;
	},
	
	getInput: function() {
		return phpshell.client.input.innerHTML;
	},
	
	addInput: function(str) {
		phpshell.client.input.innerHTML += str;
	},
	
	clearInput: function(str) {
		phpshell.client.input.innerHTML = '';
	},
	removeLastCharInput: function() {
		var input = phpshell.client.input;
		input.innerHTML = input.innerHTML ? input.innerHTML.replace(/.$/, '') : '';
	},
	
	getHiddenInput: function() {
		return phpshell.client.hiddeninput.value;
	},
	
	clearHiddenInput: function() {
		phpshell.client.hiddeninput.value = '';
	},
	
	removeLastCharHiddenInput: function() {
		var input = phpshell.client.hiddeninput;
		input.value = input.value ? input.value.replace(/.$/, '') : '';
	},
	
	setCursor: function(str) {
		phpshell.client.cursor.innerHTML = str;
	},
	
	setCursorBlink: function(blink) {
		clearInterval(phpshell.client.cursor_blink);
		var cursor = phpshell.client.cursor;
		if (blink) {
			cursor.style.visibility = 'visible';
			phpshell.client.cursor_blink = setInterval(function() {
				cursor.style.visibility = cursor.style.visibility == 'hidden' ? 'visible' : 'hidden';
			}, 500);
		} else {
			cursor.style.visibility = 'hidden';
		}
	},
	
	// check if we want to execute code as php
	exec_as_php: function() {
		return document.getElementById('php').checked;
	},	
	
	// send a command
	sendCommand: function(str) {
		if (str) {
			var php = phpshell.client.exec_as_php() ? '1' : '0';
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
				phpshell.client.addEntry(resp);
				phpshell.client.autoScroll(results, 500);
			}
		}
	},
	
	// add an etry
	addEntry: function(str) {
		var results = phpshell.client.results;
		var result = document.createElement('div');
		results.appendChild(document.createTextNode(str));
		results.appendChild(result);
	},
	
	// scroll down
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

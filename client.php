<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

		<title>PHP Shell</title>
		<script type="text/javascript">
			phpshell = {};
		</script>
		<script type="text/javascript" src="js/xhr.js"></script>
		<script type="text/javascript" src="js/init.js"></script>
		<link type="text/css" href="css/client.css" rel="stylesheet" />
	</head>
	<body>
		<div id="phpshell-shell">
			<pre id="phpshell-results"></pre>
			
			<span id="phpshell-prompt">$</span>
			<span id="phpshell-input"></span>
			<span id="phpshell-cursor">|</span>
		</div>
		PHP <input type="checkbox" id="phpshell-isphp" name="phpshell-isphp" />
		
		<input id="phpshell-hinput" style="position:absolute;top:-1000;"/>
	</body>
</html>

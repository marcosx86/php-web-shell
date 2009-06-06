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
			<div id="phpshell-results"></div>
			
			<span id="phpshell-input"></span>
			<span id="phpshell-cursor">|</span>
		</div>

		<form method="POST">
			PHP <input type="checkbox" name="php" id="php" />
		</form>
		<input id="phpshell-hinput" style="position:absolute;top:-1000;"/>
	</body>
</html>

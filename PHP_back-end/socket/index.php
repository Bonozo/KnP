<?php 
if(!isset($_POST['userid'])){
	?>
<script type="text/javascript">
    window.location = "sign_in.php";
    </script>
<?php
} 
?>
<!-- 
S83HSGGH5J-OPEN-100000001
S83HSGGH5J-100000001-200000001-Some Message

 -->
<!doctype html>
<html>
	<head>
	<meta charset='UTF-8' />
	<style>
input, textarea {
	border: 1px solid #CCC;
	margin: 0px;
	padding: 0px
}
#body {
	max-width: 800px;
	margin: auto
}
#log {
	width: 100%;
	height: 400px
}
#message {
	width: 100%;
	line-height: 20px
}
</style>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<script src="fancywebsocket.js"></script>
	<script>
		var Server;

		function log( text ) {
			$log = $('#log');
			//Add text to log
			$log.append(($log.val()?"\n":'')+text);
			//Autoscroll
			$log[0].scrollTop = $log[0].scrollHeight - $log[0].clientHeight;
		}

		function send( text ) {
			Server.send( 'message', text );
		}

		$(document).ready(function() {
			log('Connecting...');
			Server = new FancyWebSocket('ws://192.168.0.100:5000');	

			$('#message').keypress(function(e) {
				if ( e.keyCode == 13 && this.value ) {
					log( 'You: ' + this.value );
					var rcvr_id = $("#uids option:selected").val();
					send('S83HSGGH5JMSG<?php echo $_POST['userid']; ?>'+rcvr_id+ this.value );

					$(this).val('');
				}
			});

			//Let the user know we're connected
			Server.bind('open', function() {
				send('S83HSGGH5JOPN<?php echo $_POST['userid']; ?>');
				log( "Connected." );
			});

			//OH NOES! Disconnection occurred.
			Server.bind('close', function( data ) {
				log( "Disconnected." );
			});

			//Log any messages sent from server
			Server.bind('message', function( payload ) {
				var str = payload ;
				
				var new_check = "NEW";
				//str = str.substring(0,3);
				if (str.substring(0,3).localeCompare(new_check) == 0){
					$('#uids')
					 .append($("<option></option>")
					 .attr("value",str.substring(3))
					 .text(str.substring(3))); 
					
					//str = "HELLLOOOO";
					//alert('NEW');
				}
				
				log( str);//payload );
			});

			Server.connect();
		});
	</script>
	</head>

	<body>
    <div id='body'>
      <textarea id='log' name='log' readonly='readonly'></textarea>
      <br/>
      <input type='text' id='message' name='message' /><br>
		<br/>
        <select id="uids">
        
        </select>
        
    </div>
</body>
</html>
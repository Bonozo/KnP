function send()
{
	var send_window=Titanium.UI.createWindow({});
	var add_friend_view = Ti.UI.createView({
		backgroundColor:'#3e174f',
		width:'100%',
		height:'33%',
		top:'33%'
	});
	//view.add(add_friend_view);
	send_window.add(add_friend_view);
	var addfriend_label = Ti.UI.createLabel({
		text:'ADD FRIEND01 AS A FRIEND',
		font:{fontSize:'12dip'},
		color:'#abe6c7',
		top:'5%',
		left:'10%'
	});
	add_friend_view.add(addfriend_label);
	
	var sendmsg_textbox = Titanium.UI.createTextField({
		hintText:'Send a Message to Your Friend \n (Optional)',
		font:{fontSize:'13dip'},
		color:'#63c689',
		textAlign:'center',
		borderRadius:12,
		top:'20%',
		height:'55%',
		width:'90%',
		left:'5%',
		backgroundColor:'#173f25'
	});
	add_friend_view.add(sendmsg_textbox);
	
	var send_button = Ti.UI.createButton({
		title:'Send Request',
		color:'#5c2a64',
		textAlign:'center',
		
		bottom:'03%',
		height:'20%',
		right:'10%',
		backgroundImage:'/assets/button_small_UP.png'
	});
	add_friend_view.add(send_button);
	
	var cancel_button = Ti.UI.createButton({
		title:'Cancel',
		color:'#5c2a64',
		textAlign:'center',
		
		bottom:'03%',
		height:'20%',
		left:'10%',
		backgroundImage:'/assets/button_small_UP.png'
	});
	add_friend_view.add(cancel_button);	
	
	return send_window;
};
module.exports=send;

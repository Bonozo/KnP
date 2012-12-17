exports.GV = {
	server_url : 'http://justechinfo.com/kap_server/app_assets',
	images_path :'http://justechinfo.com/kap_server/app_assets/images' 
};

exports.GVUpdate = function(inValue, inName) {
	this.GV[inName] = inValue;
}; 
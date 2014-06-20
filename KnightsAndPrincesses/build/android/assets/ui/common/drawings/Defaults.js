function Defaults(gender, callback){
	var httpclientt = require('/ui/common/Functions/function');
	httpclientt.requestServer({
		success : function(e) {
			items_json = JSON.parse(this.responseText);
			if (items_json.Record != undefined) {
				record = items_json.Record;
				callback(record);
			}
		},
		method : 'GET',
		contentType : 'text/xml',
		url : "http://bonozo.com:8080/knp/get_avatar_default_appearence.php?gender=" + gender
	});
	return;
}
module.exports = Defaults;
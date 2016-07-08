/*********************************************************
*	main function
**********************************************************/
function main(type){
	var $util = Util();
	var $d = DataUtil($util);
	var clView = CommentListView($d, $util);
	var scView = SubjectCreateView($d, $util);
	var slView = SubjectListView($d, $util, clView, scView);
	var mlView = MessageListView($d, $util);

	if(type == "subject_list"){
		slView.init();		
	}else if(type == "comment_list"){
		if(location.href.indexOf("uuid") > 0){
			clView.init(true);
			var uuid = $util.getURLParameter("uuid");
			clView.render(uuid);
		}else{
			clView.init(false);
			var tid = $util.getURLParameter("tid");
			clView.render(tid);
		}
	}else if(type == "subject_create"){
		scView.init();
	}else if(type == "message_list"){
		mlView.init();
	}
}
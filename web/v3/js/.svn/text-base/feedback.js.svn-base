function submitFeedback(id){
	var content = $("#" + id).val();
	if(content.length == 0){
		alert("反馈内容不能为空!")
		return;
	}
	
    $.ajax({
        url: '/submitFeedback.do',
        async: false,
        type: 'post',
        data: "feedback=" + content,
        success: function(result) {
    		var err = "";
    		switch(result){
	    		case 0:
	    			err = "发表成功，感谢您的反馈!";
	    			break;
	    		case 1:
	    			err = "失败，反馈内容为空!"
	    			break;
	    		case 2:
	    			break;
	    		case 3:
	    			err = "发表失败!"
	    			break;
    		}
    		alert(err);
    		hideDlg();
        }
    
    });
}
/*********************************************************
**	SubjectCreateView function
**	创建主题界面
**********************************************************/
function SubjectCreateView($d, $util) {

	var self = {};
	var current_title;
	
	self.container = $(".subject_creator_layer");
	self.sendBtn   = $("#send_subject");
	self.subjectTitle = $("#subject_title");
	self.subjectBody = $("#subject_body");
	
	self.init = function(render){
		self.parentRender = function(){
			history.back();
		};
		
		$(window).resize(function(){
			var height = $(this).height() + "px";
			self.container.css({
				"height":height,
				"min-height":height				
			});
		});
		
		self.sendBtn.click(function(){
			var title = self.subjectTitle.val().trim();
			var body  = self.subjectBody.val().trim();
			if(title.length > 30){
				alert("对不起,您所发送的标题超长, 请您精简");
				return;
			}
			if(body.length > 2048){
				alert("对不起,您所发送的内容超长, 请您精简");
				return;
			}
			if(title.length == 0){
				alert("标题不能为空");
				return;
			}
			if(body.length == 0){
				alert("内容不能为空");
				return;
			}
			if($(this).hasClass("progress")){
				return;
			}
			$(this).addClass("progress");
			$d.addSubject({
				title: title,
				body:  body
			},function(data){
				self.sendBtn.removeClass("progress");
				self.parentRender(true);				
			});
		});
		//init container min height
		self.container.css("min-height", $(window).height() + "px");
	}
	self.render = function(){
		self.container.show();
	}	
	self.dealloc = function(animate, toContainer){
		if(animate){
			$util.animate(self.container, "right", toContainer);
		}else{
			self.container.hide();
		}
		self.subjectTitle.val("");
		self.subjectBody.val("");
	}

	return self;
}
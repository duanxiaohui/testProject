angular.module('365_calendar.bbs_manage', []).controller('BBSManageController', ['$scope', 'Topic', 'Reply', function($scope, Topic, Reply){
	$scope.Topic = Topic;
	$scope.Reply = Reply;
	$scope.viewType = 'topic';
}])
.service('Topic', function($http){
	var pageCount = 100;
	var pageNum = 0;
	var self = {
		all:[],
		getAllTopic: function(){
			var urls = ["/bbs365/admin/getAllTopics.do", "?pageNum=", pageNum++, "&pageCount=", pageCount];
			$http.get(urls.join(""))
				.success(function(data){
					if(data.state == "ok"){
						$.map(data.topics, function(o){
							o.createdTime = new Date(o.created).toLocaleString();
						});
						self.all = self.all.concat(data.topics);											
					}else{
						location.href = "/account/login.do?url=" + encodeURIComponent("/webapp/main/bbs/manage.html");
					}
			});
		},
		deleteTopic: function(topic){
			if(confirm("确定删除这条帖子么")){
				var topicIDs = JSON.stringify([topic.id]);
				var urls = ["/bbs365/admin/deleteTopics.do", "?topicIDs=", topicIDs];
				$http.get(urls.join(""))
					.success(function(data){
						if(data.state == "ok"){
							self.removeTopic(topic)
						}
				});				
			}
		},
		removeTopic: function(topic){
			for (var i = self.all.length - 1; i > -1; i--) {
				if (topic.id == self.all[i].id) {
					self.all.splice(i, 1);
				}
			}
		}
	};
	self.getAllTopic();
	return self;
})
.service('Reply', function($http){
	var pageCount = 100;
	var pageNum = 0;
	var self = {
		all:[],
		getAllReply: function(){
			var urls = ["/bbs365/admin/getAllReplies.do", "?pageNum=", pageNum++, "&pageCount=", pageCount];
			$http.get(urls.join(""))
				.success(function(data){
					if(data.state == "ok"){
						$.map(data.replyList, function(o){
							o.createdTime = new Date(o.created).toLocaleString();
						})
						self.all = self.all.concat(data.replyList);						
					}else{
						location.href = "/account/login.do?url=" + encodeURIComponent("/webapp/main/bbs/manage.html");
					}
			});
		},
		deleteReply: function(reply){
			if(confirm("确定删除这条回复么")){
				var replyIDs = JSON.stringify([reply.id]);
				var urls = ["/bbs365/admin/deleteReplies.do", "?replyIDs=", replyIDs];
				$http.get(urls.join(""))
					.success(function(data){
						if(data.state == "ok"){
							self.removeReply(reply)
						}
				});				
			}
		},
		removeReply: function(reply){
			for (var i = self.all.length - 1; i > -1; i--) {
				if (reply.id == self.all[i].id) {
					self.all.splice(i, 1);
				}
			}
		}
	}
	self.getAllReply();
	return self;
});
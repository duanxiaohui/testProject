function masg(){
    var $msgform;
    var msgTmpl = '<div class="add_msg_layer ui-shadow none" id="div_add_msg"><a class="close_btn js_close" href="javascript:;"></a><h2>编辑信息</h2><div class="add_msg_content"><form><dl class="e_clear"><dt>添加内容： </dt><dd><textarea name="schTitle"></textarea></dd> </dl><dl class="e_clear"><dt>添加动作： </dt><dd>\
		<ul class="add_msg_radio">\
			<li><label><input type="radio" name="rdo_action" value="1" checked="true"/><span>进入日历</span></label></li>\
			<li><label><input type="radio" name="rdo_action" value="2"/><span>打开连接</span></label></li>\
			<li><label><input type="radio" name="rdo_action" value="3"/><span>无</span></label></li></ul></dd></dl><dl class="e_clear add_msg_url none"><dt>关联URL： </dt><dd><input type="text" size="50"/></dd></dl></form></div><div class="add_schedule_bottom"><a class="giveup_schedule_btn js_close" href="javascript:;">放弃</a><a class="create_schedule_btn js_save" href="javascript:;">发送</a></div></div>';
    $msgform = $(msgTmpl).appendTo('body');
    
    $msgform.textarea = $msgform.find('textarea');
    $msgform.btnSave = $msgform.find('a.js_save');
    $msgform.btnclose = $msgform.find('a.js_close');
    $msgform.inputradio = $msgform.find(':radio');
    $msgform.msgurl = $msgform.find('input[type="text"]');
    $msgform.urlbox = $msgform.find('dl.add_msg_url');
    $msgform.draggable({
        containment: 'body',
        handle: 'h2',
        cancel: 'a',
        cursor: "move",
        opacity: 0.85
    });
    
    $msgform.find('a.js_close').click(function(){
        $msgform.hide('fade');
    });
    $msgform.inputradio.click(function(){
        $msgform.urlbox[$(this).val() == 2 ? 'removeClass' : 'addClass']('none');
    })
    
    $msgform.btnSave.loading();
    $msgform.btnSave.click(function(evt){
        if (evt.isImmediatePropagationStopped() || $msgform.btnSave.loading('is')) {
            return false;
        }
        evt.preventDefault();
        var postData = {
            calendarId: $msgform.cldID,
            content: $.trim($msgform.textarea.val()),
            type: $msgform.inputradio.filter(":checked").val(),
            extend: $.trim($msgform.msgurl.val())
        };
        if ($msgform.textarea.val().length == 0) {
            $.alert("请输入发送消息的内容", {
                buttons: {
                    '确定': function(){
                        $(this).dialog("close");
                        $msgform.textarea.focus();
                    }
                }
            });
            return;
        }
        if ($msgform.inputradio.filter(":checked").val() == 2) {
        	if($.trim($msgform.msgurl.val()).length == 0) {
        		$.alert("请输入需要打开的链接地址", {
        			buttons: {
        				'确定': function(){
        					$(this).dialog("close");
        					$msgform.msgurl.focus();
        				}
        			}
        		});
        		return;
        	}
        	if(!CheckUrl($.trim($msgform.msgurl.val()))){
        		return;
        	}
        }
        $msgform.btnSave.loading('start');
        $.ajax({
            url: '/message/send.do',
            type: 'post',
            dataType: 'json',
            data: postData,
            success: function(data){
                $msgform.btnSave.loading('end');
                $.alert("信息发送成功", {
                    buttons: {
                        '确定': function(){
                            $(this).dialog("close");
                            $msgform.hide("fade",400,function(){
								$msgform.remove();
							});
                        }
                    }
                });
            },
            error: function(data){
                $msgform.btnSave.loading('end');
            }
        });
    });
    return $msgform;
}

function CheckUrl(str) {
    var RegUrl = new RegExp();
    RegUrl.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");
    if (!RegUrl.test(str)) {
        $.alert("请输入正确的链接地址", {
                buttons: {
                    '确定': function(){
                        $(this).dialog("close");
                        $("#div_add_msg").find('input[type="text"]').focus();
                    }
                }
            });
        return false;
    }
    return true;
}
$.widget('dd.msgCreator', {
    options: {
        onOpen: $.noop
    },
    _create: function(){
        var self = this, $elem = $(this.element), opt = this.options;
        var $tar = opt.target, cldID = $tar.attr('cldID');
        $elem.click(function(evt){
			self.$msgform = masg();
			self.$msgform.cldID = cldID;
            self.$msgform.show('fade').position({of:'body'});
        });
    }
});

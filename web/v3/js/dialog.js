function showDialog(dlg)
{
	$('#dlgIFrame').load(function(){
		$('.window_big').hide();
		$('#dialogShadow').show();
		var dlg_id = '#'+dlg+'_dlg';
		var left = Math.ceil(($(window).width() - $(dlg_id).width()) / 2);
		$(dlg_id).css("left", left).show();
	});
	$('#dlgIFrame').prop("src", 'http://www.365rili.com/clientwnl/wnl.html');
}

function showFAQ()
{
	$('#dlgIFrame').load(function(){
		$('#dialogShadow').show();
		var dlg_id = '#wnl_dlg';
		var left = Math.ceil(($(window).width() - $(dlg_id).width()) / 2);
		$(dlg_id).css("left", left).show();
	});
	$('#dlgIFrame').prop("src",'http://sub.365rili.com/subscribe/365help.html');
}

function hideDlg()
{
	$('#dialogShadow').hide();
	$('.window_big').hide();
	$('.wide_window_big').hide();
}

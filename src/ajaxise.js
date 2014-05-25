$("a").click(function() {
	var navTo = $(this).attr('href');
	var doAjax = $(this).attr('ajax');
	if(doAjax == true || doAjax == null) {
		e.preventDefault();
		var req = $.ajax({

		});
	}
});

(function ( $ ) {
	$.fn.fitText = function(scale, obj) {
		var scale = scale || 1;
		var o = $.extend({},
		{
			min: 1, //As long as your font size isn't over 9000!!!
			max: 9001,
			//This is if you want to keep the margin and padding the same.
			/*
				d = default which means this wont be a drawcall.
				The compressor applies
			*/
			padding: 0,
			margin: 0,
			/*
				window: scale to window - default
				parent: scale to parent.
				selector: choose a custom selector to scale to.
			*/
			scaleTo: 'window'
		},obj);
				
		return this.each(function() {	
			var thisObj = $(this);			
					
			var max = o.max; var min = o.min;
			var oPadding = o.padding;
			var oMargin = o.margin;
			var scaleTo = o.scaleTo;		
												
			var fitTextE = function () {	
				var selector = "";
				if (scaleTo == "window") {
					selector = $(window).width();
				}
				if (scaleTo == "parent") {
					selector = thisObj.parent().width();
				}
				if (scaleTo != "parent" && scaleTo != "window") {
					selector = $(scaleTo).width();
				}
			
				var size = selector / (10 * scale);				
				
				if (size > max) {	size = max;}
				if (size < min) {	size = min;}
								
				thisObj.css({
					'font-size': size + 'px'
				});
				
				if (oPadding != 0) {
					var paddingSize = selector / (10 * oPadding);
					thisObj.css({
						'padding' : paddingSize + 'px'
					});					
				}
				if (oMargin != 0) {
					var marginSize = selector / (10 * oMargin);
					thisObj.css({
						'margin' : marginSize + 'px'
					});
				}
			}
			
			fitTextE();
			$(window).on('resize', fitTextE);
			 
		});
	}
}( jQuery ));
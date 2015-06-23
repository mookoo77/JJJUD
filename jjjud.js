(function($){
	$.fn.JJJud = function(options){
		// This is the easiest way to have default options.
        var settings = $.extend($.fn.JJJud.defaults, options);

			$.fn.JJJud.cutWord = function(elm){
				var elmHeightRows = 0;

				var whileHeight = this.getHeight();
				var counter = 0;
				while (whileHeight >= this.getMaxHeight()) {
					counter++;
					var lengthWord = this.getText().length;
				    var cutString = this.getText().substring(0, lengthWord - 6) + "...";
				    this.the_selected.html(cutString);
					whileHeight = this.getHeight();
				}
			}

			$.fn.JJJud.getText = function(){
				return this.the_selected.text();
			}

			$.fn.JJJud.getHeight = function(){
				return this.the_selected.height();
			}

			$.fn.JJJud.getFontSize = function(){
				return parseInt(this.the_selected.css("font-size"));
			}

			$.fn.JJJud.getMaxHeight = function(){
				var tempText = this.getText();
				this.the_selected.text("aa");
				var lineheight = this.getHeight();
				this.the_selected.text(tempText);
				return (settings["max_rows"]+ 1) * lineheight;
			}

		return this.each(function(a,e) {
			// init(this,settings);
			if ((typeof options == 'object') || (options == undefined)) {
				$.fn.JJJud.the_selected = $(e);
			}

	        // Call our cutWord function.
	        var JJJud = $.fn.JJJud.cutWord();
		});
	};

	$.fn.JJJud.defaults = {
            "max_rows": 1 // Max row
      };
})(jQuery);
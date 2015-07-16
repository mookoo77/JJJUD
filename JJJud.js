(function($){
	var settings = "";
	$.fn.JJJud = function(options){
		// This is the easiest way to have default options.
        settings = $.extend( {}, $.fn.JJJud.defaults, options );
        var loop_on_cut = $.fn.JJJud.loop;

		return this.each(function(a,e) {
			// init(this,settings);
			if ((typeof options == 'object') || (options == undefined)) {
				$.fn.JJJud.the_selected = $(e);
			}

	        // Call our cutWord function.
	        if(settings["elmVisibleOnLoop"] != ""){
	        	// $.fn.JJJud.setLoop();
	        	// loop_on_cut = setInterval(function(){
	        	// 	if($(settings["elmVisibleOnLoop"]).is(":visible")){
		        // 		$.proxy($.fn.JJJud.cutWord(), this);
		        // 		clearInterval(loop_on_cut);
		        // 	}
	        	// }, 1000);

	        	// loop_on_cut = setInterval(function(){
	        	// 	if($(settings["elmVisibleOnLoop"]).is(":visible")){
		        // 		$.proxy($.fn.JJJud.cutWord(), this);
		        // 		clearInterval(loop_on_cut);
		        // 	}
	        	// }, 1000);
				// elm = loop_on_cut;
	        	// elm = setInterval(function(){
	        	// 	$.proxy($.fn.JJJud.cutWord,elm);
	        	// 	clearInterval(loop_on_cut);
	        	// }, 1000);
				var elm = $.fn.JJJud;
				console.log("settings:",elm)
	        	loop_on_cut =  setInterval($.proxy(function () {
	        			if($(settings["elmVisibleOnLoop"]).is(":visible")){
				            $.fn.JJJud.cutWord();
				            clearInterval(loop_on_cut);
				        }
			        }, elm), 1000);

		    }else{
		    	$.fn.JJJud.cutWord();
		    }

		});
	};

	$.fn.JJJud.defaults = {
            "max_rows": 2, // Max row
            "onComplete": $.noop,
            "elmVisibleOnLoop": ""
    };

    $.fn.JJJud.cutWord = function(elm){
		var elmHeightRows = 0;
		var whileHeight = this.getHeight();
		var counter = 0;
		// var textLength = $(this).html().length;
		var lengthWordRow = this.getText().length;
		var lineHeight = this.getLineHeight();
        var lineCount =  (this.getHeight() / lineHeight)-1;
        //var tempVerticalPadding = 0;
        if(lineCount == 0){
        	lineCount = 1;
        }
        var textNumberNeed = ((lengthWordRow*settings["max_rows"])/lineCount);
        var textNeed = this.getText().substr(0,parseInt(textNumberNeed));

        // console.log("need",textNeed);
        if(this.getMaxHeight() != 0 || this.getMaxHeight() != ""){
        var offset = this.countVowelToneMarks(textNeed);
        var textOffset = this.getText().substr(0,parseInt(textNumberNeed) + offset);

        // console.log("offset",textOffset);
        console.log("this.the_selected:",this.the_selected)
        this.the_selected.html(textOffset);

        this.the_selected.html(textNeed);

            //console.log(lineHeight);
			while (whileHeight >= this.getMaxHeight() && counter < 100) {
				counter++;
				var lengthWord = this.getText().length;
			    var cutString = this.getText().substring(0, lengthWord - (counter == 1 ? 3 : 6)) + "...";
			    this.the_selected.html(cutString);
				whileHeight = this.getHeight();
                //console.log("cut","ss");
			}
            if (counter == 100) {
                console.error("JJJud Calculate Error");
            }
			settings["onComplete"](this.the_selected);
        }
	}
    $.fn.JJJud.countVowelToneMarks = function(inputText) {
        var textCount = new Array(/ิ/g,/ี/g,/ึ/g,/ื/g,/ุ/g,/ู/g,/่/g,/้/g,/๊/g,/๋/g,/ั/g,/์/g,/็/g);
        var sumCount = 0;
        for (var i in textCount) {
            sumCount += (inputText.match(textCount[i])||[]).length;
        }
        return sumCount;
    }

	$.fn.JJJud.getText = function(){
		return this.the_selected.text();
	}

	// $.fn.JJJud.setLoopInteval = function(){
	// 	var _this = $(this);
	// 	// console.log("this:",$(this))
	// 	if($(settings["elmVisibleOnLoop"]).is(":visible")){
//       		$(this).cutWord();
//       		clearInterval(loop_on_cut);
//       	}
	// }

	$.fn.JJJud.getHeight = function(){
        //var padding = parseInt(this.the_selected.css("padding-top")) + parseInt(this.the_selected.css("padding-bottom"));
        //console.log(padding);
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
		return (settings["max_rows"] * lineheight) + (lineheight/2);
	}
	 $.fn.JJJud.getLineHeight = function(){
        var tempText = this.getText();
        this.the_selected.text("0");
        var lineheight = this.getHeight();
        this.the_selected.text(tempText);
        return lineheight;
    }
})(jQuery);

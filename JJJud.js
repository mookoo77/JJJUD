(function($){
    $.JJJud = function(el, options){
        // To avoid scope issues, use '_this' instead of 'this'
        // to reference this class from internal events and functions.
        var _this = this;

        // Access to jQuery and DOM versions of element
        _this.$el = $(el);
        _this.el = el;

        _this.initials = {
        	waitElement: null
        }

        $.extend(_this, _this.initials);

        // Add a reverse reference to the DOM object
        _this.$el.data("JJJud", _this);

        _this.countVowelToneMarks = function(inputText) {
	        var textCount = new Array(/ิ/g,/ี/g,/ึ/g,/ื/g,/ุ/g,/ู/g,/่/g,/้/g,/๊/g,/๋/g,/ั/g,/์/g,/็/g);
	        var sumCount = 0;
	        for (var i in textCount) {
	            sumCount += (inputText.match(textCount[i])||[]).length;
	        }
	        return sumCount;
	    }

		_this.getText = function(){
			var _this = this;

			return _this.$el.text();
		}

		_this.getHeight = function(){
			var _this = this;

			return _this.$el.height();
		}

		_this.getFontSize = function(){
			var _this = this;

			return parseInt(_this.$el.css("font-size"));
		}

		_this.getMaxHeight = function(){

			var _this = this;

			var tempText = _this.getText();
			_this.$el.text("aa");
			var lineheight = _this.getHeight();
			_this.$el.text(tempText);
			return (_this.settings["max_rows"] * lineheight) + (lineheight/2);
		}
		 _this.getLineHeight = function(){

		 	var _this = this;

	        var tempText = _this.getText();
	        _this.$el.text("0");
	        var lineheight = _this.getHeight();
	        _this.$el.text(tempText);
	        return lineheight;
	    }

        _this.cutWord = function(){

	    	var _this = this;

			var elmHeightRows = 0;
			var whileHeight = _this.getHeight();
			var counter = 0;
			// var textLength = $(this).html().length;
			var lengthWordRow = _this.getText().length;
			var lineHeight = _this.getLineHeight();
	        var lineCount =  (_this.getHeight() / lineHeight)-1;
	        //var tempVerticalPadding = 0;
	        if(lineCount == 0){
	        	lineCount = 1;
	        }
	        var textNumberNeed = ((lengthWordRow * _this.settings["max_rows"]) / lineCount);
	        var textNeed = _this.getText().substr(0,parseInt(textNumberNeed));

	        // console.log("need",textNeed);
	        if(_this.getMaxHeight() != 0 || _this.getMaxHeight() != ""){
	        var offset = _this.countVowelToneMarks(textNeed);
	        var textOffset = _this.getText().substr(0,parseInt(textNumberNeed) + offset);

	        // console.log("offset",textOffset);
	        _this.$el.html(textOffset);

	        _this.$el.html(textNeed);

	            //console.log(lineHeight);
				while (whileHeight >= _this.getMaxHeight() && counter < 100) {
					counter++;
					var lengthWord = _this.getText().length;
				    var cutString = _this.getText().substring(0, lengthWord - (counter == 1 ? 3 : 6)) + "...";
				    _this.$el.html(cutString);
					whileHeight = _this.getHeight();
	                //console.log("cut","ss");
				}
	            if (counter == 100) {
	                console.error("JJJud Calculate Error");
	            }
				_this.settings["onComplete"](_this.$el);
	        }

		}

		_this.waitElementToShow = function(){
			var _this = this;

			_this.waitElement = setInterval(function(){
								if($(_this.settings["waitElement"]).is(":visible")){
									_this.cutWord();
									clearInterval(_this.waitElement);
								}
						},_this.settings["waitTime"]);
		}

        _this.init = function(){

        	var _this = this;
            _this.settings = $.extend({},$.JJJud.defaultOptions, options);
            // Put your initialization code here
            if (_this.settings["waitElement"] != "") {
            	_this.waitElementToShow();
	        }else{
	        	_this.cutWord();
	        }
        };

        // Run initializer
        _this.init();
    };

    $.JJJud.defaultOptions = {
            "max_rows": 2, // Max row
            "onComplete": $.noop,
            "waitElement": "",
            "waitTime": 200
    };

    $.fn.JJJud = function(options){
        return this.each(function(){
            (new $.JJJud(this, options));
        });
    };

})(jQuery);



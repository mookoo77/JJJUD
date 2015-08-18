# JJJUD

Example #1:

Select your max_rows for replace dot.
$(element).JJJud({
	max_rows: 3
});

Example #2:

Select your max_rows and waitElement for wait element visible then replace dot.
$(element).JJJud({
	max_rows: 3,
	waitElement: element
});

Example #3:
Select onComplete for use callback when process complete
$(element).JJJud({
	max_rows: 3,
	onComplete: function(elm){

	}
});
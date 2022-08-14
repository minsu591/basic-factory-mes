$(document).ready(function() {

	$('#nonOpCode').click(function(e) {
		console.log('클릭');
		e.preventDefault();

		$('#findnonOpCodeModal').modal("show");
	});

	$('#mchnCode').click(function(e) {
		console.log('클릭');
		e.preventDefault();

		$('#findMchnNameModal').modal("show");
	});
	
	
	
});
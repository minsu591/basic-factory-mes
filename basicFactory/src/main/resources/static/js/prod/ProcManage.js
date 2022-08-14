$(document).ready(function() {

	$('#productname').click(function(e) {
		console.log('클릭');
		e.preventDefault();

		$('#findproductModal').modal("show");
	});

});






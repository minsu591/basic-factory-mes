$(document).ready(function(){
	
	


$('#vendor').click(function(e){
console.log('클릭');
e.preventDefault();

$('#findvendorModal').modal("show");
});
	
	
$('#productname').click(function(e){
	console.log('클릭');
	e.preventDefault();

	$('#findproductModal').modal("show");
	});


	
	
});
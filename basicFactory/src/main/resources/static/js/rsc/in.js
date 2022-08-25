$("document").ready(function(){
	//체크박스 체크유무
	 let allCheck = $("#allCheck");
	 $("#allCheck").click("change",function(){
	     if($("#allCheck").is(":checked")){
	         $("#inspCompTable tbody input:checkbox").prop("checked",true);
	     }else{
	         $("#inspCompTable tbody input:checkbox").prop("checked",false);
	     }
	 })

		$("input[name=chk]").click(function(){
				let total = $("input[name=chk]").length;
				let checked = $("input[name=chk]:checked").length;
				if((total != checked)){
					$("#allCheck").prop("checked",false);
				}else{
					$("#allCheck").prop("checked", true);
				} 
		})

})
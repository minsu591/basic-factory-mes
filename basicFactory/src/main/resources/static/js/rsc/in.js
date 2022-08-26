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


//조회버튼 실행
$("#search").click(function(){
	let rscCdCode = $("#rsccode").val();
	let rscInspDate = $("#rscInspDate").val();
	$.ajax({
		url : "inTable",
		method : "GET",
		dataType: "text",
		data: {
				rscCdCode: rscCdCode,
				rscInspDate: rscInspDate
		},
		success: function(data){
			$("#intable").replaceWith(data);
		}
	})
	$("#rsccode").val(null);
	$("#rscname").val(null);
	$("#rscInspDate").val(null);
})

$("#subBtn").click(function(){
	let checked = $("input[name=chk]:checked").length;
	if (checked == 0){
		alert("체크된 항목이 없습니다.")
	}
		let param = [];
		let info = [];
		let rowData = new Array();
		let checkbox = $("input[name=chk]:checked");
		
		// 체크된 체크박스 값을 가져온다
		checkbox.each(function(i) {

			// checkbox.parent() : checkbox의 부모는 <td>이다.
			// checkbox.parent().parent() : <td>의 부모이므로 <tr>이다.
			let tr = checkbox.parent().parent().eq(i);
			let td = tr.children();
			
			// 체크된 row의 모든 값을 배열에 담는다.
			rowData.push(tr.text());
			
			// td.eq(0)은 체크박스 이므로  td.eq(1)의 값부터 가져온다.
			let rscInspCode = td.eq(1).text();
			let rscCdCode = td.eq(3).text();
			let rscPassVol = td.eq(5).text();
			
			info = {
				rscInspCode : rscInspCode,
				rscCdCode : rscCdCode,
				rscPassVol : rscPassVol
			}

			param.push(info);
			console.log(info);
		});

		console.log(param);


		$.ajax({
			url : "inInsert",
			method : "POST",
			headers : {"content-type":"application/json"},
			data : JSON.stringify(param),
			dataType : "text",
			error: function (error, status, msg) {
				alert("상태코드 " + status + "에러메시지" + msg);
		},
		success : function(){
			alert("등록처리완료");
			location.href="/rsc/in";
		}
		})
		
})
})
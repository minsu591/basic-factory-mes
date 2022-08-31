$("document").ready(function () {
  $("#faultyCode").click(function (e) {
    e.preventDefault();
    //불량코드조회
    findFaultyCode();
    $("#findFaultyModal").modal("show");
  });

  //불량코드 검색 버튼 클릭 이벤트
  $("#findFaultyBtn").click(function () {
    let faultyCode = $("#faultyCdCode").val();

    $.ajax({
      url: `findFltyCode`,
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      data: {
        faultyCode: faultyCode,
      },
      error: function (error, status, msg) {
        alert("상태코드 " + status + "에러메시지" + msg);
      },
      success: function (data) {
        console.log("검색조건 데이타 _ >" + data);
        let index = 0;
        $("#findFaultytbody tr").remove();
        for (obj of data) {
          index += 1;
          makeFaultyCodeRow(obj, index);
        }
      },
    });
  });

  //불량코드 검색 테이블 클릭이벤트
  $("#findFaultyTable").on("click", "tr", function () {
    let faultyCode = $(this).find("td:eq(1)").text();
    let faultyName = $(this).find("td:eq(2)").text();

    $("#faultyCode").val(faultyCode);
    $("#faultyName").val(faultyName);

    $("#findFaultyModal").modal("hide");
  });
  
  //code input 내용이 사라지면 Name 내용도 사라지는 이벤트
	$("#faultyCode").on("change",function(){
	    if($("#faultyCode").val()==''){
	        $("#faultyName").val('');
	    }
	});
  
  
});
function findFaultyCode() {
  $.ajax({
    url: "findFltyCode",
    method: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    error: function (error, status, msg) {
      alert("상태코드 " + status + "에러메시지" + msg);
    },
    success: function (data) {
      $("#findFaultytbody tr").remove();
      let index = 0;
      for (obj of data) {
        index += 1;
        makeFaultyCodeRow(obj, index);
      }
    },
  });
}
//불량코드조회 행생성
function makeFaultyCodeRow(obj, index) {
  let node = `<tr>
              <td>${index}</td>
              <td>${obj.faultyCdCode}</td>
              <td>${obj.faultyName}</td>
              <td>${obj.faultyRemk}</td>
            </tr>`;
  $("#findFaultytbody").append(node);
}

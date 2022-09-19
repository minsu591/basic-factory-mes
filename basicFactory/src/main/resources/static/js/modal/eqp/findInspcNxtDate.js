$("document").ready(function () {
  //점검대상조회 모달창
  $("#inspcTargetBtn").on("click", function (e) {
    $("#findNxtDateModal").modal("show");
    findNxtDate();
  });

  let clfyList = ['','임시점검','정기점검','수리'];

  function findNxtDate() {
    $.ajax({
      url: "findNxtDate",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      error: function (error, status, msg) {
        alert("상태코드 " + status + "에러메시지" + msg);
      },
      success: function (data) {
        $("#findNxtDateTbody tr").remove();
        for (obj of data) {
          modalMakeRow(obj);
        }
      }
    });
  }

  //점검대상 조회 모달 내에 데이터 출력
  function modalMakeRow(obj) {
    let node = `<tr>
                  <td><input type="checkbox"></td>
                  <td>${obj.mchnCode}</td>
                  <td>${obj.mchnName}</td>
                  <td>${obj.inspcNxtDate}</td>
                </tr>`
    $("#findNxtDateTbody").append(node);
  }

  //tr 클릭 이벤트
  $("#findNxtDateTbody").on("click", "tr", function () {
    //테이블 상단 공통 요소 삽입
    let mchnCode = $(this).find("td:eq(1)").text();
    let mchnName = $(this).find("td:eq(2)").text();
    let inspcNxtDate = $(this).find("td:last").text();

    let node = `<tr>
                    <td class="cantModifyTd"><input type="checkbox" name="chk"></td>
                    <td class="cantModifyTd"></td>
                    <td>${mchnCode}</td>
                    <td class="cantModifyTd">${mchnName}</td>
                    <td><input type="date"></td>
                    <td><input type="date"></td>`;
            node += makeSelectForClfy('');
            node += `<td></td>
                    <td class="empId curPo"></td>
                    <td></td>
                </tr>`;

    if ($("#inspctbody tr").length != 0) {
      $("#findNxtDateModal").modal("hide");
      Swal.fire({
        icon: "question",
        title: "수정한 정보가 모두 사라집니다.",
        text: "삭제하고 진행하겠습니까?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "확인",
        cancelButtonText: "취소",
        closeOnClickOutside: false,
      }).then((ans) =>{
        if(ans.isConfirmed){
          $("#inspctbody tr").remove();
          $("#inspctbody").append(node);
        }else{
            return;
        }
      });
        
    } else {
      $("#inspctbody").append(node);
      $("#findNxtDateModal").modal("hide");
    }
  });

  function makeSelectForClfy(clfy){
    let node = '<td class="canModifyTd"><select class="curPo">';
    for(let i =0; i<clfyList.length;i++){
      if(clfy == clfyList[i]){
        node += '<option value="'+clfyList[i]+'"selected>'+clfyList[i]+'</option>';
      }else{
        node += '<option value="'+clfyList[i]+'">'+clfyList[i]+'</option>';
      }
    }
    node += '</select></td>';
    return node;
  }

});
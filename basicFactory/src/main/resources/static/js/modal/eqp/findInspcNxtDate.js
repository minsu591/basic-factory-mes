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
                  <td><input type="checkbox" name="chk"></td>
                  <td>${obj.mchnCode}</td>
                  <td>${obj.mchnName}</td>
                  <td>${obj.mchnInspcNxtDate}</td>
                  <td>${obj.mchnStts}</td>
                </tr>`
    $("#findNxtDateTbody").append(node);
  }

  //tr 클릭 이벤트
  // $("#findNxtDateTbody").on("click", "tr", function () {
  //   //테이블 상단 공통 요소 삽입
  //   let mchnCode = $(this).find("td:eq(1)").text();
  //   let mchnName = $(this).find("td:eq(2)").text();
  //   let mchnInspcNxtDate = $(this).find("td:last").text();

  //   let node = `<tr>
  //                   <td class="cantModifyTd"><input type="checkbox" name="chk"></td>
  //                   <td class="cantModifyTd"></td>
  //                   <td>${mchnCode}</td>
  //                   <td class="cantModifyTd">${mchnName}</td>
  //                   <td><input type="date"></td>
  //                   <td><input type="date"></td>`;
  //   node += makeSelectForClfy('');
  //   node += `<td></td>
  //                   <td class="empId curPo"></td>
  //                   <td></td>
  //               </tr>`;

  //   if ($("#inspctbody tr").length != 0) {
  //     $("#findNxtDateModal").modal("hide");
  //     Swal.fire({
  //       icon: "question",
  //       title: "수정한 정보가 모두 사라집니다.",
  //       text: "삭제하고 진행하겠습니까?",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "확인",
  //       cancelButtonText: "취소",
  //       closeOnClickOutside: false,
  //     }).then((ans) => {
  //       if (ans.isConfirmed) {
  //         $("#inspctbody tr").remove();
  //         $("#inspctbody").append(node);
  //       } else {
  //         return;
  //       }
  //     });

  //   } else {
  //     $("#inspctbody").append(node);
  //     $("#findNxtDateModal").modal("hide");
  //   }
  // });

  $("#nxtDaddBtn").click(function () {
    let param = [];
    let info = [];
    let rowData = new Array();
    let checkbox = $("input[name='chk']:checked");

    // 체크된 체크박스 값을 가져온다
    checkbox.each(function (i) {
      // checkbox.parent() : checkbox의 부모는 <td>이다.
      // checkbox.parent().parent() : <td>의 부모이므로 <tr>이다.
      let tr = checkbox.parent().parent().eq(i);
      let td = tr.children();
      // 체크된 row의 모든 값을 배열에 담는다.
      rowData.push(tr.text());
      // td.eq(0)은 체크박스 이므로  td.eq(1)의 값부터 가져온다.
      let mchnCode = td.eq(1).text();
      let mchnName = td.eq(2).text();
      let mchnInspcNxtDate = td.eq(3).text();

      info = {
        mchnCode: mchnCode,
        mchnName : mchnName,
        mchnInspcNxtDate : mchnInspcNxtDate
      }
      param.push(info);
    });


    $("#findNxtDateModal").modal("hide");

    if(info.length == 0) {
      Swal.fire({
        icon: "warning",
        title: "데이터를 선택해 주세요.",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "확인"
      })
      return;
    }

    if($("#inspctbody tr").length != 0){
      Swal.fire({
        icon: "warning",
        title: "수정한 정보가 모두 사라집니다.",
        text: "삭제하고 진행하겠습니까?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "확인",
        cancelButtonText: "취소",
        closeOnClickOutside: false
      }).then((result) =>{
        if(result.isConfirmed){
          $("#inspctbody tr").remove();
          for(obj of param){
            inspcInsertList(obj);
          }
        }else{
         return;
        }
       })
    }else{
      $("#inspctbody tr").remove();
      for(obj of param){
        inspcInsertList(obj);
      }
    }
  })

  function inspcInsertList(obj) {
    let node = `<tr>
                    <td class="cantModifyTd"><input type="checkbox" name="chk"></td>
                    <td class="cantModifyTd"></td>
                    <td>${obj.mchnCode}</td>
                    <td class="cantModifyTd">${obj.mchnName}</td>
                    <td><input type="date" value="${obj.mchnInspcNxtDate}"></td>
                    <td><input type="date"></td>`;
            node += makeSelectForClfy('');
            node += `<td></td>
                    <td class="empId curPo"></td>
                    <td></td>
                </tr>`;
    $("#inspctbody").append(node);
  }

  function makeSelectForClfy(clfy){
    let node = '<td class="cantModifyTd"><select class="curPo" >';  //disabled
    for(let i =0; i<clfyList.length; i++){
      if(i == 2){
        node += '<option value="'+clfyList[2]+'"selected>'+clfyList[2]+'</option>';
      } else{
        node += '<option value="'+clfyList[i]+'">'+clfyList[i]+'</option>';
      }
    }
    node += '</select></td>';
    return node;
  }

  //체크박스 체크유무
  $("#allCheck").click("change", function () {
    if ($("#allCheck").is(":checked")) {
      $("#findNxtDateTbody input:checkbox[name='chk']").prop("checked", true);
    } else {
      $("#findNxtDateTbody input:checkbox[name='chk']").prop("checked", false);
    }
  });
  $("#findNxtDateTbody").on("change", "input:checkbox[name='chk']", function () {
    let total = $("input[name=chk]").length;
    let checked = $("input[name=chk]:checked").length;
    if (total != checked) {
      $("#allCheck").prop("checked", false);
    } else {
      $("#allCheck").prop("checked", true);
    }
  });


});
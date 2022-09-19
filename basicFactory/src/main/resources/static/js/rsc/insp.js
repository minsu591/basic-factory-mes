$(document).ready(function () {
  let tdinfo;

      //기본 날짜 오늘 지정
      let date = new Date();
      date = date.toISOString().slice(0, 10);

  //체크박스 체크유무
  $("#allCheck").click("change", function () {
    if ($("#allCheck").is(":checked")) {
      $("#InsertTable tbody input:checkbox").prop("checked", true);
    } else {
      $("#InsertTable tbody input:checkbox").prop("checked", false);
    }
  })

  $("#InsertTable").on("change", "input[name=chk]", function () {
    let total = $("input[name=chk]").length;
    let checked = $("input[name=chk]:checked").length;
    if ((total != checked)) {
      $("#allCheck").prop("checked", false);
    } else {
      $("#allCheck").prop("checked", true);
    }
  })

  //추가버튼
  $("#addRowBtn").click(function () {
    detailTableMakeRow();
  });

  //삭제 버튼
  $("#delRowBtn").click(function () {
    if ($("input[type='checkbox']:checked").length === 0) {
      deleteWarning();
      return;
    }
    $("input[name='chk']:checked").each(function (k, val) {
      $(this).parent().parent().remove();
    });
    $("#allCheck").prop("checked", false);
  });

  //초기화버튼
  $("#resetBtn").click(function () {
    $("#outTable tr").remove();
    $("#allCheck").prop("checked", false);
  })

    //div 내 input 클릭 시 border지우기
    $(".card").on("click", "td.nullpoint", function(){
        $(this).removeClass("nullpoint");
    })
    

  //추가버튼 행만들기
  function detailTableMakeRow() {
    let node = `<tr>
<td id="chk-css"><input type="checkbox" name="chk"></td>
<td><input type="text" class="rscOrderCode"></td>
<td><input type="text" class="rscInspCode" disabled></td>
<td><input type="date" class="rscInspDate" value="${date}" disabled></td>
<td><input type="text" class="rsccode" disabled></td>
<td><input type="text" class="rscname" disabled></td>
<td><input type="text" class="unit" disabled></td>
<td><input type="text" class="unarvVol" disabled></td>
<td><input type="text" class="inspVol" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" disabled></td>
<td><input type="text" class="inferVol" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" disabled></td>
<td><input type="text" class="passVol" disabled></td>
<td><input type="text" class="empId" disabled></td>
<td><input type="text" class="remk"disabled></td>
</tr>`;
    $("#InsertTable tbody").append(node);
  }

  //통과 수량 계산
  $("#InsertTable").on("change", ".inspVol", function () {
    tdinfo = $(this);
    let inspVol = Number(tdinfo.val());
    let inferVol = Number(tdinfo.parent().next().find(".inferVol").val());
    let unarvVol = Number(tdinfo.parent().prev().find(".unarvVol").val());
    if(unarvVol < inspVol){
      unarvVolWarning();
      tdinfo.val(null);
    }else{
      if (inspVol < 0) {
        minusWarning();
        tdinfo.val(null);
        return;
      } else if (inspVol < inferVol) {
        passVolWarning();
        tdinfo.val(null);
        return;
      } else {
        let passVol = inspVol - inferVol;
        tdinfo
          .parent()
          .next().next()
          .find(".passVol")
          .val(passVol);
      }
    }
  });

  $("#InsertTable").on("change", ".inferVol", function () {
    tdinfo = $(this);
    let inspVol = Number(tdinfo.parent().prev().find(".inspVol").val());
    let inferVol = Number(tdinfo.val());
    if (inferVol < 0) {
      minusWarning();
      tdinfo.val(null);
      return;
    } else if (inspVol < inferVol) {
      passVolWarning();
      tdinfo.val(null);
      return;
    } else {
      let passVol = inspVol - inferVol;
      tdinfo
        .parent()
        .next()
        .find(".passVol")
        .val(passVol);

    }
  });


  //등록버튼
  $("#subBtn").click(function () {
    let checked = $("input[name='chk']:checked").length;
    if (checked == 0) {
      submitWarning();
      return;
    }

    let inspList = [];
    let notnull = [1,3,4,8,9,11];
    let outTable = $("#InsertTable").find("tbody tr");

    for (obj of outTable) {
      let rscOrderCode = $(obj).children().eq(1).find(".rscOrderCode").val();
      let rscInspCode = $(obj).children().eq(2).find(".rscInspCode").val();
      let rscInspDate = $(obj).children().eq(3).find(".rscInspDate").val();
      let rscCdCode = $(obj).children().eq(4).find(".rsccode").val();
      let rscInspVol = $(obj).children().eq(8).find(".inspVol").val();
      let rscInferVol = $(obj).children().eq(9).find(".inferVol").val();
      let rscpassVol = $(obj).children().eq(10).find(".passVol").val();
      let empId = $(obj).children().eq(11).find(".empId").val();
      let rscInspRemk = $(obj).children().eq(12).find(".remk").val();
      let rscOrderDtlNo = $(obj).find(".rscOrderDtlNo").val();

      if (!rscInspCode) {
        rscInspCode = null;
      }
      if (!rscInspRemk){
        rscInspRemk = null;
      }

      if (!rscOrderCode) {
        $(obj).children().eq(1).addClass("nullpoint");
        Swal.fire({
          icon: "warning", 
          title: "입력되지 않은 값이 있습니다.", 
          html: "발주코드는<br/>기본 입력사항입니다.",
          confirmButtonText: "확인",
        });
        return;
      } else if(!rscInspDate || !rscCdCode || !rscInspVol || !rscInferVol || !empId){
        for (idx of notnull){
          if (!($(obj).children().eq(idx).find("input").val())) {
            $(obj).children().eq(idx).addClass("nullpoint");
          }
        }
        Swal.fire({
          icon: "warning", 
          title: "입력되지 않은 값이 있습니다.", 
          html: "자재코드, 검사수량, 불량수량, 검사자는<br/>기본 입력사항입니다.",
          confirmButtonText: "확인",
        });
        return;
      }else {
        //리스트에 저장
        let insp = {
          rscInspCode,
          rscOrderCode,
          rscOrderDtlNo,
          rscCdCode,
          rscInspDate,
          rscInspVol,
          rscInferVol,
          rscInspRemk,
          empId
        };
        inspList.push(insp);
        console.log(insp);

      }
    }

    if(!inspList){
      indexWarining();
      return;
    }else{
      $.ajax({
        url: "inspInAndUp",
        method: "POST",
        headers: { "content-type": "application/json" },
        dataType: "text",
        data: JSON.stringify(inspList),
        error: function (error, status, msg) {
          Swal.fire({
            icon: "warning", 
            title: "에러 발생",
            text : `상태코드 ${status}, 에러메시지 ${msg}`,
            confirmButtonText: "확인"
          })
        },
        success: function (result) {
          console.log(result);
          if (inspList.length == result) {
            submitComplete();
            $("#outTable tr").remove();
          }
        }
  
      })
      
    }
  });


  function submitComplete() {
    Swal.fire({
      title: "저장 되었습니다.",
      icon: "success",
      confirmButtonText: "확인",
    });
  }
  
  function submitWarning() {
    Swal.fire({
      icon: "warning", // Alert 타입
      title: "선택된 항목이 없습니다.", // Alert 제목
      confirmButtonText: "확인",
    })
  }

  function deleteWarning() {
    Swal.fire({
      icon: "warning",
      title: "삭제할 항목을 선택하세요.",
      confirmButtonText: "확인"
    })
  }

  function minusWarning() {
    Swal.fire({
      icon: "warning",
      title: "0이상의 숫자만 입력할 수 있습니다.",
      confirmButtonText: "확인"
    })
  }

  function unarvVolWarning() {
    Swal.fire({
      icon: "warning",
      title: "검사수량은 미도착수량을 넘을 수 없습니다.",
      confirmButtonText: "확인"
    })
  }

  function passVolWarning() {
    Swal.fire({
      icon: "warning", 
      title: "불량수량은 검사수량을 넘을 수 없습니다.", 
      confirmButtonText: "확인"
    })
  }

  function indexWarining() {
    Swal.fire({
      icon: "warning", 
      title: "입력된 정보가 없습니다.",
      confirmButtonText: "확인"
    })
  }

})
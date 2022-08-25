$("document").ready(function () {
  $("#closeBtn").click(function () {
    $("#workInsertModal").modal("hide");
  });

  //설비상태 클릭 이벤트
  $("#mchnStatus").on("click", "button", function () {
    let instProdNo;
    //let instProdNo = $("#instProdNo").val();
    $("#procManageTable tbody tr").each(function () {
      if ($(this).find("td:eq(0)").children().prop("checked")) {
        instProdNo = $(this).find("input[type=hidden]").val();
      }
    })
    let statusMchnName = $(this).text();
    findProcess(instProdNo, statusMchnName);
  })

  function findProcess(instProdNo, MchnName) {

    $.ajax({
      url: `findprocess/${instProdNo}`,
      method: "GET",
      dataType: "json",
      success: function (data) {
        console.log(data);
        $("#workStateTable tbody td").remove();
        for (obj of data) {
          if (`${obj.mchnName}` == MchnName) {
            workStateTableMakeRow(obj);
          }
        }
      },
    });
  }

  function workStateTableMakeRow(obj) {

    $("#procManageTable tr").each(function () {
      //console.log("each문 들어옴");
      if ($(this).find("td:eq(0)").children().prop("checked")) {
        modalprodName($(this));
      }
    });
    $("#procCdName").val(obj.procCdName);
    $("#mchnName").val(obj.mchnName);
    $("#processNo").val(obj.processNo);
    $("#workStateTable tr:eq(1)").append(`<td>${obj.inDtlVol}</td>`);
    $("#workStateTable tr:eq(2)").append(`<td>${obj.virResult}</td>`);
    $("#workStateTable tr:eq(3)").append(`<td>${obj.totalProdVol}</td>`);
    $("#workStateTable tr:eq(4)").append(`<td>${obj.fltyVol}</td>`);
    $("#workStateTable tr:eq(5)").append(`<td>${obj.achieRate}%</td>`);

  }



  $("#workInsertTable").on("click", "button", function () {
    console.log($(this).text());
    let mchnName = $(this).parent().parent().find("td:eq(2)").text();
    let processNo = $(this).parent().parent().find("input:hidden[name=processNo]").val();
    $("#workStateTable tr td").remove();
    if ($(this).text() == "비가동") {
      alert("비가동입니다.");
    } else {

      $("#procManageTable tr").each(function () {
        //console.log("each문 들어옴");
        if ($(this).find("td:eq(0)").children().prop("checked")) {
          console.log($(this));
          let instProdNo = $(this).find("input[type=hidden]").val();
          console.log("instProdNo->" + instProdNo);
          findProcess(instProdNo, mchnName);
        }
      });
      //modalDataInsert($(this));

      $("#workInsertModal").modal("show");
    }
  });

  //모달창 제품명 입력
  function modalprodName(data) {
    let prodName = data.find("td:eq(5)").text();
    $("#workStateTable tr:eq(0)").append(`<td>${prodName}</td>`);
  }


  let fltyCnt = 0;
  $("#fltyCnt").val(fltyCnt);
  //불량증가
  $("#fltyUp").click(function () {
    fltyCnt += 1;
    $("#fltyCnt").val(fltyCnt);
  });

  //불량감소
  $("#fltyDown").click(function () {
    if (fltyCnt == 0) {
      $("#fltyCnt").val(0);
    } else {
      fltyCtn -= 1;
      $("#fltyCnt").val(fltyCnt);
    }
  });


  //불량 클릭 버튼 이벤트
  $("#addFlty").click(function () {
    let fltyVol = $("#workStateTable tr:eq(4) td");//불량량

    if (parseInt(fltyVol.text()) == 0) {
      console.log(fltyCnt);
      fltyVol.html(fltyCnt);
      let prodVol = $("#workStateTable tr:eq(3) td"); //실적량
      let result = (parseInt(prodVol.text()) - parseInt(fltyVol.text()));
      console.log("실적량 ->" + prodVol.text() + "불량량->" + fltyVol.text());
      console.log("결과->" + result);
      prodVol.html(result);
      let resultFltyVol = fltyVol.text();
      let totalProdVol = prodVol.text();
      let processNo = $("#processNo").val();//작업번호
      let procCdName = $("#procCdName").val();//공정명

      //불량량 업데이트문 실행하고 다시 실적량 업데이트 실행함
      $.ajax({
        url: `updatefltyvol`,
        method: "PUT",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({
          totalProdVol: totalProdVol,
          processNo: processNo,
          fltyVol: resultFltyVol,
        }),
        success: function (data) {
          console.log("update sucess");
        },
      });
      fltyCnt = 0;
      $("#fltyCnt").val(fltyCnt);
    } else {

    }
  });


  $("#saveBtn").click(function () {
    console.log('saveBtn');
  });



}); //document end
let work;
//작업시작 시간 입력
function startWork() {
  //완료여부 

  let completionStatus;
  $("#workInsertTable tbody tr").each(function () {
    let mchnName = $("#mchnName").val();
    let tablemchnname = $(this).find("td:eq(2)").text();
    //console.log("시작눌러서 머신네임은?" + mchnName);
    console.log("찾은 테이블에있는 머신이름?" + tablemchnname);
    if (mchnName == tablemchnname) {
      console.log("이름비교이프문들어옴")
      completionStatus = $(this).find("input[name=completionStatus]").val();
    }
  });
  console.log('컴플리션스테이터스->' + completionStatus);
  // if (completionStatus == 'y') {
  //   alert('이미 완료된 작업입니다.');
  //   return;
  // }

  if ($("#empid").val() == '') {
    alert('작업자 입력하세요')
    return;
  } else {
    $("#empid").prop("readonly", true);
    $("#instDate").prop("readonly", true);
  }
  if ($("#sHours").val() == '' && $("#sMinutes").val() == '') {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    $("#sHours").val(hours).prop("readonly", true);
    $("#sMinutes").val(minutes).prop("readonly", true);
    updateMchnStts();
    work = setInterval(startinterval, 100);
  } else {
    alert('이미 시작했어요')
  }

}
//설비상태 업데이트
function updateMchnStts() {
  let mchnCode;
  $("#workInsertTable tbody tr").each(function () {
    let mchnName = $("#mchnName").val();
    if (mchnName == $(this).find("td:eq(2)").text()) {
      mchnCode = $(this).find("input:hidden[name=mchnCode]").val();
    }
  });
  console.log('진행중업데이트 ->' + mchnCode);

  $.ajax({
    url: `updatemchnstts`,
    method: "PUT",
    dataType: "json",
    contentType: "application/json;charset=utf-8",
    data: JSON.stringify({
      mchnCode: mchnCode
    }),
    success: function (data) {
      alert('진행중업데이트');
    },
  });
}


//작업종료 시간 입력
function endWork() {
  if ($("#eHours").val() == '' && $("#eMinutes").val() == '') {
    //인터벌 종료
    clearInterval(work);
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    $("#eHours").val(hours).prop("readonly", true);
    $("#eMinutes").val(minutes).prop("readonly", true);
    let mchnCode;
    $("#workInsertTable tbody tr").each(function () {
      let mchnName = $("#mchnName").val();
      if (mchnName == $(this).find("td:eq(2)").text()) {
        mchnCode = $(this).find("input:hidden[name=mchnCode]").val();
      }
    });
    console.log('진행전으로 업데이트 ->' + mchnCode);
    //진행전으로 업데이트
    $.ajax({
      url: `updatemchnsttsdefault`,
      method: "PUT",
      dataType: "json",
      contentType: "application/json;charset=utf-8",
      data: JSON.stringify({
        mchnCode: mchnCode
      }),
      success: function (data) {
        alert('진행전으로 업데이트');
      },
    });

    //완료여부 업데이트
    let processNo = $("#processNo").val();
    console.log("완려여부 업데이트 프로세스번호->" + processNo);
    $.ajax({
      url: `updateproccheck`,
      method: "PUT",
      dataType: "json",
      contentType: "application/json;charset=utf-8",
      data: JSON.stringify({
        processNo: processNo
      }),
      success: function (data) {
        alert('완료 업데이트');
      },
    });



  } else {
    alert('이미 종료했어요')
  }
}
let num = 0;

function startinterval() {
  num += 1;
  let inDtlVol = $("#workStateTable tr:eq(1) td"); //입고량
  let prodVol = $("#workStateTable tr:eq(3) td");//실적량 
  let rate = $("#workStateTable tr:eq(5) td") //달성률
  let processNo = $("#processNo").val()//작업번호
  let procCdName = $("#procCdName").val();//공정명
  let totalProdVol = 1 + parseInt(prodVol.text());
  console.log("프로세스번호!!!!"+processNo);
  //console.log(prodVol.text());
  rate.html(Math.ceil(((totalProdVol / parseInt(inDtlVol.text())) * 100)) + '%');
  prodVol.html(num);
  console.log(totalProdVol);
  //실적량 업데이트
  $.ajax({
    url: `updateprodvol`,
    method: "PUT",
    dataType: "json",
    contentType: "application/json;charset=utf-8",
    data: JSON.stringify({
      processNo: processNo,
      totalProdVol: totalProdVol,
      procCdName: procCdName
    }),
    success: function (data) {
      console.log("update sucess");
    },
  });

  if (num == parseInt(inDtlVol.text())) {
    console.log("종료");
    endWork();
  }
}

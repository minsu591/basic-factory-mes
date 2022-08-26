$(document).ready(function () {
  findProcManage();

  $("#procManageTable").on("click", "tr", function () {

    if ($(this).find("td:eq(0)").children().prop("checked")) {
      $("#mchnStatus div").remove();
      let instDate = $(this).find("td:eq(2)").text();
      let instNo = $(this).find("td:eq(3)").text();
      let prodName = $(this).find("td:eq(5)").text();
      let prodCode = $(this).find("td:eq(4)").text();
      let instProdNo = $(this).find("input[type=hidden]").val();

      //모달창 안에 데이터 넣기
      // $("#instDate").val(instDate);
      $("#instNo").val(instNo);
      //$("#instProdNo").val(instProdNo);
      let check = false;
      $.ajax({
        url: `findprocess/${instProdNo}`,
        method: "GET",
        dataType: "json",
        async: false, //동기로 처리
        success: function (data) {
          console.log(data);
          check = true;
          $("#workInsertTable tbody tr").remove();
          let index = 0;
          for (obj of data) {
            index += 1;
            workinsertTableMakeRow(obj);
          }
        },
      });
      if (check == true) {
        $.ajax({
          url: `selectmchn/${prodCode}`,
          method: "GET",
          dataType: "json",
          success: function (data) {
            let index = 0;

            for (obj of data) {
              index += 1;
              workinsertTableLastChildMakeRow(obj, index);
              mchnStatusMakeRow(obj);
            }

          },
        });
      }

    } else {
      $("#workInsertTable tbody tr").remove();
      console.log("unchecked");
    }
  });
});

function findProcManage() {
  $.ajax({
    url: `findprocmanage`,
    method: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      $("#procManageTable tbody tr").remove();
      let index = 0;
      for (obj of data) {
        index += 1;
        procManageMakeRow(obj, index);
      }
    },
  });
}

function procManageMakeRow(obj, index) {
  let node = `<tr>
                <td><input type="checkbox"></td>
                <td>${index}</td>
                <td>${obj.workDate}</td>
                <td>${obj.instNo}</td>
                <td>${obj.finPrdCdCode}</td>
                <td>${obj.finPrdCdName}</td>
                <td>${obj.instProdIndicaVol}</td>
                <td>${obj.virResult}</td>
                <td>${obj.nonResult}</td>
                <td>${obj.workScope}</td>
                <input type="hidden" name="instProdNo" value="${obj.instProdNo}">
              </tr>`;

  $("#procManageTable tbody").append(node);
}

function workinsertTableMakeRow(obj) {
  let node = `<tr> 
              <td>${obj.processOrder}</td>
              <td>${obj.procCdName}</td>
              <td>${obj.mchnName}</td>
              <td>${obj.inDtlVol}</td>
              <td>${obj.virResult}</td>
              <td>${obj.nonResult}</td>
              <td>${obj.totalProdVol}</td>
              <td>${obj.fltyVol}</td>
              <input type="hidden" name="processNo" value="${obj.processNo}">
              <input type="hidden" name="mchnCode" value="${obj.mchnCode}">
              <input type="hidden" name="completionStatus" value="${obj.completionStatus}">
              </tr>`;
  $("#workInsertTable tbody").append(node);
}


function workinsertTableLastChildMakeRow(obj, index) {
  if (index == 1) {
    //console.log(`${obj.mchnStts}`);
    let node = `<td><button type="button" class="btn btn-primary">${obj.mchnStts}</button></td>`;
    let tr = $("#workInsertTable tbody tr:eq(0)").append(node);
  } else if (index == 2) {
    let node = `<td><button type="button" class="btn btn-primary">${obj.mchnStts}</button></td>`;
    let tr = $("#workInsertTable tbody tr:eq(1)").append(node);
  } else if (index == 3) {
    let node = `<td><button type="button" class="btn btn-primary">${obj.mchnStts}</button></td>`;
    let tr = $("#workInsertTable tbody tr:eq(2)").append(node);
  } else if (index == 4) {
    let node = `<td><button type="button" class="btn btn-primary">${obj.mchnStts}</button></td>`;
    let tr = $("#workInsertTable tbody tr:eq(3)").append(node);
  }
}

//모달창 데이터 입력
function mchnStatusMakeRow(obj) {
  let node = `
            <div>
              <button type="button" class="btn btn-outline-primary m-r-20 m-t-15">${obj.mchnName}</button>
              <div class="btn btn-outline-primary m-t-15">${obj.mchnStts}</div>
            </div>`;

  $("#mchnStatus").append(node);
}
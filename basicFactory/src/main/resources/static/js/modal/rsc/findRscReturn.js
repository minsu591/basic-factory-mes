$(document).ready(function(){
 
 //조회버튼 모달 팝업
 $("#search").click(function (e) {
  e.preventDefault();
  findRscReturnList();
  $("#modalAllCheck").prop("checked", false);
  $("#findRscReturnModal").modal("show");

})

//체크박스 체크유무
$("#modalAllCheck").click("change", function () {
  if ($("#modalAllCheck").is(":checked")) {
    $("#findRscReturnTable tbody input:checkbox").prop("checked", true);
  } else {
    $("#findRscReturnTable tbodddy input:checkbox").prop("checked", false);
  }
})

$("#findRscReturnTable").on("change", "input[name=chkModal]", function () {
  let total = $("input[name=chkModal]").length;
  let checked = $("input[name=chkModal]:checked").length;
  if ((total != checked)) {
    $("#modalAllCheck").prop("checked", false);
  } else {
    $("#modalAllCheck").prop("checked", true);
  }
})


function findRscReturnList() {
  let rscReturnCode = $("#rscReturnCode").val();
  let rscReturnDate = $("#rscReturnDate").val();
  $.ajax({
    url: "findRscReturn",
    method: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    data: {
     rscReturnCode: rscReturnCode,
     rscReturnDate: rscReturnDate
    },
    error: function (error, status, msg) {
      alert("상태코드 " + status + "에러메시지" + msg);
    },
    success: function (data) {
      console.log(data);
      $("#findRscReturntbody tr").remove();
      let index = 0;
      for (obj of data) {
        index += 1;
        makeRscReturnRow(obj, index);
      }
    },
  });
}

//반품목록 행생성
function makeRscReturnRow(obj, index) {
  let node = `<tr>
            <td><input type="checkbox" name="chkModal"></td>
            <td>${obj.rscReturnCode}</td>
            <td>${obj.rscReturnDate}</td>
            <td>${obj.vendCdNm}</td>
            <td>${obj.rscCdName}</td>
            <td>${obj.rscReturnVol}</td>
          </tr>`;
  $("#findRscReturntbody").append(node);
}

//이미 출력되어있는 행의 출고코드 목록
let outCodeList = [];

//출고목록 등록버튼 체크박스에 체크된것만
$("#addBtn").click(function () {
  let outCodeListTemp = [];
  let checked = $("input[name='chkModal']:checked").length;
  if (checked == 0) {
    submitWarning();
    return;
  }

  let param = [];
  let info = [];
  let rowData = new Array();
  let checkbox = $("input[name='chkModal']:checked");
  console.log(checkbox);

  let flag = true;

  // 체크된 체크박스 값을 가져온다
  checkbox.each(function (i) {
    // checkbox.parent() : checkbox의 부모는 <td>이다.
    // checkbox.parent().parent() : <td>의 부모이므로 <tr>이다.
    let tr = checkbox.parent().parent().eq(i);
    let td = tr.children();
    // 체크된 row의 모든 값을 배열에 담는다.
    rowData.push(tr.text());
    // td.eq(0)은 체크박스 이므로  td.eq(1)의 값부터 가져온다.
    let rscRtnCode = td.eq(1).text();
    //중복값체크
    outCodeListTemp.push(rscRtnCode);
    if (outCodeList.indexOf(rscRtnCode) >= 0) {
      flag = false;
      return;
    }

    info = {
     rscReturnCode: rscRtnCode
    }

    param.push(info);
    console.log(info);
    console.log(rowData);
  });

  if (flag == false) {
    $("#modalAllCheck").prop("checked", false);
    $("input[name='chkModal']:checked").prop("checked", false);
    overlapWarning();
    return;
  }
  //...연산자 : 값을 풀어넣음
  outCodeList.push(...outCodeListTemp);

  console.log(param);

  $.ajax({
    url: "returnUpList",
    method: "POST",
    headers: { "content-type": "application/json" },
    data: JSON.stringify(param),
    dataType: "json",
    error: function (error, status, msg) {
      alert("상태코드 " + status + "에러메시지" + msg);
    },
    success: function (data) {
      for (obj of data) {
        outListInsert(obj);
      }
      $("#findRscReturnModal").modal("hide");
    }
  })

})

function outListInsert(obj) {
  let node = `<tr>
<td><input type="checkbox" name="chk"></td>
<td><input type="text" value="${obj.rscOutCode}" name="outcode" readonly></td>
<td><input type="date" value="${obj.rscOutDate}"></td>
<td><input type="text" class="rsccode" value="${obj.rscCdCode}" readonly></td>
<td><input type="text" class="rscname" value="${obj.rscCdName}" readonly></td>
<td><input type="text" class="rsclotno" value="${obj.rscLotNo}"></td>
<td><input type="text" value="${obj.rscStock}" readonly></td>
<td><input type="text" class="outVol" value="${obj.rscOutVol}"></td>
<td><input type="text" class="vendor" value="${obj.vendCdCode}"></td>
<td><input type="text" value="${obj.vendCdNm}" readonly></td>
<td><input type="text" value="${obj.rscOutResn}"></td>
<td><input type="text" value="${obj.empId}"></td>
</tr>`;
  $("#InsertTable tbody").append(node);
}


function overlapWarning() {
 Swal.fire({
   icon: "warning", // Alert 타입
   title: "중복된 항목이 있습니다.", // Alert 제목
   confirmButtonText: "확인",
 })
}
})
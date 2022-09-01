$(document).ready(function () {

  //수정이 되는 list 정의
  let modifyList = [];
  let addList = [];
  let delList = [];
  //수정할 테이블
  let table = $("fltyPrcsTable");
  //td 수정을 적용할 인덱스
  let avArr = [];
  //notNull인 td
  let notNullList = [2, 3, 4, 5, 6];
  //primary키인 index
  let priKeyIdx = 1;

  //수정
  table.find("tbody").on("click", "td", function(e){
    e.stopPropagation();
    let col = (this).index() -1;  //input값 -1???
    let flag = false;
    let tdInfo = $(this);
    let defaultVal;
  });


  //행추가
  $("#addBtn").on("click",function(){
    let node = `<tr name="addTr">
                  <td><input type="checkbox" name="chk"></td>`;
    if ($("#allCheck").is(":checked")){
      node = `<tr>
                <td><input type="checkbox" name="chk" checked ></td>`;
    }
    node +=`<td></td>
            <td class=""></td>
            <td class=""></td>
            <td></td>
            <td><input type="date"></td>
            <td class=""></td>
            <td></td>
        </tr>`;
    $("#fltyPrcstbody").append(node);
  });

  //삭제


  //생산 불량 목록 tr 클릭
  $("#procFltytbody").on("click", "tr", function(e){
    console.log("hi");
    let procPerfomNo = $(this).find("td:first").text();
    let finCode = $(this).find("td:eq(2)").text();
    let finCdName = $(this).find("td:eq(3)").text();
    let procName = $(this).find("td:eq(5)").text();
    let mchnName = $(this).find("td:eq(6)").text();

    $("#processPerfomNo").val(procPerfomNo);
    $("#productcode").val(finCode);
    $("#productname").val(finCdName);
    $("#proccdname").val(procName);
    $("#mchnname").val(mchnName);
    
    if($("#fltyPrcstbody tr").length != 0){
      if(confirm('현재 수정한 내용이 모두 삭제됩니다.')==true){
          fltyPrcsmodifyList = [];
          fltyPrcsaddList = [];
          fltyPrcsdelList = [];
          $("#fltyPrcstbody tr").remove();
      }else{
          return false;
      }
    }
  });

});
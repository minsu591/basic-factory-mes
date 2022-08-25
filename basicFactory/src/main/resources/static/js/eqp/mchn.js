$(document).ready(function () {

  mchnList();

  function mchnList(){
    $.ajax({
      url : "mchnAllList",
      method : "get",
      contentType : "application/json;charset=utf-8",
      dataType : "json",
      success : function(data) {
        console.log(data);
        for (obj of data) {
          mchnMakeRow(obj);
          console.log(obj);
        }
      },
      error : function(error) {
        console.log(error);
      }
    });
  }

  function mchnMakeRow(obj) {
    let node = `<tr>
                  <td>${obj.mchnCode}</td>
                  <td>${obj.mchnName}</td>
                  <td>${obj.mchnModel}</td>
                  <td>${obj.vendCdNm}</td>
                  <td>${obj.mchnMnfctDate}</td>
                  <td>${obj.mchnInspcCycle}</td>
                  <td>${obj.inspcEdate}</td>
                  <td>${obj.mchnStts}</td>
                  <td>${obj.mchnRemk}</td>
                </tr>`
    $("#mchnTable tbody").append(node);
  }


});
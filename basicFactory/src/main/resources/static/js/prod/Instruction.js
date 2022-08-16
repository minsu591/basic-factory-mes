$(document).ready(function () {
  $("#vendor").click(function (e) {
    console.log("클릭");
    e.preventDefault();

    $("#findvendorModal").modal("show");
  });

  $("#productname").click(function (e) {
    e.preventDefault();
    $("#findproductModal").modal("show");

    findProduct();

    function findProduct() {
      $.ajax({
        url: "findProduct",
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        error: function (error, status, msg) {
          alert("상태코드 " + status + "에러메시지" + msg);
        },
        success: function (data) {
          console.log(data);

          let index = 0;
          $("#findProducttbody tr").remove();
          for (obj of data) {
            index += 1;
            makeRow(obj, index);
          }
        },
      });

      //검색버튼 이벤트
      $("#findProductbtn").click(function () {
        let code = $("#prdCdCode").val();
        let name = $("#prdCdName").val();
        console.log(code);
        console.log(name);

        if (code == "" && name != "") {
          //이름만 검색
          console.log("code null");
          findProductName(name);
        } else if (code != "" && name == "") {
          //코드로만 검색
          console.log("name null");
          findProductCode(code);
        } else if (code != "" && name != "") {
          // 둘다 검색
          console.log("complete");
        } else if (code == "" && name == "") {
          // 둘다 없을 경우
          console.log("dulda null");
        }
      });

      //이름만 검색
      function findProductName(name) {
        $.ajax({
          url: `findProduct/name/${name}`,
          method: "GET",
          contentType: "application/json;charset=utf-8",
          dataType: "json",
          error: function (error, status, msg) {
            alert("상태코드 " + status + "에러메시지" + msg);
          },
          success: function (data) {
            console.log(data);

            let index = 0;
            index += 1;
            $("#findProducttbody tr").remove();
            makeRow(data, index);
          },
        });
      }

      //코드만 검색
      function findProductCode(code) {
        $.ajax({
          url: `findProduct/code/${code}`,
          method: "GET",
          contentType: "application/json;charset=utf-8",
          dataType: "json",
          error: function (error, status, msg) {
            alert("상태코드 " + status + "에러메시지" + msg);
          },
          success: function (data) {
            console.log(data);

            let index = 0;
            index += 1;
            $("#findProducttbody tr").remove();
            makeRow(data, index);
          },
        });
      }

      //테이블 클릭 이벤트
      $("#findProductTable").on("click", "tr", function () {
        console.log($(this).find("td:eq(2)").text());
        let name = $(this).find("td:eq(2)").text();

        $("#productname").val(name);
        $("#findproductModal").modal("hide");
      });

      //초기데이터
      function makeRow(obj, index) {
        let node = `<tr>
								<td>${index}</td>
								<td>${obj.finPrdCdCode}</td>
								<td>${obj.finPrdCdName}</td>
								<td>${obj.finPrdCdUnit}</td>
							</tr>`;
        $("#findProducttbody").append(node);
      }
    }
  });
});

$(document).ready(function () {
  var clockTarget = document.getElementById("clock");

  function clock() {
    var date = new Date();

    // date Object를 받아오고
    var month = date.getMonth();

    // 달을 받아옵니다
    var clockDate = date.getDate();

    // 몇일인지 받아옵니다
    var day = date.getDay();

    // 요일을 받아옵니다.
    var week = ["일", "월", "화", "수", "목", "금", "토"];

    // 요일은 숫자형태로 리턴되기때문에 미리 배열을 만듭니다.
    var hours = date.getHours();

    // 시간을 받아오고
    var minutes = date.getMinutes();

    // 분도 받아옵니다.
    var seconds = date.getSeconds();

    // 초까지 받아온후
    clockTarget.innerText =
      `${month + 1}월 ${clockDate}일 ${week[day]}요일 ` +
      `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }:${seconds < 10 ? `0${seconds}` : seconds}`;

    // 월은 0부터 1월이기때문에 +1일을 해주고

    // 시간 분 초는 한자리수이면 시계가 어색해보일까봐 10보다 작으면 앞에0을 붙혀주는 작업을 3항연산으로 했습니다.
    //!!모니터링 잠시 막아둠
    // Monitoring();
  }

  function init() {
    clock();

    // 최초에 함수를 한번 실행시켜주고
    setInterval(clock, 1000);

    // setInterval이라는 함수로 매초마다 실행을 해줍니다.

    // setInterval은 첫번째 파라메터는 함수이고 두번째는 시간인데 밀리초단위로 받습니다. 1000 = 1초
  }

  init();
  Monitoring();
});

//모니터링 잠시 막아둠
function Monitoring() {
  var today = new Date();

  var year = today.getFullYear();
  var month = ("0" + (today.getMonth() + 1)).slice(-2);
  var day = ("0" + today.getDate()).slice(-2);

  var dateString = year + "-" + month + "-" + day;

  console.log(dateString);
  $.ajax({
    url: `findmonitoring/${dateString}`,
    method: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    success: function (data) {
      console.log(data);
      $("#MonitoringTable tbody tr").remove();
      
      let count = 0;
      let objCount = 0;
      let cardCount = 1;
      let processBar = 0;
      for (let i = 0; i< data.length; i++) {
        let obj = data[i];
        objCount += 1;
        //MonitoringTableMakeRow(obj);
        if (count < 3) {
          if (objCount <= 5) {
            console.log("objCount->" + objCount);
            console.log(obj);
            //col-xl-12.last().에 카드생성 어펜드 테이블에 5개씩 어펜드
            if (cardCount == 1) {
              let prodName = obj.prodName;
              //카드생성
              makeCard(prodName);
              console.log("카드생성 몇번?");
              cardCount += 1;
            }
            //데이터입력
            processBar += obj.achieRate;
            dataInsert(obj);
            if(i == (data.length-1)){
              makeProcessBar(processBar);
            }

            //달성률
          } else if (objCount >= 6) {
            makeProcessBar(processBar);
            //div추가
            processBar = 0;
            console.log("objCount가 5보다 큼");
            objCount = 0;
            count += 1;
            cardCount = 1;
            i--;
          }

        } else if (count >= 3) {
          console.log("count 3보다 큼");
          //col-xl-12 생성
          makeDiv();
          count = 0;
        }
        // CreateCards(obj, dataLength, count, objCount);
      }
    },
    error: function (error, status, msg) {},
  });
}

function makeDiv() {
  let node = ` <div class="col-xl-12">
	<div class="card-group">
	</div>
</div>`;
  $(".pcoded-main-container").append(node);
}

function makeCard(prodName) {
  let node = `<div class="card">
              <div class="card-header">
              <h3>${prodName}</h3>
              </div>
							<div class="card-body table-border-style">
							<div class="table-responsive">

							<table class="table table-striped">
											<thead>
													<tr>
                              <th>공정명</th>
															<th>설비명</th>
															<th>금일계획</th>
															<th>입고량</th>
															<th>현재실적</th>
															<th>현재불량</th>
															<th>달성율</th>                               
													</tr>
											</thead>
											<tbody>
											
											</tbody>
									</table>
							</div>
							</div>
							<div class="card-footer">
							
							</div>
						</div>`;
  $(".card-group").last().append(node);
}

function dataInsert(obj) {
  let node = `<tr>
                <td>${obj.procCdName}</td>
								<td>${obj.mchnName}</td>
								<td>${obj.indicaVol}EA</td>
								<td>${obj.inDtlVol}</td>
								<td>${obj.totalVol}</td>
								<td>${obj.fltyVol}</td>
								<td>${obj.achieRate}%</td>
							</tr>`;
  $(".card").last().find("table tbody").append(node);
}

function MonitoringTableMakeRow(obj) {
  let node = `<tr>
								<td>${obj.mchnName}</td>
								<td>${obj.procCdName}</td>
								<td>${obj.prodName}</td>
								<td>${obj.indicaVol}EA</td>
								<td>${obj.inDtlVol}</td>
								<td>${obj.totalVol}</td>
								<td>${obj.fltyVol}</td>
								<td>${obj.achieRate}%</td>
							</tr>`;

  $("#MonitoringTable tbody").append(node);
}


function makeProcessBar(processBar) {

  let node = `
  <div class="progress mb-4" style="height: 20px;">
			<div class="progress-bar" role="progressbar" style="width: ${processBar/5}%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">${processBar/5 == 0 ? "" : processBar/5+'%'}</div>
		</div>`;
  $(".card-footer").last().append(node);


}
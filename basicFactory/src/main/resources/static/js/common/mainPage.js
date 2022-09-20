var now = new Date();
//2주 전 날짜
var prevDay = new Date(now.setDate(now.getDate()-13));
let categories = [];
let data1 = [];
for(let i = 0; i<14;i++){
    let day = (prevDay.getMonth()+1)+'/'+prevDay.getDate();
    categories.push(day);
    prevDay.setDate(prevDay.getDate()+1);
}
console.log(categories);

$("document").ready(function(){
    let finList;
    $.ajax({
        url : 'main/findOutFinForMain',
        type : 'GET',
        dataType : 'json',
        async :false,
        success : function(result){
            finList = result;
        }
    });
    
    //출고량이 많은 4개의 제품
    let data = [];
    for(cate of categories){
        let cateArr = cate.split('/');
        let finFlag = true;
        for(fin of finList){
            let finArr = fin.slsOutHdDate.split('-');
            if(parseInt(finArr[1]) == parseInt(cateArr[0]) && parseInt(finArr[2]) == parseInt(cateArr[1])){
                //월, 일자가 동일하면
                data.push(fin.slsOutDtlVol);
                finFlag = false;
                break;
            }
        }
        if(finFlag){
            data.push(0);
        }
    }

        var options = {
            chart: {
                height: 300,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false,
                width: 2,
            },
            stroke: {
                curve: 'straight',
            },
            colors: ["#1abc9c"],
            series: [{
                name: "Desktops",
                data
            }],
            title: {
                text: '일별 완제품 출고량',
                align: 'left',
                style : {
                    fontSize : '20px',
                    fontWeight : 'bold'
                }
            },
            grid: {
                row: {
                    colors: ['#f3f6ff', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories
            }
        }

        var chart = new ApexCharts(
            document.querySelector("#chart"),
            options
        );
        chart.render();
        
        
    });
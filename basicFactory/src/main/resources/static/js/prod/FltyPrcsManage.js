$(document).ready(function () {

  //오늘 일자
  day = new Date();
  day = day.toISOString().slice(0, 10);
  today = $("#fltyPrcsDate");
  today.val(day);

  //체크박스 체크유무
  $("#allCheck").click("change",function(){
    if($("#allCheck").is(":checked")){
        $("#fltyPrcstbody input:checkbox[name='chk']").prop("checked",true);
    }else{
        $("#fltyPrcstbody input:checkbox[name='chk']").prop("checked",false);
    }
  })
  $("#fltyPrcstbody").on("click","input:checkbox[name='chk']",function(e){
    let total = $("input[name=chk]").length;
    let checked = $("input[name=chk]:checked").length;
    if ((total != checked)) {
      $("#allCheck").prop("checked",false);
    } else {
      $("#allCheck").prop("checked", true);
    }
    e.stopPropagation();
  })

});
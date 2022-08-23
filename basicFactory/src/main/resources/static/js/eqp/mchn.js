$(document).ready(function () {

  function mchnList(){
    $.ajax({
      url : "MchnAllList",
      method : "get",
      contentType : "application/json;charset=utf-8",
      dataType : "json",
      success : function(data) {
        for (obj of data) {
          let node= 
        }
      },
      error : function(error) {
        console.log(error);
      }
    })
  }
});
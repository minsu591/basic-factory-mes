$("document").ready(function(){
            $("#planViewBtn").click(function(){
                let sdate = $("#planSdate").val();
                let edate = $("#planEdate").val();
                let vendor = $("#vendor").val();
                $.ajax({
                    // url : 'planView/'+sdate+'/'+edate+'/'+vendor,
                    url : 'planView/if',
                    data : {
                        sdate : sdate,
                        edate : edate,
                        vendorCd : vendor
                    },
                    methods : "GET",
                    dataType : "text",
                    success :function(data){
                        $("#planViewDiv").replaceWith(data);

                    }
                })
            })
        })
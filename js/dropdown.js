$(document).ready(function(){
    $("body").click(function(event){
        var list = ["#dropdown-1","#dropdown-2","#dropdown-3"];
        var clickTarget = event.target.parentElement.className
        if(clickTarget !== "dropdown"){
            list.forEach(function(item, index, arr){
                if($(item).css("display") == "block"){
                    $(item).hide();
                    //console.log(item)
                }
            })
        }
    });
    $(".dropdown").click(function(){
        var list = ["#dropdown-1","#dropdown-2","#dropdown-3"]
        var id = "#".concat($(this).attr('id').substr('4'));
        //$(id).toggle();
        list.forEach(function(item, index, arr){
            if(item === id){
                $(item).toggle();
                //console.log("1",item);
            }else{
                $(item).hide();
                //console.log(item);
            }
        })
        //$(id).addClass("underline")
    });
    // $(".dropdown").mouseover(function(){
    //     var id = "#".concat($(this).attr('id').substr('4'));
    //     $(id).toggle();
    // });
  });
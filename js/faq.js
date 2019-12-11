$(document).ready(function(){
    var container = '';
    if(faqQuestions.length == faqAnswers.length){
        for(var i = 0; i < faqQuestions.length; i++){
            var template = '<div class="accordion" id="accordion'+i+'"><div class="faq-card"><div class="faq-card-header" id="faq'+i+'"><button class="faq-heading" type="button" data-toggle="collapse" data-target="#collapse'+i+'" aria-expanded="true" aria-controls="collapse'+i+'">'+faqQuestions[i]+'</button></div><div id="collapse'+i+'" class="collapse" aria-labelledby="faq'+i+'" data-parent="#accordion'+i+'"><div class="card-body">'+faqAnswers[i]+'</div></div></div></div>';
            container += template
        }
    }

    // fixed a undefined issue here

    $('.faq-main').html(container);

    $('.faq-card-header').click(function(){
        var id = $(this).attr('id');
        var i = id.substr(3)
        var target = '#'+id+' .faq-heading'
        console.log('#collapse'+i)
        console.log($('#collapse'+i).hasClass('show'))
        if(!$('#collapse'+i).hasClass('show')){
            $(target).css("background-image", "url('assets/img/drop-up.svg')")
        }
        else{
            $(target).css("background-image", "url('assets/img/drop-down.svg')")
        }
        // if($('#collapse'+id).hasClass('show'))
    })
});

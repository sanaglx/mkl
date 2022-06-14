var dax = new DynamicAdapt("max");  
dax.init();

/**************** */

$(document).ready(function() {
   $('.search input').keydown(function(e) {
     if(e.keyCode === 13) {
        $(this).parent().find('.search-a').click();
        location = "/";
        location.reload();
     }
   });
 });

$('.teni').click(function () {
    $(this).removeClass('active')  
    $('.search').removeClass('active')
    $('.search input').val('');
  })

$('body').on('click','.search-kn',function (){
     $('.teni').addClass('active');
     $('.search').addClass('active');
     return false
  });
//**************** */
$(function($){
  
 $('.menu>li>a').hover(function(){
    if($(document).width()>992){
      $('.sbm').removeClass('active') 
      $('.menu>li>a').removeClass('active') 
      var a = $(this), d = 0, w = 0
      a.addClass('active');
      //a.find('.submenu').addClass('active')
      d = $(this).offset().left;
      w =1920 - $(window).innerWidth()
      d=d+w*0.5
      console.log(d)
      console.log($(window).innerWidth())
      a.parent().find('.submenu').css('width','calc(100vw - '+ d +'px)')
    }else{

    }
  })
})

$('body').on('mouseleave','.submenu', function(){
   $('.sbm').removeClass('active')
});
 $('body').on('mouseleave','header', function(){
   $('.sbm').removeClass('active')
});

//*****mobi-menu******* */
 $('body').on('click','.burger',function () { 
    if(!$('nav').hasClass('active')){
      $('nav').addClass('active');
      $('nav').find('.menu').addClass('mobi');
    }else{
      $('nav').removeClass('active');
      $('nav').find('.menu').removeClass('mobi');
    }
 });

 $('body').on('click','.sbm',function () { 
   var a , b; 
   a = $(this).parent().find('.submenu')
   b = $(this);
   if(!a.hasClass('active')){
      $('.submenu').removeClass('active')
      $('.sbm').removeClass('vi')
      a.addClass('active')
      b.addClass('vi')
      return false
   }else{
      a.removeClass('active')
      b.removeClass('vi')
      return false
   }
   return false
 });
 
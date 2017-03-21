(function ($) {  


  $(document).ready(function() {  
      $("html").niceScroll();
  });


  $(".header-menu__btn").click(function() {
    $(this).toggleClass("header-menu__btn--active");
    $(".header-menu__list").toggleClass("header-menu__list--active");
  });


})(jQuery);
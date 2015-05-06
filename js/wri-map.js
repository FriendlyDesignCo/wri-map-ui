(function($){

  $.fn.wriMap = function(options) {
    var defaults = {
      menuOverlay: "#menu-open-overlay",
      menuOpenClass: "menu-open",
      menuOpenButton: "#menu-open-button"
    };

    var settings = $.extend({}, defaults, options);

    initRibbon(settings);
    initMainMenu(settings);
  };

  function initRibbon(settings) {
    if ($("#ribbon").length > 0)
      $("body").addClass('has-ribbon');
  }
  function initMainMenu(settings) {
    $(settings.menuOverlay).click(function(e){
      e.preventDefault();
      $("body").removeClass(settings.menuOpenClass);
    });
    $(settings.menuOpenButton).click(function(e){
      e.preventDefault();
      $("body").toggleClass(settings.menuOpenClass);
    });
  }

}(jQuery));

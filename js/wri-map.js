(function($){

  $.fn.wriMap = function(options) {
    var defaults = {
      menuOverlay: "#menu-open-overlay",
      menuOpenClass: "menu-open",
      menuOpenButton: "#menu-open-button",

      searchExpandButton: "#search-button",
      zoomHomeButton: "#home-button",
      zoomInButton: "#zoom-in-button",
      zoomOutButton: "#zoom-out-button",

      onZoomHome: function(){},
      onZoomIn: function(){},
      onZoomOut: function(){}
    };

    var settings = $.extend({}, defaults, options);

    initRibbon(settings);
    initMainMenu(settings);
    initRightButtons(settings);
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

  function initRightButtons(settings) {
    $(settings.zoomHomeButton).click(function(e){
      $.proxy(settings.onZoomHome, this)();
    });
    $(settings.zoomInButton).click(function(e){
      $.proxy(settings.onZoomIn, this)();
    });
    $(settings.zoomOutButton).click(function(e){
      $.proxy(settings.onZoomOut, this)();
    });
  }

}(jQuery));

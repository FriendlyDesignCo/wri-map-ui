(function($){
  $.fn.makeAbsolute = function(rebase) {
    return this.each(function() {
        var el = $(this);
        var pos = el.position();
        el.css({ position: "absolute",
            marginLeft: 0, marginTop: 0,
            top: pos.top, right: 0 });
        if (rebase)
            el.remove().appendTo("body");
    });
  };
}(jQuery));

(function($){

  $.fn.wriMap = function(options) {
    var defaults = {
      menuOverlay: "#menu-open-overlay",
      menuOpenClass: "menu-open",
      menuOpenButton: "#menu-open-button",

      searchExpandButton: "#search-button",
      searchCollapseButton: "#search-collapse-button",
      searchBox: "#search-box",
      leaveSearchOpenAfterSearch: false,
      zoomHomeButton: "#home-button",
      zoomInButton: "#zoom-in-button",
      zoomOutButton: "#zoom-out-button",

      onZoomHome: function(){},
      onZoomIn: function(){},
      onZoomOut: function(){},
      onSearch: function(data){}
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

    $($("#right-controls .button:not(#search-expandable)").get().reverse()).each(function(){ $(this).makeAbsolute(); });
    $(settings.searchExpandButton).click(function(e){
      $("#search-expandable").addClass('expanded');
      setTimeout(function(){
        $("#search-expandable input[type=text]").focus();
      },525);
    });

    $(settings.searchCollapseButton).click(function(e){
      $("#search-expandable").removeClass('expanded');
    });

    $("#search-expandable form").submit(function(e){
      e.preventDefault();
      $.proxy(settings.onSearch)($(this).find('input[type=text]').val());
      if (settings.leaveSearchOpenAfterSearch === false) {
        $("#search-expandable").removeClass('expanded');
      }
    });
  }

}(jQuery));

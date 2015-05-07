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
      zoomHomeButton: "#home-button",
      zoomInButton: "#zoom-in-button",
      zoomOutButton: "#zoom-out-button",

      mapControlsToggleButton: ".map-controls-toggle-button",

      onZoomHome: function(){},
      onZoomIn: function(){},
      onZoomOut: function(){},
      onSearch: function(data){}
    };

    var settings = $.extend({}, defaults, options);

    initRibbon(settings);
    initMainMenu(settings);
    initRightButtons(settings);
    initMapControls(settings);
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
      if ($.proxy(settings.onSearch)($(this).find('input[type=text]').val())) {
        $("#search-expandable").removeClass('expanded');
      }
    });
  }

  function initMapControls(settings) {
    $(settings.mapControlsToggleButton).click(function(e){
      $("body").toggleClass('map-controls-open');
      $("#map-control-container").css({'max-height':''}).removeClass('second-page');
    });

    $("#map-control-container").find('ul > li').each(function(){
      $(this).append('<div class="clearfix"></div>');
      if ($(this).find('ul').length > 0)
        $(this).addClass('has-children');
    });

    $("#map-control-container li.has-children").click(function(){
      if ($("#map-control-container > ul").length > 1)
        $("#map-control-container > ul:last").remove();
      $("#map-control-secondary-header").remove();

      // Menu header
      $("#map-control-header").append('<div id="map-control-secondary-header"><i class="fa fa-chevron-left"></i><span></span></div>');
      $("#map-control-secondary-header").find('span').html($(this).find('span').html());
      $("#map-control-header").addClass('second-page');

      // Menu items
      $("#map-control-container").append($(this).find('ul').clone().addClass('second-container'));
      $("#map-control-container").addClass('second-page').css({'max-height':$('ul.second-container').height()});

      // Back button
      $("#map-control-secondary-header i").click(function(e){
        $("#map-control-header").removeClass('second-page');
        $("#map-control-container").css({'max-height':''}).removeClass('second-page');
      });
    });
  }

}(jQuery));

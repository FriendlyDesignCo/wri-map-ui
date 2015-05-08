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
      if ($(this).find('ul').length > 0 || $(this).find('select').length > 0)
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
      if ($(this).find('ul').length > 0) {
        $("#map-control-container").append($(this).find('ul').clone().addClass('second-container'));
      }
      // Select
      if ($(this).find('select').length > 0) {
        $("#map-control-container").append('<ul data-select-id="#' + $(this).find('select').first().attr('id') + '" class="second-container"></ul>');
        // Create a row for each <option>
        $(this).find('select option').each(function(){
          var newElement = $("<li data-value='" + $(this).attr('value') + "' class='select-option'><span>" + $(this).html() + "</span><i class='fa fa-check'></i><div class='clearfix'></div></li>");
          if ($(this).is(':selected')) {
            newElement.addClass('selected');
          }
          if ($(this).data('icon') !== undefined) {
            newElement.find('span').prepend($("<img src='" + $(this).data('icon') + "'>"));
          }
          $("#map-control-container ul.second-container").append(newElement);
        });

        // Handle clicks on an option row
        $("#map-control-container ul.second-container").on('click','li.select-option',function(e){
          e.preventDefault();
          var selectElement = $($(this).parent().data('select-id'));
          selectElement.find('option[value=' + $(this).data('value') + ']').prop('selected',true);
          $(this).parent().find('.selected').removeClass('selected');
          $(this).addClass('selected');
        });
      }
      // Checkboxes
      $("#map-control-container .second-container input[type=checkbox]").each(function(){
        var listItem = $(this).parent();
        listItem.addClass('checkbox');
        if ($(this).prop('checked'))
          listItem.addClass('selected');
        listItem.data('target-id', '#'+$(this).attr('id'));
        $(this).after($("<div class='circle'></div>"));
        listItem.find('input[type=checkbox]').remove();

        listItem.click(function(e){
          $(this).toggleClass('selected');
          var checkbox = $($(this).data('target-id'));
          checkbox.prop('checked', !checkbox.is(':checked'));
          console.log(checkbox.is(':checked'));
          console.log(checkbox);
        });
      });

      $("#map-control-container").addClass('second-page').css({'max-height':$('ul.second-container').height()});

      // Back button
      $("#map-control-secondary-header i").click(function(e){
        $("#map-control-header").removeClass('second-page');
        $("#map-control-container").css({'max-height':''}).removeClass('second-page');
      });
    });
  }

}(jQuery));

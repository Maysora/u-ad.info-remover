/* ------------------------------------------------
 *
 * u-ad.info-remover v.1.0.0
 * (roy@bocistudio.com)
 *
 * ------------------------------------------------
 * Requirements:
 * ------------------------------------------------
 *
 * - jQuery
 *
 * ------------------------------------------------
 * Usage:
 * ------------------------------------------------
 *
 * See README.md
 *
 * ------------------------------------------------
 */

(function($) {
  $.slowdyAdsRemover = {
    _setCookie: function(c_name, value, exdays){
      var c_value = escape(value);
      if(exdays){
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + exdays);
        c_value = c_value + '; expires=' + exdate.toUTCString();
      }
      document.cookie=c_name + '=' + c_value + '; path=/';
    },
    _getCookie: function(c_name){
      var c_value = document.cookie;
      var c_start = c_value.indexOf(' ' + c_name + '=');
      if (c_start == -1){
        c_start = c_value.indexOf(c_name + '=');
      }
      if (c_start == -1){
        c_value = null;
      } else {
        c_start = c_value.indexOf('=', c_start) + 1;
        var c_end = c_value.indexOf(';', c_start);
        if (c_end == -1){
          c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start,c_end));
      }
      return c_value;
    },
    showPopup: function(container, options){
      if(options.popup === false || $.slowdyAdsRemover._getCookie('slowdy-ads-remover-off')) return;
      var $container = $(container);
      var $popup = $container.find('.slowdy-ads-remover-popup');
      if(!$popup.length){
        $popup = $('<div class="slowdy-ads-remover-popup">').hide().appendTo($container);
        $popup.append('<p>' + ((options.popupText) ? options.popupText :
          'We have detected that you have advertisement injected by your ISP,\
           this advertisement will break our site functionality so we disables it for you and alter our site functionality a bit.\
           More information available <a href="https://github.com/Maysora/u-ad.info-remover/wiki/Information-(Informasi)" target="_blank">here</a>') +
          '</p>');
        $popup.append('<div><a href="#">Got it</a> | <a href="#" data-remember="true">Don\'t remind me again</a></div>')
        $popup.on('click', 'a', function(e){
          e.preventDefault();
          $popup.slideUp();
          $.slowdyAdsRemover._setCookie('slowdy-ads-remover-off', '1', ($(this).data('remember')) ? 99999 : false);
        });
      }
      $popup.slideDown();
    },
    init: function(options){
      if(!options) options = {};
      var $container = $('body');
      if(!$container.hasClass('slowdy-ads-remover')){
        $container.addClass('slowdy-ads-remover');
        var $scumbagTelmokom = $('script,iframe', $container).filter('[src*="u-ad.info"]');
        if($scumbagTelmokom.length){
          if(options.existedFunc && $.isFunction(options.existedFunc)) options.existedFunc.call($container.get(0), $container);
          $.slowdyAdsRemover.showPopup($container, options);
          $scumbagTelmokom.remove();
        } else {
          if(options.cleanFunc && $.isFunction(options.cleanFunc)) options.cleanFunc.call($container.get(0), $container);
        }
      }
    }
  };
})(jQuery);
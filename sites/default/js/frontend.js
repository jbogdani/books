$(document).ready(function($) {
  $('#searchForm').submit(function(){
    if($('#search').val() !== '' ){
      window.location = $(this).data('path') + './search:' + $('#search').val();
    }
  });

  /**
   * Footnote popover
   */
  $('a.ftpopover').popover({html:true});

  $('a.track').on('click', function(){

    if (typeof ga === 'undefined'){
      return;
    } else {
      var type = $(this).data('type') || 'PDF';

      var label = $(this).attr('href');

      ga('send', 'event', 'Downloads', type, label);
    }
  });


  $('button.toggleInfo').on('click', function(){
    $(this).next('div.containerInfo').toggle();
  });

  if ($('#filter').length > 0) {
    $('#filter').on('keyup', function(){
        history.pushState(null, null, '#' + $(this).val());
        filterArticles($(this).val());
    });
  }

  function filterArticles(filter){
    if (!filter){
      filter = window.location.hash.substr(1);
    }
    if (filter && filter !== '') {
      $.each($('.book-item'), function(i, el){
        if ($(el).text().toLowerCase().indexOf(filter.toLowerCase()) > -1){
          $(el).removeClass('d-none').addClass('d-flex');
        } else {
          $(el).removeClass('d-flex').addClass('d-none');
        }
      });
    } else {
      $('.book-item').removeClass('d-none').addClass('d-flex');
    }
  }

  if (window.location.hash && window.location.hash !== '#'){
    $('#filter').val(window.location.hash.substr(1));
    filterArticles(window.location.hash.substr(1));
  }


});

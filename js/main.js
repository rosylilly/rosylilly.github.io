$(function() {
    $.ajax({
        type: 'GET',
        url: 'http://api.twitter.com/1/users/lookup.json',
        cache: false,
        dataType: 'jsonp',
        data: {
          screen_name: 'rosylilly',
          include_entities: 1
        },
        success: function(data) {
          data = data[0];
          $('#twitter-tweet').text(data.status.text).attr('href', 'http://twitter.com/rosylilly/status/'+ data.status.id);
        }
      });

    $.ajax({
        type: 'GET',
        url: 'https://api.github.com/users/rosylilly/watched',
        cache: false,
        dataType: 'jsonp',
        success: function(data) {
          data = data.data;
          for (var i=0,l=data.length; i<l; i++) {
            var repo = data[i];
            var section = $('<section />').addClass('repository');
            section.append($('<h2 />').text(repo.name).append($('<small />').append($('<a />').text(repo.html_url).attr('href', repo.html_url))));
            section.append($('<p />').text(repo.description));
            var meta = $('<dl />').addClass('meta');
            meta.append('<dt>Language</dt>');
            meta.append($('<dd />').text(repo.language || 'any'));
            meta.append('<dt>Last Update</dt>');
            meta.append($('<dd />').text(repo.updated_at));
            section.append(meta);
            $('#repos').append(section);
          }
        }
      });

    $.ajax({
        type: 'GET',
        url: 'https://api.github.com/users/rosylilly/gists',
        cache: false,
        dataType: 'jsonp',
        success: function(data) {
          data = data.data;
          for (var i=0,l=data.length; i<l; i++) {
            var snippet = data[i];
            var section = $('<section />').addClass('snippet');
            $('#snippets').append(section);
            section.append($('<h2 />').text(snippet.id).append($('<small />').append($('<a />').text(snippet.html_url).attr('href', snippet.html_url))));
            section.append($('<p />').text(snippet.description));
            var meta = $('<dl />').addClass('meta');
            meta.append('<dt>Last Update</dt>');
            meta.append($('<dd />').text(snippet.updated_at));
            section.append(meta);
          }
        }
      });

    $('#body > section:not(:first-child)').fadeOut();
    $('menu a').click(function(e) {
        e.preventDefault();
        var _this = $(this);
        $('#body > section:visible').fadeOut(function() {
            $(_this.attr('href')).fadeIn();
          });
      });
});

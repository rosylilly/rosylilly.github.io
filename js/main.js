$(function(){
  $.ajax({
    type: 'GET',
    url: 'https://api.github.com/users/rosylilly/repos',
    cache: false,
    dataType: 'jsonp',
    success: function(data) {
      var datas, i, l, repoElement, reposElement, desc;
      datas = data.data;
      reposElement = $('#repositories ul');
      for(i=0, l=datas.length; i<l; i++) {
        data = datas[i];
        repoElement = $('<li><a class="url"></a><span class="desc" /></li>');
        repoElement.find('a').attr('href', data.html_url).html(data.name);
        desc = (data.description || '').slice(0, 20);
        if(desc != (data.description || '')) {
          desc += '...';
        }
        repoElement.find('.desc').text(desc);
        if(data.fork){
          repoElement.addClass('fork');
        }

        if(data.language){
          repoElement.addClass('lang-' + data.language.toLowerCase());
        }

        reposElement.append(repoElement);
      }
    }
  });

  $.ajax({
    type: 'GET',
    url: 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=rosylilly&count=10',
    cache: false,
    dataType: 'jsonp',
    success: function(datas) {
      var i, l, tweetsElement, data, tweetElement;
      tweetsElement = $('#tweets ul');
      for(i=0, l=datas.length; i<l; i++) {
        data = datas[i];
        tweetElement = $('<li><span class="tweet" />&mdash; <a>tweet</a></li>');
        tweetElement.find('.tweet').text(data.text);
        tweetElement.find('a').attr('href', "http://twitetr.com/rosylilly/status/" + data.id_str).html(data.id_str);
        tweetsElement.append(tweetElement);
      }
    }
  });
});

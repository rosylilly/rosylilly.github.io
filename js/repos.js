'use strict';

const SRC_URL = 'https://@api.github.com/users/rosylilly/repos';
const BASIC_AUTH = '0b1060f96f74e8edf8f75183d575660ffa7e50e3:x-oauth-basic';

Zepto(function($) {
  var reposView = new Vue({
    el: '#repositories',
    data: {
      repos: []
    }
  });

  $.ajax({
    type: 'GET',
    url: SRC_URL,
    dataType: 'json',
    data: {
      sort: 'pushed',
      type: 'owner',
      per_page: 300
    },
    beforeSend: function(xhr) {
      xhr.setRequestHeader ("Authorization", "Basic " + btoa(BASIC_AUTH));
    },
    success: function(data) {
      reposView.repos = $.map(data, function(repo, i) {
        return repo
      });
    }
  });

  window.reposView = reposView;
});

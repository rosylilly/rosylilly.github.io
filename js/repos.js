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

  reposView.getRepos = function(page) {
    $.ajax({
      type: 'GET',
      url: SRC_URL,
      dataType: 'json',
      data: {
        sort: 'pushed',
        type: 'owner',
        page: page,
        per_page: 100
      },
      beforeSend: function(xhr) {
        xhr.setRequestHeader ("Authorization", "Basic " + btoa(BASIC_AUTH));
      },
      success: function(data) {
        reposView.repos = reposView.repos.concat(data);

        if(data.length >= 100) {
          reposView.getRepos(page + 1);
        }
      }
    });
  }

  reposView.getRepos(0);

  window.reposView = reposView;
});

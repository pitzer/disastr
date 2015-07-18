(function(){
  'use strict';

  angular.module('needs')
         .service('needService', ['$q', NeedService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function NeedService($q){
    var needs = [
      {
        name: 'Need 10 tarps for Chautara',
        avatar: 'svg-1',
        content: 'Need 10 tarps for Chautara.'
      },
      {
        name: 'Help build toilets in Gorkha',
        avatar: 'svg-2',
        content: 'Help build toilets in Gorkha.'
      }
    ];

    // Promise-based API
    return {
      loadAllNeeds : function() {
        // Simulate async nature of real remote calls
        return $q.when(needs);
      }
    };
  }

})();

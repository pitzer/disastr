(function(){

  angular
       .module('needs')
       .controller('NeedController', [
          'needService', '$mdSidenav', '$mdBottomSheet', '$log',
          NeedController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function NeedController( needService, $mdSidenav, $mdBottomSheet, $log ) {
    var self = this;

    self.selected     = null;
    self.needs        = [ ];
    self.selectNeed   = selectNeed;
    self.toggleList   = toggleNeedsList;
    self.share        = share;

    // Load all registered needs

    needService
          .loadAllNeeds()
          .then( function( needs ) {
            self.needs    = [].concat(needs);
            self.selected = needs[0];
          });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * Hide or Show the 'left' sideNav area
     */
    function toggleNeedsList() {
      $mdSidenav('left').toggle();
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectNeed ( need ) {
      self.selected = angular.isNumber(need) ? $scope.needs[need] : need;
      self.toggleList();
    }

    /**
     * Show the bottom sheet
     */
    function share($event) {
        var need = self.selected;

        $mdBottomSheet.show({
          parent: angular.element(document.getElementById('content')),
          templateUrl: '/src/needs/view/contactSheet.html',
          controller: [ '$mdBottomSheet', NeedSheetController],
          controllerAs: "vm",
          bindToController : true,
          targetEvent: $event
        }).then(function(clickedItem) {
          $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * Bottom Sheet controller for the Avatar Actions
         */
        function NeedSheetController( $mdBottomSheet ) {
          this.need = need;
          this.items = [
            { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
            { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
            { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
            { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
          ];
          this.performAction = function(action) {
            $mdBottomSheet.hide(action);
          };
        }
    }

  }

})();

App.directive('scrollCollapse', ['$window', '$rootScope', function($window, $rootScope) {

  function link(scope, element, attrs) {
        $rootScope.$watch('pageYOffset', function() { 
            if (this.pageYOffset >= 150) {
                scope.boolChangeClass = true;
            } else {
                scope.boolChangeClass = false;
            }
            //scope.$apply();
        });
  }

  return {
    link: link
  };
}]);

App.directive('scrollFade', [ '$rootScope', function($rootScope) {

  function link(scope, element, attrs) {
        $rootScope.$watch('pageYOffset', function() { 
            element[0].style.opacity = ($rootScope.pageYOffset / 150);
        });
  }
  
  return {
      link: link
  }
}]);


App.directive('scrollLittlebit', [ '$rootScope', function($rootScope) {

  function link(scope, element, attrs) {
        $rootScope.$watch('pageYOffset', function() { 
            element[0].style.transform = 'translateY(' + ($rootScope.pageYOffset / 150) * 30 + 'px)';
        });
  }
  
  return {
      link: link
  }
}]);
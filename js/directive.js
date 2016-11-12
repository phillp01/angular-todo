angular.module('TodoDirective',[]).directive('todoTable', function()	{
	return	{
		//restrict: 'A',	// A - > attribute
		//restrict: 'E', // E-> element
		restrict: 'EA', // E-> Both
		templateUrl: 'templates/directives/todo-table.html'
	};
})

angular.module('navbarDirective',[]).directive('navBar', function()	{
	return	{
		restrict: 'EA',
		templateUrl: 'templates/directives/navigation.html',
		controller: 'NavbarController'
	};
})




angular.module('testDirective', []).directive('testing', function()	{
	return	{
		restrict: 'E',
		templateUrl: 'temaplates/directives/test.html'
	};
})
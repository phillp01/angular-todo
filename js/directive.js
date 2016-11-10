angular.module('TodoDirective',[]).directive('todoTable', function()	{
	return	{
		//restrict: 'A',	// A - > attribute
		//restrict: 'E', // E-> element
		restrict: 'EA', // E-> Both
		templateUrl: 'templates/directives/todo-table.html'
	};
});
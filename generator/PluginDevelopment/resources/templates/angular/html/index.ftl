<!DOCTYPE html>
<html ng-app="app">
<head>

<script src="/bower_components/angular/angular.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-animate.js"></script>
<script src="//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-1.3.3.js"></script>

<script src="/app/app.module.js"></script>
<#list classes as class>
<script src="/app/components/${class.name?uncap_first}/${class.name?uncap_first}.module.js"></script>
<script src="/app/components/${class.name?uncap_first}/${class.name?uncap_first}.route.js"></script>
<script src="/app/components/${class.name?uncap_first}/${class.name?uncap_first}.service.js"></script>
<script src="/app/components/${class.name?uncap_first}/${class.name?uncap_first}.controller.js"></script>
</#list>

<script src="/bower_components/angular-route/angular-route.js"></script>

<link href="//netdna.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">

<title>DemoApp</title>
</head>
<body>
	<nav class="navbar navbar-inverse navbar-fixed-top">
		<div class="container">
			<div class="navbar-header">
				<a class="navbar-brand" href="/#/">Home</a> 
	<#list classes as class>
		<#if class.uiClass??>
				<a class="navbar-brand" href="/#/${class.name?uncap_first}List">${class.uiClass.label}</a>
		</#if>
	</#list>
			</div>
		</div>
	</nav>

	<div class="jumbotron">
		<div class="container text-center">
			<h1>Demo App</h1>
			<p>Web Application for Evidenting Restaurants</p>
		</div>
	</div>
	
	<div class="container" ng-view></div>
	
	<hr>
	
	<footer>
		<p>Footer</p>
	</footer>
	
</body>
</html>
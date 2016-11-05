(function() {
	"use strict";
	
	angular
		.module('app', [
		<#assign i = 0 />
		<#list classes as class>		
			<#if i != 0>,</#if> '${class.name?uncap_first}' <#assign i = i+1 />
		</#list>
			]);
})();
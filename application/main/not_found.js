(function(flog) {
	'use strict';
	
	flog.NotFound = React.createClass({
		render: function() {
			return  <p>Do or do not.<br />There is no route.<br />-Yoda</p>;
		}
	});
	
})(window.flog = window.flog || {});
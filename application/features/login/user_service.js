// We can't just 'use' jQuery from the window object because of how Atom works - look into this.
var jQuery = require('jquery');

(function(flog, $) {

	flog.services = flog.services || {};

    flog.services.user = (function() {

		var context = {};

        return {
            login: login,
            context: context
        }       

        function login() {

            var promise = $.post('http://localhost:64466/auth/login', {userName: 'John Smith', password: 'password'}, function (data, status, headers, config) {

				$.ajaxSetup({
				    headers: { 'Authorization': 'Bearer myJwtToken' }
				});

			    context.isAuthenticated = data.authenticated;
			    context.userName = data.userName;
			});
			
			return promise;
        }
    })();

})(window.flog = window.flog || {}, jQuery);
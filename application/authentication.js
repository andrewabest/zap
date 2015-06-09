(function(flog) {
	'use strict';

	flog.mixins = flog.mixins || {};

	flog.mixins.Authentication = {
	  statics: {
	    willTransitionTo: function (transition) {
	      var nextPath = transition.path;
	      if (!flog.services.user.context.isAuthenticated) {
	        transition.redirect('/login',{}, { 'nextPath' : nextPath });
	      }
	    }
	  }
	};

})(window.flog = window.flog || {})
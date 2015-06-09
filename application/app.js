(function(flog) {
	'use strict';

	var Router = ReactRouter;
	var DefaultRoute = Router.DefaultRoute;
	var Link = Router.Link;
	var Route = Router.Route;
	var NotFoundRoute = Router.NotFoundRoute;
	var Redirect = Router.Redirect;
	var RouteHandler = Router.RouteHandler;

	var App = React.createClass({

	    render: function(){
	        return (
	        	<RouteHandler {...this.props} />
	        );
	    }
	});

	var routes = (
		<Route path="/" handler={App}>
			<Route name="login" handler={flog.Login}/>
			<Route name="workout" path="react/:id" handler={flog.Workout} />
			<DefaultRoute name="workoutList" path="react" handler={flog.WorkoutList} />
			<NotFoundRoute handler={flog.NotFound}/>
	  	</Route>
	);

	var router = Router.create({routes: routes, location: Router.HashLocation});

	var stores = {
	  workout: new flog.flux.WorkoutStore()
	};

	var flux = new Fluxxor.Flux(stores, flog.flux.actions);
	flux.on("dispatch", function(type, payload) {
		console.log("Dispatch:", type, payload);
	});

	// Set the location hash of the window so that the router knows where we are.
	window.location.hash = '/';

	Router.run(routes, function (Handler, state) {
		console.log(state);
	  	React.render(<Handler flux={flux} />, document.getElementById('app'));
	});

	window.loading_screen.finish();

})(window.flog = window.flog || {});
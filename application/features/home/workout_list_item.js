(function(flog) {
	'use strict';
	
	flog.WorkoutListItem = React.createClass({

		propTypes: {
			workout: React.PropTypes.object.isRequired,
		},

		render: function () {
			
			var Link = ReactRouter.Link;

			return <li><Link to="workout" params={{id: this.props.workout.id}}>{this.props.workout.display}</Link></li>;
		}
	});

})(window.flog = window.flog || {});
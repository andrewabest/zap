(function(flog, react, fluxxor) {
	'use strict';
	
	flog.ExerciseDetails = React.createClass({

		propTypes: {
			workoutId: React.PropTypes.string.isRequired,
			exercise: React.PropTypes.object.isRequired,
		},

		mixins: [
			fluxxor.FluxMixin(react),
		],

		getInitialState: function() {
			return { 
				addingSet: false
			};
		},

		addSet: function() {

			this.setState({addingSet: true});
		},

		addSetCancelled: function() {

			this.setState({
				addingSet: false
			});
		},

		remove: function() {
			
			this.getFlux().actions.workout.removeExercise(
				this.props.workoutId,
		        this.props.exercise.id
		    );
		},

		componentWillReceiveProps: function(nextProps) {
			// Invoked when a component is receiving new props. This method is not called for the initial render.
			// Use this as an opportunity to react to a prop transition before render() is called by updating the state using this.setState(). The old props can be accessed via this.props. Calling this.setState() within this function will not trigger an additional render.
			this.setState({addingSet: false});
		},

		componentDidMount: function() {
			console.log(this.props.exercise.name);
		},

		render: function() {

			var containerStyle = {
				borderBottom: '1px dashed #eee',
				marginBottom: 15
			}

			var rowStyle = {
				marginBottom: 15
			}

			var rightAlignedTextStyle = {
				textAlign: 'right'
			}

			return (
				<div style={containerStyle}>
				    <div className="row" style={rowStyle}>
				        <div className="col-md-2">
				            <strong>{this.props.exercise.name}</strong>
				        </div>
				        <div className="col-md-6">
				            {this.props.exercise.description}
				        </div>
				        <div className="col-md-4" style={rightAlignedTextStyle}>
				            <button onClick={this.addSet} className="btn btn-success">Add Set</button>
				            {' '}
				            <button onClick={this.remove} className="confirmButton btn btn-danger" confirm-button>Remove</button>
				        </div>
				    </div>
			    	{
			    		this.state.addingSet ?
			    		<div className="row" style={rowStyle}>
					        <div className="col-md-12 well">
					            <flog.Set workoutId={this.props.workoutId} exerciseId={this.props.exercise.id} closeCallback={this.addSetCancelled} />
					        </div>
					    </div>
					    : null
			    	}

				    <div className="row" style={rowStyle}>
				        {this.props.exercise.sets.map(function(set, i) {
				            return <div className="col-md-12"><p>{set.weight}{' x '}{set.reps}{' @ '}{set.rpe}{' RPE'}</p></div>;
				        })}
				    </div>
				</div>
			);
		}
	});

})(window.flog = window.flog || {}, window.React, window.Fluxxor);
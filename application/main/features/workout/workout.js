(function(flog, react, fluxxor, swal) {
	'use strict';
	
	flog.Workout = React.createClass({

		mixins: [
			ReactRouter.Navigation, 
			ReactRouter.State, 
			flog.mixins.Authentication,
			fluxxor.FluxMixin(react),
    		fluxxor.StoreWatchMixin("workout"),
		],

		getInitialState: function() {
		    return {
		    	addingExercise: false,
		    	isBusy: false,
		    	isCompleting: false
		    };
		},

		// TODO: Seperate internal state modifications to those influenced by the store changes.
		getStateFromFlux: function() {

			// Get our route parameters
			var params = this.getParams();
			var workout = this.getFlux().store("workout").getWorkout(params.id);

			this.setState({
				showNoExercisesWarning: workout.exercises.length == 0,
		    	showCompleteAction: workout.exercises.length > 0,
		    	addingExercise: false
			});

			return {
			  workout: workout
			};
		},

		componentWillMount: function() {
			// Invoked once, both on the client and server, immediately before the initial rendering occurs. If you call setState within this method, render() will see the updated state and will be executed only once despite the state change.

			this.toggleVisibility();
		},

		componentDidMount: function() {
			// Invoked once, only on the client (not on the server), immediately after the initial rendering occurs. At this point in the lifecycle, the component has a DOM representation which you can access via React.findDOMNode(this).
			// If you want to integrate with other JavaScript frameworks, set timers using setTimeout or setInterval, or send AJAX requests, perform those operations in this method.
		},

		componentWillReceiveProps: function(nextProps) {
			// Invoked when a component is receiving new props. This method is not called for the initial render.
			// Use this as an opportunity to react to a prop transition before render() is called by updating the state using this.setState(). The old props can be accessed via this.props. Calling this.setState() within this function will not trigger an additional render.
		},

		componentWillUpdate: function() {
			// New props / state available for scruitiny / pre prep.
		},

		componentDidUpdate: function() {
			// New props / state recieved
		},
		
		addExercise: function() {
			this.setState({
				addingExercise: true
			});
		},

		addExerciseCancelled: function() {
			this.setState({
				addingExercise: false
			});
		},

		complete: function() {

			this.setState({
				isCompleting: true
			});

			var self = this;

			flog.services.workout.completeWorkout(this.state.workout)
				.done(function(data) {

					// Send a message back to the main process to be routed through to other listening applications
					console.log('sending workout-completed');
					require('ipc').send('workout-completed', '');

	                swal({
	                    title: "Workout Completed!",
	                    type: "success"
	                },
	                function () {
	            		self.transitionTo('workoutList');
	                });
	            })
	            .always(function () {
	            	self.setState({
						isCompleting: false
					});
	            });
		},

		toggleVisibility: function() {
			this.setState({
				showNoExercisesWarning: !this.state.isBusy && !this.state.addingExercise && this.state.workout.exercises.length == 0,
		    	showCompleteAction: !this.state.isBusy && this.state.workout.exercises.length > 0
			});
		},

		render: function () {

			var rowStyle = {
				marginBottom: 15
			};

			var fullWidthStyle = {
				width: '100%'
			}

			var self = this;

			return (
				<div>
				    <div className="page-header">
				        <div className="row">
				            <div className="col-md-12">
				                <h1>Workout {this.state.workout.display}</h1>
				            </div>
				        </div>
				    </div>
				    <div className="row" style={rowStyle}>
				        <div className="col-md-12 well">
				            <button disabled={this.state.addingExercise} onClick={this.addExercise} className="btn btn-success">Add Exercise</button>
				            <div className="exerciseContainer">
				                {
				                	this.state.addingExercise ?
				                	<flog.Exercise className="exercise" workoutId={this.state.workout.id} closeCallback={this.addExerciseCancelled} />
				                	: null
				                }	
				            </div>
				        </div>
				    </div>
				    <div className="row" style={rowStyle}>
				        <div className="col-md-12">
				            <div className="bs-component" hidden={!this.state.isBusy}>
				                <div className="progress progress-striped active">
				                    <div className="progress-bar" style={fullWidthStyle}></div>
				                </div>
				            </div>
				        </div>
				    </div>

				    <div>
				    	<ul>
					        {
					        	this.state.workout.exercises.map(function(exercise, i) {
					            	return <flog.ExerciseDetails workoutId={self.state.workout.id} exercise={exercise} />;
					        	})
					        }
				        </ul>
				    </div>

				    { 
				    	this.state.showNoExercisesWarning ? 
				    	<div className="row">
					        <div className="col-md-12">
					            <div className="alert alert-dismissable alert-warning">
					                No exercises have been added yet.
					            </div>
					        </div>
					    </div> 
				    	: null 
				    }

				    {
			    		this.state.showCompleteAction ?
			    		<div className="row">
					        <div className=" col-md-12 well">
					            <button onClick={this.complete} disabled={this.state.isCompleting} className="btn btn-success">Workout Complete</button>
					        </div>
					    </div>
					    : null
				    }

				</div>
			);
		}
	});

})(window.flog = window.flog || {}, window.React, window.Fluxxor, swal);
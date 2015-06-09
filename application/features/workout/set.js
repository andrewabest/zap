(function(flog, react, fluxxor) {
	'use strict';
	
	flog.Set = React.createClass({

		propTypes: {
			workoutId: React.PropTypes.string.isRequired,
			exerciseId: React.PropTypes.string.isRequired,
			closeCallback: React.PropTypes.func.isRequired
		},

		mixins: [
			React.addons.LinkedStateMixin,
			fluxxor.FluxMixin(react)
		],

		getInitialState: function() {
			return {weight: '', reps: '', rpe: ''};
		},

		handleSubmission: function(e) {
			e.preventDefault();
			
			this.getFlux().actions.workout.addSet(
				this.props.workoutId,
				this.props.exerciseId,
		        this.state.weight,
		        this.state.reps,
		        this.state.rpe
		    );
		},

		cancel: function(e) {
			e.preventDefault();
			this.props.closeCallback();
		},

		render: function() {
			return (
				<div>
				    <form className="form-inline" name="setForm" onSubmit={this.handleSubmission}>
				        <fieldset>
				            <div className="form-group">
				                <div className="col-md-2">
				                    <input type="text" className="form-control" id="weight" name="weight" placeholder="Weight" valueLink={this.linkState('weight')} />
				                </div>
				            </div>
				            <div className="form-group" show-errors>
				                <div className="col-md-2">
				                    <input type="text" className="form-control" id="reps" name="reps" placeholder="Reps" valueLink={this.linkState('reps')} />
				                </div>
				            </div>
				            <div className="form-group">
				                <div className="col-md-2">
				                    <input type="text" className="form-control" id="rpe" name="rpe" placeholder="RPE" valueLink={this.linkState('rpe')} />
				                </div>
				            </div>
				            <div className="form-group">
				                <button onClick={this.cancel} className="btn btn-default">Cancel</button>
				                {' '}
				                <button type="submit" className="btn btn-primary">Save</button>
				            </div>
				        </fieldset>
				    </form>
				</div>
			);
		}
	});

})(window.flog = window.flog || {}, window.React, window.Fluxxor);
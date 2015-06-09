(function(flog, react, fluxxor) {
	'use strict';

	flog.Login = React.createClass({

		mixins: [
			React.addons.LinkedStateMixin, 
			ReactRouter.Navigation, 
			ReactRouter.State,
			fluxxor.FluxMixin(react)
		],

		getInitialState: function() {
			return { email: '', password: '', rememberMe: false};
		},

		login: function(e) {
			e.preventDefault();
			var request = flog.services.user.login();
			var self = this;

			request.done(function () {
				var nextPath = self.getQuery().nextPath;

				if (nextPath) {
					self.replaceWith(nextPath);
				} 
				else {
					self.replaceWith('/react');
				}

			})
			.fail(function(data) {
				console.log(data);
			})
		},

		render: function() {
			return (
				<div className="row">
				    <div className="col-md-4"></div>
				    <div className="col-md-4 well">
				        <form name="signInForm" onSubmit={this.login}>
				            <fieldset>
				                <legend>Please Sign In</legend>
				                <div className="form-group" show-errors>
				                    <label htmlFor="email" className="sr-only">Email address</label>
				                    <input type="email" id="email" name="email" className="form-control" placeholder="Email address" valueLink={this.linkState('email')} />
				                </div>
				                <div className="form-group" show-errors>
				                    <label htmlFor="password" className="sr-only">Password</label>
				                    <input type="password" id="password" name="password" className="form-control" placeholder="Password" valueLink={this.linkState('password')} />
				                </div>
				                <div className="checkbox">
				                    <label>
				                        <input type="checkbox" valueLink={this.linkState('rememberMe')} /> Remember me
				                    </label>
				                </div>
				                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
				            </fieldset>
				        </form>

				    </div>
				    <div className="col-md-4"></div>
				</div>
			);
		}
	});

})(window.flog = window.flog || {}, window.React, window.Fluxxor);


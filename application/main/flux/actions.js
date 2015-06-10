var moment = require('moment');

(function(flog) {
  'use strict';

  flog.flux = flog.flux || {};

  flog.flux.actionIdentifiers = {
    WORKOUTS: {
      LOAD: "WORKOUTS:LOAD",
      LOAD_SUCCESS: "WORKOUTS:LOAD_SUCCESS",
      LOAD_FAIL: "WORKOUTS:LOAD_FAIL"
    },

    WORKOUT: {
      ADD: "WORKOUT:ADD",
      EDIT: "WORKOUT:EDIT",
      ADD_EXERCISE: "EXERCISE:ADD",
      REMOVE_EXERCISE: "EXERCISE:REMOVE",
      ADD_SET: "SET:ADD",
    }
  };

  flog.flux.actions = {
    workouts: {
      load: function() {
        this.dispatch(flog.flux.actionIdentifiers.WORKOUTS.LOAD);

        var self = this;
        flog.services.workout.getWorkouts()
          .done(function (data) {

            var workouts = _.map(data, function (x) {
                x.display = moment(x.date).format("dddd, MMMM Do YYYY, h:mm a");
                return x;
            });

            self.dispatch(flog.flux.actionIdentifiers.WORKOUTS.LOAD_SUCCESS, {workouts: workouts})
          })
          .fail(function (error) {
            self.dispatch(flog.flux.actionIdentifiers.WORKOUTS.LOAD_FAIL, {error: error});
          });
      }
    },

    workout: {

      add: function(id) {
        this.dispatch(flog.flux.actionIdentifiers.WORKOUT.ADD, id);
      },

      edit: function(id) {
        this.dispatch(flog.flux.actionIdentifiers.WORKOUT.EDIT, id);
      },

      addExercise: function(workoutId, name, desc) {
        this.dispatch(flog.flux.actionIdentifiers.WORKOUT.ADD_EXERCISE, {
          workoutId: workoutId,
          name: name,
          description: desc
        });
      },

      removeExercise: function(workoutId, exerciseId) {
        this.dispatch(flog.flux.actionIdentifiers.WORKOUT.REMOVE_EXERCISE, {
          workoutId: workoutId,
          exerciseId: exerciseId
        });
      },

      addSet: function(workoutId, exerciseId, weight, reps, rpe) {
        this.dispatch(flog.flux.actionIdentifiers.WORKOUT.ADD_SET, {
          workoutId: workoutId,
          exerciseId: exerciseId,
          weight: weight,
          reps: reps,
          rpe: rpe
        });
      },

    }
  };

})(window.flog = window.flog || {});


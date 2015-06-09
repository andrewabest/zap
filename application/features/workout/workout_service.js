var jQuery = require('jquery');

(function(flog, $) {

    flog.services = flog.services || {};

    flog.services.workout = (function() {
        return {
            completeWorkout: completeWorkout,
            getWorkouts: getWorkouts,
            getWorkout: getWorkout
        }

        function completeWorkout(workout) {

            return $.ajax({
                contentType: 'application/json',
                data: JSON.stringify(workout),
                dataType: 'json',
                type: 'POST',
                url: 'http://localhost:64466/workout/complete'
            });
        }

        function getWorkouts() {

            return $.get('http://localhost:64466/workout/all');
        }

        function getWorkout(id) {

            return $.get('http://localhost:64466/workout/' + encodeURIComponent(id));
        }

    })();

})(window.flog = window.flog || {}, jQuery);
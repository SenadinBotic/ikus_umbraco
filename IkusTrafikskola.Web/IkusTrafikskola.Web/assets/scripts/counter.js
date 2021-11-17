(function ($) {
    "use strict";

    $.fn.counter = function () {

        return this.each(function () {

            // Store the object
            var $this = $(this);

            var numberWithCommas = function (x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            };

            var startCounter = function () {
                var countTo = $this.attr('data-stop');

                $({ countNum: $this.data("start") }).animate({
                    countNum: countTo
                },
                    {
                        duration: $this.data("duration"),
                        easing: 'linear',
                        step: function () {
                            $this.text(numberWithCommas(Math.floor(this.countNum)) + $this.data("suffix"));
                            $this.data("start", this.countNum);
                        },
                        complete: function () {
                            $this.text(numberWithCommas(this.countNum) + $this.data("suffix"));
                        }
                    });
            };

            var prepareCounter = function () {
                setTimeout(startCounter, $this.data("delay"));
            };

            // Perform counts when the element gets into view
            $this.waypoint(prepareCounter, { offset: '100%', triggerOnce: true });
        });

    };

})(jQuery);

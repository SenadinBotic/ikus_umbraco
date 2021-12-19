$(document).ready(function () {
    $('.test-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: false
        }
    });

    $(".btn-start").click(function () {
        var startTimer = new Countdown();
    });

    if ($(".question-content:last")) {
        $(".question-content:last .finish-button").removeClass('hide');
        $(".question-content:last .next-button").addClass('hide');
    }
    $('.question-content:not(:first) .prev-button').removeClass('hide');

    var questionsList = $(".question");

    $("#main-quiz-container input:radio").attr("checked", false);

    $('.answers li input').click(function () {
        $(this).parents('.answers').children('li').removeClass("selected");
        $(this).parents('li').addClass('selected');

    });

    $(".show-finish-result").click(function () {
        $('#result-keeper').show();

        $(this).parents('.question-container').fadeOut(500, function () {
            $('#result-keeper').show().fadeIn(500);
            $('#results-container').removeClass('hide-content');
            $('#results-container').show();
            $('.question-content').removeClass('show-question');
        });
        return false;
    });

    $('.choose-test').click(function () {
        $(this).parents('.question-container').fadeOut(500, function () {
            $(this).next().fadeIn(500);
        });
        return false;
    });

    $('.btn-start').click(function () {
        $(this).parents('.question-container').fadeOut(500, function () {
            $(this).next().fadeIn(500);
        });
        return false;
    });

    $('.btn-next').click(function () {
        $(".question-content").removeClass('show-question');
        var tempCheck = $(this).parents('.question-container');
        $(this).parents('.question-container').fadeOut(500, function () {
            $(this).next().fadeIn(500);
        });
        return false;
    });

    $('.btn-prev').click(function () {
        $(".question-content").removeClass('show-question');
        $(this).parents('.question-container').fadeOut(500, function () {
            $(this).prev().fadeIn(500)
        });
        return false;
    });

});

$(".TestSubmitButton").on("click", function () {
    var Email = $(".email").val();
    var Password = $(".password").val();

    $.get("/Umbraco/Api/TestApi/GetValidEmail?Email=" + Email + "&" + "Password=" + Password, function (data) {
        if (data == true) {
            createCookie("SignedInUser", Email, 1);
            document.location.reload()
        }
        else {
            alert("Pogresni Podaci");
        }
    })

});
$(".signOutButton").on("click", function () {
    eraseCookie("SignedInUser");
    document.location.reload()
})

function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}
// 19.11.2017 Test

(function (global) {
    "use strict";

    // Vanilla JS alternative to $.extend
    global.extend = function (obj, extObj) {
        obj = obj || {};
        if (arguments.length > 2) {
            for (var a = 1; a < arguments.length; a++) {
                global.extend(obj, arguments[a]);
            }
        } else {
            for (var i in extObj) {
                obj[i] = extObj[i];
            }
        }
        return obj;
    };

    // Countdown constructor
    var Countdown = function (conf) {
        this.conf = global.extend({
            // Dates
            dateStart: new Date(),
            dateEnd: new Date(new Date().getTime() + (45 * 60 * 1000)),

            // Default elements
            selector: ".timer",

            // Messages
            msgBefore: "Spremite!",
            msgAfter: "Vrijeme za test je isteklo!",
            msgPattern: "{minutes} minutes and {seconds} seconds left.",

            // Callbacks
            onStart: null,
            onEnd: null
        }, conf);

        // Private variables
        this.selector = document.querySelectorAll(this.conf.selector);
        this.interval = 1000;
        this.now = new Date();
        this.patterns = [
            { pattern: "{years}", secs: 31536000 },
            { pattern: "{months}", secs: 2628000 },
            { pattern: "{weeks}", secs: 604800 },
            { pattern: "{days}", secs: 86400 },
            { pattern: "{hours}", secs: 3600 },
            { pattern: "{minutes}", secs: 60 },
            { pattern: "{seconds}", secs: 1 }
        ];

        // Doing all the things!
        this.init();
    };

    // Initializing the instance     
    Countdown.prototype.init = function () {
        this.defineInterval();
        if (this.now < this.conf.dateEnd && this.now >= this.conf.dateStart) {
            this.run();
            this.callback("start");
        } else {
            this.outOfInterval();
        }
    };


    // Running the countdown
    Countdown.prototype.run = function () {
        var now = this.now.valueOf() / 1000,
            tar = this.conf.dateEnd.valueOf() / 1000,
            sec = Math.abs(tar - now);

        // Vanilla JS alternative to $.proxy
        var that = this;
        var timer = global.setInterval(function () {
            sec--;

            if (sec > 0) {
                that.display(sec);
            } else {
                clearInterval(timer);
                that.outOfInterval();
                that.callback("end");
            }
        }, this.interval);

        this.display(sec);

    };

    // Displaying the countdown
    Countdown.prototype.display = function (sec) {
        var output = this.conf.msgPattern;

        for (var b = 0; b < this.patterns.length; b++) {
            var currentPattern = this.patterns[b];

            if (this.conf.msgPattern.indexOf(currentPattern.pattern) !== -1) {
                var number = Math.floor(sec / currentPattern.secs);
                sec -= number * currentPattern.secs;
                output = output.replace(currentPattern.pattern, number);
            }
        }

        for (var c = 0; c < this.selector.length; c++) {
            this.selector[c].innerHTML = output;
        }
    };

    // Defining the interval to be used for refresh
    Countdown.prototype.defineInterval = function () {
        for (var e = this.patterns.length; e > 0; e--) {
            var currentPattern = this.patterns[e - 1];

            if (this.conf.msgPattern.indexOf(currentPattern.pattern) !== -1) {
                this.interval = currentPattern.secs * 1000;
                return;
            }
        }
    };

    // Canceling the countdown in case it's over
    Countdown.prototype.outOfInterval = function () {
        var message = this.now < this.conf.dateStart ? this.conf.msgBefore : this.conf.msgAfter;
        for (var d = 0; d < this.selector.length; d++) {
            this.selector[d].innerHTML = message;
            checkTestAnswers();
            $(".timer-container").addClass("hidden");
        }
    };

    // Dealing with events and callbacks
    Countdown.prototype.callback = function (event) {
        event = event.capitalize();

        // onStart callback
        if (typeof this.conf["on" + event] === "function") {
            this.conf["on" + event]();
        }

        // Triggering a jQuery event if jQuery is loaded
        if (typeof global.jQuery !== "undefined") {
            global.jQuery(this.conf.selector).trigger("countdown" + event);
        }
    };

    // Adding a capitalize method to String
    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    global.Countdown = Countdown;
}(window));


$(document).ready(function () {
    $(".answers").each(function () {
        var odgovor = $(this).find("li.selected").data("answerid");
        var pitanje = $(this).data("questionid");
        $('.answers[data-questionId="' + pitanje + '"]').on("click", function () {
            $('.answered-question-box[data-questionId="' + pitanje + '"]').addClass('selected');
        });

        $("body").on("click", function () {
            $(".answered-question-box").on("click", function () {
                $(".question-content").removeClass('show-question');
                $("ul[data-questionid='" + $(this).data("questionid") + "']").parent().addClass('show-question');
                $(".question-content").hide();
            });
        });

    });

});

$("body").on("click", function () {
    $(".finishedtest").on("click", function () {
        $(this).parent().parent().data("questionid");
        $("ul[data-questionid='" + $(this).parent().parent().data("questionid") + "']").parent().show();
        $("#results-container").hide();
    });
    $(".finishedtestresult").on("click", function () {
        $(this).parent().parent().data("questionid");
        $(".question-content").removeClass('show-question');
        $("ul[data-questionid='" + $(this).parent().parent().data("questionid") + "']").parent().addClass('show-question');
        $("#results-container").hide();
        $(".question-content").hide();
    });
});


$(".finish-button button").on("click", function () {

    swal({
        title: "Da li ste sigurni?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Da",
        cancelButtonText: "Ne",
        closeOnConfirm: false
    },
        function () {
            checkTestAnswers();
            swal.close();
        });




});

function checkTestAnswers() {
    $('#main-quiz-container').addClass('test-is-over');
    $(".timer-container").addClass("hidden");
    var answersCheck = JSON.parse(readCookie("PitanjaOdgovori"));
    var brojtacnih = 0;
    var html = "";
    var htmlPopUp = "";

    $(".answers").each(function () {
        var odgovor = $(this).find("li.selected").data("answerid");
        var pitanje = $(this).data("questionid");
        var tacanOdgovorId = answersCheck[pitanje].AnswerId;
        var pitanjeText = $(this).parent().find(".question h3").text();

        if (odgovor == undefined) {
            odgovor = -1;
        }
        if (tacanOdgovorId == odgovor) {
            html += "<div class='openQuestion'  data-questionId='" + pitanje + "'><div class='que-ans correct-answer'><div class='finishedtest'><p>" + pitanjeText + "</p></div></div></div>"
            htmlPopUp += "<div class='openQuestion'  data-questionId='" + pitanje + "'><div class='que-ans correct-answer'><div class='finishedtestresult' data-dismiss='modal'></div></div></div>"
            brojtacnih++;
        }
        else {
            html += "<div class='openQuestion' data-questionId='" + pitanje + "'><div class='que-ans wrong-answer'><div class='finishedtest'><p>" + pitanjeText + "</p></div></div></div>"
            htmlPopUp += "<div class='openQuestion' data-questionId='" + pitanje + "'><div class='que-ans wrong-answer'><div class='finishedtestresult' data-dismiss='modal'></div></div></div>"

        }

        var newFind = $("ul[data-questionid*='" + pitanje + "']");
        newFind.find("li").filter("[data-answerid='" + tacanOdgovorId + "']").addClass("finishedTestCorrectA");
    });

    $(".que-ans-container").html("");
    $(".que-ans-container").html(html);

    $(".answered-popup").html("");
    $(".answered-popup").html(htmlPopUp);

    $(".correctAnswersCount").text(brojtacnih);
    $(".answersCount").text(answersCheck.length);
    var procenat = ((brojtacnih / answersCheck.length) * 100).toFixed(1);
    $(".correctPercent").text(procenat);

    if (procenat > 90) {
        $(".q-title").text("Cestitamo, polozili ste !");

    }
    else {
        $(".q-title").text("Nazalost, niste polozili !");
        $(".q-title").addClass("not-passed");
        $(".correctPercent").addClass("not-passed");
    }
    $('#result-keeper').show();

    $(".btn-show-result").parents('.question-container').fadeOut(500, function () {
        $('#result-keeper').show().fadeIn(500);
        $('#results-container').removeClass('hide-content');
    });

}

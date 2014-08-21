// translate mouse events into touch events
function touchHandler(event) {
    var touch = event.changedTouches[0];

    var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent({
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup"
    }[event.type], true, true, window, 1,
        touch.screenX, touch.screenY,
        touch.clientX, touch.clientY, false,
        false, false, false, 0, null);

    touch.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}

function init() {
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);
}

var availableCommands = ["[[b;#000;#d3d3d3]help, list, ls] - List the available commands", "[[b;#000;#d3d3d3]about] - Learn a little about me", "[[b;#000;#d3d3d3]resume] - View my resume", "[[b;#000;#d3d3d3]projects] - View a list of some recent projects I have been working on.", "[[b;#000;#d3d3d3]contact] - Get my contact info", "[[b;#000;#d3d3d3]blog] - View my latest blog entry"];
var commands = {
    list: function(term) {
        for (i = 0; i < availableCommands.length; i++) {
            term.echo(availableCommands[i]);
        }
    },
    about: function(term) {
        term.clear();
        term.echo('I am an outgoing and ambitious Infosec professional who loves to build and break things. \nYou can view my [[b;#000;#d3d3d3]contact] info if you\'d like. You can also take a look at my [[b;#000;#d3d3d3]resume] if you\'d like.');
    },
    resume: function(term) {
        term.echo('To download a pdf of my resume, enter the command [[b;#000;#d3d3d3]download], otherwise enter [[b;#000;#d3d3d3]view_resume] to open it in your browser');
    },
    resumeView: function(term) {
        term.echo('Loading resume...');
        setTimeout(function() {
            location.href = 'http://gabemarshall.me/resume'
        }, 2000)
    },
    resumeDownload: function(term) {
        $.get('/resumed', function(data) {});
    },
    projects: function(term) {
        term.echo('Heart of Honor (javascript fighting game) http://www.heartofhonor.com\nEnigma (string encoder/decoder command line tool) https://github.com/gabemarshall/enigma\ncasperXSS (reflective/dom xss scanner) https://github.com/gabemarshall/casperXSS');
    },
    contact: function(term) {
        term.echo('Email: gabemarshall@me.com\nTwitter: @gabemarshall\nQuora: http://www.quora.com/Gabe-Marshall\nGithub: https://github.com/gabemarshall');
    },
    blog: function(term) {
        term.echo('I have blog I occasionally write in. To view it, enter the command [[b;#000;#d3d3d3]view_blog]')
    },
    blogview: function(term) {
        term.echo('Loading blog...');
        setTimeout(function() {
            location.href = 'http://blog.gabemarshall.me'
        }, 2000)
    },
    goto: function(term, projectUrl) {
        term.echo('Coming soon...');
    }
}
jQuery(function($, undefined) {
    $('#term_demo').terminal(function(command, term) {
        if (command !== '') {
            switch (command) {
                case 'help':
                    commands.list(term);
                    break;
                case 'list':
                    commands.list(term);
                    break;
                case 'ls':
                    commands.list(term);
                    break;
                case 'about':
                    commands.about(term);
                    break;
                case 'resume':
                    commands.resumeView(term);
                    break;
                case 'projects':
                    commands.projects(term);
                    break;
                case 'contact':
                    commands.contact(term);
                    break;
                case 'blog':
                    commands.blog(term);
                    break;
                case 'view_resume':
                    commands.resumeView(term);
                    break;
                case 'download':
                    commands.resumeDownload(term);
                    break;
                case 'view_blog':
                    commands.blogview(term);
                    break;
                default:
                    term.echo('Unknown command...type \'help\' to see a list of commands');
            }
        } else {
            term.echo('Unknown command...type \'help\' to see a list of commands');
        }
    }, {
        greetings: 'Welcome...type [[b;#000;#d3d3d3]help] to see a list of commands. (Feel free to drag me or the terminal around if needed)',
        name: 'js_demo',
        width: '85%',
        height: 123,
        prompt: '$> '
    });
});
$('#term_demo').click(function() {
    this.focus();
})

var blink = '/images/me250_blink.png'
var no_blink = '/images/me250.png'

$(document).ready(function() {
   
    init()

    var blinkMe = function() {
        $(".pixelMe").attr('src', blink);
        setTimeout(function() {
            $(".pixelMe").attr('src', no_blink);
        }, 150)
    }

    var blinkCalculation = function() {
        var rollToBlink = Math.floor((Math.random() * 5) + 1);
        if (rollToBlink === 5) {
            blinkMe()
        }
    }

    setInterval(function() {
        blinkCalculation()
    }, 1000)



    $(function() {
        $("#term_demo").draggable();
        $(".pixelMe").draggable();
    });


})


var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-35231375-2']);
_gaq.push(['_trackPageview']);
(function() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();

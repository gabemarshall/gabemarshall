var availableCommands = ["[[b;#000;#d3d3d3]help, list, ls] - List the available commands", "[[b;#000;#d3d3d3]about] - Learn a little about me", "[[b;#000;#d3d3d3]resume] - View my resume", "[[b;#000;#d3d3d3]projects] - View a list of some recent projects I have been working on.", "[[b;#000;#d3d3d3]contact] - Get my contact info", "[[b;#000;#d3d3d3]blog] - View my latest blog entry"];
var commands = {
    list: function(term) {
        for (i = 0; i < availableCommands.length; i++) {
            term.echo(availableCommands[i]);
        }
    },
    about: function(term) {
        term.clear();
        term.echo('I\'m an outgoing IT professional passionate about all things related to the web and information security. \nIf you\'d like my contact info, say [[b;#000;#d3d3d3]contact]. To see my resume just say [[b;#000;#d3d3d3]resume]');
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
        term.echo('Heart of Honor (javascript game) http://www.heartofhonor.com\nnTrace (XST detection tool) https://github.com/gabemarshall/ntrace\ncasperXSS (Reflective/Dom XSS scanner) https://github.com/gabemarshall/casperXSS\nmdcrack-js (md5 hash cracker with online search capability) https://github.com/gabemarshall/mdcrack-js');
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
        greetings: 'Welcome...type [[b;#000;#d3d3d3]help] to see a list of commands. (Feel free to drag the terminal)',
        name: 'js_demo',
        width: '95%',
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

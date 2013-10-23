var push = require( 'pushover-notifications' );



exports.message = function(push_message, push_title){

var p = new push( {
    user: 'wThnJM3P5uwYkoP6ewPRBTdFJd2RVV',
    token: 'GhEKNbRHjSx4AZsayrUGr76HofD6Df',
});

    var msg = {
        message: push_message,
        title: push_title
    };

    p.send( msg, function( err, result ) {
        if ( err ) {
            throw err;
        }

        console.log( result );
    }); 

}

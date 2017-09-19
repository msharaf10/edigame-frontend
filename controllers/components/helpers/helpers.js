exports.regex = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    stringHasSpace: /^[a-zA-Z0-9-_]+$/
}

exports.getToken = () => {
    if ( localStorage.token ) {
		var user = JSON.parse( atob( localStorage.token.split( '.' )[ 1 ]));
        if ( user.hasOwnProperty( 'id' ) )
            return user;
        return false;
    } else {
		return false;
    }
}

exports.validPhone = ( phone ) => {
    var userPhone = '';
    for ( var i = 0; i < phone.length; i++ ) {
        if ( !isNaN( phone[ i ] ) )
            userPhone += phone[ i ];
    }
    if ( userPhone.length !== 11 )
        return false;
    return true;
}

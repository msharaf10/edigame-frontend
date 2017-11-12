/* Using (Browser LocalStorage API) To Get, Save or Remove Tokens */

export const options = ( method, data ) => ({
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': loadToken() || ''
    },
    method: method || 'GET',
    body: data ? JSON.stringify( data ) : undefined
})

export const loadToken = () => {
    let token, payload
    try {
        token = localStorage.getItem( 'token' )
        if ( token === null )
            return undefined

        payload = JSON.stringify( atob( token.split( '.' )[ 1 ] ) )
        if ( !payload.hasOwnProperty( 'id' ) )
            return undefined

        return token
    } catch ( err ) {
        removeToken()
        return undefined
    }
}

export const loadPayload = () => {
    let token, payload
    try {
        token = localStorage.getItem( 'token' )
        if ( token === null )
            return undefined

        payload = JSON.stringify( atob( token.split( '.' )[ 1 ] ) )
        if ( !payload.hasOwnProperty( 'id' ) )
            return undefined

        return payload
    } catch ( err ) {
        removeToken()
        return undefined
    }
}

export const saveToken = token => {
    if ( !token )
        throw ( 'Missing token' )
    if ( typeof token !== 'string' )
        throw ( 'Expected token to be a string' )

    try {
        localStorage.setItem( 'token', token )
        window.location = '/'
    } catch ( err ) {
        console.error( err )
    }
}

export const removeToken = () => {
    try {
        localStorage.removeItem( 'token' )
        window.location = '/'
    } catch ( err ) {
        console.error( err )
    }
}

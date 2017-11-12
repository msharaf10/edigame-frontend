export const defaultImg = 'avatar-default.png'

export const vaildEmail = email => {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return ( regex ).test( email )
}

export const hasSpace = string => {
    let regex = /^[a-zA-Z0-9-_]+$/
    return !( regex ).test( string )
}

export const validPhone = phone => {
    let userPhone = '',
        i

    for ( i = 0; i < phone.length; i++ ) {
        if ( !isNaN( phone[ i ] ) )
            userPhone += phone[ i ]
    }

    if ( userPhone.length !== 11 )
        return false

    return true
}

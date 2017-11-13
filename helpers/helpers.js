exports.validID = id => {
    let regex = /^[a-fA-F0-9]{24}$/;
    return ( regex ).test( id );
}

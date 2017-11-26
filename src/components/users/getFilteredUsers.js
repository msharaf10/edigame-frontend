const getFilteredUsers = ( users, query ) => {
    return users.filter( user => {
        let fullName = `${ user.firstName } ${ user.lastName }`
        return (
            user.firstName.toLowerCase().indexOf( query.toLowerCase() ) > -1 || // match first name
            user.lastName.toLowerCase().indexOf( query.toLowerCase() ) > -1 ||  // match last name
            user.username.toLowerCase().indexOf( query.toLowerCase() ) > -1 ||  // match username
            fullName.toLowerCase().indexOf( query.toLowerCase() ) > -1          // match fullname
            )
    })
}

export default getFilteredUsers

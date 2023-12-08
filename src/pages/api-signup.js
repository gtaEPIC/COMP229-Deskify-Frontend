let apiURL = process.env.REACT_APP_APIURL || 'http://localhost:3000'

const signup = async (user) => {
    try {
        let response = await fetch(apiURL + '/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export { signup }
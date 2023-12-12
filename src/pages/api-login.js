let apiURL = process.env.REACT_APP_APIURL || 'http://localhost:3000'

const login = async (user) => {
    try {
        let response = await fetch(apiURL + '/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            console.log(response);
            return {success: false, message: "Login failed", status: response.status};
        }
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export { login }
import auth0 from "auth0-js"

const auth0Client = new auth0.WebAuth({
	// the following three lines MUST be updated
	domain: "nevejestvo.eu.auth0.com",
	audience: "https://nevejestvo.eu.auth0.com/userinfo",
	clientID: "2ZJxhsyNynJIDymj0h34rM657bL8flSe",
	redirectUri: "http://localhost:3000/callback",
	responseType: "id_token",
	scope: "openid profile email",
})

export function handleAuthentication() {
	return new Promise((resolve, reject) => {
		auth0Client.parseHash((err, authResult) => {
			if (err) return reject(err)
			if (!authResult || !authResult.idToken) {
				return reject(err)
			}
			const idToken = authResult.idToken
			const profile = authResult.idTokenPayload
			// set the time that the id token will expire at
			const expiresAt = authResult.idTokenPayload.exp * 1000
			resolve({
				authenticated: true,
				idToken,
				profile,
				expiresAt,
			})
		})
	})
}

export function signIn() {
	auth0Client.authorize()
}

export function signOut() {
	auth0Client.logout({
		returnTo: "http://localhost:3000",
		clientID: "2ZJxhsyNynJIDymj0h34rM657bL8flSe",
	})
}

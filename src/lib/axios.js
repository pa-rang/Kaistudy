import axios from "axios"

const singleton = Symbol()
const singletonEnforcer = Symbol()

class Axios {
	constructor(enforcer) {
		if (enforcer !== singletonEnforcer) {
			throw new Error("Cannot construct singleton")
		}
		this.session = axios.create({
			headers: {
				post: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			},
			timeout: 30000,
			baseURL: "http://52.78.179.78:4000",
			withCredentials: true
		})
	}

	static get instance() {
		if (!this[singleton]) {
			this[singleton] = new Axios(singletonEnforcer)
		}
		return this[singleton]
	}

	get = (...params) => this.session.get(...params)
	post = (...params) => this.session.post(...params)
	put = (...params) => this.session.put(...params)
	delete = (...params) => this.session.delete(...params)
	patch = (...params) => this.session.patch(...params)
	head = (...params) => this.session.head(...params)
}

export default Axios.instance

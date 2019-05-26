import { setAuth } from "./store/reducers/app"
import { bindActionCreators } from "redux"

export default (store) => {
	;(function() {
		var throttle = function(type, name, obj) {
			obj = obj || window
			var running = false
			var func = function() {
				if (running) {
					return
				}
				running = true
				requestAnimationFrame(function() {
					obj.dispatchEvent(new CustomEvent(name))
					running = false
				})
			}
			obj.addEventListener(type, func)
		}

		/* init - you can init any event */
		throttle("resize", "optimizedResize")
		throttle("scroll", "optimizedScroll")
	})()


	const setAuthBinded = bindActionCreators(setAuth, store.dispatch)
	setAuthBinded()
}

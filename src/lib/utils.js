const isValidDate = date => date instanceof Date && !isNaN(date)

export function formatDate(timestamp) {
	if (!timestamp) return

	const date = new Date(timestamp)

	if (isValidDate(date)) {
		return getDateTime(new Date(timestamp))
	} else {
		return getDateTime(new Date(timestamp))
	}
}

const getDateTime = now => {
	let date = [
		now.getDate(),
		now.getMonth() + 1,
		now
			.getFullYear()
			.toString()
			.substr(-2),
	].map(d => (d.toString().length === 1 ? "0" + d : d))

	let time = [now.getHours(), now.getMinutes()]

	time = time.map(t => (t.toString().length === 1 ? "0" + t : t))

	return date.join("/") + " - " + time.join(":")
}

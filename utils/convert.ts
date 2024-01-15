export const stringToB64 = (text: string) =>
	Buffer.from(text).toString("base64")
export const classesToClass = (...classes: string[]) => {
	if (classes.length === 0) {
		return ""
	}

	let result = classes[0]

	for (let i = 1; i < classes.length; i++) {
		let className = classes[i]
		if (className === "") {
			continue
		}
		result += ` ${classes[i]}`
	}

	return result
}

export const stringToBool = (text: string) => text.toLowerCase() === "true"
export const stringToB64 = (text: string) =>
	Buffer.from(text).toString("base64")
export const fileToB64 = (file: File) => {
	return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => {
			resolve(reader.result)
		}
		reader.onerror = (error) => {
			reject(error)
		}
	})
}
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

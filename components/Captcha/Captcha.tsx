"use client"

import {useState} from "react"
import ReCAPTCHA from "react-google-recaptcha"

const Captcha = ({publicKey}: {publicKey: string}) => {
	const [token, setToken] = useState<string>("")

	const handleChange = async (token: string | null) => {
		if (token !== null) {
			setToken(token)
		}
	}

	return (
		<>
			<ReCAPTCHA
				sitekey={publicKey}
				onChange={handleChange}
			/>
			<input
				type="hidden"
				name="token"
				value={token}
			/>
		</>
	)
}

export default Captcha

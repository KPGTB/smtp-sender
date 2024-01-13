declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NEXTAUTH_SECRET: string
			NEXTAUTH_URL: string
			RECAPTCHA_SECRET: string
			RECAPTCHA_PUBLIC: string
		}
	}
}
export {}

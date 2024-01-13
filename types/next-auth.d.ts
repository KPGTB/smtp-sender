import {JWT} from "next-auth/jwt"

type UserDataType = {
	id: string
	smtpData: SMTPTransport.Options
}

declare module "next-auth" {
	interface Session extends DefaultSession {
		user: UserDataType
	}
	interface User extends UserDataType {}
}

declare module "next-auth/jwt" {
	interface JWT {
		userData: UserDataType
	}
}

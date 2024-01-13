import {NextAuthOptions} from "next-auth"
import NextAuth from "next-auth/next"
import Credentials from "next-auth/providers/credentials"
import {createTransport} from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport/index"

import {stringToB64} from "@/utils/convert"

const authOptions = {
	providers: [
		Credentials({
			name: "SMTP",
			credentials: {
				server: {type: "text"},
				port: {type: "number"},
				secure: {type: "checkbox"},
				login: {type: "text"},
				password: {type: "password"},
			},
			async authorize(credentials, req) {
				if (credentials == null) {
					return null
				}

				const {server, port, secure, login, password} = credentials

				if (
					server == null ||
					port == null ||
					login == null ||
					password == null
				) {
					return null
				}

				const smtpData: SMTPTransport.Options = {
					host: server,
					port: Number(port),
					secure: secure === "on",
					auth: {
						user: login,
						pass: password,
					},
				}
				const transporter = createTransport(smtpData)

				const verified: boolean = await new Promise(
					(resolve, reject) => {
						transporter.verify(function (error, success) {
							resolve(!error)
						})
					}
				)

				const id = stringToB64(`${server}:${port}:${login}:${password}`)
				return verified ? {id: id, smtpData: smtpData} : null
			},
		}),
	],
	pages: {
		signIn: "/signIn",
	},
	callbacks: {
		async session({token, session}) {
			if (token && token.userData && session.user) {
				session.user = token.userData
			}
			return session
		},
		async jwt({token, user}) {
			if (user) {
				token.userData = user
			}

			return token
		},
	},
} satisfies NextAuthOptions

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST, authOptions}

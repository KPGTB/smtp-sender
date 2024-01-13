import type {Metadata} from "next"
import "./globals.scss"

import {getServerSession} from "next-auth"
import {Inter} from "next/font/google"

import {LogoutButton} from "@/components/ui/Button/Button"
import Cookies from "@/components/ui/Cookies/Cookies"

import {authOptions} from "./api/auth/[...nextauth]/route"

const inter = Inter({subsets: ["latin"], weight: ["400", "700", "900"]})

const title = "SMTP Sender"
const description =
	"SMTP Sender - Simple tool to send messages using SMTP protocol."
const website = "https://smtp.kpgtb.eu"

export const metadata: Metadata = {
	title: title,
	description: description,
	metadataBase: new URL(website),
	openGraph: {
		type: "website",
		url: website,
		title: title,
		description: description,
		siteName: title,
		images: "/logo.png",
	},
}

const Layout = async ({children}: {children: React.ReactNode}) => {
	const session = await getServerSession(authOptions)
	const logged = session !== null && session.user !== undefined

	return (
		<html lang="en">
			<body className={inter.className}>
				<Cookies font={inter.className} />

				{logged && (
					<LogoutButton className="logout">Logout</LogoutButton>
				)}
				<main>{children}</main>
				<footer>
					SMTP Sender App | KPG-TB 2024 &copy; Licensed under{" "}
					<a href="https://github.com/KPGTB/smtp-sender/blob/main/LICENSE">
						Apache 2.0
					</a>
				</footer>
			</body>
		</html>
	)
}

export default Layout

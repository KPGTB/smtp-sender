"use server"

import {promises as fs} from "fs"
import {getServerSession} from "next-auth/next"
import {cookies as useCookies} from "next/headers"
import {redirect} from "next/navigation"
import {createTransport} from "nodemailer"
import Mail from "nodemailer/lib/mailer/index"
import SMTPTransport from "nodemailer/lib/smtp-transport/index"

import {authOptions} from "./api/auth/[...nextauth]/route"

const sendMail = async (data: FormData) => {
	const session = await getServerSession(authOptions)
	const logged = session !== null && session.user !== undefined
	if (!logged) return

	const title = data.get("title") as string
	const from = data.get("from") as string
	const to = data.get("to") as string
	const editorContent = data.get("editor") as string
	const token = data.get("token") as string

	if (token === "") {
		redirect("/send?error=You need to complete ReCaptcha!")
		return
	}
	if (title === "" || to === "" || from === "" || editorContent === "") {
		redirect("/send?error=You need to fill each input!")
		return
	}

	const expire = 24 * 60 * 60 * 1000
	useCookies().set("from", from, {expires: Date.now() + expire})

	const captcha = await verifyCaptcha(token)
	if (!captcha) {
		redirect("/send?error=Captcha failed!")
		return
	}

	const content = await createContent(editorContent)
	const options = {
		from: from,
		to: to,
		subject: title,
		html: content,
	}
	const result = await send(options, session.user.smtpData)
	if (result === true) {
		redirect("/send?success=yes")
		return
	}

	redirect(`/send?error=${result}`)
}

const verifyCaptcha = async (token: string) => {
	const res = await fetch(
		`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		}
	)
	const json = await res.json()
	return json.success
}

const send = async (options: Mail.Options, smtp: SMTPTransport.Options) => {
	const transporter = createTransport(smtp)
	const success: string | boolean = await transporter
		.sendMail(options)
		.then(() => true)
		.catch((err) => err.message)
	return success
}

const createContent = async (editor: string) => {
	const template = await fs.readFile(
		process.cwd() + "/assets/template.html",
		"utf-8"
	)
	return template
		.replace("{{{content}}}", editor)
		.replaceAll(
			'"image_resized" style="',
			'"image_resized" style="height: auto;'
		)
}

export default sendMail

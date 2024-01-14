import "react-toastify/dist/ReactToastify.css"

import {promises as fs} from "fs"
import {getServerSession} from "next-auth"
import {cookies as useCookies} from "next/headers"
import {redirect} from "next/navigation"
import {createTransport} from "nodemailer"
import {BiSolidContact} from "react-icons/bi"
import {FaUser} from "react-icons/fa"
import {MdMail} from "react-icons/md"

import {ButtonWithLoading} from "@/components/Button/Button"
import Captcha from "@/components/Captcha/Captcha"
import Input from "@/components/Input/Input"
import TextEditor from "@/components/TextEditor/TextEditor"
import {ToastError, ToastSuccess} from "@/components/Toast/Toast"
import {classesToClass} from "@/utils/convert"

import {authOptions} from "./api/auth/[...nextauth]/route"
import styles from "./page.module.scss"

const send = async (data: FormData) => {
	"use server"
	const session = await getServerSession(authOptions)
	const logged = session !== null && session.user !== undefined

	if (!logged) {
		return
	}

	const title = data.get("title") as string
	const from = data.get("from") as string
	const to = data.get("to") as string
	const editorContent = data.get("editor") as string
	const token = data.get("token") as string

	const expire = 24 * 60 * 60 * 1000
	useCookies().set("from", from, {expires: Date.now() + expire})

	if (token === "") {
		redirect("/send?error=You need to complete ReCaptcha!")
		return
	}

	if (title === "" || to === "" || from === "" || editorContent === "") {
		redirect("/send?error=You need to fill each input!")
		return
	}

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

	if (!json.success) {
		redirect("/send?error=Captcha failed!")
		return
	}

	const template = await fs.readFile(
		process.cwd() + "/assets/template.html",
		"utf-8"
	)
	const content = template
		.replace("{{{content}}}", editorContent)
		.replaceAll(
			'"image_resized" style="',
			'"image_resized" style="height: auto;'
		)

	const transporter = createTransport(session.user.smtpData)
	const options = {
		from: from,
		to: to,
		subject: title,
		html: content,
	}
	await transporter.sendMail(options).catch((err) => {
		redirect(`/send?error=${err.message}`)
		return
	})
	redirect("/send?success=yes")
}

const Page = ({
	searchParams,
}: {
	searchParams: {error?: string; success?: string}
}) => {
	let from = useCookies().get("from")?.value || ""
	return (
		<article>
			<form
				className={classesToClass(styles.container)}
				action={send}
			>
				<h2>SMTP Sender</h2>

				<Input
					name="from"
					placeholder="Example Author <example@example.com>"
					defaultValue={from}
					className={styles.input}
					container={styles.inputContainer}
					label={"From"}
					icon={{i: FaUser}}
				/>

				<Input
					name="to"
					placeholder="target1@example.com, target2@example.com"
					className={styles.input}
					container={styles.inputContainer}
					label={"To (split emails using comma)"}
					icon={{i: BiSolidContact}}
				/>

				<Input
					name="title"
					placeholder="Title"
					className={styles.input}
					container={styles.inputContainer}
					label={"Title"}
					icon={{i: MdMail}}
				/>

				<TextEditor
					placeholder="Type your message here..."
					name="editor"
				/>

				<Captcha publicKey={process.env.RECAPTCHA_PUBLIC} />
				<ButtonWithLoading aria-label="Send message">
					Send
				</ButtonWithLoading>

				{searchParams.error && <ToastError text={searchParams.error} />}

				{searchParams.success === "yes" && (
					<ToastSuccess text="Messages has been sent!" />
				)}
			</form>
		</article>
	)
}

export default Page

import {cookies as useCookies} from "next/headers"
import {BiSolidContact} from "react-icons/bi"
import {FaUser} from "react-icons/fa"
import {MdMail} from "react-icons/md"

import {ButtonWithLoading} from "@/components/Button/Button"
import Captcha from "@/components/Captcha/Captcha"
import Input from "@/components/Input/Input"
import TextEditor from "@/components/TextEditor/TextEditor"
import {ToastError, ToastSuccess} from "@/components/Toast/Toast"
import {classesToClass} from "@/utils/convert"

import sendMail from "./actions"
import styles from "./page.module.scss"

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
				action={sendMail}
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

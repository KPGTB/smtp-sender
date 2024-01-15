"use client"

import {signIn} from "next-auth/react"
import {useSearchParams} from "next/navigation"
import {FaKey, FaServer, FaUser} from "react-icons/fa"

import {ButtonWithLoading} from "@/components/Button/Button"
import Input from "@/components/Input/Input"
import {ToastError} from "@/components/Toast/Toast"
import {classesToClass} from "@/utils/convert"

import styles from "./page.module.scss"

const handleForm = async (e: any) => {
	e.preventDefault()
	const data = new FormData(e.target)
	await signIn("credentials", {
		server: data.get("server"),
		port: data.get("port"),
		secure: data.get("secure"),
		login: data.get("login"),
		password: data.get("password"),
		redirect: true,
		callbackUrl: "/",
	})
}

const Page = () => {
	const params = useSearchParams()
	const hasError: boolean = params.has("error")

	return (
		<article>
			<form
				className={classesToClass(styles.container)}
				onSubmit={(e) => {
					handleForm(e)
				}}
			>
				<h2>SMTP Credentials</h2>
				<section className={styles.server}>
					<Input
						name="server"
						placeholder="smtp.gmail.com"
						className={styles.host}
						container={styles.hostContainer}
						icon={{i: FaServer}}
						label={"Host"}
					/>
					<Input
						name="port"
						placeholder="23"
						pattern="^[1-9][0-9]{0,4}$"
						className={styles.port}
						container={styles.portContainer}
						icon={{i: FaServer}}
					/>
				</section>

				<section className={styles.credentials}>
					<Input
						name="login"
						placeholder="Login"
						className={styles.input}
						container={styles.inputContainer}
						icon={{i: FaUser}}
						label={"Login to SMTP"}
					/>
					<Input
						name="password"
						type="password"
						placeholder="Password"
						className={styles.input}
						container={styles.inputContainer}
						icon={{i: FaKey}}
						label={"Password to SMTP"}
					/>
				</section>

				<section>
					<input
						type="checkbox"
						name="secure"
						className={styles.checkbox}
					/>{" "}
					Use secure connection
				</section>

				<ButtonWithLoading aria-label="Sign in">
					Sign in
				</ButtonWithLoading>
			</form>

			{hasError && <ToastError text="Wrong credentials!" />}
		</article>
	)
}

export default Page

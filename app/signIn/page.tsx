"use client"

import "react-toastify/dist/ReactToastify.css"

import {signIn} from "next-auth/react"
import {useSearchParams} from "next/navigation"
import {useEffect, useState} from "react"
import {Bounce, toast, ToastContainer} from "react-toastify"

import {Button} from "@/components/ui/Button/Button"
import Input from "@/components/ui/Input/Input"
import Ring from "@/components/ui/loading/Loading"
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
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		if (hasError) {
			toast.error("Wrong credentials!", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
				transition: Bounce,
			})
		}
	}, [hasError])

	return (
		<article>
			<form
				className={classesToClass(
					styles.container,
					hasError ? styles.errorContainer : ""
				)}
				onSubmit={(e) => {
					setLoading(true)
					handleForm(e)
				}}
			>
				<h2>SMTP Credentials</h2>
				<section className={styles.server}>
					<Input
						name="server"
						placeholder="smtp.gmail.com"
						className={styles.host}
						required
					/>
					<Input
						name="port"
						placeholder="23"
						pattern="^[1-9][0-9]{0,4}$"
						className={styles.port}
						required
					/>
				</section>

				<section className={styles.credentials}>
					<Input
						name="login"
						placeholder="Login"
						className={styles.input}
						required
					/>
					<Input
						name="password"
						type="password"
						placeholder="Password"
						className={styles.input}
						required
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

				{loading ? (
					<Ring />
				) : (
					<Button aria-label="Connect">Connect</Button>
				)}
			</form>

			<ToastContainer />
		</article>
	)
}

export default Page

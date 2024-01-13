import {cookies as useCookies} from "next/headers"

import {classesToClass} from "@/utils/convert"

import {Button} from "../Button/Button"
import styles from "./Cookies.module.scss"

const Cookies = ({font}: {font: string}) => {
	const accept = useCookies().has("allowCookies")

	const allowCookies = async () => {
		"use server"
		const expire = 24 * 60 * 60 * 1000
		useCookies().set("allowCookies", "", {expires: Date.now() + expire})
	}

	return (
		<form
			className={classesToClass(
				font,
				styles.container,
				accept ? styles.hide : ""
			)}
			action={allowCookies}
		>
			<img
				src="/Cookie.png"
				alt="Cookie Image"
				className={styles.image}
			/>
			<section>
				<h3>We value your privacy</h3>
				<p>
					This website uses only necessary cookies to provide accounts
					system. If you continue use of this website, we assume that
					you are okay with it.
				</p>
			</section>
			<Button aria-label="Got it">Got it</Button>
		</form>
	)
}

export default Cookies

import {DetailedHTMLProps, InputHTMLAttributes} from "react"
import {IconType} from "react-icons"
import {BsChatText} from "react-icons/bs"

import {classesToClass} from "@/utils/convert"

import styles from "./Input.module.scss"

const Input = ({
	className,
	container,
	icon = {i: BsChatText},
	label,
	...delegated
}: {
	className?: string
	container?: string
	icon?: {i: IconType}
	label?: string
} & DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>) => {
	return (
		<section className={classesToClass(styles.container, container || "")}>
			<p className={styles.label}>{label}</p>
			<input
				className={classesToClass(styles.input, className || "")}
				{...delegated}
			/>
			<icon.i className={styles.icon} />
		</section>
	)
}
export default Input

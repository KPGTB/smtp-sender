import {DetailedHTMLProps, InputHTMLAttributes} from "react"

import {classesToClass} from "@/utils/convert"

import styles from "./Input.module.scss"

const Input = ({
	className,
	...delegated
}: {
	className?: string
} & DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>) => {
	return (
		<input
			className={classesToClass(styles.input, className || "")}
			{...delegated}
		/>
	)
}
export default Input

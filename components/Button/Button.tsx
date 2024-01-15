"use client"

import {signOut} from "next-auth/react"
import {ButtonHTMLAttributes, DetailedHTMLProps, useRef, useState} from "react"

import {classesToClass} from "@/utils/convert"

import Ring from "../loading/Loading"
import styles from "./Button.module.scss"

const Button = ({
	children,
	className,
	...delegated
}: {
	children: React.ReactNode
	className?: string
} & DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>) => {
	return (
		<button
			className={classesToClass(styles.button, className || "")}
			{...delegated}
		>
			{children}
		</button>
	)
}

const LogoutButton = ({
	children,
	className,
	...delegated
}: {
	children: React.ReactNode
	className?: string
}) => {
	return (
		<Button
			className={className}
			onClick={() => signOut()}
			{...delegated}
		>
			{children}
		</Button>
	)
}

const ButtonWithLoading = ({
	children,
	className,
	...delegated
}: {
	children: React.ReactNode
	className?: string
}) => {
	const [clicked, setClicked] = useState<boolean>(false)
	const ref = useRef<HTMLButtonElement>(null)
	return clicked ? (
		<Ring />
	) : (
		<>
			<button
				className={styles.hidden}
				ref={ref}
			></button>
			<Button
				className={className}
				onClick={() => {
					setClicked(true)
					ref.current?.click()
				}}
				{...delegated}
			>
				{children}
			</Button>
		</>
	)
}

export {Button, LogoutButton, ButtonWithLoading}

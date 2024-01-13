"use client"

import {signOut} from "next-auth/react"
import Link from "next/link"
import {ButtonHTMLAttributes, DetailedHTMLProps} from "react"

import {classesToClass} from "@/utils/convert"

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

const LinkButton = ({
	children,
	href,
	className,
	...delegated
}: {
	children: React.ReactNode
	href: string
	className?: string
}) => {
	return (
		<Link
			href={href}
			className={classesToClass(styles.button, className || "")}
			{...delegated}
		>
			{children}
		</Link>
	)
}

export {Button, LinkButton, LogoutButton}

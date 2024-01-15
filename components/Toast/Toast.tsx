"use client"

import "react-toastify/dist/ReactToastify.css"

import {useEffect} from "react"
import {Bounce, toast, ToastContainer} from "react-toastify"

const ToastError = ({text}: {text: string}) => {
	useEffect(() => {
		toast.error(text, {
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
	}, [])

	return <ToastContainer />
}

const ToastSuccess = ({text}: {text: string}) => {
	useEffect(() => {
		toast.success(text, {
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
	}, [])

	return <ToastContainer />
}

export {ToastError, ToastSuccess}

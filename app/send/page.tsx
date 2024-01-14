import {redirect} from "next/navigation"

const Page = ({
	searchParams,
}: {
	searchParams: {error?: string; success?: string}
}) => {
	if (searchParams.error) {
		redirect(`/?error=${searchParams.error}`)
	}
	if (searchParams.success) {
		redirect(`/?success=${searchParams.success}`)
	}

	return <></>
}

export default Page

import {withAuth} from "next-auth/middleware"
import {NextResponse} from "next/server"

export default withAuth(
	function middleware(req) {
		const path = req.nextUrl.pathname
		const token = req.nextauth.token

		if (isOnlyForUnauthorized(path) && token !== null) {
			return NextResponse.redirect(new URL("/", req.url))
		}
	},
	{
		callbacks: {
			authorized: ({token, req}) => {
				const path = req.nextUrl.pathname
				if (isOnlyForUnauthorized(path)) {
					return true
				}

				return token !== null
			},
		},
	}
)

const isOnlyForUnauthorized = (path: string) => {
	return path.startsWith("/signIn")
}

export const config = {
	matcher: ["/", "/signIn"],
	runtime: "experimental-edge",
	unstable_allowDynamic: ["/node_modules/mongoose/**"],
}

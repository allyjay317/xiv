import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router"
import { useSiteContext } from "../SiteContext"



export const LoginRedirect = () => {
    const [searchParams] = useSearchParams()
    const {logIn} = useSiteContext()
    const navigate = useNavigate()
    useEffect(() => {
        const authorization_token = searchParams.get('authorization_token')
        const token_type = searchParams.get("token_type")
        logIn({
            authorization_token,
            token_type
        })
        navigate('/user')
    }, [])

    return <></>
}
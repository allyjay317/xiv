import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router"
import { useSiteContext } from "../SiteContext"



export const LoginRedirect = () => {
    const [searchParams] = useSearchParams()
    const {logIn} = useSiteContext()
    const navigate = useNavigate()
    useEffect(() => {
        const id = searchParams.get('id')
        logIn(id)
        navigate('/user')
    }, [])

    return <></>
}
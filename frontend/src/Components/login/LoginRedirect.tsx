import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router"
import { useSiteContext } from "../context/useSiteContext"



export const LoginRedirect = () => {
    const [searchParams] = useSearchParams()
    const {logIn} = useSiteContext()
    const navigate = useNavigate()
    useEffect(() => {
        const id = searchParams.get('id')
        if(!id){
            return
        }
        logIn(id)
        navigate('/user')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <></>
}
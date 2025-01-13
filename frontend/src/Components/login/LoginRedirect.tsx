import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router"
import { useSiteContext } from "../SiteContext"

export const LoginRedirect = () => {
    const [searchParams] = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)
    const {logIn} = useSiteContext()
    const navigate = useNavigate()
    const client_id = import.meta.env.VITE_CLIENT_ID
    const client_secret = import.meta.env.VITE_CLIENT_SECRET
    useEffect(() => {
        if(isLoading) return
        const code = searchParams.get('code')
        if(code){
            setIsLoading(true)
            axios.post('https://discord.com/api/oauth2/token', {
                client_id,
                client_secret,
                grant_type: 'authorization_code',
                code,
                redirect_uri: 'http://localhost:5173/login'
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',

                }
            }).then(response => {
                console.log(response)
                logIn(response.data)
                navigate('/user')
            })
        }
            
            
        
    }, [])

    return <></>
}
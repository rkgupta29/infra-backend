import { useEffect } from "react"
import { isAuthenticated } from "@/api/login"
import { useNavigate } from "@tanstack/react-router"

export default function Home() {
  const navigate = useNavigate()

  const authenticated = isAuthenticated()


  useEffect(() => {
    if (!isAuthenticated()) {
      navigate({ to: "/login" })
    }
  }, [authenticated])


  return (
    <section>
   
    </section>
  )
}



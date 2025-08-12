import { useEffect } from "react"
import { Button } from "../components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function Home() {


  useEffect(() => {
    fetch('http://localhost:3000/social-profiles')
    .then(res => res.json())
    .then(data => console.log(data))
  }, [])
  return (
    <section>
    <Button>check this</Button>
    <Dialog>
      <DialogTrigger>
        <Button>check this</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>check this</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
    </section>
  )
}



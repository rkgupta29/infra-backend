import { LoginForm } from "../components/LoginForm";
import { isAuthenticated } from "../api/login";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";



export default function Login() {
  const navigate = useNavigate()


  useEffect(() => {
    if ( isAuthenticated()) {
      navigate({ to: "/" })
    }
  }, [])
  return (
    <div className="w-full bg-nautral-50 flex items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md border border-neutral-200">
        <LoginForm />
      </div>
    </div>
  );
}

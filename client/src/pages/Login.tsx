import { LoginForm } from "../components/LoginForm";

export default function Login() {
  return (
    <div className="w-full bg-nautral-50 flex items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md border border-neutral-200">
        <LoginForm />
      </div>
    </div>
  );
}

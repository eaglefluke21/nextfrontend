import LoginForm from "./ui";
export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <LoginForm />
    </div>
  );
}

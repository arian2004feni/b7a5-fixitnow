import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "../_components/LoginForm";

export default function LoginPage() {
  return (
    <Card className="border-slate-200 shadow-xl shadow-slate-900/5">
      <CardHeader className="text-center mb-5 mt-2">
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>
          Sign in to manage your bookings and services.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}

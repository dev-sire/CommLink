import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SignInFlow } from "../type";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

interface SignUpCardProps {
    setState: (state: SignInFlow) => void;
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
    const { signIn } = useAuthActions()
    const[name, setName] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[confirmpassword, setConfirmPassword] = useState("")
    const[error, setError] = useState("")
    const[pending, setPending] = useState(false)

    const onProviderSignUp = (value: "github" | "google") => {
        setPending(true)
        signIn(value)
            .finally(() => {
                setPending(false)
            })
    }
    const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(password !== confirmpassword){
            setError("Passwords do not match")
            return
        }
        setPending(true)
        signIn('password', { name, email, password, flow: "signUp"})
            .catch(() => {
                setError("Something went wrong.")
            })
            .finally(() => {
                setPending(false)
            })
    }

    return(
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="px-0 pt-0">
                    Sign in to continue
                </CardTitle>
                <CardDescription>
                    Use your email or any other service to continue.
                </CardDescription>
            </CardHeader>
            {!!error && (
                <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                    <TriangleAlert className="size-4" />
                    <p>{error}</p>
                </div>
            )}
            <CardContent className="space-y-5 px-0 pb-0">
                <form onSubmit={onPasswordSignUp} className="space-y-2.5">
                    <Input 
                        disabled={pending}
                        value={name}
                        onChange={(e) => {setName(e.target.value)}}
                        placeholder="Full Name"
                        required
                    />
                    <Input 
                        disabled={pending}
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}
                        placeholder="Email"
                        type="email"
                        required
                    />
                    <Input 
                        disabled={pending}
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                        placeholder="Password"
                        type="password"
                        required
                    />
                    <Input 
                        disabled={pending}
                        value={confirmpassword}
                        onChange={(e) => {setConfirmPassword(e.target.value)}}
                        placeholder="Confirm Password"
                        type="password"
                        required
                    />
                    <Button type="submit" className="w-full" size="lg" disabled={pending}>
                        Continue
                    </Button>
                </form>
                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    <Button 
                        disabled={pending}
                        onClick={() => onProviderSignUp("google")}
                        variant='outline'
                        className="w-full relative"
                    >
                        <FcGoogle className="size-5 absolute top-3 left-2.5" />
                        Continue with Google
                    </Button>
                    <Button 
                        disabled={pending}
                        onClick={() => onProviderSignUp("github")}
                        variant='outline'
                        className="w-full relative"
                    >
                        <FaGithub className="size-5 absolute top-3 left-2.5" />
                        Continue with Github
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">Already have an account? <span onClick={() => setState("signIn")} className="text-sky-600 hover:underline cursor-pointer">Sign in</span></p>
            </CardContent>
        </Card>
    )
}
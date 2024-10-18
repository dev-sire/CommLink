'use client'

import { useCurrentUser } from "@/app/auth/api/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuthActions } from "@convex-dev/auth/react";
import { Loader, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export const UserButton = () => {
    const router = useRouter();
    const { data, isLoading } = useCurrentUser()
    const { signOut } = useAuthActions()

    if(isLoading){
        return <Loader className="size-4 animate-spin text-muted-foreground" />
    }

    if(!data){
        return null;
    }

    const { image, name } = data
    const avatarFallback = name!.charAt(0).toUpperCase()

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative">
                <Avatar className="rounded-md size-10 hover:opacity-75 transition">
                    <AvatarImage className="rounded-md" alt="name" src={image} />
                    <AvatarFallback className="rounded-md bg-sky-500 text-white">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" side="right" className="w-60">
                <DropdownMenuItem 
                    onClick={async () => {
                        await signOut();
                        router.replace('/');
                    }} 
                    className="h-10"
                >
                    <LogOut className="size-4 mr-2" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

import { Button } from "@/components/ui/button";
import { XIcon, Loader, AlertTriangle, MailIcon } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useGetMember } from "../api/use-get-member";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface ProfileProps {
    memberId: Id<"members">;
    onClose: () => void;
}

export const Profile = ({ memberId, onClose }: ProfileProps) => {

    const { data: member, isLoading: isMemberLoading } = useGetMember({ id: memberId })

    if(isMemberLoading){
        return(
            <div className="flex flex-col h-full">
                <div className="h-[49px] flex justify-between items-center px-4 border-b">
                    <p className="text-lg font-bold">Profile</p>
                    <Button onClick={onClose} variant="ghost" size="iconSm">
                        <XIcon className="size-5 stroke-[1.5]" />
                    </Button>
                </div>
                <div className="flex items-center justify-center h-full">
                    <Loader className="size-5 animate-spin text-muted-foreground" />
                </div>
            </div>
        )
    }

    if(!member){
        return(
            <div className="flex flex-col h-full">
                <div className="h-[49px] flex justify-between items-center px-4 border-b">
                    <p className="text-lg font-bold">Profile</p>
                    <Button onClick={onClose} variant="ghost" size="iconSm">
                        <XIcon className="size-5 stroke-[1.5]" />
                    </Button>
                </div>
                <div className="flex flex-col gap-y-2 items-center justify-center h-full">
                    <AlertTriangle className="size-5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Profile not found.</p>
                </div>
            </div>
        )
    }

    const avatarFallback = member.user.name?.[0] ?? "M";
    
    return(
        <div className="flex flex-col h-full">
            <div className="h-[49px] flex justify-between items-center px-4 border-b">
                <p className="text-lg font-bold">Profile</p>
                <Button onClick={onClose} variant="ghost" size="iconSm">
                    <XIcon className="size-5 stroke-[1.5]" />
                </Button>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
                <Avatar className="max-w-[256px] max-h-[256px] size-full">
                    <AvatarImage src={member.user.image} />
                    <AvatarFallback className="aspect-square text-6xl bg-sky-500 text-white">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </div>
            <div className="flex flex-col p-4">
                <p className="text-xl font-bold">{member.user.name}</p>
            </div>
            <Separator />
            <div className="flex flex-col p-4">
                <p className="mb-4 text-sm font-bold">Contact information</p>
                <div className="flex items-center gap-2">
                    <div className="flex size-9 items-center justify-center rounded-md bg-muted">
                        <MailIcon className="size-4" />
                    </div>

                    <div className="flex flex-col">
                        <p className="text-[13px] font-semibold text-muted-foreground">Email Address</p>

                        <Link href={`mailto:${member.user.email}`} className="text-sm text-[#1264a3] hover:underline">
                            {member.user.email}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
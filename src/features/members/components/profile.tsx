import { Button } from "@/components/ui/button";
import { XIcon, Loader, AlertTriangle, MailIcon, ChevronDown } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useGetMember } from "../api/use-get-member";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useUpdateMember } from "../api/use-update-member";
import { useRemoveMember } from "../api/use-remove-member";
import { useCurrentMembers } from "../api/use-current-members";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuRadioGroup, 
    DropdownMenuRadioItem, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface ProfileProps {
    memberId: Id<"members">;
    onClose: () => void;
}

export const Profile = ({ memberId, onClose }: ProfileProps) => {

    const workspaceId = useWorkspaceId();
    const router = useRouter();
    const { data: currentMember, isLoading: isCurrentMemberLoading } = useCurrentMembers({ workspaceId });
    const { data: member, isLoading: isMemberLoading } = useGetMember({ id: memberId });
    const { mutate: updateMember, isPending: isUpdatingMember } = useUpdateMember();
    const { mutate: removeMember, isPending: isRemovingMember } = useRemoveMember();
    const [RemoveDialog, confirmRemove] = useConfirm('Remove member', 'Are you sure you want to remove this member?');
    const [LeaveDialog, confirmLeave] = useConfirm('Leave workspace', 'Are you sure you want to leave this workspace?');
    const [UpdateDialog, confirmUpdate] = useConfirm('Change role', "Are you sure you want to change this member's role?");

    const onRemove = async () => {
        const ok = await confirmRemove();

        if (!ok) return;

        removeMember({ id: memberId },
        {
            onSuccess: () => {
                toast.success('Member removed.');
                onClose();
            },
            onError: () => toast.error('Failed to remove member.'),
        });
    }

    const onLeave = async () => {
        const ok = await confirmLeave();

        if (!ok) return;

        removeMember({ id: memberId },
        {
            onSuccess: () => {
                toast.success('You left the workspace.');
                router.replace("/");
                onClose();
            },
            onError: () => toast.error('Failed to leave workspace.'),
        });
    }

    const onUpdate = async (role: 'admin' | 'member') => {
        if (member?.role === role) return;

        const ok = await confirmUpdate();

        if (!ok) return;

        updateMember({ id: memberId, role },
        {
            onSuccess: () => {
                toast.success('Role changed.');
            },
            onError: () => toast.error('Failed to change role.'),
        });
    };

    if(isMemberLoading || isCurrentMemberLoading){
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
        <>
            <RemoveDialog />
            <LeaveDialog />
            <UpdateDialog />
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
                    {currentMember?.role === "admin" && currentMember?._id !== memberId ? (
                        <div className="flex items-center gap-2 mt-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" disabled={isUpdatingMember} className="w-full capitalize">
                                        {member.role} <ChevronDown className="ml-2 size-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-full">
                                    <DropdownMenuRadioGroup value={member.role} onValueChange={(role) => onUpdate(role as 'admin' | 'member')}>
                                        <DropdownMenuRadioItem value="admin">Admin</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="member">Member</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button onClick={onRemove} disabled={isRemovingMember} variant="outline" className="w-full">
                                Remove
                            </Button>
                        </div>
                    ): currentMember?._id === memberId && currentMember?.role !== 'admin' ? (
                        <div className="mt-4">
                            <Button onClick={onLeave} variant="outline" className="w-full">
                                Leave
                            </Button>
                        </div>
                    ): (
                        <div className="mt-1">
                            <p className="font-bold text-md text-rose-500">Admin</p>
                        </div>
                    )}
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
        </>
    )
}
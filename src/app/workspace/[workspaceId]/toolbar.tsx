import { Button } from "@/components/ui/button";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Search } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import { useEffect, useState } from "react";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useRouter } from "next/navigation";
import { Id } from "../../../../convex/_generated/dataModel";
import { Hint } from "@/components/hint";

export const Toolbar = () => {

    const router = useRouter();
    const workspaceId = useWorkspaceId();
  
    const { data } = useGetWorkspace({ id: workspaceId });
    const { data: channels } = useGetChannels({ workspaceId });
    const { data: members } = useGetMembers({ workspaceId });
  
    const [open, setOpen] = useState(false);
  
    const onChannelClick = (channelId: Id<'channels'>) => {
        setOpen(false);
    
        router.push(`/workspace/${workspaceId}/channel/${channelId}`);
    };
  
    const onMemberClick = (memberId: Id<'members'>) => {
        setOpen(false);
    
        router.push(`/workspace/${workspaceId}/member/${memberId}`);
    };
  
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    return(
        <nav className="flex h-10 items-center justify-between bg-[#001a6e] p-1.5">
            <div className="flex-1" aria-hidden />

            <div className="min-w-[280px] max-w-[642px] shrink grow-[2]">
                <Button onClick={() => setOpen(true)} size="sm" className="h-7 w-full justify-start bg-accent/25 px-2 hover:bg-accent/25">
                    <Search className="mr-2 size-4 text-white" />
                    <span className="text-xs text-white">Search {data?.name ?? 'workspace'}...</span>

                    <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-90">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </Button>

                <CommandDialog open={open} onOpenChange={setOpen}>
                    <CommandInput placeholder={`Search ${data?.name ?? 'workspace'}...`} />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Channels">
                            {channels?.map((channel) => (
                                <CommandItem onSelect={() => onChannelClick(channel._id)} key={channel._id}>
                                    {channel.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Members">
                            {members?.map((member) => (
                                <CommandItem onSelect={() => onMemberClick(member._id)} key={member._id}>
                                    {member.user.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </CommandDialog>
            </div>
            <div className="ml-auto flex flex-1 items-center justify-end">
                <Hint label="Source Code">
                    <Button variant="transparent" size="iconSm" asChild>
                        <Link href="https://github.com/dev-sire/CommLink" target="_blank">
                            <FaGithub className="size-5 text-white" />
                        </Link>
                    </Button>
                </Hint>
            </div>
        </nav>
    )
}
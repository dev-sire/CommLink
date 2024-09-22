import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Doc } from "../../../../convex/_generated/dataModel"
import { ChevronDown } from "lucide-react";

interface workspaceHeaderProps {
    workspace: Doc<"workspaces">;
}

export const WorkspaceHeader = ({ workspace }: workspaceHeaderProps) => {
    return (
        <div className="flex items-center justify-between px-4 gap-0.5 h-[49px]">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="transparent"
                        className="font-semibold text-lg w-auto p-1.5 overflow-hidden"
                        size="sm"
                    >
                        <span className="truncate">{workspace.name}</span>
                        <ChevronDown className="size-4 ml-1 shrink-0" />
                    </Button>
                </DropdownMenuTrigger>
            </DropdownMenu>
        </div>
    )
}
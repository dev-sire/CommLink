import { Button } from "@/components/ui/button"
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { Code2Icon, Github, Info, Search } from "lucide-react"
import Link from "next/link"

export const Toolbar = () => {
    const workspaceId = useWorkspaceId()
    const { data } = useGetWorkspace({ id: workspaceId })

    return(
        <div className="bg-[#481349] flex items-center justify-between h-10 p-1.5">
            <div className="flex-1" />
            <div className="min-w-[280px] max-[642px] grow-[2] shrink">
                <Button size="sm" className="bg-accent/25 hover:bg-accent-25 w-full justify-start h-7 px-2">
                    <Search className="size-4 text-white mr-2" />
                    <span className="text-white text-xs">Search {data?.name}</span>
                </Button>
            </div>
            <div className="ml-auto flex-1 flex items-center justify-end">
                <Button variant="transparent" size="iconSm">
                    <Link href="https://github.com/dev-sire/CommLink">
                        <Code2Icon className="size-5 text-white" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
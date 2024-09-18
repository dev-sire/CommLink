'use client'

import { UserButton } from "@/features/auth/components/user-button";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useEffect, useMemo } from "react";

export default function Home() {
  const { data, isLoading } = useGetWorkspaces();
  const [open, setOpen] = useCreateWorkspaceModal();
  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if(isLoading) return

    if(workspaceId){
      console.log("redirect to workspace")
    } else if(!open){
      setOpen(true)   
    }

  }, [workspaceId, isLoading, open, setOpen])

  return(
      <div>
        <UserButton />
      </div>
  )
}
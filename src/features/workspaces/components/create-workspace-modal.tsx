import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";
import { useCreateWorkspace } from "../api/use-create-workspace";

export const CreateWorkspaceModal = () => {
    const [open, setOpen] = useCreateWorkspaceModal()
    const { mutate } = useCreateWorkspace()

    const handleClose = () => {
        setOpen(false)
        // TODO: Clear form content
    }

    const handleSubmit = () => {
        mutate({
            name: "Workspace 1",
        }, {
            onSuccess(data) {
                // use router to navigate to the newly created workspace...
            },
        })
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a workspace</DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
                    <Input 
                        value=""
                        disabled={false}
                        minLength={3}
                        autoFocus
                        placeholder="Workspace name e.g 'name', 'work', 'personal'"
                        required
                    />
                    <div className="flex justify-end">
                        <Button disabled={false}>
                            Create
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
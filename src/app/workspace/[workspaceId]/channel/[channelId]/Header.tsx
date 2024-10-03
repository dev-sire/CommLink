import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FaChevronDown } from "react-icons/fa";

interface HeaderProps {
    name: string;
}

export const Header = ({ name }: HeaderProps) => {
    return(
        <div className="bg-white border-b h-[49px] flex items-center px-4 overflow-hidden">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" className="text-lg font-semibold px-2 overflow-hidden w-auto" size="sm">
                        <span className="truncate"># {name}</span>
                        <FaChevronDown className="size-2.5 ml-2" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="p-0 bg-gray-50 overflow-hidden">
                    <DialogHeader className="p-4 border-b bg-white">
                        <DialogTitle>
                            # {name}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-y-2 px-4 pb-4">
                        <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                             {/* TODO: Complete this modal  */}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
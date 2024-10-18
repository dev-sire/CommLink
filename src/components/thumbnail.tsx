/* eslint-disable @next/next/no-img-element */

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";

interface ThumbnailProps {
    url: string | null | undefined
}

export const Thumbnail = ({ url }: ThumbnailProps) => {
    if(!url) return null;
    return(
        <Dialog>
            <DialogTrigger>
                <div className="relative max-w-[360px] overflow-hidden border my-2 rounded-lg cursor-zoom-in">
                    <img 
                        src={url}
                        alt="message image"
                        className="rounded-md object-cover size-full"
                    />
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-[800px] border-none bg-transparent p-0 shadow-none">
                <img 
                    src={url}
                    alt="message image"
                    className="rounded-md object-cover size-full"
                />
            </DialogContent>
        </Dialog>
    )
}
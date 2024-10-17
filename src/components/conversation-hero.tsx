import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ConversationHeroProps {
    name?: string;
    image?: string;
}

export const ConversationHero = ({ name = "Member", image }: ConversationHeroProps) => {

    const avatarFallback = name.charAt(0).toUpperCase();

    return(
        <div className="mt-[88px] mx-5 mb-4">
            <div className="flex items-center gap-x-1 mb-2">
                <Avatar className="size-14 mr-2">
                    <AvatarImage className="rounded-md" src={image} />
                    <AvatarFallback className="rounded-md bg-sky-500 text-white text-xl">{avatarFallback}</AvatarFallback>
                </Avatar>
                <p className="text-2xl font-bold">
                    {name}
                </p>
            </div>
            <p className="font-normal text-slate-800 md-4">
                This conversation is just between you and <strong>{name}</strong>
            </p>
        </div>
    )
}
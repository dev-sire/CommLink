import { useMemberId } from "@/hooks/use-member-id";
import { Id } from "../../../../../../convex/_generated/dataModel";

interface ConversationProps {
    id: Id<"conversations">;
}

export const Conversation = ({ id }: ConversationProps) => {

    const memberId = useMemberId();

    return(
        <div>Hello</div>
    )
}
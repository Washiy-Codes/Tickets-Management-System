import { Card } from "@/components/ui/card";
import { CommentWithMetadata } from "../types";

type CommentItemProp = {
    comment: CommentWithMetadata;
    buttons?: React.ReactNode[];
};


const CommentItem = ({ comment, buttons }: CommentItemProp) => {
 
    return(
        <div className="flex gap-x-2 w-full">
        <Card key={comment.id} className="mb-4 max-w-sm w-full p-4">
            <div className="flex justify-between items-center">
                <p className="font-semibold">{comment.user?.username}</p>
                <p className="text-sm text-muted-foreground">
                    {comment.createdAt.toLocaleString()}
                </p>
            </div>
            <div className="w-full max-w-md">
                <span className="font-medium">Comment:</span>
                <span className=" ml-3 whitespace-pre-line">{comment.content}</span>
            </div>
        </Card>
        <div className="flex flex-col">
            {buttons}
        </div>
    </div>
    )
}

export { CommentItem }
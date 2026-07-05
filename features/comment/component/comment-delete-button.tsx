"use client";

import { LucideTrash } from "lucide-react";
import { useConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { deleteComment } from "../action/delete-comment";

type CommentDeleteButtonProps = {
  id: string;
};

const CommentDeleteButton = ({ id }: CommentDeleteButtonProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteComment.bind(null, id),
    trigger: (
      <Button variant="outline" size="icon">
        <LucideTrash className="w-4 h-4" />
      </Button>
    ),
  });

  return (
    <>
      {deleteDialog}
      {deleteButton}
    </>
  );
};

export { CommentDeleteButton };







































// "use client";

// import { Button } from "@/components/ui/button";
// import { LucideTrash } from "lucide-react";
// import { deleteComment } from "../action/delete-comment";
// import { useActionState } from "react";
// import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";

// type CommentDeleteButtonProp = {
//     id: string;
// };
 

// const CommentDeleteButton = ({id}: CommentDeleteButtonProp) => {

//     const [state, action] = useActionState(deleteComment.bind(null, id), EMPTY_ACTION_STATE);
//     return (
//         <form action={action} className="flex items-center">
//             <Button variant="outline" size="icon" className="ml-2">
//                 <LucideTrash className="h-2 w-2" />
//             </Button>
//         </form>
//     );
// };

// export { CommentDeleteButton };
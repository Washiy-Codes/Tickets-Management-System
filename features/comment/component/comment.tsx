"use server"
import { CommentItem } from './comment-item'
import { getComment } from '../query/get-comment'
import { CardCompact } from '@/components/card-compact';
import { CommentCreateForm } from './comment-create-form';
import { CommentDeleteButton } from './comment-delete-button';
import { isOwner } from '@/features/auth/utils/is-owner';
import { auth } from '@/auth';

type CommentProp = {
    ticketId: string;
    
};

const Comments = async({ ticketId }: CommentProp) => {
    const comments = await getComment({ ticketId });
    const session = await auth();
    const user = session?.user;

    return (
        <>
            <CardCompact 
                 title="Comments"
                 description="What is in your mind?....."
                 content={<CommentCreateForm ticketId={ticketId} />}
                 className="w-full max-w-md"
            />
            
            <div className="flex flex-col gap-y-2 w-full ml-4 mt-5">
              {comments.map(async (comment) => {
                  const canDelete = await isOwner(user, comment);

                  return (
                      <CommentItem 
                          comment={comment} 
                          key={comment.id} 
                          buttons={canDelete ? [<CommentDeleteButton key={comment.id} id={comment.id} />] : []}
                      />
                  );
              })}
            </div>
            <div className="ml-8 flex justify-center mt-4">
                {/* <MoreButton ticketId={ticketId} /> */}
            </div>
        </>
    );
}

export { Comments };


























// import { CommentItem } from './comment-item'
// import {getComment} from '../query/get-comment'
// import { CardCompact } from '@/components/card-compact';
// import { CommentCreateForm } from './comment-create-form';
// import { CommentDeleteButton } from './comment-delete-button';
// import { auth } from '@/auth';
// import { isOwner } from '@/features/auth/utils/is-owner';


// type CommentProp = {
//     ticketId: string;
    
// };

// const Comments = async({ticketId}: CommentProp) => {
//     const comments = await getComment(ticketId)
//     const user = await auth();
//   return (
//     <>
//     <CardCompact 
//          title="Comments"
//          description="What is in your mind?....."
//          content={<CommentCreateForm ticketId={ticketId} />}
//          className="w-full max-w-md"

//     />
//     <div className="flex flex-col gap-y-2 w-full ml-4 mt-5">
//       {comments.map((comment) => (
//           <CommentItem comment={comment} key={comment.id} 
//           buttons={[
//   ...(isOwner(user, comment)
//     ? [<CommentDeleteButton key="0" id={comment.id} />]
//     : []),
// ]}
          
//           />
//       ))}
//     </div>
//     </>
//   )
// }

// export {Comments}
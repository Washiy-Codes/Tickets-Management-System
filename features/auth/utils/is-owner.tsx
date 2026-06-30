import {User} from "next-auth";
type Entity = {
  userId: string | null;
};

const isOwner = async (authUser: User | null | undefined, 
    entity: Entity | null | undefined): Promise<boolean> => {

  if (!authUser || !entity) {
    return false;
  }
  if (!entity?.userId) {
    return false;
  }
  if (entity.userId !== authUser.id) {
    return false;
  }else{
    return true;
  }
 
};

export { isOwner };
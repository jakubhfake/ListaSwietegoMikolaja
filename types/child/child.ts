import {ChildEntity} from "./child-entity";
import {GiftEntity} from "../gift";

export interface ListChildrenRes {
    childrenList: ChildEntity[];
    giftsList: GiftEntity[];
}

export type CreateChildRes = Omit<ChildEntity, 'id'>

export interface SetGiftForChildReq {
    giftId: string;
}
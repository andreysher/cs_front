export type TList = {
    id: number,
    master: number,
    name: string,
    text: string,
}

export const GET_LIST = "GET_LIST"

export interface IGetList {
    type: typeof GET_LIST
    payload: TList[]
}

export type ListDispatchType = IGetList

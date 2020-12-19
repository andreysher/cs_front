import { GET_LIST, ListDispatchType, TList } from "../actions/types";

interface IDefaultState {
    lists: TList[],
}

const defaultState: IDefaultState = {
    lists: [],
}

const modelReducer = (state: IDefaultState = defaultState, action: ListDispatchType): IDefaultState => {
    switch (action.type) {
        case GET_LIST:
            return {
                ...state,
                lists: action.payload
            }

        default:
            return state;
    }
}

export default modelReducer
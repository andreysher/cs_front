import {Dispatch} from "react";
import {GET_LIST, ListDispatchType} from "./types";
import axios from 'axios';

export const get_list = () => (dispatch: Dispatch<ListDispatchType>) => {
    axios.get("https://cs-backend-nsu.herokuapp.com/api/lists/").then(res => {
        dispatch({
            type: GET_LIST,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
    });
}
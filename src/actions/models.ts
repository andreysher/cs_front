import {Dispatch} from "react";
import {GET_LIST, ListDispatchType} from "./types";
import axios from 'axios';

export const get_list = () => (dispatch: Dispatch<ListDispatchType>) => {
    axios.get("http://127.0.0.1:8000/api/lists/").then(res => {
        dispatch({
            type: GET_LIST,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
    });
}
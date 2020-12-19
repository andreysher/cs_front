import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../store';
import Tree from './tree/Tree';
import {useEffect, useState} from "react";
import {get_list} from "../actions/models";
import {buildTree} from "../utils";
import {TList} from "../actions/types";
import { FormEvent } from 'react';


interface IHomeProps {
}

export type TSE = {
    modelName: number,
    modelId: number
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
    const dispatch = useDispatch()
    const list = useSelector((state: RootStore) => state.modelReducer.lists)
    const [selected, set_selected] = useState<TList>()
    const [search_res, set_search_res] = useState<TList[]>()
    useEffect(() => {
        dispatch(get_list())
    }, [])
    useEffect(() => {
        console.log(list)
    }, [list])
    useEffect(() => {
        console.log(search_res)
    }, [search_res])
    return <>
        <Tree tree_data={buildTree(list)} onClick={(element_id: number) => {
            set_selected(list.find((x: TList) => x.id === element_id))
        }} />

        {selected && <div> <h1>{selected.name}</h1>
            <p> {selected.text} </p>
        </div>}

        <div><input onChange={e => {
            var input_content = e.target.value
            var input_words = input_content.split(' ')
            set_search_res(list.filter((x: TList) => {
                var accepted = false
                input_words.map(word => {
                    if (x.text.includes(word))
                        accepted = true
                })
                return accepted
            }))
        }}></input ></div>

    <div>{search_res && search_res.map((x:TList) => {
        return <p onClick={() => set_selected(x)}> {x.name} </p>
    })}</div>
</>
};

export default Home;
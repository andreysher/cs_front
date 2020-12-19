import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../store';
import Tree from './tree/Tree';
import { useEffect, useState } from "react";
import { get_list } from "../actions/models";
import { buildTree } from "../utils";
import { TList } from "../actions/types";
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
    const [search_res, set_search_res] = useState<TList[]>([])
    const [selectedChildren, setSelectedChildren] = useState<TList[]>([])

    const [sidePanel, setSidePanel] = useState(false)
    const [searchPanel, setSearchPanel] = useState(false)


    const styleClick = { cursor: 'pointer' }
    useEffect(() => {
        dispatch(get_list())
    }, [])

    useEffect(() => {
        if (list.length === 0)
            return null
        set_selected(list[0])

    }, [list])

    useEffect(() => {
        if (selected === undefined)
            return null
        setSelectedChildren(list.filter(x => x.master === selected.id || x.id === selected.master))
    }, [selected])


    const renderTree = () => {
        return <Tree tree_data={buildTree(list)} onClick={(element_id: number) => {
            set_selected(list.find((x: TList) => x.id === element_id))
        }} />
    }

    const onChange = (e) => {
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
    }

    const renderSearchResult = () => {
        return search_res.map((x: TList) => {
            return <p style={styleClick} onClick={() => set_selected(x)}> {x.name} </p>
        })
    }

    const renderChildren = () => {
        return selectedChildren.map(e => {
            return <p style={styleClick} onClick={() => set_selected(e)}>
                {e.name}
            </p>
        })
    }




    return <>
        {sidePanel && <div className='panel'>
            <button id='close-side-pannel' onClick={() => setSidePanel(false)}>X</button>
            {renderTree()}
        </div>}

        <div className='selected'>
            {selected && <div> <h1>{selected.name}</h1>
                {selected.text.split('\n').filter(y => y.length > 2).map(t => {
                    return <p> {t} </p>
                })}

            </div>}
        </div>

        {searchPanel && <div className='search'>
            <button onClick={() => setSearchPanel(false)}>X</button>
            <input onChange={onChange}></input >

            <div className='search-result'>
                {search_res && renderSearchResult()}
            </div>
        </div>}

        {selectedChildren.length > 0 && <div className='children'>
            <p>Связанные термины:</p>
            <div className='terms'>
                {renderChildren()}
            </div>
        </div>}


        {!sidePanel && <button id='open-side-pannel1' onClick={() => setSidePanel(true)}>Открыть дерево</button>}
        {!searchPanel && <button id='open-side-pannel2' onClick={() => setSearchPanel(true)}>Открыть поиск</button>}
    </>
};

export default Home;
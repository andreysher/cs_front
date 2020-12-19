import * as React from 'react';

export type el_t = {
    id: number,
    name: string,
    parentid?: number,
    children: el_t[]
}

interface ITreeNodeProps {
    element: el_t,
    is_hidden: boolean,
    level: number,
    onClick?: (id: number) => void
}

const TreeNode: React.FunctionComponent<ITreeNodeProps> = (props) => {

    const [isHidden, setIsHidden] = React.useState(props.is_hidden)
    const style = { marginLeft: (props.level * 10) + 'px' }


    return <>
        <div className='tree-node' style={style}><p onClick={() => { setIsHidden(!isHidden); props.onClick(props.element.id) }}>{props.element.name}</p></div>
        {!isHidden &&
            props.element.children.map(elem => {
                return (<>
                    <TreeNode onClick={props.onClick} level={props.level + 1} element={elem} is_hidden={true} />
                </>
                )
            })}
    </>;
};

export default TreeNode;

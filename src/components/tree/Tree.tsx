import * as React from 'react';
import TreeNode, { el_t } from './TreeNode';

interface ITreeProps {
    tree_data: el_t[]
    onClick?: (id: number) => void
}

const Tree: React.FunctionComponent<ITreeProps> = (props) => {
    return <>
        {props.tree_data.map(elem => {
            return (<>
                <TreeNode onClick={props.onClick} level={0} element={elem} is_hidden={false} />
            </>
            )
        })}
    </>;
};

export default Tree;

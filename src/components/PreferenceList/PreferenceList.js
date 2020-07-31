import React from "react";
import TempItem from "../TempItem/TempItem";
import ListDragDrop from "@bit/cy-shan.fancy-data-manipulators.list-drag-drop";

const PreferenceList = props => {
    return (
        <>
            <ListDragDrop
                items={props.data}
                itemHeight={30}
                tapDelay={100}
                onReorder={obj => props.update(obj, props.id)}
            >
                <TempItem />
            </ListDragDrop>
        </>
    );
};

export default PreferenceList;

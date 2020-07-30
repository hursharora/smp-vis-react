import React from "react";
import TempItem from "../TempItem/TempItem";
import ListDragDrop from "@bit/cy-shan.fancy-data-manipulators.list-drag-drop";

const PreferenceList = props => {
    return (
        <>
            <ListDragDrop items={props.data} itemHeight={30} tapDelay={100}>
                <TempItem />
            </ListDragDrop>
        </>
    );
};

export default PreferenceList;

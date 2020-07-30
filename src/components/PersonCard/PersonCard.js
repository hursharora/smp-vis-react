import React from "react";
import TempItem from "../TempItem/TempItem";
import ListDragDrop from "@bit/cy-shan.fancy-data-manipulators.list-drag-drop";
import classes from "./PersonCard.module.css";
import { BigHead } from "@bigheads/core";

const PersonCard = props => {
    return (
        <div className={classes.Card}>
            <h3 className={classes.CardName}>Person {props.number}</h3>
            <div className={classes.CardInner}>
                <div className={classes.AvatarImage}>
                    <BigHead />
                </div>
                <div className={classes.OrderList}>
                    <ListDragDrop
                        items={props.data}
                        itemHeight={30}
                        tapDelay={100}
                    >
                        <TempItem />
                    </ListDragDrop>
                </div>
            </div>
        </div>
    );
};

export default PersonCard;

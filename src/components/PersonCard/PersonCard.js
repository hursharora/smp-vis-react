import React, { useMemo } from "react";
import classes from "./PersonCard.module.css";
import { BigHead } from "@bigheads/core";
import PreferenceList from "../PreferenceList/PreferenceList";

const PersonCard = props => {
    const avatar = useMemo(
        () => <BigHead clothingColor={props.color} clothing={"shirt"} />,
        [props.color]
    );

    return (
        <div className={classes.Card}>
            <h3 className={classes.CardName}>Person {props.number}</h3>
            <div className={classes.CardInner}>
                <div className={classes.AvatarImage}>{avatar}</div>
                <div className={classes.OrderList}>
                    <PreferenceList data={props.data} />
                </div>
            </div>
        </div>
    );
};

export default PersonCard;

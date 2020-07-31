import React, { useMemo } from "react";
import classes from "./PersonCard.module.css";
import { BigHead } from "@bigheads/core";
import PreferenceList from "../PreferenceList/PreferenceList";

const PersonCard = props => {
    const avatar = useMemo(
        () => <BigHead clothingColor={props.color} clothing={"shirt"} />,
        [props.color]
    );

    let cardClasses = [classes.Card];
    if (props.color === "red") cardClasses.push(classes.CardRed);
    else cardClasses.push(classes.CardBlue);

    return (
        <div className={cardClasses.join(" ")}>
            <h3 className={classes.CardName}>Person {props.number}</h3>
            <div className={classes.CardInner}>
                <div className={classes.AvatarImage}>{avatar}</div>
                <div className={classes.OrderList}>
                    {/*Super hacky (key), but forces update of preference list since deep props change is made.*/}
                    <PreferenceList
                        id={props.id}
                        data={props.data}
                        key={Math.random()}
                        update={props.update}
                    />
                </div>
            </div>
        </div>
    );
};

export default PersonCard;

import React from "react";
import classes from "./CardRow.module.css";
import PersonCard from "../PersonCard/PersonCard";

const CardRow = props => {
    return (
        <div className={classes.CardRow}>
            {props.prefData.map((el, ind) => {
                let curr = el.map((rank, idx) => ({
                    id: idx,
                    name: "Person " + (rank + 1)
                }));

                return (
                    <PersonCard
                        data={curr}
                        key={ind}
                        number={ind + 1}
                        color={props.color}
                    />
                );
            })}
        </div>
    );
};

export default CardRow;

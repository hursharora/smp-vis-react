import React from "react";
import classes from "./CardRow.module.css";
import PersonCard from "../PersonCard/PersonCard";

const CardRow = props => {
    return (
        <div className={classes.CardRow}>
            {props.prefData.map((el, idx) => {
                let curr = el.map(rank => ({
                    id: rank,
                    name: "Person " + (rank + 1)
                }));

                let currId = props.top ? idx : idx + 5;
                return (
                    <PersonCard
                        data={curr}
                        id={currId}
                        key={idx}
                        number={idx + 1}
                        color={props.color}
                        update={props.update}
                    />
                );
            })}
        </div>
    );
};

export default CardRow;

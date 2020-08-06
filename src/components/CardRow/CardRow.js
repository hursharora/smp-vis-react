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
                    <div
                        ref={el => (props.setRefs.current[currId] = el)}
                        key={idx}
                    >
                        <PersonCard
                            data={curr}
                            id={currId}
                            number={idx + 1}
                            color={props.color}
                            update={props.update}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default CardRow;

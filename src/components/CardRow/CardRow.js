import React from "react";
import classes from "./CardRow.module.css";

const CardRow = props => {
    return <div className={classes.CardRow}>{props.children}</div>;
};

export default CardRow;

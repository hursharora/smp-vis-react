import React from "react";
import "./App.css";
import PersonCard from "./components/PersonCard/PersonCard";
import CardRow from "./components/CardRow/CardRow";

const App = () => {
    const data = [];
    for (let i = 0; i < 5; i++) {
        data.push({
            id: i,
            name: "Person " + (i + 1)
        });
    }

    return (
        <CardRow>
            <PersonCard data={data} number={1} />
            <PersonCard data={data} number={2} />
            <PersonCard data={data} number={3} />
            <PersonCard data={data} number={4} />
            <PersonCard data={data} number={5} />
        </CardRow>
    );
};

export default App;

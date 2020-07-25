import React from "react";
import "./App.css";
import PersonCard from "./components/PersonCard/PersonCard";

const App = () => {
    const data = [];
    for (let i = 0; i < 5; i++) {
        data.push({
            id: i,
            name: "Person " + (i + 1)
        });
    }

    return (
        <div>
            <PersonCard data={data} number={1} />
            <PersonCard data={data} number={1} />
            <PersonCard data={data} number={1} />
            <PersonCard data={data} number={1} />
            <PersonCard data={data} number={1} />
        </div>
    );
};

export default App;

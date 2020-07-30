import React, { useReducer } from "react";
import "./App.css";
import PersonCard from "./components/PersonCard/PersonCard";
import CardRow from "./components/CardRow/CardRow";

const initPreferences = () => {
    const initPreferences = [];
    for (let i = 0; i < 10; i++) {
        let curr = [];
        for (let j = 0; j < 5; j++) {
            curr.push(j);
        }
        initPreferences.push(curr);
    }
    return initPreferences;
};

const preferenceReducer = (currentIngredients, action) => {
    switch (action.type) {
        case "SET":
            return action.ingredients;
        case "RANDOMIZE":
            return [...currentIngredients, action.ingredient];
        case "RESET":
            return initPreferences();
        default:
            throw new Error("Invalid action type");
    }
};

const App = () => {
    const [preferenceData, dispatch] = useReducer(
        preferenceReducer,
        [],
        initPreferences
    );

    return (
        <>
            <CardRow prefData={preferenceData.slice(0, 5)} />
            <CardRow prefData={preferenceData.slice(5, 10)} />
        </>
    );
};

export default App;

import React, { useReducer } from "react";
import classes from "./App.module.css";
import CardRow from "./components/CardRow/CardRow";

//major bug, component not updating because i was using the index as the key in a map function,
//use force update...

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

//shuffleArray (credit: ashleedawg and Laurens Holst on stackoverflow)
const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const randomizePreferences = () => {
    const preferences = [];
    for (let i = 0; i < 10; i++) {
        let curr = [];
        for (let j = 0; j < 5; j++) {
            curr.push(j);
        }
        preferences.push(shuffleArray(curr));
    }
    return preferences;
};

const preferenceReducer = (currentIngredients, action) => {
    switch (action.type) {
        case "RANDOMIZE":
            return randomizePreferences();
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
        randomizePreferences
    );

    return (
        <div className={classes.App}>
            <CardRow prefData={preferenceData.slice(0, 5)} color={"blue"} />
            <div>
                <button onClick={() => dispatch({ type: "RANDOMIZE" })}>
                    Randomize Preferences
                </button>
                <button onClick={() => dispatch({ type: "RESET" })}>
                    Worst Case Preferences
                </button>
            </div>
            <CardRow prefData={preferenceData.slice(5, 10)} color={"red"} />
        </div>
    );
};

export default App;

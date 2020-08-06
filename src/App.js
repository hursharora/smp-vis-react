import React, { useEffect, useReducer, useRef } from "react";
import classes from "./App.module.css";
import CardRow from "./components/CardRow/CardRow";
import LineTo from "react-lineto";

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

const preferenceReducer = (preferencesState, action) => {
    switch (action.type) {
        case "UPDATE":
            let newPreferences = [...preferencesState];
            newPreferences[action.id] = action.updated;
            return newPreferences;
        case "RANDOMIZE":
            return randomizePreferences();
        case "RESET":
            return initPreferences();
        default:
            throw new Error("Invalid action type");
    }
};

const App = () => {
    console.log("RENDERING APP");
    const [preferenceData, dispatch] = useReducer(
        preferenceReducer,
        [],
        randomizePreferences
    );

    const cardRefs = useRef([]);
    useEffect(() => {
        cardRefs.current = cardRefs.current.slice(0, 10);
    }, []);

    const updatePreferenceHandler = (updatedPreferencesObject, id) => {
        let updatedPreferences = [];
        for (let i = 0; i < 5; i++) {
            updatedPreferences.push(updatedPreferencesObject[i]["id"]);
        }
        dispatch({ type: "UPDATE", id: id, updated: updatedPreferences });
    };

    return (
        <>
            <div className={classes.App}>
                <CardRow
                    prefData={preferenceData.slice(0, 5)}
                    color={"blue"}
                    update={updatePreferenceHandler}
                    top
                    setRefs={cardRefs}
                />
                <div>
                    <button onClick={() => dispatch({ type: "RANDOMIZE" })}>
                        Randomize Preferences
                    </button>
                    <button onClick={() => dispatch({ type: "RESET" })}>
                        Worst Case Preferences
                    </button>
                </div>
                <CardRow
                    prefData={preferenceData.slice(5, 10)}
                    color={"red"}
                    update={updatePreferenceHandler}
                    setRefs={cardRefs}
                />
            </div>
            <LineTo from="1" to="5" delay zIndex={-1} />
            <LineTo from="0" to="9" delay zIndex={-1} />
            <LineTo from="2" to="6" delay zIndex={-1} />
            <LineTo from="3" to="7" delay zIndex={-1} />
        </>
    );
};

export default App;

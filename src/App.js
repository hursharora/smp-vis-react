import React, { useEffect, useMemo, useReducer, useState } from "react";
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
    //console.log("RENDERING APP");
    const [preferenceData, dispatch] = useReducer(
        preferenceReducer,
        [],
        randomizePreferences
    );

    //state so component updates when window dimensions are updated.
    const [dimensions, setDimensions] = useState([
        window.innerWidth,
        window.innerHeight
    ]);

    //state representing lines from index -> value
    const [lines, setLines] = useState([null, null, null, null, null]);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setDimensions([window.innerWidth, window.innerHeight]);
        });
    }, []);

    const updatePreferenceHandler = (updatedPreferencesObject, id) => {
        let updatedPreferences = [];
        for (let i = 0; i < 5; i++) {
            updatedPreferences.push(updatedPreferencesObject[i]["id"]);
        }
        dispatch({ type: "UPDATE", id: id, updated: updatedPreferences });
    };

    const clearMatching = () => {
        setLines([null, null, null, null, null]);
    };

    const getMatching = () => {
        clearMatching();

        //send request to server and get response
        //parse response array and update lines accordingly
        let requestPreferences = [...preferenceData];
        requestPreferences.unshift(5);
        // console.log(JSON.stringify(requestPreferences));
        fetch("http://localhost:8080/smp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestPreferences)
        })
            .then(r => r.json())
            .then(r => {
                console.log(r);
                visualize(r, 0, null, [...lines]);
            })
            .catch(e => console.log(e));
    };

    //main visualization function
    const visualize = (matching, idx, confirm, newLines) => {
        //console.log("Running visualize at" + idx);
        // console.log("Next");
        let nextLines = [...newLines];
        //console.log(nextLines);
        let curr = matching[idx];

        //"X Y"
        if (curr[1] === " ") return;

        //"Male: X Considering Female: Y"
        let source, dest;
        if (curr[0] === "M") {
            source = parseInt(curr[6]);
            dest = parseInt(curr[28]) + 5;
            nextLines[source] = dest * -1;
            console.log(nextLines);
        } else {
            if (curr[2] === "C") {
                //console.log("ACCEPTED");
                nextLines[confirm] = nextLines[confirm] * -1;
            } else if (curr[2] === "J") {
                //"REJECTED"
                //console.log("REJECTED");
                nextLines[confirm] = null;
            } else {
                //"REPLACED"
                //console.log("REPLACED");
                let toReplace = nextLines[confirm] * -1;
                nextLines = nextLines.map(el => {
                    if (el === toReplace) return null;
                    return el;
                });
                nextLines[confirm] = toReplace;
            }
        }
        setLines(nextLines);
        setTimeout(() => visualize(matching, idx + 1, source, nextLines), 1000);
    };

    let drawLines = [];
    lines.forEach((el, idx) => {
        if (el) {
            drawLines.push(
                <LineTo
                    from={idx.toString()}
                    to={Math.abs(el).toString()}
                    delay
                    zIndex={-1}
                    fromAnchor="bottom center"
                    toAnchor="top center"
                    key={idx}
                    borderStyle={el < 0 ? "dashed" : "solid"}
                />
            );
        }
    });

    //using useMemo instead of reactMemo in CardRow because slice returns a new array
    //wanted to keep all preferences in a single state to make requests to backend easy
    let topRow = useMemo(
        () => (
            <CardRow
                prefData={preferenceData.slice(0, 5)}
                color={"blue"}
                update={updatePreferenceHandler}
                top
            />
        ),
        [preferenceData]
    );

    let bottomRow = useMemo(
        () => (
            <CardRow
                prefData={preferenceData.slice(5, 10)}
                color={"red"}
                update={updatePreferenceHandler}
            />
        ),
        [preferenceData]
    );
    return (
        <>
            <div className={classes.App}>
                {topRow}
                <div>
                    <button onClick={() => dispatch({ type: "RANDOMIZE" })}>
                        Randomize Preferences
                    </button>
                    <button onClick={() => dispatch({ type: "RESET" })}>
                        Worst Case Preferences
                    </button>
                    <button onClick={() => getMatching()}>Visualize!</button>
                    <button onClick={() => clearMatching()}>Clear Lines</button>
                </div>
                {bottomRow}
            </div>
            {drawLines}
        </>
    );
};

export default App;

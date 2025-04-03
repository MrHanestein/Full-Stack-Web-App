// src/CustomDFADrawer2.js
import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const exercises = {
    "1.1": [
        "Design a DFA that accepts only strings ending in 'ab'.",
        // ...
    ],
    "1.2": [
        // ...
    ],
    // etc.
};

const solutions = {
    "1.1": [
        "Accepts only strings ending in 'ab': q0 -(a)-> q1 -(b)-> q2 (final).",
        // ...
    ],
    "1.2": [
        // ...
    ],
    // etc.
};

export default function CustomDFADrawer() {
    const svgRef = useRef();
    const [states, setStates] = useState([]);
    const [transitions, setTransitions] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [startState, setStartState] = useState(null);
    const [drawingTransition, setDrawingTransition] = useState(null);
    const [currentChapter, setCurrentChapter] = useState("1.1");
    const [exerciseIndex, setExerciseIndex] = useState(0);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const width = 800;
        const height = 500;
        svg.attr("viewBox", `0 0 ${width} ${height}`);

        const drag = d3
            .drag()
            .on("start", () => setIsDragging(true))
            .on("drag", function (event, d) {
                d.x = event.x;
                d.y = event.y;
                render();
            })
            .on("end", () => setIsDragging(false));

        function render() {
            svg.selectAll("*").remove();

            // Marker
            svg
                .append("defs")
                .append("marker")
                .attr("id", "arrow")
                .attr("viewBox", "0 0 10 10")
                .attr("refX", 10)
                .attr("refY", 5)
                .attr("markerWidth", 6)
                .attr("markerHeight", 6)
                .attr("orient", "auto-start-reverse")
                .append("path")
                .attr("d", "M 0 0 L 10 5 L 0 10 z")
                .attr("fill", "#555");

            // Transitions
            transitions.forEach(({ from, to, label }) => {
                svg
                    .append("line")
                    .attr("x1", from.x)
                    .attr("y1", from.y)
                    .attr("x2", to.x)
                    .attr("y2", to.y)
                    .attr("stroke", "#555")
                    .attr("stroke-width", 2)
                    .attr("marker-end", "url(#arrow)");

                svg
                    .append("text")
                    .attr("x", (from.x + to.x) / 2)
                    .attr("y", (from.y + to.y) / 2 - 10)
                    .attr("text-anchor", "middle")
                    .attr("fill", "black")
                    .text(label);
            });

            // States
            const g = svg
                .selectAll("g.state")
                .data(states, d => d.id)
                .join("g")
                .attr("class", "state")
                .call(drag);

            g.append("circle")
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)
                .attr("r", 30)
                .attr("fill", d => (d.isFinal ? "#d1fae5" : "#f3f4f6"))
                .attr("stroke", d => (d.id === startState ? "#1d4ed8" : "#333"))
                .attr("stroke-width", 2)
                .on("dblclick", (event, d) => toggleFinalState(d.id))
                .on("click", (event, d) => {
                    if (drawingTransition) {
                        const label = prompt("Enter transition label:");
                        if (label) addTransition(drawingTransition, d.id, label);
                        setDrawingTransition(null);
                    } else {
                        setDrawingTransition(d);
                    }
                });

            g.append("text")
                .attr("x", d => d.x)
                .attr("y", d => d.y + 5)
                .attr("text-anchor", "middle")
                .attr("fill", "black")
                .text(d => d.id);
        }

        render();
    }, [states, transitions, drawingTransition, startState]);

    const addState = () => {
        const id = `q${states.length}`;
        const newState = { id, x: 100 + states.length * 100, y: 200, isFinal: false };
        setStates(prev => [...prev, newState]);
    };

    const addTransition = (fromId, toId, label) => {
        const from = states.find(s => s.id === fromId.id);
        const to = states.find(s => s.id === toId);
        setTransitions(prev => [...prev, { from, to, label }]);
    };

    const toggleFinalState = id => {
        setStates(prev => prev.map(s => (s.id === id ? { ...s, isFinal: !s.isFinal } : s)));
    };

    const setStart = () => {
        const id = prompt("Enter state ID to set as start:");
        if (states.find(s => s.id === id)) setStartState(id);
    };

    const currentExercise = exercises[currentChapter][exerciseIndex];

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">✍️ Build Your Own DFA</h2>
            <div className="flex gap-2 mb-4">
                <button onClick={addState} className="px-4 py-2 bg-blue-600 text-white rounded">
                    Add State
                </button>
                <button onClick={setStart} className="px-4 py-2 bg-green-600 text-white rounded">
                    Set Start State
                </button>
                <select
                    value={currentChapter}
                    onChange={e => {
                        setCurrentChapter(e.target.value);
                        setExerciseIndex(0);
                    }}
                    className="ml-2 px-2 py-1 rounded border"
                >
                    <option value="1.1">Ch. 1.1</option>
                    <option value="1.2">Ch. 1.2</option>
                    <option value="1.3">Ch. 1.3</option>
                    <option value="1.4">Ch. 1.4</option>
                </select>
            </div>

            <svg ref={svgRef} className="w-full h-[500px] border rounded" />

            <div className="mt-4 p-4 border rounded bg-gray-50">
                <h3 className="text-lg font-semibold mb-2">
                    📊 Interactive Exercise ({currentChapter})
                </h3>
                <p>{currentExercise}</p>
                <p className="text-sm mt-2 text-gray-500 italic">
                    💡 Hint: {solutions[currentChapter][exerciseIndex]}
                </p>
                <button
                    onClick={() => setExerciseIndex(prev => (prev + 1) % exercises[currentChapter].length)}
                    className="mt-2 px-4 py-1 bg-purple-600 text-white rounded"
                >
                    Next Exercise
                </button>
            </div>

            <p className="mt-2 text-sm text-gray-500">
                Click a state to start drawing a transition, click another to connect. Double-click a state
                to toggle final.
            </p>
        </div>
    );
}

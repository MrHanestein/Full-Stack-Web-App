// src/CustomDFADrawer1.js
import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

export default function CustomDFADrawer() {
    const svgRef = useRef();
    const [states, setStates] = useState([]);
    const [transitions, setTransitions] = useState([]);
    const [startState, setStartState] = useState(null);
    const [drawingTransition, setDrawingTransition] = useState(null);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const width = 800;
        const height = 500;
        svg.attr("viewBox", `0 0 ${width} ${height}`);

        const drag = d3.drag()
            .on("drag", function (event, d) {
                d.x = event.x;
                d.y = event.y;
                render();
            });

        function render() {
            svg.selectAll("*").remove();

            // Arrow definition
            svg.append("defs").append("marker")
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
                svg.append("line")
                    .attr("x1", from.x)
                    .attr("y1", from.y)
                    .attr("x2", to.x)
                    .attr("y2", to.y)
                    .attr("stroke", "#555")
                    .attr("stroke-width", 2)
                    .attr("marker-end", "url(#arrow)");

                svg.append("text")
                    .attr("x", (from.x + to.x) / 2)
                    .attr("y", (from.y + to.y) / 2 - 10)
                    .attr("text-anchor", "middle")
                    .attr("fill", "black")
                    .text(label);
            });

            // States
            const g = svg.selectAll("g.state")
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
        setStates([...states, newState]);
    };

    const addTransition = (fromId, toId, label) => {
        const from = states.find(s => s.id === fromId.id);
        const to = states.find(s => s.id === toId);
        setTransitions([...transitions, { from, to, label }]);
    };

    const toggleFinalState = id => {
        setStates(states.map(s => (s.id === id ? { ...s, isFinal: !s.isFinal } : s)));
    };

    const setStart = () => {
        const id = prompt("Enter state ID to set as start:");
        if (states.find(s => s.id === id)) {
            setStartState(id);
        }
    };

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
            </div>
            <svg ref={svgRef} className="w-full h-[500px] border rounded" />
            <p className="mt-2 text-sm text-gray-500">
                Click a state to start drawing a transition, then click another to connect. Double-click a state to toggle final.
            </p>
        </div>
    );
}

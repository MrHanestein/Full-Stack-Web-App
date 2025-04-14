// 🔐 Role-based Dashboard, Charting, and Home Navigation
import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { useAuth } from "../contexts/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { CSVLink } from "react-csv";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export function simulateCustomDFA(inputString, states, transitions, startState) {
    if (!startState || states.length === 0) return { accepted: false, path: [] };
    let current = startState;
    const path = [current];
    for (const symbol of inputString) {
        const possible = transitions.find(t => t.from.id === current && t.label === symbol);
        if (!possible) return { accepted: false, path };
        current = possible.to.id;
        path.push(current);
    }
    const finalState = states.find(s => s.id === current);
    return { accepted: finalState?.isFinal, path };
}

function DFATester({ states, transitions, startState }) {
    const [inputString, setInputString] = useState("");
    const [result, setResult] = useState(null);
    const svgRef = useRef();
    const { currentUser } = useAuth();
    const [userDFAs, setUserDFAs] = useState([]);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
    }, [result]);

    const runSimulation = () => {
        const simResult = simulateCustomDFA(inputString, states, transitions, startState);
        setResult(simResult);
        if (simResult.path.length > 0) {
            const svg = d3.select(svgRef.current);
            svg.selectAll("circle").style("stroke", "#333");
            simResult.path.forEach((stateId, index) => {
                setTimeout(() => {
                    svg.select(`#state-${stateId}`).style("stroke", "orange").style("stroke-width", "3px");
                }, index * 500);
            });
        }
    };

    const fetchAllUserDFAs = async () => {
        const querySnapshot = await getDocs(collection(db, "automata"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUserDFAs(data);
    };

    useEffect(() => {
        if (currentUser?.email === "admin@example.com") fetchAllUserDFAs();
    }, [currentUser]);

    const csvData = userDFAs.map(entry => ({
        UserID: entry.id,
        NumStates: entry.dfa?.states?.length || 0,
        NumTransitions: entry.dfa?.transitions?.length || 0
    }));

    const chartData = {
        labels: userDFAs.map((d, i) => `User ${i + 1}`),
        datasets: [
            {
                label: 'States',
                data: userDFAs.map(d => d.dfa?.states?.length || 0),
                backgroundColor: 'rgba(59, 130, 246, 0.6)'
            },
            {
                label: 'Transitions',
                data: userDFAs.map(d => d.dfa?.transitions?.length || 0),
                backgroundColor: 'rgba(34, 197, 94, 0.6)'
            }
        ]
    };

    return (
        <div className="mt-8 p-4 border rounded bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">🧪 Test Your DFA</h3>
            <div className="flex gap-2 items-center mb-2">
                <input
                    type="text"
                    value={inputString}
                    onChange={(e) => setInputString(e.target.value)}
                    placeholder="Enter input string (e.g., ab)"
                    className="px-3 py-2 border rounded w-64"
                />
                <button
                    onClick={runSimulation}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Run
                </button>
            </div>
            {result && (
                <div className="text-sm mt-2">
                    <p className={result.accepted ? "text-green-600" : "text-red-600"}>
                        {result.accepted ? "✅ Accepted!" : "❌ Rejected."}
                    </p>
                    <p className="mt-1">Path Traversed: <code>{result.path.join(" → ")}</code></p>
                </div>
            )}
            <svg ref={svgRef} className="hidden" />

            {currentUser?.email === "admin@example.com" && (
                <div className="mt-8 border-t pt-4">
                    <h4 className="text-md font-medium mb-1">👤 Admin Dashboard</h4>
                    <p className="text-sm text-muted mb-2">Viewing saved DFAs from all users:</p>
                    <ul className="text-sm space-y-1">
                        {userDFAs.map((entry, i) => (
                            <li key={i} className="bg-white border px-2 py-1 rounded">
                                <strong>User:</strong> {entry.id}<br />
                                <strong>DFA States:</strong> {entry.dfa?.states?.length || 0} | <strong>Transitions:</strong> {entry.dfa?.transitions?.length || 0}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4">
                        <CSVLink
                            data={csvData}
                            filename="dfa_submissions.csv"
                            className="bg-indigo-600 text-white px-4 py-2 rounded"
                        >
                            Export CSV
                        </CSVLink>
                    </div>
                    <div className="mt-8">
                        <h5 className="font-semibold mb-2">📊 Submission Chart</h5>
                        <Bar data={chartData} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default DFATester;




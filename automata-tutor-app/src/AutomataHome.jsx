// src/AutomataHome.jsx
import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Link } from "react-router-dom"; // so we can link back home

const quizzes = {
    "1.1": [
        { question: "Which of the following is a valid DFA component?", options: ["State", "Stack", "Tape", "Transition Table"], answer: "State" },
        { question: "What type of language can a DFA recognize?", options: ["Regular", "Context-Free", "Context-Sensitive", "Unrestricted"], answer: "Regular" },
        // ... total 10 (omitted for brevity)
    ],
    "1.2": [
        { question: "What does NFA stand for?", options: ["Nondeterministic Finite Automaton", "Normal Finite Automaton", "Nested Function Automaton", "None"], answer: "Nondeterministic Finite Automaton" },
        // ... total 10
    ],
    "1.3": [
        { question: "What does a regular expression describe?", options: ["A regular language", "A stack automaton", "A Turing machine", "Context-free language"], answer: "A regular language" },
        // ... total 10
    ],
    "1.4": [
        { question: "What is the purpose of the Pumping Lemma?", options: ["Prove non-regularity", "Create automata", "Minimize DFA", "Simulate input"], answer: "Prove non-regularity" },
        // ... total 10
    ]
};

export default function AutomataHome() {
    const [chapter, setChapter] = useState("1.1");
    const [testString, setTestString] = useState("");
    const [result, setResult] = useState("");
    const [quizIndex, setQuizIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [quizFeedback, setQuizFeedback] = useState("");
    const svgRef = useRef();

    // Reset quiz index + selection whenever chapter changes
    useEffect(() => {
        setQuizIndex(0);
        setSelectedAnswer(null);
        setQuizFeedback("");
    }, [chapter]);

    // D3 for the sample DFA
    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const width = 600;
        const height = 400;

        const states = [
            { id: "q0", x: 100, y: 200, isAccepting: false },
            { id: "q1", x: 300, y: 200, isAccepting: false },
            { id: "q2", x: 500, y: 200, isAccepting: true }
        ];

        const transitions = [
            { from: "q0", to: "q1", label: "a" },
            { from: "q1", to: "q2", label: "b" },
            { from: "q2", to: "q0", label: "c" }
        ];

        svg.attr("viewBox", `0 0 ${width} ${height}`);

        // Marker
        const defs = svg.append("defs");
        defs.append("marker")
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

        const g = svg.append("g");

        transitions.forEach(t => {
            const from = states.find(s => s.id === t.from);
            const to = states.find(s => s.id === t.to);
            if (!from || !to) return;
            g.append("line")
                .attr("x1", from.x)
                .attr("y1", from.y)
                .attr("x2", to.x)
                .attr("y2", to.y)
                .attr("stroke", "#555")
                .attr("marker-end", "url(#arrow)");

            g.append("text")
                .attr("x", (from.x + to.x) / 2)
                .attr("y", (from.y + to.y) / 2 - 10)
                .attr("text-anchor", "middle")
                .attr("fill", "black")
                .text(t.label);
        });

        states.forEach(st => {
            g.append("circle")
                .attr("cx", st.x)
                .attr("cy", st.y)
                .attr("r", 30)
                .attr("fill", st.isAccepting ? "#d4edda" : "#f0f0f0")
                .attr("stroke", "#333");

            g.append("text")
                .attr("x", st.x)
                .attr("y", st.y + 5)
                .attr("text-anchor", "middle")
                .attr("fill", "black")
                .text(st.id);
        });
    }, [chapter]);

    // Hard-coded simulation for the sample above
    const simulateDFA = () => {
        const transitionMap = {
            q0: { a: "q1" },
            q1: { b: "q2" },
            q2: { c: "q0" }
        };
        let current = "q0";
        for (const c of testString) {
            const next = transitionMap[current]?.[c];
            if (!next) {
                setResult("❌ Rejected – Invalid transition");
                return;
            }
            current = next;
        }
        setResult(current === "q2" ? "✅ Accepted – Final state reached" : "❌ Rejected – Not in final state");
    };

    const currentQuiz = quizzes[chapter]?.[quizIndex];

    // Checking the chosen answer
    const checkAnswer = () => {
        if (!currentQuiz) return;
        if (selectedAnswer === currentQuiz.answer) {
            setQuizFeedback("✅ Correct!");
        } else {
            setQuizFeedback(`❌ Incorrect. Correct answer: ${currentQuiz.answer}`);
        }
    };

    // Move to next or previous question in the array
    const nextQuestion = () => {
        setQuizFeedback("");
        setSelectedAnswer(null);
        setQuizIndex((i) => Math.min(i + 1, quizzes[chapter].length - 1));
    };
    const prevQuestion = () => {
        setQuizFeedback("");
        setSelectedAnswer(null);
        setQuizIndex((i) => Math.max(i - 1, 0));
    };

    return (
        <main className="p-4 max-w-5xl mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold mb-4">🧠 Automata Tutor Quizzes</h1>
                <Link to="/" className="text-blue-600 underline hover:text-blue-800">
                    ← Back to Home
                </Link>
            </div>

            {/* Chapter switching buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                <Button variant="outline" onClick={() => setChapter("1.1")}>Chapter 1.1</Button>
                <Button variant="outline" onClick={() => setChapter("1.2")}>Chapter 1.2</Button>
                <Button variant="outline" onClick={() => setChapter("1.3")}>Chapter 1.3</Button>
                <Button variant="outline" onClick={() => setChapter("1.4")}>Chapter 1.4</Button>
            </div>

            <Card>
                <CardContent className="p-6">
                    {chapter === "1.1" && (
                        <p>
                            📘 <strong>Chapter 1.1: Deterministic Finite Automata (DFA)</strong><br />
                            Learn about DFA with interactive visualizations below.
                        </p>
                    )}
                    {chapter === "1.2" && (
                        <p>
                            📗 <strong>Chapter 1.2: Nondeterministic Finite Automata (NFA)</strong><br />
                            Understand NFA and how to convert to DFA.
                        </p>
                    )}
                    {chapter === "1.3" && (
                        <p>
                            📙 <strong>Chapter 1.3: Regular Expressions</strong><br />
                            Visualize how regular expressions correspond to automata.
                        </p>
                    )}
                    {chapter === "1.4" && (
                        <p>
                            📕 <strong>Chapter 1.4: The Pumping Lemma</strong><br />
                            Use symbolic tools to explore language non-regularity proofs.
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* Sample DFA Visualization */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-2">🎯 Interactive DFA Builder (Sample)</h2>
                <svg ref={svgRef} className="w-full h-96 border rounded" />
            </div>

            {/* Test a string in the sample DFA */}
            <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">🧪 Test a String</h3>
                <div className="flex items-center gap-4 mb-2">
                    <Input
                        type="text"
                        placeholder="Enter a string (e.g., abc)"
                        value={testString}
                        onChange={e => setTestString(e.target.value)}
                    />
                    <Button onClick={simulateDFA}>Run</Button>
                </div>
                <p className="text-sm text-gray-600">Result: {result}</p>
            </div>

            {/* The actual quiz question for the chosen chapter */}
            {currentQuiz && (
                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-2">
                        📚 Quiz (Question {quizIndex + 1} of {quizzes[chapter].length}): {currentQuiz.question}
                    </h3>
                    <div className="grid gap-2">
                        {currentQuiz.options.map(option => (
                            <Button
                                key={option}
                                variant={selectedAnswer === option ? "default" : "outline"}
                                onClick={() => setSelectedAnswer(option)}
                            >
                                {option}
                            </Button>
                        ))}
                    </div>

                    {/* Submit/feedback */}
                    <Button className="mt-4" onClick={checkAnswer}>
                        Submit Answer
                    </Button>
                    {quizFeedback && <p className="mt-2 text-sm">{quizFeedback}</p>}

                    {/* Next/Prev question */}
                    <div className="flex gap-2 mt-4">
                        <Button onClick={prevQuestion} variant="outline">
                            Previous Question
                        </Button>
                        <Button onClick={nextQuestion} variant="outline">
                            Next Question
                        </Button>
                    </div>
                </div>
            )}
        </main>
    );
}

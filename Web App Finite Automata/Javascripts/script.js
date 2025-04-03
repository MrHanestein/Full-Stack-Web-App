// ========================
// Core Automata Library
// ========================
class Automaton {
    constructor(type = 'dfa') {
        this.type = type;
        this.states = [];
        this.transitions = [];
        this.startState = null;
        this.acceptStates = [];
        this.alphabet = ['0', '1']; // Default alphabet
    }

    addState(x, y) {
        const state = {
            id: `q${this.states.length}`,
            x,
            y,
            isAccept: false,
            isStart: false
        };
        this.states.push(state);
        return state;
    }

    addTransition(from, to, symbol) {
        this.transitions.push({
            from,
            to,
            symbol: symbol === 'ε' ? '' : symbol
        });

    }
}

// ========================
// Chapter 1.1: DFA Implementation
// ========================
class DFASimulator {
    constructor(automaton) {
        this.automaton = automaton;
    }

    simulate(input) {
        let currentState = this.automaton.startState;
        const trace = [];

        for (const symbol of input) {
            const transition = this.automaton.transitions.find(t =>
                t.from === currentState && t.symbol === symbol
            );
            if (!transition) return { accepted: false, trace };
            trace.push(transition);
            currentState = transition.to;
        }

        const accepted = this.automaton.acceptStates.includes(currentState);
        return { accepted, trace };
    }


}

// ========================
// Chapter 1.2: NFA Implementation
// ========================
class NFASimulator {
    constructor(automaton) {
        this.automaton = automaton;
    }

    simulate(input) {
        let currentStates = new Set([this.automaton.startState]);
        const trace = [];

        // Process epsilon transitions first
        currentStates = this.epsilonClosure(currentStates);

        for (const symbol of input) {
            const nextStates = new Set();
            for (const state of currentStates) {
                const transitions = this.automaton.transitions.filter(t =>
                    t.from === state && t.symbol === symbol
                );
                transitions.forEach(t => nextStates.add(t.to));
            }
            currentStates = this.epsilonClosure(nextStates);
            trace.push([...currentStates]);
            if (currentStates.size === 0) break;
        }

        const accepted = [...currentStates].some(s =>
            this.automaton.acceptStates.includes(s)
        );
        return { accepted, trace };
    }

    epsilonClosure(states) {
        const closure = new Set(states);
        let changed = true;
        while (changed) {
            changed = false;
            closure.forEach(state => {
                this.automaton.transitions
                    .filter(t => t.from === state && t.symbol === '')
                    .forEach(t => {
                        if (!closure.has(t.to)) {
                            closure.add(t.to);
                            changed = true;
                        }
                    });
            });
        }
        return closure;
    }
}

// ========================
// Chapter 1.3: Regex to NFA Converter
// ========================
class RegexConverter {
    constructor() {
        this.stateCounter = 0;
    }

    parse(regex) {
        const automaton = new Automaton('nfa');
        // For demonstration purposes, handle a simple pattern like (a|b)*abb
        const [start, accept] = this.buildBasicRegexNFA(regex);
        automaton.startState = start;
        automaton.acceptStates.push(accept);
        return automaton;
    }

    buildBasicRegexNFA(regex) {
        // Create dummy states for (a|b)*abb – a simplified example
        const start = this.createState();
        const accept = this.createState();
        const s1 = this.createState();
        const s2 = this.createState();
        const s3 = this.createState();

        // Note: In a full implementation, these transitions would be added to the automaton.
        this.addTransition(start, s1, '');
        this.addTransition(s1, s1, 'a');
        this.addTransition(s1, s1, 'b');
        this.addTransition(s1, s2, 'a');
        this.addTransition(s2, s3, 'b');
        this.addTransition(s3, accept, 'b');

        return [start, accept];
    }

    createState() {
        return `s${this.stateCounter++}`;
    }

    addTransition(from, to, symbol) {
        // In a complete version, you would add this to the automaton's transitions.
        console.log(`Add transition from ${from} to ${to} on symbol "${symbol}"`);
    }
}

// ========================
// Chapter 1.4: Pumping Lemma Implementation
// ========================
class PumpingLemma {
    constructor(language) {
        this.language = language; // Language object should have a check(s) method.
    }

    findDecomposition(s) {
        // Simplified: assume a decomposition for strings of the form a^n b^n.
        const n = Math.floor(s.length / 2);
        return {
            x: s.slice(0, 1),
            y: s.slice(1, 2),
            z: s.slice(2),
            isValid: s.slice(0, n) === 'a'.repeat(n) && s.slice(n) === 'b'.repeat(n)
        };
    }

    verify(s, decomposition, k) {
        const pumped = decomposition.x + decomposition.y.repeat(k) + decomposition.z;
        return !this.language.check(pumped);
    }
}

// ========================
// Application & UI Integration
// ========================
const automatonManager = {
    currentChapter: null,
    currentAutomaton: null,
    currentPumpingLemma: null,

    // Initializes the proper automaton based on the chapter.
    initChapter(chapter) {
        this.currentChapter = chapter;
        console.log(`Initializing chapter ${chapter}`);
        switch(chapter) {
            case '1.1':
                this.currentAutomaton = new Automaton('dfa');
                // Example setup for DFA: create two states and one transition.
                const state0 = this.currentAutomaton.addState(100, 100);
                state0.isStart = true;
                this.currentAutomaton.startState = state0.id;
                const state1 = this.currentAutomaton.addState(300, 100);
                state1.isAccept = true;
                this.currentAutomaton.acceptStates.push(state1.id);
                this.currentAutomaton.addTransition(state0.id, state1.id, '0');
                break;
            case '1.2':
                this.currentAutomaton = new Automaton('nfa');
                // Dummy NFA setup.
                const nfaState0 = this.currentAutomaton.addState(100, 100);
                nfaState0.isStart = true;
                this.currentAutomaton.startState = nfaState0.id;
                const nfaState1 = this.currentAutomaton.addState(200, 100);
                nfaState1.isAccept = true;
                this.currentAutomaton.acceptStates.push(nfaState1.id);
                this.currentAutomaton.addTransition(nfaState0.id, nfaState1.id, 'a');
                this.currentAutomaton.addTransition(nfaState0.id, nfaState1.id, ''); // epsilon
                break;
            case '1.3':
                // Parse regex into an NFA.
                const converter = new RegexConverter();
                this.currentAutomaton = converter.parse('(a|b)*abb');
                break;
            case '1.4':
                // Initialize Pumping Lemma tool with a dummy language checker.
                this.currentPumpingLemma = new PumpingLemma({
                    check: (s) => s === 'aabb' // For demonstration, only 'aabb' is accepted.
                });
                break;
            default:
                console.warn('Unknown chapter!');
        }
        this.render();
    },

    render() {
        // Update UI accordingly.
        console.log(`Rendering UI for chapter ${this.currentChapter}`);
        // Here you would update your simulation canvas, etc.
    },

    // Runs the simulation based on current chapter and input.
    handleSimulation(input) {
        switch(this.currentChapter) {
            case '1.1':
                return new DFASimulator(this.currentAutomaton).simulate(input);
            case '1.2':
                return new NFASimulator(this.currentAutomaton).simulate(input);
            case '1.3':
                // Simple regex test using JavaScript's RegExp.
                const regex = document.getElementById('regex-input')
                    ? document.getElementById('regex-input').value
                    : '(a|b)*abb';
                try {
                    const re = new RegExp(`^${regex}$`);
                    return { accepted: re.test(input) };
                } catch {
                    return { error: 'Invalid regex' };
                }
            default:
                return { error: 'No simulation available for this chapter' };
        }
    }
};
function runDFA() {
    const input = document.getElementById("test-input").value;
    document.getElementById("simulation-result").innerText =
        `Processing input: ${input}... (Simulation logic here)`;
}

// ========================
// Drag-and-Drop Manager for Interactive Simulation UI
// ========================
class DragManager {
    constructor() {
        this.dragging = null;
        this.offset = { x: 0, y: 0 };
    }

    init() {
        document.addEventListener('mousedown', this.startDrag.bind(this));
        document.addEventListener('mousemove', this.drag.bind(this));
        document.addEventListener('mouseup', this.endDrag.bind(this));
    }

    startDrag(e) {
        if (e.target.classList.contains('state')) {
            this.dragging = e.target;
            const rect = this.dragging.getBoundingClientRect();
            this.offset = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        }
    }

    drag(e) {
        if (this.dragging) {
            this.dragging.style.left = `${e.clientX - this.offset.x}px`;
            this.dragging.style.top = `${e.clientY - this.offset.y}px`;
        }
    }

    endDrag() {
        this.dragging = null;
    }
}

// Initialize drag manager.
new DragManager().init();

// ========================
// Initialize the Application Based on Page Data
// ========================

// On each chapter page, set <body data-chapter="1.1"> (or "1.2", etc.)
window.onload = function() {
    const chapter = document.body.getAttribute('data-chapter') || '1.1';
    automatonManager.initChapter(chapter);
};

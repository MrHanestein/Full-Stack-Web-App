// src/ChapterPage.jsx
import React from "react";
import { useAuth } from "./AuthContext";

export default function ChapterPage({ title, description }) {
    const { currentUser } = useAuth();
    const [time, setTime] = React.useState(1200); // 20 min
    const [xpGranted, setXpGranted] = React.useState(false);

    React.useEffect(() => {
        const timer = setInterval(() => setTime(t => (t > 0 ? t - 1 : 0)), 1000);
        return () => clearInterval(timer);
    }, []);

    const grantXP = async () => {
        if (currentUser && !xpGranted) {
            const { getFirestore, doc, updateDoc, getDoc, setDoc } = await import("firebase/firestore");
            const db = getFirestore();
            const ref = doc(db, "users", currentUser.uid);
            const snap = await getDoc(ref);

            if (snap.exists()) {
                await updateDoc(ref, { xp: (snap.data().xp || 0) + 10 });
            } else {
                await setDoc(ref, { xp: 10, displayName: currentUser.displayName || "Unknown", role: "student" });
            }
            setXpGranted(true);
        }
    };

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
        <div className="min-h-screen p-8 bg-white">
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-gray-700 mb-4">{description}</p>
            <p className="text-sm text-blue-600">
                Interactive builder, quizzes, and resources for this chapter will be here.
            </p>

            <div className="text-center mt-6">
                <p className="text-lg font-medium">
                    ⏱ Time Left: {minutes}:{seconds.toString().padStart(2, "0")}
                </p>
                <p className="text-green-700 mt-2">
                    Earn bonus XP by finishing before time runs out!
                </p>
            </div>

            <div className="text-center mt-4">
                <button
                    onClick={grantXP}
                    disabled={xpGranted}
                    className={`px-4 py-2 rounded font-semibold text-white ${
                        xpGranted ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
                    }`}
                >
                    {xpGranted ? "✅ XP Awarded!" : "🏅 Claim 10 XP for this chapter"}
                </button>
            </div>

            <div className="mt-6 text-sm text-center">
                <a
                    href="https://www.cs.princeton.edu/courses/archive/spr10/cos340/Handouts/pumping.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-indigo-600 hover:text-indigo-800"
                >
                    📄 Pumping Lemma Cheat Sheet
                </a>
                <br />
                <a
                    href="https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-045j-automata-computability-and-complexity-spring-2011/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-indigo-600 hover:text-indigo-800"
                >
                    📺 MIT Automata Course (OCW)
                </a>
            </div>
        </div>
    );
}

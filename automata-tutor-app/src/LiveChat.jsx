// src/LiveChat.jsx
import React from "react";
import { useAuth } from "./AuthContext";

export default function LiveChat() {
    const [messages, setMessages] = React.useState([]);
    const [input, setInput] = React.useState("");
    const { currentUser } = useAuth();

    React.useEffect(() => {
        // Listen to Firestore "chat" collection in real time
        import("firebase/firestore").then(({ getFirestore, collection, onSnapshot, query, orderBy }) => {
            const db = getFirestore();
            const chatRef = collection(db, "chat");
            const q = query(chatRef, orderBy("timestamp", "asc"));
            onSnapshot(q, snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()));
            });
        });
    }, []);

    const sendMessage = async () => {
        if (!input.trim()) return;
        const { getFirestore, collection, addDoc, serverTimestamp } = await import("firebase/firestore");
        const db = getFirestore();
        await addDoc(collection(db, "chat"), {
            user: currentUser?.displayName || "Anonymous",
            message: input,
            timestamp: serverTimestamp()
        });
        setInput("");
    };

    return (
        <div className="p-6 text-center">
            <h1 className="text-2xl font-bold mb-4">💬 Live Student Chat</h1>
            <p className="mb-4">Chat with peers, ask questions, or share tips!</p>
            <div className="bg-white p-4 max-w-md mx-auto border rounded shadow">
                <div className="h-64 overflow-y-auto mb-4">
                    {messages.map((msg, i) => (
                        <p key={i}>
                            <strong>{msg.user}:</strong> {msg.message}
                        </p>
                    ))}
                </div>
                <div className="flex gap-2">
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        className="flex-1 px-3 py-2 border rounded"
                        placeholder="Type your message..."
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

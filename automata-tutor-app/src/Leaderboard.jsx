// src/Leaderboard.jsx
import React from "react";

export default function Leaderboard() {
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        import("firebase/firestore").then(({ getFirestore, collection, getDocs, query, orderBy, limit }) => {
            const db = getFirestore();
            const usersRef = collection(db, "users");
            const q = query(usersRef, orderBy("xp", "desc"), limit(10));
            getDocs(q).then(snapshot => {
                const leaderboard = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUsers(leaderboard);
            });
        });
    }, []);

    return (
        <div className="p-6 text-center">
            <h1 className="text-2xl font-bold mb-4">🏆 Leaderboard</h1>
            <p className="mb-4">Ranking the most engaged students by XP.</p>
            <ul className="max-w-md mx-auto text-left">
                {users.map((user, i) => (
                    <li key={user.id} className="mb-2">
                        {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "⭐"}{" "}
                        {user.displayName || user.id} – {user.xp || 0} XP
                    </li>
                ))}
            </ul>
        </div>
    );
}

// src/components/MemberList.tsx

import React, { useState, useEffect } from 'react';
import { getMembers, Member } from '../services/MemberService';
import './MemberList.css';


const MemberList: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);  // Liste des membres
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState<string>('');  // Valeur de la query (état du filtre)
    const [inputValue, setInputValue] = useState<string>('');  // Valeur temporaire pour l'input

    // Fonction pour gérer la soumission du formulaire
    const handleSearchSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Empêche le rechargement de la page
        setQuery(inputValue); // Mise à jour de `query` avec la valeur actuelle de l'input
        await fetchMembers(inputValue); // Appel de fetchMembers avec la nouvelle query
    };

    // Fonction pour récupérer les membres en fonction de la query
    const fetchMembers = async (searchQuery: string) => {
        setLoading(true);  // On active le loading avant la requête
        try {
            const membersData = await getMembers(searchQuery);  // Appel avec la query
            setMembers(membersData);
        } catch (err) {
            setError('Failed to load members');
        } finally {
            setLoading(false);
        }
    };

    // Utilisation de useEffect pour charger les membres lors du montage initial
    useEffect(() => {
        fetchMembers(query); // Charger les membres au début si la query est définie
    }, [query]); // Le useEffect se déclenche chaque fois que `query` change

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            {/* Formulaire de recherche */}
            <form onSubmit={handleSearchSubmit}>
                <label htmlFor="searchQuery">Search:</label>
                <input
                    type="text"
                    id="searchQuery"
                    value={inputValue} // Utilisation de la valeur temporaire
                    onChange={(e) => setInputValue(e.target.value)} // Mise à jour de la valeur de l'input
                />
                <button type="submit">Search</button>
            </form>

            {/* Table des membres */}
            <table>
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Age</th>
                </tr>
                </thead>
                <tbody>
                {members.map((member) => (
                    <tr>
                        <td>{member.firstName}</td>
                        <td>{member.lastName}</td>
                        <td>{member.email}</td>
                        <td>{member.age}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MemberList;

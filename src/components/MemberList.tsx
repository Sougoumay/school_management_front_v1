// src/components/MemberList.tsx

import React, { useState, useEffect } from 'react';
import {getMembers, Member} from '../services/MemberService';


const MemberList: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);  // Utilisation du type Member
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const membersData = await getMembers();
                setMembers(membersData);
            } catch (err) {
                setError('Failed to load members');
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []); // Le tableau vide [] signifie que l'effet se déclenche une seule fois, au montage

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Members List</h1>
            <ul>
                {members.map((member) => (
                    <li>
                        <p><strong>First Name:</strong> {member.firstName}</p>
                        <p><strong>Last Name:</strong> {member.lastName}</p>
                        <p><strong>Email:</strong> {member.email}</p>
                        <p><strong>Age:</strong> {member.age}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MemberList;

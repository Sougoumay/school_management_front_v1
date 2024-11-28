// src/services/MemberService.ts
export interface Member {
    lastName: string;
    firstName: string;
    email: string;
    age: number;
}

const API_URL = 'http://localhost:9090/api/members?type=teacher';

export const getMembers = async (): Promise<Member[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch members');
        }
        const data: Member[] = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

// src/services/MemberService.ts
export interface Member {
    lastName: string;
    firstName: string;
    email: string;
    age: number;
}

const API_URL = process.env.REACT_APP_API_URL;
export const getMembers = async (query: string = ''): Promise<Member[]> => {
    try {
        const url = query ? `${API_URL}/api/members?type=${query}` : `${API_URL}/api/members`;
        console.log(url);
        const response = await fetch(url);
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

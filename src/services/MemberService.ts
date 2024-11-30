// src/services/MemberService.ts
export interface Member {
    lastName: string;
    firstName: string;
    email: string;
    age: number;
}

const API_URL = 'https://backend-web-app-avhvardaaag0ffc0.francecentral-01.azurewebsites.net';
//const API_URL = 'http://localhost:9090';

export const getMembers = async (query: string = ''): Promise<Member[]> => {
    try {
        const response = await fetch(`${API_URL}/api/members?type=${query}`);
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

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
        // console.log("before if");
        // console.log(API_URL);
        // if(API_URL === undefined) {
        //     API_URL = "https://my-app-webapp-1c897190a3dc.azurewebsites.net";
        // }
        // console.log("after if");
        // console.log(API_URL);
        const url = query ? `${API_URL}/api/members?type=${query}` : `${API_URL}/api/members`;
        console.log(url);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch members');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export interface Session {
    id: string;
    title: string;
    createdAt: Date;
    // questions: Question[];
}

export interface Question {
    id: string;
    title: string;
    likes: number;
    sessionId: string
    answered: boolean;
    // createdAt: Date;
}

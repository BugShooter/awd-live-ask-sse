'use server';
import { Question } from "@/types/global";

export async function fetchQuestions(sessionId: string): Promise<Question[]> {
    const allQuestions = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/${sessionId}`);
    const data = await allQuestions.json() as Question[];
    //TODO: zod validation
    return data;
}

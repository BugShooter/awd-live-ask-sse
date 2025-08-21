'use client';
import { Question } from "@/types/global";

export async function likeQuestion(questionId: string): Promise<Question> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/${questionId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ likes: 1 }),
    });
    const data = await response.json() as Question;
    return data;
}

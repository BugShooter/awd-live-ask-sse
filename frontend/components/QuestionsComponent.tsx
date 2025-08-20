'use client';
import { fetchQuestions } from '@/actions/fetchQuestions';
import { Question } from '@/types/global';
import { useEffect, useState } from 'react';

export default function QuestionsComponent({ sessionId }: { sessionId: string }) {
    const [questions, setQuestions] = useState<Question[]>([]);

    // Fetch questions when the component mounts or sessionId changes
    // from server side
    // then we can update the state with SSEs events
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchQuestions(sessionId);
            setQuestions(data);
        };
        fetchData();
    }, [sessionId]);

    if (!questions || questions.length === 0) {
        return <div>No questions found for this session.</div>;
    }

    return (
        <ul>
            {questions.map(question => (
                <li key={question.id}>
                    Id: {question.id} - Title: {question.title} - <button>Likes</button>: {question.likes}
                </li>
            ))}
        </ul>
    );
}
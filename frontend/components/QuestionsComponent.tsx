'use client';
import { fetchQuestions } from '@/actions/fetchQuestions';
import { likeQuestion } from './likeQuestion';
import { Question } from '@/types/global';
import { useEffect, useState } from 'react';
import AddQuestion from './AddQuestion';

interface QuestionsUpdateEvent {
    data: Question[];
    id: string;
    type: 'questions-update';
}

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

    useEffect(() => {
        const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/questions/${sessionId}/events`);

        // eventSource.onmessage = (event) => {
        //     const questionEvent: QuestionEvent = JSON.parse(event.data);
        //     console.log('Received SSE:', questionEvent);
        //     if (questionEvent.type !== 'questions-update') return;

        //     const questionToUpdate = questionEvent.data[0];
        //     setQuestions((prev) => prev.map((q) => (q.id === questionToUpdate.id ? questionToUpdate : q)));
        // };
        eventSource.addEventListener('questions-update', (event: MessageEvent) => {
            // console.log('Received SSE custom event "questions-update":', event);
            console.log('Received SSE custom event "questions-update"');
            try {
                const questionsToUpdate = JSON.parse(event.data) as Question[];
                console.log("Likes:", questionsToUpdate.map(q => q.likes));
                setQuestions((prev) => prev.map((q) => {
                    const updatedQuestion = questionsToUpdate.find((uq) => uq.id === q.id);
                    return updatedQuestion ? updatedQuestion : q;
                }).sort((a, b) => b.likes - a.likes));

            } catch (error) {
                console.error('Error parsing SSE data:', error);
            }
        });

        eventSource.addEventListener('questions-create', (event: MessageEvent) => {
            // console.log('Received SSE custom event "questions-update":', event);
            console.log('Received SSE custom event "questions-create"');
            try {
                const questionsToUpdate = JSON.parse(event.data) as Question[];
                setQuestions((prev) => [...prev, ...questionsToUpdate].sort((a, b) => b.likes - a.likes));
            } catch (error) {
                console.error('Error parsing SSE data:', error);
            }
        });

        eventSource.onerror = (err) => {
            console.error('SSE error:', err);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, []);

    if (!questions || questions.length === 0) {
        return <div>No questions found for this session.
            New question: <AddQuestion sessionId={sessionId} /></div>;
    }

    const handleClick = async (event, questionId) => {
        event.preventDefault();
        console.log(questionId);
        const result = await likeQuestion(questionId);
        console.log('Like result', result);
    }

    return (
        <>
            <div className='questionsWrapper'>
                <ul className='questions'>
                    {questions.map(question => (
                        <li key={question.id}>
                            <div className='idContainer'>
                                Id: {question.id} - Title: {question.title}
                            </div>
              
                            <span className='actions'>
                                <button onClick={(event) => handleClick(event, question.id)}>Likes</button>: {question.likes}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            New question: <AddQuestion sessionId={sessionId} />
        </>
    );
}
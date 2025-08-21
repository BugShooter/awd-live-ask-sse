'use client';

import { createNewQuestion } from "@/actions/addQuestion";
import { useState, useActionState } from "react";

const initialState = {
  message: ''
}

export default function AddQuestion({ sessionId }: { sessionId: string }) {
  const [name, setName] = useState("");
  const createNewQuestionWithId = createNewQuestion.bind(null, sessionId);
  const [state, formAction] = useActionState(createNewQuestionWithId, initialState);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  return (
    <div>
        <form
        action={formAction}>
            <input type="text" name="name" value={name} onChange={handleChange} placeholder="question"/>
            <input type="submit" value='Save' className="formbutton"/>
            <small>{state?.message}</small>
        </form>
    </div>
  );
}
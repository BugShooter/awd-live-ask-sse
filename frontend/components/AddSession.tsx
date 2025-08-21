'use client';
import { createNewSession } from "@/actions/addSession";
import { useState, useActionState } from "react";

const initialState = {
  message: ''
}

export default function AddSession() {
    const [name, setName] = useState("");
  const [state, formAction] = useActionState(createNewSession, initialState);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  return (
    <div>
        <form
        action={formAction}>
            <input type="text" name="name" value={name} onChange={handleChange} placeholder="title"/>
            <input type="submit" value='Save' className="formbutton"/>
            <small>{state?.message}</small>
        </form>
    </div>
  );
}
'use server';
import { redirect } from "next/navigation";

export async function createNewQuestion(sessionId: string, prevState: any,formData: FormData){
    const name = formData.get('name');
    if(!name){
        return { errors: 'empty name', message: 'empty name' }
    }
    
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/`, {
        method: 'POST',
        headers: new Headers([['Content-Type', 'application/json']]),
        body: JSON.stringify({title: name, sessionId})
    })

    console.log(result);

    //redirect('/'+sessionId);
}
import styles from "./page.module.css";
import Link from 'next/link';
import { Session } from "@/types/global";
import AddSession from '../components/AddSession';

export default async function Home() {
  const allSessions = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`);
  const data = await allSessions.json() as Session[];

  return (
   <div>
    <h2>Sessions</h2>
    <ul>
      {data.map(session => (
      <li key={session.id}>
        <Link href={'/' + session.id} >{session.title}</Link>
      </li>
    ))}
    </ul>
    <AddSession />
   </div> 
  );
}

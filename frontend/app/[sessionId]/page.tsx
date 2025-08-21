import QuestionsComponent from '@/components/QuestionsComponent';
import Link from 'next/dist/client/link';

export default async function Session({
  params,
}: {
  params: Promise<{ sessionId: string }>
}) {
  const { sessionId } = await params;

  return (
    <>
      <div>
        <Link href="/">Back to Home</Link>
        <h2>Questions for session: {sessionId}</h2>
        <QuestionsComponent sessionId={sessionId} />
      </div>
    </>
  );
}

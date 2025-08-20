import QuestionsComponent from '@/components/QuestionsComponent';

export default async function Session({
  params,
}: {
  params: Promise<{ sessionId: string }>
}) {
  const { sessionId } = await params;

  return (
    <div>
      <h2>Questions for session: {sessionId}</h2>
      <QuestionsComponent sessionId={sessionId} />
    </div>
  );
}

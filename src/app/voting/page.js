export default function Voting() {
  const items = [
    { date: 'August 7', text: 'Initial Member Election Special Meeting Notice' },
    { date: 'August 14, 6 PM', text: 'Meet the Candidates (in-person)' },
    { date: 'August 20', text: 'Voting Opens — Vote HOA Now (independent provider)' },
    { date: 'September 2', text: 'Voting Closes' },
    { date: 'September 3', text: 'Results announced at Special Meeting' },
  ];
  return (
    <div className="card">
      <h1 className="text-2xl font-bold mb-4 text-wsr-red">Election Timeline & Voting Rules</h1>
      <ul className="list-disc ml-6 space-y-1">
        {items.map((i, idx)=>(<li key={idx}><b>{i.date}:</b> {i.text}</li>))}
      </ul>
      <p className="mt-4 font-semibold">There is <span className="text-wsr-red">1 vote per address by a Title Owner</span>.</p>
    </div>
  );
}
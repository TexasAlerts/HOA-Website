export default function VotingPage(){
  return (
    <main className="bg-white">
      <div className="banner-spacer" />
      <section className="section">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="h1">Make Your Voice Count</h1>
          <p className="mt-3 subtle">This election is more than filling two seats—it’s about setting the tone for homeowner-led governance in the near future. With the right leaders, these first homeowner-elected seats can establish a culture of accountability, transparency, and unity.</p>

          <div className="mt-8 grid gap-4">
            <div className="card p-5"><strong>Meet the Candidates — Aug 14 @ 6 PM</strong><div className="subtle">Come with questions. Hear real answers. Hold us accountable.</div></div>
            <div className="card p-5"><strong>Voting Opens — Aug 20</strong> via Vote HOA Now<div className="subtle">Secure online voting through an independent provider.</div></div>
            <div className="card p-5"><strong>Voting Closes — Sept 2</strong><div className="subtle">Don’t wait. Make sure your voice is counted.</div></div>
            <div className="card p-5"><strong>Results Announced — Sept 3 Special Meeting</strong></div>
            <div className="card p-5"><strong>One vote per home address by a Title Owner</strong></div>
          </div>

          <div className="mt-10">
            <h2 className="h2">Why This Election Matters</h2>
            <p className="mt-2 subtle">These two homeowner-elected seats join three developer-appointed members. While a developer majority remains today, your vote sets the tone for full homeowner governance in the near future. Accountability, transparency, and unity start with who you elect now.</p>
          </div>

          <div className="mt-10">
            <h2 className="h2">The Role of a Board Member</h2>
            <p className="mt-2 subtle">Board members are stewards of our shared home. They oversee budgets and reserves, set policy, guide maintenance and vendor performance, communicate decisions in plain language, and listen—truly listen—to homeowners. It’s collaborative work that balances today’s needs with tomorrow’s plans. When it’s done well, homeowners feel informed, heard, and confident about where we’re headed.</p>
            <a className="btn btn-secondary mt-4" href="/docs/board-member-101.pdf" target="_blank" rel="noopener noreferrer">Download: HOA Board Member 101 (PDF)</a>
          </div>
        </div>
      </section>
    </main>
  );
}


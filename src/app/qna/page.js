// Optional dedicated Q&A page if you want a separate route in nav
export default function QnAPage(){
    return (
      <main className="bg-white">
        <div className="banner-spacer" />
        <section className="section">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h1 className="h1">Community Q&A</h1>
            <p className="mt-2 subtle">Approved questions and answers will be posted here. Check back soon.</p>
          </div>
        </section>
      </main>
    );
  }
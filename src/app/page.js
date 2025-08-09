"use client";

import Image from "next/image";
import { useRef } from "react";

export default function Page() {
  const getInvolvedRef = useRef(null);

  const scrollToForms = (e) => {
    e.preventDefault();
    getInvolvedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          {/* On mobile we stack text first, image second */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Text & Buttons */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                A Transparent, Accountable HOA—Built With You.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-gray-700">
                Let’s protect home values, keep assessments in check, and strengthen our community through
                clear communication and owner involvement.
              </p>

              <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-3">
                <a
                  href="#get-involved"
                  onClick={scrollToForms}
                  className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-white bg-red-600 hover:bg-red-700 transition"
                >
                  Endorse Doug
                </a>
                <a
                  href="#get-involved"
                  onClick={scrollToForms}
                  className="inline-flex items-center justify-center rounded-2xl px-5 py-3 border border-red-600 text-red-700 hover:bg-red-50 transition"
                >
                  Get Involved
                </a>
              </div>
            </div>

            {/* Right: Headshot (safe, simple sizing) */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden shadow-lg">
                {/* Update src to your actual image path in /public if different */}
                <Image
                  src="/headshot.jpg"
                  alt="Doug Charles"
                  fill
                  priority
                  sizes="(max-width: 1024px) 256px, 288px"
                  className="object-cover object-center portrait-object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT BLOCK (example) */}
      <section className="bg-gray-50 border-t">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <h2 className="text-2xl font-semibold">Priorities</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            <li className="rounded-xl border p-4 bg-white">Fiscal transparency and strong reserves</li>
            <li className="rounded-xl border p-4 bg-white">Community engagement via owner committees</li>
            <li className="rounded-xl border p-4 bg-white">Vendor accountability and clear performance</li>
            <li className="rounded-xl border p-4 bg-white">Protecting home values and the WSR lifestyle</li>
          </ul>
        </div>
      </section>

      {/* GET INVOLVED (anchor target) */}
      <section id="get-involved" ref={getInvolvedRef} className="bg-white border-t scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <h2 className="text-2xl font-semibold">Get Involved</h2>
          <p className="mt-2 text-gray-600">
            Choose how you’d like to participate—endorse, volunteer, host, or request a meeting.
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Endorse form */}
            <form
              className="rounded-2xl border p-5"
              method="POST"
              action="/api/endorsements"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = new FormData(e.currentTarget);
                const payload = {
                  name: String(form.get("name") || ""),
                  message: String(form.get("message") || ""),
                };
                const res = await fetch("/api/endorsements", {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify(payload),
                });
                if (res.ok) {
                  alert("Thank you for your endorsement! It may appear once approved.");
                  e.currentTarget.reset();
                } else {
                  const j = await res.json().catch(() => ({}));
                  alert(j?.error || "Something went wrong.");
                }
              }}
            >
              <h3 className="text-lg font-semibold">Endorse Doug</h3>
              <div className="mt-4 grid gap-3">
                <input name="name" required placeholder="Your name" className="border rounded-lg p-3" />
                <textarea name="message" rows={4} placeholder="Optional message" className="border rounded-lg p-3" />
                <button type="submit" className="rounded-xl bg-red-600 hover:bg-red-700 text-white px-5 py-3">
                  Submit Endorsement
                </button>
              </div>
            </form>

            {/* Interest / Get Involved form */}
            <form
              className="rounded-2xl border p-5"
              method="POST"
              action="/api/interest"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = new FormData(e.currentTarget);
                const payload = {
                  type: String(form.get("type") || "updates"),
                  name: String(form.get("name") || ""),
                  email: String(form.get("email") || ""),
                  phone: String(form.get("phone") || ""),
                  message: String(form.get("message") || ""),
                };
                const res = await fetch("/api/interest", {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify(payload),
                });
                if (res.ok) {
                  alert("Thanks—you're in! We'll be in touch.");
                  e.currentTarget.reset();
                } else {
                  const j = await res.json().catch(() => ({}));
                  alert(j?.error || "Something went wrong.");
                }
              }}
            >
              <h3 className="text-lg font-semibold">Get Involved</h3>
              <div className="mt-4 grid gap-3">
                <select name="type" className="border rounded-lg p-3">
                  <option value="updates">Get Updates</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="host">Host a Home Meeting</option>
                  <option value="meeting">Request a Meeting</option>
                </select>

                <input name="name" required placeholder="Name" className="border rounded-lg p-3" />
                <input name="email" type="email" required placeholder="Email" className="border rounded-lg p-3" />
                <input name="phone" placeholder="Mobile (optional)" className="border rounded-lg p-3" />
                <textarea name="message" rows={4} placeholder="Message (optional)" className="border rounded-lg p-3" />
                <button type="submit" className="rounded-xl bg-red-600 hover:bg-red-700 text-white px-5 py-3">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

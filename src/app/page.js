"use client";

import Image from "next/image";
import { useRef } from "react";

export default function HomePage() {
  // Ref to the forms block
  const getInvolvedRef = useRef(null);

  const scrollToForms = (e) => {
    e.preventDefault();
    getInvolvedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Text & Buttons */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              A Transparent, Accountable HOA—Built With You.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-700">
              Let’s protect home values, keep assessments in check, and strengthen our community through
              clear communication and owner involvement.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {/* Endorse Doug → scrolls to forms (same as Get Involved) */}
              <a
                href="#get-involved"
                onClick={scrollToForms}
                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-white bg-red-600 hover:bg-red-700 transition"
              >
                Endorse Doug
              </a>

              {/* Get Involved → also scrolls to forms */}
              <a
                href="#get-involved"
                onClick={scrollToForms}
                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 border border-red-600 text-red-700 hover:bg-red-50 transition"
              >
                Get Involved
              </a>
            </div>
          </div>

          {/* Right: Headshot (mobile portrait fix) */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden shadow-lg portrait-headshot">
              {/* 
                NOTE: Update the src below to your actual image path if different.
                Example valid paths: /headshot.jpg, /images/doug.jpg (must live in /public)
              */}
              <Image
                src="/headshot.jpg"
                alt="Doug Charles"
                fill
                priority
                sizes="(max-width: 1024px) 256px, 288px"
                className="object-cover object-center sm:object-center md:object-center lg:object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* RECENT HIGHLIGHTS (optional content block) */}
      <section className="bg-gray-50">
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

      {/* FORMS: GET INVOLVED (anchor target) */}
      <section id="get-involved" ref={getInvolvedRef} className="bg-white scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <h2 className="text-2xl font-semibold">Get Involved</h2>
          <p className="mt-2 text-gray-600">
            Choose how you’d like to participate—endorse, volunteer, host, or request a meeting.
          </p>

          {/* 
            Replace the simple forms below with your existing selectable forms UI if you already have it.
            The important part is the #get-involved anchor above and both buttons scrolling here.
          */}

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
                  name: form.get("name")?.toString() || "",
                  message: form.get("message")?.toString() || "",
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
                <input
                  name="name"
                  required
                  placeholder="Your name"
                  className="border rounded-lg p-3"
                />
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Optional message"
                  className="border rounded-lg p-3"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-red-600 hover:bg-red-700 text-white px-5 py-3"
                >
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
                  type: form.get("type")?.toString() || "updates",
                  name: form.get("name")?.toString() || "",
                  email: form.get("email")?.toString() || "",
                  phone: form.get("phone")?.toString() || "",
                  message: form.get("message")?.toString() || "",
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

                {/* Mobile number shows for updates/volunteer (optional) */}
                {/* If you want conditional show/hide, we can wire that up later. */}
                <input name="phone" placeholder="Mobile (optional)" className="border rounded-lg p-3" />

                <textarea name="message" rows={4} placeholder="Message (optional)" className="border rounded-lg p-3" />

                <button
                  type="submit"
                  className="rounded-xl bg-red-600 hover:bg-red-700 text-white px-5 py-3"
                >
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

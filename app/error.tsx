"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="error-page">
      <h1>The lesson could not load.</h1>
      <p>Your saved progress has not been changed.</p>
      <button className="primary" onClick={reset}>
        Try again
      </button>
    </main>
  );
}

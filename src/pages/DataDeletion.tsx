import { Header } from '@/components/layout/Header';

export default function DataDeletion() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-10">
        <div className="mx-auto max-w-3xl space-y-8">
          <header className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Data Deletion Request</h1>
            <p className="text-muted-foreground">Last updated: January 15, 2026</p>
          </header>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">How to Request Deletion</h2>
            <p className="text-muted-foreground">
              To request deletion of your data, please email us at
              <span className="font-medium"> junaid.ahmad@kalpayfinancials.com</span> with the subject
              line "Data Deletion Request".
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Required Information</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2">
              <li>Your account email address.</li>
              <li>The social account connected to the app (if applicable).</li>
              <li>Any relevant details to help us identify your account.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">What We Delete</h2>
            <p className="text-muted-foreground">
              We will remove stored access tokens and associated profile data from the app and
              revoke access where applicable. Some records may be retained when required by law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Processing Time</h2>
            <p className="text-muted-foreground">
              We aim to complete deletion requests within 30 days.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

import { Header } from '@/components/layout/Header';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-10">
        <div className="mx-auto max-w-3xl space-y-8">
          <header className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: January 15, 2026</p>
          </header>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Agreement</h2>
            <p className="text-muted-foreground">
              By accessing or using this application, you agree to these Terms of Service. If you
              do not agree, do not use the application.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Use of the Service</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2">
              <li>You are responsible for the content you create and distribute.</li>
              <li>You agree to use the app in compliance with applicable laws and platform policies.</li>
              <li>You will not misuse the service or attempt to disrupt it.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Accounts and Access</h2>
            <p className="text-muted-foreground">
              You are responsible for maintaining the security of your account and access tokens.
              You may disconnect your account at any time to revoke access.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Third-Party Services</h2>
            <p className="text-muted-foreground">
              The app integrates with third-party platforms. Your use of those platforms is
              governed by their respective terms and policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Disclaimer</h2>
            <p className="text-muted-foreground">
              The service is provided "as is" without warranties of any kind. We are not liable
              for any damages resulting from your use of the service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Changes</h2>
            <p className="text-muted-foreground">
              We may update these terms from time to time. Continued use of the app means you
              accept the updated terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Contact</h2>
            <p className="text-muted-foreground">
              For questions about these terms, contact us at <span className="font-medium">junaid.ahmad@kalpayfinancials.com</span>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

import { Header } from '@/components/layout/Header';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-10">
        <div className="mx-auto max-w-3xl space-y-8">
          <header className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Privacy Policy </h1>
            <p className="text-muted-foreground">Last updated: January 15, 2026</p>
          </header>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Overview</h2>
            <p className="text-muted-foreground">
              This Privacy Policy explains how this application collects, uses, and protects
              information when you connect a social account and use the broadcast features.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Information We Collect</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2">
              <li>Basic account information you authorize (such as name and profile photo).</li>
              <li>Access tokens required to perform actions you initiate.</li>
              <li>Usage data related to broadcasts you create within the app.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">How We Use Information</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2">
              <li>To connect your account and display your profile within the app.</li>
              <li>To perform broadcasts you request.</li>
              <li>To provide support and improve the experience.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Data Storage</h2>
            <p className="text-muted-foreground">
              Access tokens and profile data are stored to keep you signed in and enable features.
              You can disconnect at any time to clear these values from the app.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Sharing</h2>
            <p className="text-muted-foreground">
              We do not sell personal information. Data is shared only as needed to fulfill
              the actions you request and to comply with legal obligations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Security</h2>
            <p className="text-muted-foreground">
              We apply reasonable safeguards to protect your information. No method of storage or
              transmission is completely secure, so we cannot guarantee absolute security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Your Choices</h2>
            <p className="text-muted-foreground">
              You can disconnect your account at any time. If you need assistance with data
              removal or access requests, please contact support.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Contact</h2>
            <p className="text-muted-foreground">
              For privacy questions, contact us at <span className="font-medium">junaid.ahmad@kalpayfinancials.com</span>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

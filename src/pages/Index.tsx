import { useAuth } from '@/contexts/AuthContext';
import { AuthForm } from '@/components/auth/AuthForm';
import { Navigate } from 'react-router-dom';
import { Radio, Users, MessageSquare, Shield, Zap, BarChart } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Friends & Groups',
    description: 'Select from your friends and groups with a simple, intuitive interface.',
  },
  {
    icon: MessageSquare,
    title: 'Compose Messages',
    description: 'Write your broadcast message with a clean, distraction-free editor.',
  },
  {
    icon: Shield,
    title: 'Rate Limiting',
    description: 'Built-in delays to comply with Facebook\'s policies and prevent bans.',
  },
  {
    icon: Zap,
    title: 'Fast Broadcasting',
    description: 'Send messages to multiple recipients efficiently with progress tracking.',
  },
  {
    icon: BarChart,
    title: 'Status Logging',
    description: 'Real-time logs to monitor your broadcast progress and catch errors.',
  },
];

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-xl gradient-hero animate-pulse-glow flex items-center justify-center">
            <Radio className="h-6 w-6 text-primary-foreground" />
          </div>
          <p className="text-muted-foreground animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 gradient-hero opacity-5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
        
        <div className="container relative">
          <div className="flex min-h-screen flex-col lg:flex-row items-center justify-center gap-12 py-12">
            {/* Left Side - Branding */}
            <div className="flex-1 space-y-8 text-center lg:text-left animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
                <Zap className="h-4 w-4" />
                Broadcast to Facebook with ease
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="block">Facebook</span>
                  <span className="block bg-clip-text text-transparent gradient-hero">
                    Broadcast Hub
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
                  Connect your Facebook account and broadcast messages to your friends and groups—all from one beautiful dashboard.
                </p>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
                {features.slice(0, 4).map((feature) => (
                  <div
                    key={feature.title}
                    className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50 shadow-sm"
                  >
                    <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="w-full max-w-md lg:w-auto lg:flex-shrink-0">
              <AuthForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
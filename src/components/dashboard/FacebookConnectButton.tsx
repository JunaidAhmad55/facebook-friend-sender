import { useFacebook } from '@/contexts/FacebookContext';
import { Button } from '@/components/ui/button';
import { Facebook, LogOut, Loader2 } from 'lucide-react';

export function FacebookConnectButton() {
  const { isConnected, connectFacebook, disconnectFacebook, loading } = useFacebook();

  if (isConnected) {
    return (
      <Button
        variant="outline"
        onClick={disconnectFacebook}
        className="gap-2 border-destructive/50 text-destructive hover:bg-destructive/10"
      >
        <LogOut className="h-4 w-4" />
        Disconnect Facebook
      </Button>
    );
  }

  return (
    <Button
      onClick={connectFacebook}
      disabled={loading}
      className="gap-2 gradient-hero text-primary-foreground font-semibold shadow-glow hover:opacity-90 transition-all duration-300"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <Facebook className="h-4 w-4" />
          Connect Facebook
        </>
      )}
    </Button>
  );
}
import { Button } from '@/components/ui/button';
import { Send, Loader2, Square } from 'lucide-react';

interface BroadcastButtonProps {
  isSending: boolean;
  disabled: boolean;
  onSend: () => void;
  onStop: () => void;
}

export function BroadcastButton({ isSending, disabled, onSend, onStop }: BroadcastButtonProps) {
  if (isSending) {
    return (
      <Button
        onClick={onStop}
        variant="destructive"
        size="lg"
        className="w-full font-semibold gap-2"
      >
        <Square className="h-4 w-4" />
        Stop Broadcast
      </Button>
    );
  }

  return (
    <Button
      onClick={onSend}
      disabled={disabled}
      size="lg"
      className="w-full gradient-hero text-primary-foreground font-semibold shadow-glow hover:opacity-90 transition-all duration-300 gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {disabled ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Send className="h-4 w-4" />
      )}
      Send Broadcast
    </Button>
  );
}
import { useState, useCallback, useRef } from 'react';
import { Header } from '@/components/layout/Header';
import { ProfileCard } from '@/components/dashboard/ProfileCard';
import { FacebookConnectButton } from '@/components/dashboard/FacebookConnectButton';
import { FriendGroupSelector } from '@/components/dashboard/FriendGroupSelector';
import { MessageComposer } from '@/components/dashboard/MessageComposer';
import { DelaySettings } from '@/components/dashboard/DelaySettings';
import { StatusLog, LogEntry } from '@/components/dashboard/StatusLog';
import { BroadcastButton } from '@/components/dashboard/BroadcastButton';
import { useFacebook } from '@/contexts/FacebookContext';
import { toast } from 'sonner';

export default function Dashboard() {
  const { isConnected, accessToken, friends, groups } = useFacebook();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [delay, setDelay] = useState(5);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isSending, setIsSending] = useState(false);
  const abortRef = useRef(false);

  const addLog = useCallback((entry: Omit<LogEntry, 'id' | 'timestamp'>) => {
    setLogs((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        timestamp: new Date(),
        ...entry,
      },
    ]);
  }, []);

  const sendBroadcast = useCallback(async () => {
    if (!isConnected || !accessToken || selectedIds.length === 0 || !message.trim()) {
      toast.error('Please connect Facebook, select recipients, and write a message.');
      return;
    }

    setIsSending(true);
    abortRef.current = false;
    addLog({ message: `Starting broadcast to ${selectedIds.length} recipient(s)...`, status: 'info' });

    const allRecipients = [
      ...friends.filter((f) => selectedIds.includes(f.id)).map((f) => ({ id: f.id, name: f.name, type: 'friend' })),
      ...groups.filter((g) => selectedIds.includes(g.id)).map((g) => ({ id: g.id, name: g.name, type: 'group' })),
    ];

    for (let i = 0; i < allRecipients.length; i++) {
      if (abortRef.current) {
        addLog({ message: 'Broadcast stopped by user.', status: 'info' });
        break;
      }

      const recipient = allRecipients[i];
      addLog({ message: `Sending to ${recipient.name}...`, status: 'pending' });

      try {
        // Placeholder for actual Facebook Graph API call
        // In production, this would call an edge function that handles the API request
        await sendMessageToRecipient(recipient.id, recipient.type, message, accessToken);
        
        addLog({
          message: `✓ Sent to ${recipient.name} (${i + 1}/${allRecipients.length})`,
          status: 'success',
        });
      } catch (error) {
        addLog({
          message: `✗ Failed to send to ${recipient.name}: ${error instanceof Error ? error.message : 'Unknown error'}`,
          status: 'error',
        });
      }

      // Wait for delay before next message (unless it's the last one)
      if (i < allRecipients.length - 1 && !abortRef.current) {
        await new Promise((resolve) => setTimeout(resolve, delay * 1000));
      }
    }

    setIsSending(false);
    if (!abortRef.current) {
      addLog({ message: 'Broadcast completed!', status: 'success' });
      toast.success('Broadcast completed!');
    }
  }, [isConnected, accessToken, selectedIds, message, delay, friends, groups, addLog]);

  const stopBroadcast = useCallback(() => {
    abortRef.current = true;
    setIsSending(false);
    toast.info('Stopping broadcast...');
  }, []);

  const canSend = isConnected && selectedIds.length > 0 && message.trim().length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="flex flex-col gap-6 animate-fade-in">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage your Facebook broadcasts from one place
              </p>
            </div>
            <FacebookConnectButton />
          </div>

          {/* Main Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column */}
            <div className="space-y-6 lg:col-span-2">
              <FriendGroupSelector
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
              />
              <MessageComposer message={message} onMessageChange={setMessage} />
              <BroadcastButton
                isSending={isSending}
                disabled={!canSend}
                onSend={sendBroadcast}
                onStop={stopBroadcast}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <ProfileCard />
              <DelaySettings delay={delay} onDelayChange={setDelay} />
              <StatusLog logs={logs} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/**
 * Placeholder function for sending a message via Facebook Graph API.
 * In production, this should call a backend edge function that handles the API request securely.
 */
async function sendMessageToRecipient(
  recipientId: string,
  recipientType: string,
  message: string,
  accessToken: string
): Promise<void> {
  // Simulate API call with random success/failure for demo
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // In production, this would call:
  // await supabase.functions.invoke('send-facebook-message', {
  //   body: { recipientId, recipientType, message, accessToken }
  // });
  
  // Simulate occasional failures for demo purposes
  if (Math.random() < 0.1) {
    throw new Error('Rate limit exceeded');
  }
}
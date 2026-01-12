import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Activity, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

export interface LogEntry {
  id: string;
  timestamp: Date;
  message: string;
  status: 'pending' | 'success' | 'error' | 'info';
}

interface StatusLogProps {
  logs: LogEntry[];
}

const StatusIcon = ({ status }: { status: LogEntry['status'] }) => {
  switch (status) {
    case 'success':
      return <CheckCircle className="h-4 w-4 text-success" />;
    case 'error':
      return <XCircle className="h-4 w-4 text-destructive" />;
    case 'pending':
      return <Clock className="h-4 w-4 text-warning animate-pulse" />;
    case 'info':
    default:
      return <AlertCircle className="h-4 w-4 text-primary" />;
  }
};

export function StatusLog({ logs }: StatusLogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Status Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-48 rounded-lg border border-border bg-muted/30" ref={scrollRef}>
          <div className="p-3 space-y-2">
            {logs.length === 0 ? (
              <p className="text-center text-muted-foreground text-sm py-8">
                No activity yet. Start a broadcast to see logs here.
              </p>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className={`flex items-start gap-2 p-2 rounded-md text-sm animate-fade-in ${
                    log.status === 'error' ? 'bg-destructive/10' : 
                    log.status === 'success' ? 'bg-success/10' : 
                    'bg-card'
                  }`}
                >
                  <StatusIcon status={log.status} />
                  <div className="flex-1 min-w-0">
                    <p className="break-words">{log.message}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {log.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
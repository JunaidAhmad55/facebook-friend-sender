import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MessageSquare } from 'lucide-react';

interface MessageComposerProps {
  message: string;
  onMessageChange: (message: string) => void;
}

export function MessageComposer({ message, onMessageChange }: MessageComposerProps) {
  const characterCount = message.length;
  const maxCharacters = 2000;

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Compose Message
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="message" className="sr-only">
            Message
          </Label>
          <Textarea
            id="message"
            placeholder="Write your broadcast message here..."
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            className="min-h-32 resize-none"
            maxLength={maxCharacters}
          />
          <div className="flex justify-end">
            <span className={`text-xs ${characterCount > maxCharacters * 0.9 ? 'text-warning' : 'text-muted-foreground'}`}>
              {characterCount}/{maxCharacters}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
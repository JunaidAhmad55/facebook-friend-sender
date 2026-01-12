import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Clock, Shield } from 'lucide-react';

interface DelaySettingsProps {
  delay: number;
  onDelayChange: (delay: number) => void;
}

export function DelaySettings({ delay, onDelayChange }: DelaySettingsProps) {
  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Rate Limit Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="delay" className="text-sm font-medium">
              Delay Between Messages
            </Label>
            <span className="text-sm font-semibold text-primary">
              {delay} second{delay !== 1 ? 's' : ''}
            </span>
          </div>
          <Slider
            id="delay"
            min={1}
            max={30}
            step={1}
            value={[delay]}
            onValueChange={([value]) => onDelayChange(value)}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1s (faster)</span>
            <span>30s (safer)</span>
          </div>
        </div>
        <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/50">
          <Shield className="h-4 w-4 text-accent-foreground mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            Adding delays between messages helps comply with Facebook's rate limits and reduces the risk of temporary bans.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
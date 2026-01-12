import { useFacebook } from '@/contexts/FacebookContext';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, CheckCircle } from 'lucide-react';

export function ProfileCard() {
  const { fbUser, isConnected } = useFacebook();

  if (!isConnected || !fbUser) {
    return (
      <Card className="border-dashed border-2 border-border">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-4 mb-4">
            <User className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-lg mb-2">No Facebook Account Connected</h3>
          <p className="text-muted-foreground text-sm max-w-xs">
            Connect your Facebook account to see your profile and start broadcasting messages.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="gradient-card border-border/50 shadow-lg overflow-hidden">
      <div className="h-16 gradient-hero" />
      <CardContent className="pt-0">
        <div className="flex flex-col items-center -mt-10">
          <Avatar className="h-20 w-20 border-4 border-card shadow-lg">
            <AvatarImage src={fbUser.picture?.data.url} alt={fbUser.name} />
            <AvatarFallback className="text-xl font-semibold bg-primary text-primary-foreground">
              {fbUser.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="mt-4 text-center">
            <div className="flex items-center gap-2 justify-center">
              <h3 className="font-bold text-xl">{fbUser.name}</h3>
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
            {fbUser.email && (
              <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                <Mail className="h-3 w-3" />
                {fbUser.email}
              </div>
            )}
          </div>
          <div className="mt-4 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium">
            Connected
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
import { useEffect, useState } from 'react';
import { useFacebook } from '@/contexts/FacebookContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, UsersRound, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FriendGroupSelectorProps {
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
}

export function FriendGroupSelector({ selectedIds, onSelectionChange }: FriendGroupSelectorProps) {
  const { friends, groups, loading, fetchFriendsAndGroups, isConnected } = useFacebook();
  const [activeTab, setActiveTab] = useState('friends');

  useEffect(() => {
    if (isConnected) {
      fetchFriendsAndGroups();
    }
  }, [isConnected, fetchFriendsAndGroups]);

  const handleSelectAll = (items: { id: string }[]) => {
    const allIds = items.map((item) => item.id);
    const allSelected = allIds.every((id) => selectedIds.includes(id));
    
    if (allSelected) {
      onSelectionChange(selectedIds.filter((id) => !allIds.includes(id)));
    } else {
      onSelectionChange([...new Set([...selectedIds, ...allIds])]);
    }
  };

  const handleToggle = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((sid) => sid !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  const currentItems = activeTab === 'friends' ? friends : groups;
  const allSelected = currentItems.length > 0 && currentItems.every((item) => selectedIds.includes(item.id));

  if (!isConnected) {
    return (
      <Card className="border-dashed border-2 border-border">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-4 mb-4">
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm">
            Connect your Facebook account to see your friends and groups.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recipients</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchFriendsAndGroups}
            disabled={loading}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="friends" className="gap-2">
              <Users className="h-4 w-4" />
              Friends ({friends.length})
            </TabsTrigger>
            <TabsTrigger value="groups" className="gap-2">
              <UsersRound className="h-4 w-4" />
              Groups ({groups.length})
            </TabsTrigger>
          </TabsList>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <Checkbox
                  id="select-all"
                  checked={allSelected}
                  onCheckedChange={() => handleSelectAll(currentItems)}
                />
                <label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
                  Select All ({currentItems.length})
                </label>
              </div>

              <TabsContent value="friends" className="mt-0">
                <ScrollArea className="h-64">
                  <div className="space-y-2 py-2">
                    {friends.length === 0 ? (
                      <p className="text-center text-muted-foreground text-sm py-8">
                        No friends found who also use this app.
                      </p>
                    ) : (
                      friends.map((friend) => (
                        <div
                          key={friend.id}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer"
                          onClick={() => handleToggle(friend.id)}
                        >
                          <Checkbox
                            checked={selectedIds.includes(friend.id)}
                            onCheckedChange={() => handleToggle(friend.id)}
                          />
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={friend.picture?.data.url} />
                            <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{friend.name}</span>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="groups" className="mt-0">
                <ScrollArea className="h-64">
                  <div className="space-y-2 py-2">
                    {groups.length === 0 ? (
                      <p className="text-center text-muted-foreground text-sm py-8">
                        No groups found that you manage.
                      </p>
                    ) : (
                      groups.map((group) => (
                        <div
                          key={group.id}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer"
                          onClick={() => handleToggle(group.id)}
                        >
                          <Checkbox
                            checked={selectedIds.includes(group.id)}
                            onCheckedChange={() => handleToggle(group.id)}
                          />
                          <Avatar className="h-10 w-10">
                            {group.icon ? (
                              <AvatarImage src={group.icon} />
                            ) : (
                              <AvatarFallback>
                                <UsersRound className="h-5 w-5" />
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <span className="font-medium">{group.name}</span>
                            {group.member_count && (
                              <p className="text-xs text-muted-foreground">
                                {group.member_count} members
                              </p>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}
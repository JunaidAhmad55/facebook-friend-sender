import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface FacebookUser {
  id: string;
  name: string;
  picture?: {
    data: {
      url: string;
    };
  };
  email?: string;
}

interface Friend {
  id: string;
  name: string;
  picture?: {
    data: {
      url: string;
    };
  };
}

interface Group {
  id: string;
  name: string;
  icon?: string;
  member_count?: number;
}

interface FacebookContextType {
  isConnected: boolean;
  accessToken: string | null;
  fbUser: FacebookUser | null;
  friends: Friend[];
  groups: Group[];
  loading: boolean;
  connectFacebook: () => void;
  disconnectFacebook: () => void;
  fetchFriendsAndGroups: () => Promise<void>;
}

const FacebookContext = createContext<FacebookContextType | undefined>(undefined);

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

export function FacebookProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [fbUser, setFbUser] = useState<FacebookUser | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);

  const connectFacebook = useCallback(() => {
    if (!window.FB) {
      console.error('Facebook SDK not loaded');
      return;
    }

    window.FB.login(
      (response: any) => {
        if (response.authResponse) {
          setAccessToken(response.authResponse.accessToken);
          setIsConnected(true);
          
          // Fetch user profile
          window.FB.api('/me', { fields: 'id,name,email,picture.type(large)' }, (userResponse: FacebookUser) => {
            setFbUser(userResponse);
          });
        }
      },
      { 
        scope: 'public_profile,email,user_friends,groups_access_member_info',
        return_scopes: true 
      }
    );
  }, []);

  const disconnectFacebook = useCallback(() => {
    if (window.FB) {
      window.FB.logout(() => {
        setIsConnected(false);
        setAccessToken(null);
        setFbUser(null);
        setFriends([]);
        setGroups([]);
      });
    }
  }, []);

  const fetchFriendsAndGroups = useCallback(async () => {
    if (!window.FB || !accessToken) return;
    
    setLoading(true);
    
    try {
      // Fetch friends (only friends who also use the app)
      await new Promise<void>((resolve) => {
        window.FB.api('/me/friends', { fields: 'id,name,picture.type(large)' }, (response: any) => {
          if (response.data) {
            setFriends(response.data);
          }
          resolve();
        });
      });

      // Fetch groups the user manages
      await new Promise<void>((resolve) => {
        window.FB.api('/me/groups', { fields: 'id,name,icon,member_count' }, (response: any) => {
          if (response.data) {
            setGroups(response.data);
          }
          resolve();
        });
      });
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  return (
    <FacebookContext.Provider
      value={{
        isConnected,
        accessToken,
        fbUser,
        friends,
        groups,
        loading,
        connectFacebook,
        disconnectFacebook,
        fetchFriendsAndGroups,
      }}
    >
      {children}
    </FacebookContext.Provider>
  );
}

export function useFacebook() {
  const context = useContext(FacebookContext);
  if (context === undefined) {
    throw new Error('useFacebook must be used within a FacebookProvider');
  }
  return context;
}
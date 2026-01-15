import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

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
    FB: any & { _initialized?: boolean };
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
  const [sdkReady, setSdkReady] = useState(false);

  const tokenStorageKey = 'facebook_access_token';
  const userStorageKey = 'facebook_user';

  const persistAuth = useCallback((token: string | null, user: FacebookUser | null) => {
    if (token) {
      localStorage.setItem(tokenStorageKey, token);
    } else {
      localStorage.removeItem(tokenStorageKey);
    }

    if (user) {
      localStorage.setItem(userStorageKey, JSON.stringify(user));
    } else {
      localStorage.removeItem(userStorageKey);
    }
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem(tokenStorageKey);
    const storedUser = localStorage.getItem(userStorageKey);

    if (storedToken) {
      setAccessToken(storedToken);
      setIsConnected(true);
    }

    if (storedUser) {
      try {
        setFbUser(JSON.parse(storedUser) as FacebookUser);
      } catch {
        localStorage.removeItem(userStorageKey);
      }
    }
  }, []);

  useEffect(() => {
    if (window.FB?._initialized) {
      setSdkReady(true);
      return;
    }

    const handler = () => setSdkReady(true);
    window.addEventListener('facebook-sdk-ready', handler);

    return () => window.removeEventListener('facebook-sdk-ready', handler);
  }, []);

  useEffect(() => {
    if (!sdkReady || !window.FB) return;

    window.FB.getLoginStatus((response: any) => {
      if (response.status === 'connected' && response.authResponse?.accessToken) {
        const token = response.authResponse.accessToken as string;
        setAccessToken(token);
        setIsConnected(true);

        window.FB.api('/me', { fields: 'id,name,email,picture.type(large)' }, (userResponse: FacebookUser) => {
          setFbUser(userResponse);
          persistAuth(token, userResponse);
        });
      } else {
        setIsConnected(false);
        setAccessToken(null);
        setFbUser(null);
        setFriends([]);
        setGroups([]);
        persistAuth(null, null);
      }
    });
  }, [sdkReady, persistAuth]);

  const connectFacebook = useCallback(async () => {
    if (!import.meta.env.VITE_FACEBOOK_APP_ID) {
      console.error('Facebook SDK not initialized. Please add your Facebook App ID.');
      alert('Facebook SDK not initialized. Please configure your Facebook App ID in the environment variables (VITE_FACEBOOK_APP_ID).');
      return;
    }

    if (!window.FB) {
      console.error('Facebook SDK not loaded');
      return;
    }

    if (!window.FB._initialized) {
      console.error('Facebook SDK not initialized yet.');
      alert('Facebook SDK is still loading. Please try again in a moment.');
      return;
    }

    setLoading(true);

    try {
      const rawScopes = import.meta.env.VITE_FACEBOOK_SCOPES ?? 'public_profile,email';
      const scope = rawScopes
        .split(',')
        .map((value: string) => value.trim())
        .filter(Boolean)
        .join(',');

      const response = await new Promise<any>((resolve) => {
        window.FB.login(
          (loginResponse: any) => resolve(loginResponse),
          {
            scope,
            return_scopes: true,
          }
        );
      });

      if (response?.authResponse?.accessToken) {
        const token = response.authResponse.accessToken as string;
        setAccessToken(token);
        setIsConnected(true);
        persistAuth(token, null);

        window.FB.api('/me', { fields: 'id,name,email,picture.type(large)' }, (userResponse: FacebookUser) => {
          setFbUser(userResponse);
          persistAuth(token, userResponse);
        });
      }
    } finally {
      setLoading(false);
    }
  }, [persistAuth]);

  const disconnectFacebook = useCallback(() => {
    if (window.FB) {
      window.FB.logout(() => {
        setIsConnected(false);
        setAccessToken(null);
        setFbUser(null);
        setFriends([]);
        setGroups([]);
        persistAuth(null, null);
      });
    }
  }, [persistAuth]);

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
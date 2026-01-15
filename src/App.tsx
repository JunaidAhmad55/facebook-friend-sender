import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { FacebookProvider } from "@/contexts/FacebookContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Initialize Facebook SDK
function FacebookSDKLoader() {
  useEffect(() => {
    // Load Facebook SDK
    window.fbAsyncInit = function() {
      const appId = import.meta.env.VITE_FACEBOOK_APP_ID;
      if (!appId) {
        console.error('Missing VITE_FACEBOOK_APP_ID. Facebook SDK not initialized.');
        return;
      }

      window.FB.init({
        appId,
        cookie: true,
        xfbml: true,
        version: 'v18.0',
      });
      // Mark SDK as initialized
      window.FB._initialized = true;
      window.dispatchEvent(new Event('facebook-sdk-ready'));
    };

    // Load the SDK asynchronously
    (function(d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <FacebookProvider>
        <TooltipProvider>
          <FacebookSDKLoader />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </FacebookProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
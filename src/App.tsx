import React, { useEffect, Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { EventProvider } from "./contexts/EventContext";
import { AppLayout } from "./components/layout/AppLayout";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import "./i18n"; // Import i18n configuration

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const EventDetails = lazy(() => import("./pages/EventDetails"));
const MyBookings = lazy(() => import("./pages/MyBookings"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const CreateEvent = lazy(() => import("./pages/admin/CreateEvent"));
const EditEvent = lazy(() => import("./pages/admin/EditEvent"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Create a new QueryClient instance with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <LoadingSpinner size="lg" />
  </div>
);

// Make sure to properly wrap the app with React.StrictMode and ensure React is in scope
const App = () => {
  // Set the direction based on the language when the app loads
  useEffect(() => {
    const currentLang = localStorage.getItem('language') || 'en';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    if (currentLang === 'ar') {
      document.body.classList.add('rtl');
    }
  }, []);

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <AuthProvider>
              <EventProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <AppLayout>
                    <Suspense fallback={<PageLoader />}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/events/:id" element={<EventDetails />} />
                        <Route path="/my-bookings" element={<MyBookings />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/admin/create-event" element={<CreateEvent />} />
                        <Route path="/admin/edit-event/:id" element={<EditEvent />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </AppLayout>
                </BrowserRouter>
              </EventProvider>
            </AuthProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

export default App;

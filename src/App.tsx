
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PinLogin from "./pages/PinLogin";
import MainMenu from "./pages/MainMenu";
import Balance from "./pages/Balance";
import DailyRoutine from "./pages/DailyRoutine";
import Mails from "./pages/Mails";
import WhatsAppMessages from "./pages/WhatsAppMessages";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PinLogin />} />
          <Route path="/main-menu" element={<MainMenu />} />
          <Route path="/balance" element={<Balance />} />
          <Route path="/daily-routine" element={<DailyRoutine />} />
          <Route path="/mails" element={<Mails />} />
          <Route path="/whatsapp" element={<WhatsAppMessages />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

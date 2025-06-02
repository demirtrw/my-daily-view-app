import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Moon, Sun, DollarSign, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load settings from localStorage or set defaults
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [showCryptoPrices, setShowCryptoPrices] = useState(() => {
    const saved = localStorage.getItem('showCryptoPrices');
    return saved ? JSON.parse(saved) : false;
  });

  const [enableAssistant, setEnableAssistant] = useState(() => {
    const saved = localStorage.getItem('enableAssistant');
    return saved ? JSON.parse(saved) : false;
  });

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    localStorage.setItem('darkMode', JSON.stringify(checked));
    toast({
      title: checked ? "Dark mode enabled" : "Light mode enabled",
      description: "Theme applied successfully",
    });
  };

  const handleCryptoPricesToggle = (checked: boolean) => {
    setShowCryptoPrices(checked);
    localStorage.setItem('showCryptoPrices', JSON.stringify(checked));
    toast({
      title: checked ? "Crypto prices enabled" : "Crypto prices disabled",
      description: "Widget visibility updated",
    });
  };

  const handleAssistantToggle = (checked: boolean) => {
    setEnableAssistant(checked);
    localStorage.setItem('enableAssistant', JSON.stringify(checked));
    toast({
      title: checked ? "AI Assistant enabled" : "AI Assistant disabled",
      description: "Button visibility updated",
    });
    
    // Trigger a custom event to notify the FAB component
    window.dispatchEvent(new CustomEvent('assistantSettingChanged'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8 pt-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/main-menu")}
            className="mr-4 hover:bg-white/50 dark:hover:bg-gray-800/50"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </Button>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Settings</h1>
        </div>

        {/* Settings Options */}
        <div className="space-y-4">
          {/* Dark Mode */}
          <Card className="border-0 shadow-lg dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {darkMode ? (
                    <Moon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <Sun className="h-5 w-5 text-yellow-600" />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      Dark Mode
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Switch between light and dark themes
                    </p>
                  </div>
                </div>
                <Switch
                  checked={darkMode}
                  onCheckedChange={handleDarkModeToggle}
                />
              </div>
            </CardContent>
          </Card>

          {/* Crypto Prices */}
          <Card className="border-0 shadow-lg dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      Show Crypto Prices
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Display crypto price widget on home screen
                    </p>
                  </div>
                </div>
                <Switch
                  checked={showCryptoPrices}
                  onCheckedChange={handleCryptoPricesToggle}
                />
              </div>
            </CardContent>
          </Card>

          {/* AI Assistant */}
          <Card className="border-0 shadow-lg dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bot className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      Enable Assistant Button
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Show AI Assistant button on all screens
                    </p>
                  </div>
                </div>
                <Switch
                  checked={enableAssistant}
                  onCheckedChange={handleAssistantToggle}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Settings are automatically saved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;

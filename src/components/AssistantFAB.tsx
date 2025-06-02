
import { useState, useEffect } from 'react';
import { Bot, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const AssistantFAB = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkSetting = () => {
      const enableAssistant = localStorage.getItem('enableAssistant');
      setIsVisible(enableAssistant === 'true');
    };

    // Check initial setting
    checkSetting();

    // Listen for setting changes
    const handleSettingChange = () => {
      checkSetting();
    };

    window.addEventListener('assistantSettingChanged', handleSettingChange);
    return () => {
      window.removeEventListener('assistantSettingChanged', handleSettingChange);
    };
  }, []);

  const handleToggleChat = () => {
    if (!isOpen) {
      toast({
        title: "AI Assistant",
        description: "Assistant chat interface coming soon!",
      });
    }
    setIsOpen(!isOpen);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay when chat is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 max-w-[calc(100vw-2rem)] z-50 animate-scale-in">
          <Card className="shadow-2xl border-0 bg-white dark:bg-gray-800">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <Bot className="h-5 w-5 mr-2 text-blue-600" />
                  AI Assistant
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="text-center py-8">
                <Bot className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  AI Assistant interface coming soon! This will help you with:
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <li>• Managing your daily routine</li>
                  <li>• Checking emails and messages</li>
                  <li>• Account information</li>
                  <li>• General assistance</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Floating Action Button */}
      <Button
        onClick={handleToggleChat}
        className="fixed bottom-6 right-6 z-30 h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 border-0"
        size="icon"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Bot className="h-6 w-6 text-white" />
        )}
      </Button>
    </>
  );
};

export default AssistantFAB;

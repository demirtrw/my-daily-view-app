
import { ArrowLeft, MessageSquare, Phone, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AssistantFAB from "@/components/AssistantFAB";

const WhatsAppMessages = () => {
  const navigate = useNavigate();

  const messages = [
    {
      id: 1,
      sender: "ABC Electronics",
      avatar: "🏪",
      message: "Your order #WB12345 has been shipped. Tracking: TRK789456123",
      time: "10:30 AM",
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: 2,
      sender: "TechCorp Support",
      avatar: "🔧",
      message: "Thank you for contacting us. Your ticket has been assigned to our technical team.",
      time: "Yesterday",
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: 3,
      sender: "QuickFood Delivery",
      avatar: "🍕",
      message: "Your food will be delivered in 15 minutes. Driver: Raj Kumar - 9876543210",
      time: "Yesterday",
      unreadCount: 1,
      isOnline: true,
    },
    {
      id: 4,
      sender: "BookStore Online",
      avatar: "📚",
      message: "New arrivals this week! 📖 Get 20% off on all fiction books. Use code: FICTION20",
      time: "2 days ago",
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: 5,
      sender: "HealthCare Plus",
      avatar: "🏥",
      message: "Reminder: Your appointment with Dr. Smith is scheduled for tomorrow at 3:00 PM",
      time: "3 days ago",
      unreadCount: 3,
      isOnline: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6 pt-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/main-menu")}
            className="mr-3 hover:bg-white/50"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">WhatsApp Business</h1>
        </div>

        <Card className="mb-4 shadow-lg border-0 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MessageSquare className="h-6 w-6 mr-3" />
                <div>
                  <p className="text-sm opacity-90">Business Messages</p>
                  <p className="text-lg font-semibold">
                    {messages.filter(msg => msg.unreadCount > 0).length} active chats
                  </p>
                </div>
              </div>
              <Badge className="bg-white/20 text-white hover:bg-white/30">
                {messages.reduce((total, msg) => total + msg.unreadCount, 0)} unread
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {messages.map((message) => (
            <Card
              key={message.id}
              className="shadow-md border-0 hover:shadow-lg transition-all duration-200 cursor-pointer bg-white"
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-xl">
                      {message.avatar}
                    </div>
                    {message.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-800 truncate">
                        {message.sender}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <p className="text-xs text-gray-500">{message.time}</p>
                        {message.unreadCount > 0 && (
                          <Badge className="bg-emerald-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                            {message.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-2">
                      {message.message}
                    </p>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-emerald-100">
                        <Phone className="h-4 w-4 text-emerald-600" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-emerald-100">
                        <Video className="h-4 w-4 text-emerald-600" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <AssistantFAB />
    </div>
  );
};

export default WhatsAppMessages;

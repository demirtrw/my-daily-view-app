
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Calendar, Mail, MessageSquare, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const MainMenu = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleMailsClick = () => {
    console.log("Sending GET request to webhook...");

    // Fire-and-forget: do NOT await it
    fetch("https://demirkrts12.app.n8n.cloud/webhook/demir24app", {
      method: "GET",
    }).then((response) => {
      console.log("Webhook response:", response.status);
      toast({
        title: "Request Sent",
        description: "Mail check request sent successfully",
      });
    }).catch((error) => {
      console.error("Error sending webhook request:", error);
      toast({
        title: "Error",
        description: "Failed to send request to webhook",
        variant: "destructive",
      });
    });

    // Navigate immediately for a faster user experience
    navigate("/mails");
  };

  const menuItems = [
    {
      title: "Check My Balance",
      description: "View account details and transactions",
      icon: CreditCard,
      route: "/balance",
      gradient: "from-green-400 to-emerald-500",
      bgColor: "bg-green-50",
      onClick: () => navigate("/balance"),
    },
    {
      title: "Check My Daily Routine",
      description: "Today's calendar events and schedule",
      icon: Calendar,
      route: "/daily-routine",
      gradient: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50",
      onClick: () => navigate("/daily-routine"),
    },
    {
      title: "Check Mails",
      description: "Recent emails and messages",
      icon: Mail,
      route: "/mails",
      gradient: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-50",
      onClick: handleMailsClick,
    },
    {
      title: "WhatsApp Business",
      description: "Business messages and chats",
      icon: MessageSquare,
      route: "/whatsapp",
      gradient: "from-emerald-400 to-teal-500",
      bgColor: "bg-emerald-50",
      onClick: () => navigate("/whatsapp"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header with Settings button */}
        <div className="flex justify-between items-center mb-8 pt-8">
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">My Dashboard</h1>
            <p className="text-gray-600">Welcome back! Choose an option below</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/settings")}
            className="ml-4 hover:bg-white/50"
          >
            <Settings className="h-5 w-5 text-gray-600" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              className="cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl border-0 shadow-lg"
              onClick={item.onClick}
            >
              <CardContent className={`p-6 ${item.bgColor}`}>
                <div className="flex items-center space-x-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${item.gradient} flex items-center justify-center shadow-lg`}>
                    <item.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainMenu;

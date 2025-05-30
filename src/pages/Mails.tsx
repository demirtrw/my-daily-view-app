
import { ArrowLeft, Mail, Star, Paperclip } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Mails = () => {
  const navigate = useNavigate();

  const emails = [
    {
      id: 1,
      from: "Sarah Johnson",
      fromEmail: "sarah.j@company.com",
      subject: "Project Update - Q1 Deliverables",
      snippet: "Hi team, I wanted to give you an update on our Q1 deliverables and upcoming milestones...",
      time: "2 hours ago",
      isRead: false,
      isImportant: true,
      hasAttachment: true,
    },
    {
      id: 2,
      from: "GitHub",
      fromEmail: "noreply@github.com",
      subject: "Pull Request Merged: Feature/user-auth",
      snippet: "Your pull request has been successfully merged into the main branch. All checks passed...",
      time: "4 hours ago",
      isRead: true,
      isImportant: false,
      hasAttachment: false,
    },
    {
      id: 3,
      from: "Netflix",
      fromEmail: "info@netflix.com",
      subject: "New shows you might like",
      snippet: "Based on your viewing history, we've found some new shows that might interest you...",
      time: "1 day ago",
      isRead: true,
      isImportant: false,
      hasAttachment: false,
    },
    {
      id: 4,
      from: "Alex Chen",
      fromEmail: "alex.chen@startup.io",
      subject: "Meeting Rescheduled",
      snippet: "Hi, I need to reschedule our meeting tomorrow due to a conflict. Would Friday work better...",
      time: "2 days ago",
      isRead: false,
      isImportant: false,
      hasAttachment: false,
    },
    {
      id: 5,
      from: "Bank Notifications",
      fromEmail: "alerts@bank.com",
      subject: "Monthly Statement Available",
      snippet: "Your monthly statement for December 2023 is now available for download...",
      time: "3 days ago",
      isRead: true,
      isImportant: false,
      hasAttachment: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
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
          <h1 className="text-2xl font-bold text-gray-800">Recent Emails</h1>
        </div>

        <Card className="mb-4 shadow-lg border-0 bg-gradient-to-r from-purple-500 to-pink-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Mail className="h-6 w-6 mr-3" />
                <div>
                  <p className="text-sm opacity-90">Inbox</p>
                  <p className="text-lg font-semibold">
                    {emails.filter(email => !email.isRead).length} unread messages
                  </p>
                </div>
              </div>
              <Badge className="bg-white/20 text-white hover:bg-white/30">
                {emails.length} total
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {emails.map((email) => (
            <Card
              key={email.id}
              className={`shadow-md border-0 hover:shadow-lg transition-all duration-200 cursor-pointer ${
                !email.isRead ? "bg-blue-50 border-l-4 border-l-blue-500" : "bg-white"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className={`font-semibold text-gray-800 ${!email.isRead ? "text-blue-900" : ""}`}>
                        {email.from}
                      </h3>
                      {email.isImportant && (
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      )}
                      {email.hasAttachment && (
                        <Paperclip className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{email.fromEmail}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{email.time}</p>
                    {!email.isRead && (
                      <Badge className="bg-blue-500 text-white text-xs mt-1">New</Badge>
                    )}
                  </div>
                </div>
                
                <h4 className={`text-sm font-medium mb-2 line-clamp-1 ${
                  !email.isRead ? "text-blue-900" : "text-gray-800"
                }`}>
                  {email.subject}
                </h4>
                
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {email.snippet}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mails;

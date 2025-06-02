import { ArrowLeft, Mail, Star, Paperclip, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import AssistantFAB from "@/components/AssistantFAB";

interface EmailData {
  from: string;
  subject: string;
  snippet: string;
  receivedDate: string;
}

interface EmailResponse {
  emails: EmailData[];
  count: number;
}

const Mails = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchEmails = async (): Promise<EmailResponse> => {
    console.log("Fetching emails from webhook...");
    
    const response = await fetch("https://demirkrts12.app.n8n.cloud/webhook/demir24app", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch emails: ${response.status}`);
    }

    const data = await response.json();
    console.log("Received email data:", data);
    return data;
  };

  const {
    data: emailData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['emails'],
    queryFn: fetchEmails,
    retry: 1,
  });

  const handleRefresh = () => {
    console.log("Refreshing emails...");
    refetch();
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMM dd, yyyy, h:mm a");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  if (error) {
    toast({
      title: "Error",
      description: "Failed to fetch emails. Please try again.",
      variant: "destructive",
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6 pt-8">
          <div className="flex items-center">
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
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            disabled={isLoading}
            className="hover:bg-white/50"
          >
            <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        <Card className="mb-4 shadow-lg border-0 bg-gradient-to-r from-purple-500 to-pink-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Mail className="h-6 w-6 mr-3" />
                <div>
                  <p className="text-sm opacity-90">Inbox</p>
                  <p className="text-lg font-semibold">
                    {isLoading ? "Loading..." : emailData ? `${emailData.count} emails` : "0 emails"}
                  </p>
                </div>
              </div>
              {emailData && (
                <Badge className="bg-white/20 text-white hover:bg-white/30">
                  {emailData.count} total
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="space-y-3">
            {[1, 2, 3].map((index) => (
              <Card key={index} className="shadow-md border-0">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {error && !isLoading && (
          <Card className="shadow-md border-0 bg-red-50 border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Failed to load emails
                </h3>
                <p className="text-red-600 mb-4">
                  There was an error fetching your emails. Please check your connection and try again.
                </p>
                <Button onClick={handleRefresh} variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {emailData && !isLoading && emailData.emails.length === 0 && (
          <Card className="shadow-md border-0 bg-blue-50">
            <CardContent className="p-8">
              <div className="text-center">
                <Mail className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  No new emails
                </h3>
                <p className="text-blue-600">
                  Your inbox is empty. Check back later for new messages.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {emailData && !isLoading && emailData.emails.length > 0 && (
          <div className="space-y-3">
            {emailData.emails.map((email, index) => (
              <Card
                key={index}
                className="shadow-md border-0 hover:shadow-lg transition-all duration-200 cursor-pointer bg-white"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-800">
                          {email.from}
                        </h3>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{formatDate(email.receivedDate)}</p>
                    </div>
                  </div>
                  
                  <h4 className="text-sm font-medium mb-2 line-clamp-1 text-gray-800">
                    {email.subject}
                  </h4>
                  
                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {email.snippet}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      <AssistantFAB />
    </div>
  );
};

export default Mails;

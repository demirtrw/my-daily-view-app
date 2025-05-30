
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Fingerprint, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PinLogin = () => {
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const CORRECT_PIN = "1234"; // Hardcoded PIN for demo

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (pin === CORRECT_PIN) {
      toast({
        title: "Welcome!",
        description: "PIN verified successfully",
      });
      navigate("/main-menu");
    } else {
      toast({
        title: "Invalid PIN",
        description: "Please try again",
        variant: "destructive",
      });
      setPin("");
    }
    
    setIsLoading(false);
  };

  const handleBiometricLogin = () => {
    toast({
      title: "Biometric Authentication",
      description: "Feature coming soon...",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Secure Access
            </CardTitle>
            <p className="text-gray-600 mt-2">Enter your PIN to continue</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Enter Your PIN
              </label>
              <Input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength={4}
                className="text-center text-2xl tracking-widest font-mono h-14 border-2 focus:border-blue-500"
                placeholder="••••"
              />
              <div className="text-center">
                <Badge variant="secondary" className="text-xs">
                  Demo PIN: 1234
                </Badge>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={pin.length !== 4 || isLoading}
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold transition-all duration-200"
            >
              {isLoading ? "Verifying..." : "Submit"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={handleBiometricLogin}
              className="w-full h-12 border-2 border-gray-200 hover:border-blue-300 transition-all duration-200"
            >
              <Fingerprint className="mr-2 h-5 w-5" />
              Use Biometric Login
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PinLogin;

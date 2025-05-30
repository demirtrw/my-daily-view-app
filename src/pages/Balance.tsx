
import { ArrowLeft, ArrowUp, ArrowDown, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Balance = () => {
  const navigate = useNavigate();

  const accountInfo = {
    holderName: "John Doe",
    accountNumber: "****-****-****-1234",
    balance: "₹85,430.50",
  };

  const transactions = [
    {
      id: 1,
      type: "credit",
      amount: "+₹2,500.00",
      description: "Salary Credit",
      date: "Today, 10:30 AM",
    },
    {
      id: 2,
      type: "debit",
      amount: "-₹890.00",
      description: "Grocery Shopping",
      date: "Yesterday, 6:15 PM",
    },
    {
      id: 3,
      type: "debit",
      amount: "-₹1,200.00",
      description: "Online Payment",
      date: "Dec 28, 2:45 PM",
    },
    {
      id: 4,
      type: "credit",
      amount: "+₹5,000.00",
      description: "Transfer from Savings",
      date: "Dec 27, 11:20 AM",
    },
    {
      id: 5,
      type: "debit",
      amount: "-₹450.00",
      description: "ATM Withdrawal",
      date: "Dec 26, 3:30 PM",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
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
          <h1 className="text-2xl font-bold text-gray-800">My Bank Balance</h1>
        </div>

        <Card className="mb-6 shadow-xl border-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <CreditCard className="h-8 w-8 mr-3 opacity-90" />
              <div>
                <p className="text-sm opacity-90">Account Holder</p>
                <p className="text-lg font-semibold">{accountInfo.holderName}</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm opacity-90">Account Number</p>
              <p className="text-base font-mono">{accountInfo.accountNumber}</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Current Balance</p>
              <p className="text-3xl font-bold">{accountInfo.balance}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {transactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className={`p-4 flex items-center justify-between ${
                    index !== transactions.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === "credit"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {transaction.type === "credit" ? (
                        <ArrowUp className="h-5 w-5" />
                      ) : (
                        <ArrowDown className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <Badge
                    variant={transaction.type === "credit" ? "default" : "secondary"}
                    className={
                      transaction.type === "credit"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-red-100 text-red-700 hover:bg-red-100"
                    }
                  >
                    {transaction.amount}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Balance;

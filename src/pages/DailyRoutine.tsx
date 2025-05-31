
import { ArrowLeft, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DailyRoutine = () => {
  const navigate = useNavigate();

  const events = [
    {
      id: 1,
      time: "9:00 AM",
      title: "Team Standup Meeting",
      description: "Daily sync with development team",
      location: "Conference Room A",
      type: "work",
    },
    {
      id: 2,
      time: "11:30 AM",
      title: "Client Presentation",
      description: "Project proposal for Q1 2024",
      location: "Virtual - Zoom",
      type: "important",
    },
    {
      id: 3,
      time: "1:00 PM",
      title: "Lunch Break",
      description: "Lunch with marketing team",
      location: "Office Cafeteria",
      type: "personal",
    },
    {
      id: 4,
      time: "3:30 PM",
      title: "Code Review Session",
      description: "Review pull requests and deployment",
      location: "Development Lab",
      type: "work",
    },
    {
      id: 5,
      time: "6:00 PM",
      title: "Gym Workout",
      description: "Upper body strength training",
      location: "Downtown Fitness Center",
      type: "personal",
    },
  ];

  const getEventColor = (type: string) => {
    switch (type) {
      case "work":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "important":
        return "bg-red-100 text-red-700 border-red-200";
      case "personal":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-4">
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
          <h1 className="text-2xl font-bold text-gray-800">Today's Events</h1>
        </div>

        <Card className="mb-4 shadow-lg border-0 bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Today</p>
                <p className="text-xl font-bold">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <Badge className="bg-white/20 text-white hover:bg-white/30">
                {events.length} events
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {events.map((event, index) => (
            <Card key={event.id} className="shadow-md border-0 hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex flex-col items-center mt-1">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {event.time.split(":")[0]}
                      <span className="text-xs ml-1">
                        {event.time.includes("AM") ? "AM" : "PM"}
                      </span>
                    </div>
                    {index < events.length - 1 && (
                      <div className="w-0.5 h-8 bg-gray-200 mt-2" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">{event.title}</h3>
                      <Badge className={getEventColor(event.type)} variant="outline">
                        {event.type}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                    
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      <span className="mr-3">{event.time}</span>
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

      import { useState } from "react"; import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose, } from "@/components/ui/dialog"; import { Input } from "@/components/ui/input"; import { Textarea } from "@/components/ui/textarea"; import { Button } from "@/components/ui/button"; import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; import { CalendarIcon, Clock } from "lucide-react"; import { format } from "date-fns"; import { Calendar } from "@/components/ui/calendar"; import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function AddRoutineModal() { const [date, setDate] = useState<Date | undefined>(new Date()); const [time, setTime] = useState(""); const [category, setCategory] = useState("Work");

const handleSubmit = () => { const routineData = { title: (document.getElementById("title") as HTMLInputElement).value, description: (document.getElementById("description") as HTMLTextAreaElement).value, location: (document.getElementById("location") as HTMLInputElement).value, date: date?.toISOString().split("T")[0], time, category, }; console.log("Routine Data:", routineData); // Hook this to n8n when ready };

return ( <Dialog> <DialogTrigger asChild> <Button className="w-full bg-gradient-to-r from-pink-300 to-purple-300 text-white shadow-lg"> Add Routine </Button> </DialogTrigger> <DialogContent className="rounded-2xl shadow-2xl bg-pink-50 px-4 py-6"> <DialogHeader> <DialogTitle className="text-center text-lg font-bold text-gray-700"> Add New Routine </DialogTitle> </DialogHeader>

<div className="space-y-4">
      <Input id="title" placeholder="Title" required className="bg-white" />
      <Textarea id="description" placeholder="Description (optional)" className="bg-white" />

      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="bg-white">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Work">Work</SelectItem>
          <SelectItem value="Personal">Personal</SelectItem>
          <SelectItem value="Important">Important</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-left font-normal bg-white">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>

      <div className="flex items-center space-x-2">
        <Clock className="h-5 w-5 text-gray-500" />
        <Input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="bg-white"
        />
      </div>

      <Input id="location" placeholder="Location (optional)" className="bg-white" />

      <Button onClick={handleSubmit} className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white">
        Submit
      </Button>
    </div>

    <DialogClose className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
      ×
    </DialogClose>
  </DialogContent>
</Dialog>

); }


          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyRoutine;

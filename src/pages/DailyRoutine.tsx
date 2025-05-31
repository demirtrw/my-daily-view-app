"use client";

import React, { useState } from "react";
import { ArrowLeft, CalendarIcon, Clock, MapPin, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Event {
  id: number;
  time: string;
  title: string;
  description: string;
  location: string;
  type: string;
}

interface RoutineFormData {
  title: string;
  description: string;
  category: string;
  date: Date | undefined;
  time: string;
  location: string;
}

const DailyRoutine = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState<Event[]>([
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
  ]);

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState<RoutineFormData>({
    title: "",
    description: "",
    category: "",
    date: undefined,
    time: "",
    location: "",
  });

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

  const updateFormData = (field: keyof RoutineFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.date || !formData.time) {
      alert("Please fill in all required fields");
      return;
    }

    const routineData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      date: formData.date?.toISOString(),
      time: formData.time,
      location: formData.location,
      timestamp: new Date().toISOString(),
    };

    try {
      const N8N_WEBHOOK_URL = "https://demirkrts12.app.n8n.cloud/webhook-test/demir24app";

      await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(routineData),
      });

      setEvents((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          time: formatTime(formData.time),
          title: formData.title,
          description: formData.description,
          location: formData.location,
          type: formData.category,
        },
      ]);

      setOpen(false);
      setFormData({
        title: "",
        description: "",
        category: "",
        date: undefined,
        time: "",
        location: "",
      });
    } catch (error) {
      console.error("Failed to send routine data to webhook:", error);
      alert("Failed to add routine. Please try again.");
    }
  };

  const formatTime = (time24h: string): string => {
    const [hourStr, minute] = time24h.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
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
          <h1 className="text-2xl font-bold text-gray-800 flex-grow">Today's Events</h1>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                + Add Routine
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md w-[95vw] max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl">
              <DialogHeader className="relative pb-4">
                <DialogTitle className="text-xl font-semibold text-gray-800 text-center pr-8">
                  Add New Routine
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-8 w-8 rounded-full hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                    Title *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => updateFormData("title", e.target.value)}
                    placeholder="Enter routine title"
                    required
                    className="border-gray-200 focus:border-purple-300 focus:ring-purple-200 rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => updateFormData("description", e.target.value)}
                    placeholder="Add a description (optional)"
                    rows={3}
                    className="border-gray-200 focus:border-purple-300 focus:ring-purple-200 rounded-lg resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => updateFormData("category", value)}
                    required
                  >
                    <SelectTrigger className="border-gray-200 focus:border-purple-300 focus:ring-purple-200 rounded-lg">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg">
                      <SelectItem value="work" className="rounded-md">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                          Work
                        </div>
                      </SelectItem>
                      <SelectItem value="personal" className="rounded-md">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-400"></div>
                          Personal
                        </div>
                      </SelectItem>
                      <SelectItem value="important" className="rounded-md">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-400"></div>
                          Important
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal border-gray-200 hover:border-purple-300 rounded-lg",
                            !formData.date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 rounded-lg" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.date}
                          onSelect={(date) => updateFormData("date", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-sm font-medium text-gray-700">
                      Time *
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => updateFormData("time", e.target.value)}
                      required
                      className="border-gray-200 focus:border-purple-300 focus:ring-purple-200 rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => updateFormData("location", e.target.value)}
                    placeholder="Enter location (optional)"
                    className="border-gray-200 focus:border-purple-300 focus:ring-purple-200 rounded-lg"
                  />
                </div>

                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200">
                  Add Routine
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Events list */}
        <div className="space-y-4">
          {events.map(({ id, time, title, description, location, type }) => (
            <Card key={id} className="border-gray-200 bg-white/80 shadow-md hover:shadow-lg rounded-lg">
              <CardHeader className="flex items-center justify-between space-x-4 p-4 pb-0">
                <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
                <Badge className={cn("border", getEventColor(type))}>{type}</Badge>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <Clock className="mr-2 h-4 w-4" />
                  <time dateTime={time}>{time}</time>
                </div>
                <p className="text-gray-700 mb-1">{description}</p>
                {location && (
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="mr-2 h-4 w-4" />
                    {location}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyRoutine;

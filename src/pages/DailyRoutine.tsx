import { ArrowLeft, Clock, MapPin } from "lucide-react"; import { useNavigate } from "react-router-dom"; import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; import { Button } from "@/components/ui/button"; import { Badge } from "@/components/ui/badge";

const DailyRoutine = () => { const navigate = useNavigate();

const events = [ { id: 1, time: "9:00 AM", title: "Team Standup Meeting", description: "Daily sync with development team", location: "Conference Room A", type: "work", }, { id: 2, time: "11:30 AM", title: "Client Presentation", description: "Project proposal for Q1 2024", location: "Virtual - Zoom", type: "important", }, { id: 3, time: "1:00 PM", title: "Lunch Break", description: "Lunch with marketing team", location: "Office Cafeteria", type: "personal", }, { id: 4, time: "3:30 PM", title: "Code Review Session", description: "Review pull requests and deployment", location: "Development Lab", type: "work", }, { id: 5, time: "6:00 PM", title: "Gym Workout", description: "Upper body strength training", location: "Downtown Fitness Center", type: "personal", }, ];

const getEventColor = (type: string) => { switch (type) { case "work": return "bg-blue-100 text-blue-700 border-blue-200"; case "important": return "bg-red-100 text-red-700 border-red-200"; case "personal": return "bg-green-100 text-green-700 border-green-200"; default: return "bg-gray-100 text-gray-700 border-gray-200"; } };

return ( <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-4"> <div className="max-w-md mx-auto"> <div className="flex items-center mb-6 pt-8"> <Button variant="ghost" size="icon" onClick={() => navigate("/main-menu")} className="mr-3 hover:bg-white/50" > <ArrowLeft className="h-6 w-6" /> </Button> <h1 className="text-2xl font-bold text-gray-800">Today's Events</h1> </div>

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
      "use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, Clock, MapPin, X } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface RoutineFormData {
  title: string
  description: string
  category: string
  date: Date | undefined
  time: string
  location: string
}

export default function AddRoutineModal() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<RoutineFormData>({
    title: "",
    description: "",
    category: "",
    date: undefined,
    time: "",
    location: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Prepare data for n8n webhook
    const routineData = {
      ...formData,
      date: formData.date?.toISOString(),
      timestamp: new Date().toISOString(),
    }

    console.log("Routine data:", routineData)

    // TODO: Send to n8n webhook
    // await fetch('YOUR_N8N_WEBHOOK_URL', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(routineData)
    // })

    setOpen(false)
    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      date: undefined,
      time: "",
      location: "",
    })
  }

  const updateFormData = (field: keyof RoutineFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
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
          <DialogTitle className="text-xl font-semibold text-gray-800 text-center pr-8">Add New Routine</DialogTitle>
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
          {/* Title */}
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

          {/* Description */}
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

          {/* Category */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => updateFormData("category", value)}>
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

          {/* Date and Time Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Date */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-gray-200 hover:border-purple-300 rounded-lg",
                      !formData.date && "text-muted-foreground",
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

            {/* Time */}
            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-medium text-gray-700">
                Time *
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => updateFormData("time", e.target.value)}
                  required
                  className="pl-10 border-gray-200 focus:border-purple-300 focus:ring-purple-200 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium text-gray-700">
              Location
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => updateFormData("location", e.target.value)}
                placeholder="Add location (optional)"
                className="pl-10 border-gray-200 focus:border-purple-300 focus:ring-purple-200 rounded-lg"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 mt-6"
            disabled={!formData.title || !formData.category || !formData.date || !formData.time}
          >
            Add Routine
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
    </div>
  </div>
</div>

); };

export default DailyRoutine;

"use client"

import type React from "react"

import { ArrowLeft, Clock, MapPin, Plus, Edit, Trash2, CalendarIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface Event {
  id: number
  time: string
  title: string
  description: string
  location: string
  type: "work" | "important" | "personal"
  date?: Date
}

const DailyRoutine = () => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [formData, setFormData] = useState({
    time: "",
    title: "",
    description: "",
    location: "",
    type: "work" as Event["type"],
  })

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
  ])

  const getEventColor = (type: string) => {
    switch (type) {
      case "work":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "important":
        return "bg-red-100 text-red-700 border-red-200"
      case "personal":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const resetForm = () => {
    setFormData({
      time: "",
      title: "",
      description: "",
      location: "",
      type: "work",
    })
    setSelectedDate(undefined)
    setEditingEvent(null)
  }

  const openModal = (event?: Event) => {
    if (event) {
      setEditingEvent(event)
      setFormData({
        time: event.time,
        title: event.title,
        description: event.description,
        location: event.location,
        type: event.type,
      })
      setSelectedDate(event.date)
    } else {
      resetForm()
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.time || !formData.title) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (editingEvent) {
      // Update existing event
      setEvents(events.map((event) => (event.id === editingEvent.id ? { ...event, ...formData, date: selectedDate } : event)))
      toast({
        title: "Success",
        description: "Event updated successfully",
      })
    } else {
      // Add new event
      const newEvent: Event = {
        id: Math.max(...events.map((e) => e.id)) + 1,
        ...formData,
        date: selectedDate,
      }
      setEvents(
        [...events, newEvent].sort((a, b) => {
          const timeA = new Date(`1970/01/01 ${a.time}`)
          const timeB = new Date(`1970/01/01 ${b.time}`)
          return timeA.getTime() - timeB.getTime()
        }),
      )
      toast({
        title: "Success",
        description: "Event added successfully",
      })
    }

    closeModal()
  }

  const handleDelete = (eventId: number) => {
    setEvents(events.filter((event) => event.id !== eventId))
    toast({
      title: "Success",
      description: "Event deleted successfully",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6 pt-8">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/main-menu")}
              className="mr-3 hover:bg-white/50 text-gray-700"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Today's Events</h1>
          </div>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => openModal()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
                size="icon"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl">
              <DialogHeader className="pb-6">
                <DialogTitle className="text-2xl font-semibold text-gray-800 text-center">
                  {editingEvent ? "Edit Routine" : "Add New Routine"}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title Field */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 tracking-wide">
                    Title <span className="text-red-400">*</span>
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter routine title"
                    className="h-12 border-gray-200 focus:border-purple-300 focus:ring-purple-300 rounded-xl bg-white/70"
                    required
                  />
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 tracking-wide">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your routine (optional)"
                    rows={3}
                    className="border-gray-200 focus:border-purple-300 focus:ring-purple-300 rounded-xl bg-white/70 resize-none"
                  />
                </div>

                {/* Category and Date Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 tracking-wide">Category</label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: Event["type"]) => setFormData({ ...formData, type: value })}
                    >
                      <SelectTrigger className="h-12 border-gray-200 focus:border-purple-300 focus:ring-purple-300 rounded-xl bg-white/70">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-gray-200 bg-white/95 backdrop-blur-sm">
                        <SelectItem value="work" className="rounded-lg">Work</SelectItem>
                        <SelectItem value="personal" className="rounded-lg">Personal</SelectItem>
                        <SelectItem value="important" className="rounded-lg">Important</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 tracking-wide">Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "h-12 w-full justify-start text-left font-normal border-gray-200 hover:border-purple-300 rounded-xl bg-white/70",
                            !selectedDate && "text-gray-500"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "MMM dd") : "Pick date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 rounded-xl border-gray-200 bg-white/95 backdrop-blur-sm" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                          className="rounded-xl pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Time and Location Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 tracking-wide">
                      Time <span className="text-red-400">*</span>
                    </label>
                    <Input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="h-12 border-gray-200 focus:border-purple-300 focus:ring-purple-300 rounded-xl bg-white/70"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 tracking-wide">Location</label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Add location"
                      className="h-12 border-gray-200 focus:border-purple-300 focus:ring-purple-300 rounded-xl bg-white/70"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-6">
                  <Button 
                    type="submit" 
                    className="flex-1 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {editingEvent ? "Update Routine" : "Add Routine"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={closeModal}
                    className="px-6 h-12 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-xl font-medium"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Today's Summary Card */}
        <Card className="mb-6 shadow-xl border-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 font-medium">Today</p>
                <p className="text-xl font-bold">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <Badge className="bg-white/20 text-white hover:bg-white/30 px-3 py-1 rounded-full font-medium">
                {events.length} events
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Events List */}
        <div className="space-y-4">
          {events.map((event, index) => (
            <Card key={event.id} className="shadow-lg border-0 hover:shadow-xl transition-all duration-200 group rounded-2xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-5">
                <div className="flex items-start space-x-4">
                  <div className="flex flex-col items-center mt-1">
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {event.time.split(":")[0]}
                      <span className="text-xs ml-1">{event.time.includes("AM") ? "AM" : "PM"}</span>
                    </div>
                    {index < events.length - 1 && <div className="w-0.5 h-8 bg-gray-200 mt-3 rounded-full" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-800 text-lg">{event.title}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge className={cn(getEventColor(event.type), "px-3 py-1 rounded-full font-medium text-xs")} variant="outline">
                          {event.type}
                        </Badge>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-purple-100" onClick={() => openModal(event)}>
                            <Edit className="h-4 w-4 text-purple-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg hover:bg-red-100"
                            onClick={() => handleDelete(event.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">{event.description}</p>

                    <div className="flex items-center text-xs text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{event.time}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DailyRoutine

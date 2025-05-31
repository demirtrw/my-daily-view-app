"use client"

import type React from "react"

import { ArrowLeft, Clock, MapPin, Plus, Edit, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

interface Event {
  id: number
  time: string
  title: string
  description: string
  location: string
  type: "work" | "important" | "personal"
}

const DailyRoutine = () => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
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
      setEvents(events.map((event) => (event.id === editingEvent.id ? { ...event, ...formData } : event)))
      toast({
        title: "Success",
        description: "Event updated successfully",
      })
    } else {
      // Add new event
      const newEvent: Event = {
        id: Math.max(...events.map((e) => e.id)) + 1,
        ...formData,
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-4">
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
            <h1 className="text-2xl font-bold text-gray-800">Today's Events</h1>
          </div>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => openModal()}
                className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                size="icon"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{editingEvent ? "Edit Event" : "Add New Event"}</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Time *</label>
                    <Input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Type</label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: Event["type"]) => setFormData({ ...formData, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="work">Work</SelectItem>
                        <SelectItem value="important">Important</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Title *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Event title"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Event description"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Event location"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingEvent ? "Update Event" : "Add Event"}
                  </Button>
                  <Button type="button" variant="outline" onClick={closeModal}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
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
              <Badge className="bg-white/20 text-white hover:bg-white/30">{events.length} events</Badge>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {events.map((event, index) => (
            <Card key={event.id} className="shadow-md border-0 hover:shadow-lg transition-shadow group">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex flex-col items-center mt-1">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {event.time.split(":")[0]}
                      <span className="text-xs ml-1">{event.time.includes("AM") ? "AM" : "PM"}</span>
                    </div>
                    {index < events.length - 1 && <div className="w-0.5 h-8 bg-gray-200 mt-2" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">{event.title}</h3>
                      <div className="flex items-center space-x-1">
                        <Badge className={getEventColor(event.type)} variant="outline">
                          {event.type}
                        </Badge>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => openModal(event)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(event.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
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
          ))}
        </div>
      </div>
    </div>
  )
}

export default DailyRoutine
          

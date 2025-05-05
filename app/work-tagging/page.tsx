"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarIcon, FileText, PlusCircle, Search } from "lucide-react"
import { format } from "date-fns"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

// Mock data for work items
const workItems = [
  {
    id: "W-001",
    name: "Road Resurfacing",
    roadId: "RD-001",
    roadName: "Narnaul Highway",
    ward: "1",
    cost: "₹24,50,000",
    vendor: "Highway Construction Ltd.",
    phase: "In Progress",
    startDate: "2024-06-12",
    endDate: "2024-07-30",
    description: "Complete resurfacing of road with 40mm thick bituminous concrete.",
  },
  {
    id: "W-002",
    name: "Drainage System Installation",
    roadId: "RD-001",
    roadName: "Narnaul Highway",
    ward: "1",
    cost: "₹8,80,000",
    vendor: "Urban Infrastructure Co.",
    phase: "Planning",
    startDate: "2024-07-05",
    endDate: "2024-08-15",
    description: "Installation of new drainage system along the roadside.",
  },
  {
    id: "W-003",
    name: "Street Light Installation",
    roadId: "RD-002",
    roadName: "Gandhi Market Road",
    ward: "2",
    cost: "₹5,40,000",
    vendor: "Electro Solutions",
    phase: "Completed",
    startDate: "2024-05-10",
    endDate: "2024-06-05",
    description: "Installation of 24 LED street lights along the road.",
  },
  {
    id: "W-004",
    name: "Footpath Construction",
    roadId: "RD-003",
    roadName: "Civil Lines Road",
    ward: "1",
    cost: "₹12,20,000",
    vendor: "City Builders",
    phase: "In Progress",
    startDate: "2024-05-20",
    endDate: "2024-07-10",
    description: "Construction of 1.5m wide footpath on both sides of the road.",
  },
  {
    id: "W-005",
    name: "Road Marking",
    roadId: "RD-002",
    roadName: "Gandhi Market Road",
    ward: "2",
    cost: "₹3,50,000",
    vendor: "Road Signs & Markings Ltd.",
    phase: "Planning",
    startDate: "2024-06-25",
    endDate: "2024-07-05",
    description: "Application of thermoplastic road markings and installation of signage.",
  },
  {
    id: "W-006",
    name: "Bridge Repair",
    roadId: "RD-004",
    roadName: "Rewari Link Road",
    ward: "3",
    cost: "₹36,20,000",
    vendor: "Bridge Builders Inc.",
    phase: "In Progress",
    startDate: "2024-05-28",
    endDate: "2024-08-15",
    description: "Structural repairs to the existing bridge and expansion of the deck.",
  },
]

// Mock data for roads
const roads = [
  { id: "RD-001", name: "Narnaul Highway", ward: "1" },
  { id: "RD-002", name: "Gandhi Market Road", ward: "2" },
  { id: "RD-003", name: "Civil Lines Road", ward: "1" },
  { id: "RD-004", name: "Rewari Link Road", ward: "3" },
  { id: "RD-005", name: "Hospital Road", ward: "2" },
  { id: "RD-006", name: "Industrial Area Road", ward: "4" },
]

// Mock vendors
const vendors = [
  "Highway Construction Ltd.",
  "Urban Infrastructure Co.",
  "Electro Solutions",
  "City Builders",
  "Road Signs & Markings Ltd.",
  "Bridge Builders Inc.",
]

export default function WorkTaggingPage() {
  const [selectedTabValue, setSelectedTabValue] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [roadFilter, setRoadFilter] = useState("all")
  const [phaseFilter, setPhaseFilter] = useState("all")
  const [openAddWorkDialog, setOpenAddWorkDialog] = useState(false)

  // Date picker state
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  // Filter work items
  const filteredWorks = workItems.filter((work) => {
    const matchesSearch =
      work.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      work.roadName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRoad = roadFilter === "all" || work.roadId === roadFilter
    const matchesPhase = phaseFilter === "all" || work.phase === phaseFilter
    const matchesTab = selectedTabValue === "all" || work.phase.replace(" ", "-").toLowerCase() === selectedTabValue

    return matchesSearch && matchesRoad && matchesPhase && matchesTab
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Work Tagging</h1>
          <p className="text-gray-500 mt-1">Tag development work to registered roads</p>
        </div>
        <Button onClick={() => setOpenAddWorkDialog(true)}>
          <PlusCircle className="w-4 h-4 mr-2" /> Add New Work
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex items-center relative">
              <Search className="absolute left-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search work or road name..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={roadFilter} onValueChange={setRoadFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Road" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roads</SelectItem>
                {roads.map((road) => (
                  <SelectItem key={road.id} value={road.id}>
                    {road.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={phaseFilter} onValueChange={setPhaseFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Phase" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Phases</SelectItem>
                <SelectItem value="Planning">Planning</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button variant="outline" className="w-full">
                Export
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setRoadFilter("all")
                  setPhaseFilter("all")
                  setSelectedTabValue("all")
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs and Work Items */}
      <Tabs value={selectedTabValue} onValueChange={setSelectedTabValue}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Work</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value={selectedTabValue} className="m-0">
          {filteredWorks.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700">No work items found</h3>
                <p className="text-gray-500 text-center max-w-sm mt-1">
                  There are no work items matching your current filters.
                </p>
                <Button variant="outline" className="mt-4" onClick={() => setOpenAddWorkDialog(true)}>
                  Add New Work
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredWorks.map((work) => (
                <Card key={work.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{work.name}</CardTitle>
                        <CardDescription>
                          {work.roadName} (Ward {work.ward})
                        </CardDescription>
                      </div>
                      <Badge
                        className={
                          work.phase === "Completed"
                            ? "bg-green-100 text-green-700"
                            : work.phase === "In Progress"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-gray-100 text-gray-700"
                        }
                      >
                        {work.phase}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-gray-500">Project ID</p>
                          <p className="font-medium">{work.id}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Cost</p>
                          <p className="font-medium">{work.cost}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Vendor</p>
                        <p className="font-medium">{work.vendor}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-gray-500">Start Date</p>
                          <p className="font-medium">{new Date(work.startDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">End Date</p>
                          <p className="font-medium">{new Date(work.endDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-sm">
                        <p className="text-gray-500">Description</p>
                        <p className="text-gray-700 line-clamp-2">{work.description}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <div className="flex justify-between w-full">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/work-tagging/${work.id}`}>View Details</Link>
                      </Button>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Add Work Dialog */}
      <Dialog open={openAddWorkDialog} onOpenChange={setOpenAddWorkDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Work</DialogTitle>
            <DialogDescription>Tag a new infrastructure work to a registered road</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="workName">
                Work Name <span className="text-red-500">*</span>
              </Label>
              <Input id="workName" placeholder="Enter work name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roadId">
                Select Road <span className="text-red-500">*</span>
              </Label>
              <Select>
                <SelectTrigger id="roadId">
                  <SelectValue placeholder="Select a road" />
                </SelectTrigger>
                <SelectContent>
                  {roads.map((road) => (
                    <SelectItem key={road.id} value={road.id}>
                      {road.name} (Ward {road.ward})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cost">
                  Cost (₹) <span className="text-red-500">*</span>
                </Label>
                <Input id="cost" placeholder="Enter cost" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendor">
                  Vendor <span className="text-red-500">*</span>
                </Label>
                <Select>
                  <SelectTrigger id="vendor">
                    <SelectValue placeholder="Select vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    {vendors.map((vendor) => (
                      <SelectItem key={vendor} value={vendor}>
                        {vendor}
                      </SelectItem>
                    ))}
                    <SelectItem value="new">+ Add New Vendor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phase">
                Current Phase <span className="text-red-500">*</span>
              </Label>
              <Select defaultValue="Planning">
                <SelectTrigger id="phase">
                  <SelectValue placeholder="Select phase" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Planning">Planning</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">
                  Start Date <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">
                  End Date <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter work description" rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddWorkDialog(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Work</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

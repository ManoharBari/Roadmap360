"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart, BarChart3, Download, Filter, Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Combined data from roads and works
const combinedData = [
  {
    id: "RD-001",
    type: "road",
    name: "Narnaul Highway",
    ward: "1",
    length: "4.5 km",
    status: "Active",
    createdAt: "2024-01-12",
    projects: 2,
  },
  {
    id: "W-001",
    type: "work",
    name: "Road Resurfacing",
    roadId: "RD-001",
    roadName: "Narnaul Highway",
    ward: "1",
    cost: "₹24,50,000",
    vendor: "Highway Construction Ltd.",
    phase: "In Progress",
    startDate: "2024-06-12",
  },
  {
    id: "W-002",
    type: "work",
    name: "Drainage System Installation",
    roadId: "RD-001",
    roadName: "Narnaul Highway",
    ward: "1",
    cost: "₹8,80,000",
    vendor: "Urban Infrastructure Co.",
    phase: "Planning",
    startDate: "2024-07-05",
  },
  {
    id: "RD-002",
    type: "road",
    name: "Gandhi Market Road",
    ward: "2",
    length: "1.8 km",
    status: "Active",
    createdAt: "2024-02-18",
    projects: 2,
  },
  {
    id: "W-003",
    type: "work",
    name: "Street Light Installation",
    roadId: "RD-002",
    roadName: "Gandhi Market Road",
    ward: "2",
    cost: "₹5,40,000",
    vendor: "Electro Solutions",
    phase: "Completed",
    startDate: "2024-05-10",
  },
  {
    id: "W-005",
    type: "work",
    name: "Road Marking",
    roadId: "RD-002",
    roadName: "Gandhi Market Road",
    ward: "2",
    cost: "₹3,50,000",
    vendor: "Road Signs & Markings Ltd.",
    phase: "Planning",
    startDate: "2024-06-25",
  },
  {
    id: "RD-003",
    type: "road",
    name: "Civil Lines Road",
    ward: "1",
    length: "2.2 km",
    status: "Active",
    createdAt: "2024-03-05",
    projects: 1,
  },
  {
    id: "W-004",
    type: "work",
    name: "Footpath Construction",
    roadId: "RD-003",
    roadName: "Civil Lines Road",
    ward: "1",
    cost: "₹12,20,000",
    vendor: "City Builders",
    phase: "In Progress",
    startDate: "2024-05-20",
  },
  {
    id: "RD-004",
    type: "road",
    name: "Rewari Link Road",
    ward: "3",
    length: "6.1 km",
    status: "Active",
    createdAt: "2024-03-22",
    projects: 1,
  },
  {
    id: "W-006",
    type: "work",
    name: "Bridge Repair",
    roadId: "RD-004",
    roadName: "Rewari Link Road",
    ward: "3",
    cost: "₹36,20,000",
    vendor: "Bridge Builders Inc.",
    phase: "In Progress",
    startDate: "2024-05-28",
  },
]

// Ward and vendors data for filters
const wards = ["1", "2", "3", "4", "5"]
const vendors = [
  "Highway Construction Ltd.",
  "Urban Infrastructure Co.",
  "Electro Solutions",
  "City Builders",
  "Road Signs & Markings Ltd.",
  "Bridge Builders Inc.",
]

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchType, setSearchType] = useState("all")
  const [wardFilter, setWardFilter] = useState("all")
  const [vendorFilter, setVendorFilter] = useState("all")
  const [phaseFilter, setPhaseFilter] = useState("all")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  // Filter data based on search and filters
  const filteredData = combinedData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.type === "work" && item.roadName.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesType = searchType === "all" || item.type === searchType
    const matchesWard = wardFilter === "all" || item.ward === wardFilter

    let matchesVendorAndPhase = true
    if (item.type === "work") {
      matchesVendorAndPhase =
        (vendorFilter === "all" || item.vendor === vendorFilter) &&
        (phaseFilter === "all" || item.phase === phaseFilter)
    }

    return matchesSearch && matchesType && matchesWard && matchesVendorAndPhase
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Search & Filter</h1>
          <p className="text-gray-500 mt-1">Find and filter roads and infrastructure work</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" /> Export Results
        </Button>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, ID, or road..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger className="md:w-[180px]">
                  <SelectValue placeholder="Filter type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="road">Roads</SelectItem>
                  <SelectItem value="work">Works</SelectItem>
                </SelectContent>
              </Select>
              <Select value={wardFilter} onValueChange={setWardFilter}>
                <SelectTrigger className="md:w-[180px]">
                  <SelectValue placeholder="Filter ward" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Wards</SelectItem>
                  {wards.map((ward) => (
                    <SelectItem key={ward} value={ward}>
                      Ward {ward}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
                <Filter className="w-4 h-4 mr-2" />
                {showAdvancedFilters ? "Hide Filters" : "More Filters"}
              </Button>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <Select value={vendorFilter} onValueChange={setVendorFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Vendors</SelectItem>
                    {vendors.map((vendor) => (
                      <SelectItem key={vendor} value={vendor}>
                        {vendor}
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
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSearchTerm("")
                    setSearchType("all")
                    setWardFilter("all")
                    setVendorFilter("all")
                    setPhaseFilter("all")
                  }}
                >
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      <Card>
        <CardHeader className="px-6 py-4">
          <CardTitle>Search Results</CardTitle>
          <CardDescription>Found {filteredData.length} items matching your criteria</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Ward</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                    No items found matching your search criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          item.type === "road"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-indigo-50 text-indigo-700 border-indigo-200"
                        }
                      >
                        {item.type === "road" ? "Road" : "Work"}
                      </Badge>
                    </TableCell>
                    <TableCell>Ward {item.ward}</TableCell>
                    <TableCell>
                      {item.type === "road"
                        ? `${item.length} • ${item.projects} projects`
                        : `${item.cost} • ${item.phase}`}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={item.type === "road" ? `/roads?id=${item.id}` : `/work-tagging/${item.id}`}>
                          View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Analytics Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Project Distribution by Ward</CardTitle>
            <CardDescription>Number of projects per ward</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-64 border border-dashed border-gray-200 rounded-lg bg-gray-50">
              <div className="flex flex-col items-center text-gray-400">
                <BarChart3 className="w-8 h-8" />
                <span className="text-sm mt-2">Ward distribution chart would render here</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expenditure by Project Phase</CardTitle>
            <CardDescription>Total expenditure broken down by project phase</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-64 border border-dashed border-gray-200 rounded-lg bg-gray-50">
              <div className="flex flex-col items-center text-gray-400">
                <BarChart className="w-8 h-8" />
                <span className="text-sm mt-2">Expenditure chart would render here</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

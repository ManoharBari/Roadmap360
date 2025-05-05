"use client"

import { useState } from "react"
import { Edit, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample road data
const roads = [
  {
    id: "RD-001",
    name: "Narnaul Highway",
    ward: "1",
    length: "4.5 km",
    status: "Active",
    createdAt: "12 Jan 2024",
    projects: 5,
  },
  {
    id: "RD-002",
    name: "Gandhi Market Road",
    ward: "2",
    length: "1.8 km",
    status: "Active",
    createdAt: "18 Feb 2024",
    projects: 3,
  },
  {
    id: "RD-003",
    name: "Civil Lines Road",
    ward: "1",
    length: "2.2 km",
    status: "Active",
    createdAt: "05 Mar 2024",
    projects: 4,
  },
  {
    id: "RD-004",
    name: "Rewari Link Road",
    ward: "3",
    length: "6.1 km",
    status: "Active",
    createdAt: "22 Mar 2024",
    projects: 2,
  },
  {
    id: "RD-005",
    name: "Hospital Road",
    ward: "2",
    length: "0.9 km",
    status: "Inactive",
    createdAt: "10 Apr 2024",
    projects: 1,
  },
  {
    id: "RD-006",
    name: "Industrial Area Road",
    ward: "4",
    length: "3.2 km",
    status: "Active",
    createdAt: "17 Apr 2024",
    projects: 0,
  },
  {
    id: "RD-007",
    name: "Bus Stand Road",
    ward: "1",
    length: "0.7 km",
    status: "Active",
    createdAt: "05 May 2024",
    projects: 2,
  },
  {
    id: "RD-008",
    name: "College Road",
    ward: "3",
    length: "1.4 km",
    status: "Inactive",
    createdAt: "20 May 2024",
    projects: 0,
  },
]

export default function RoadsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [wardFilter, setWardFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [openAddRoadDialog, setOpenAddRoadDialog] = useState(false)
  const [editRoad, setEditRoad] = useState<any>(null)

  // Filter roads based on search term, ward and status
  const filteredRoads = roads.filter((road) => {
    const matchesSearch =
      road.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      road.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesWard = wardFilter === "all" || road.ward === wardFilter
    const matchesStatus = statusFilter === "all" || road.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesWard && matchesStatus
  })

  const handleEditRoad = (road: any) => {
    setEditRoad(road)
    setOpenAddRoadDialog(true)
  }

  const resetForm = () => {
    setEditRoad(null)
    setOpenAddRoadDialog(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Road Registry</h1>
          <p className="text-gray-500 mt-1">Manage and track all registered roads</p>
        </div>
        <Button onClick={() => setOpenAddRoadDialog(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add New Road
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center relative">
              <Search className="absolute left-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by road name or ID..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={wardFilter} onValueChange={setWardFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Ward" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Wards</SelectItem>
                <SelectItem value="1">Ward 1</SelectItem>
                <SelectItem value="2">Ward 2</SelectItem>
                <SelectItem value="3">Ward 3</SelectItem>
                <SelectItem value="4">Ward 4</SelectItem>
                <SelectItem value="5">Ward 5</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Roads Table */}
      <Card>
        <CardHeader className="px-6 py-4">
          <CardTitle>Registered Roads</CardTitle>
          <CardDescription>
            Showing {filteredRoads.length} out of {roads.length} roads
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Road ID</TableHead>
                <TableHead>Road Name</TableHead>
                <TableHead>Ward</TableHead>
                <TableHead>Length</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Registered On</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10 text-gray-500">
                    No roads found matching the current filters
                  </TableCell>
                </TableRow>
              ) : (
                filteredRoads.map((road) => (
                  <TableRow key={road.id}>
                    <TableCell className="font-medium">{road.id}</TableCell>
                    <TableCell>{road.name}</TableCell>
                    <TableCell>Ward {road.ward}</TableCell>
                    <TableCell>{road.length}</TableCell>
                    <TableCell>
                      <Badge
                        variant={road.status === "Active" ? "default" : "secondary"}
                        className={
                          road.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }
                      >
                        {road.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{road.createdAt}</TableCell>
                    <TableCell>{road.projects}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEditRoad(road)}>
                            <Edit className="w-4 h-4 mr-2" /> Edit Road
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Trash2 className="w-4 h-4 mr-2 text-red-500" /> Delete Road
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Road Dialog */}
      <Dialog open={openAddRoadDialog} onOpenChange={setOpenAddRoadDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editRoad ? "Edit Road" : "Add New Road"}</DialogTitle>
            <DialogDescription>
              {editRoad ? "Update the details for this road" : "Enter the details of the new road to be registered"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="roadId">Road ID</Label>
              <Input
                id="roadId"
                placeholder="Auto-generated"
                defaultValue={editRoad?.id || ""}
                readOnly
                disabled={!!editRoad}
                className="bg-gray-50"
              />
              {!editRoad && (
                <p className="text-xs text-gray-500">ID will be automatically generated when road is created</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="roadName">
                Road Name <span className="text-red-500">*</span>
              </Label>
              <Input id="roadName" placeholder="Enter road name" defaultValue={editRoad?.name || ""} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ward">
                  Ward Number <span className="text-red-500">*</span>
                </Label>
                <Select defaultValue={editRoad?.ward || "1"}>
                  <SelectTrigger id="ward">
                    <SelectValue placeholder="Select ward" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ward 1</SelectItem>
                    <SelectItem value="2">Ward 2</SelectItem>
                    <SelectItem value="3">Ward 3</SelectItem>
                    <SelectItem value="4">Ward 4</SelectItem>
                    <SelectItem value="5">Ward 5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="length">Length (km)</Label>
                <Input id="length" placeholder="Enter length" defaultValue={editRoad?.length || ""} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue={editRoad?.status || "Active"}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
            <Button type="submit">{editRoad ? "Update Road" : "Register Road"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

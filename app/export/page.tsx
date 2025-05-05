"use client"

import { useState } from "react"
import { Calendar, FileDown, FileSpreadsheet } from "lucide-react"
import { format } from "date-fns"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ExportPage() {
  const [exportType, setExportType] = useState("roads")
  const [selectedFormat, setSelectedFormat] = useState("excel")
  const [dateRange, setDateRange] = useState<"all" | "custom">("all")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  // Field selections
  const [selectedFields, setSelectedFields] = useState({
    // Road fields
    roadId: true,
    roadName: true,
    ward: true,
    length: true,
    status: true,
    createdAt: true,
    projectCount: true,

    // Work fields
    workId: true,
    workName: true,
    roadInfo: true,
    cost: true,
    vendor: true,
    phase: true,
    startDate: true,
    endDate: true,
    description: false,
  })

  const toggleField = (field: keyof typeof selectedFields) => {
    setSelectedFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const selectAllFields = () => {
    const newFields = { ...selectedFields }
    Object.keys(newFields).forEach((key) => {
      newFields[key as keyof typeof selectedFields] = true
    })
    setSelectedFields(newFields)
  }

  const clearAllFields = () => {
    const newFields = { ...selectedFields }
    Object.keys(newFields).forEach((key) => {
      newFields[key as keyof typeof selectedFields] = false
    })
    setSelectedFields(newFields)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Export Data</h1>
        <p className="text-gray-500 mt-1">Export road registry and project data for reporting and analysis</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Export Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>What data would you like to export?</CardTitle>
              <CardDescription>Select the type of data you want to export</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={exportType} onValueChange={setExportType}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="roads">Roads Data</TabsTrigger>
                  <TabsTrigger value="works">Works & Projects</TabsTrigger>
                </TabsList>
                <TabsContent value="roads" className="space-y-4">
                  <div className="space-y-1.5">
                    <Label>Roads Data Selection</Label>
                    <p className="text-sm text-gray-500">
                      Export information about all registered roads, including their details and status
                    </p>
                  </div>

                  <div className="grid gap-6 mt-3">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <Label>Select Fields to Export</Label>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm" onClick={selectAllFields}>
                            Select All
                          </Button>
                          <Button variant="outline" size="sm" onClick={clearAllFields}>
                            Clear All
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="roadId"
                            checked={selectedFields.roadId}
                            onCheckedChange={() => toggleField("roadId")}
                          />
                          <Label htmlFor="roadId">Road ID</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="roadName"
                            checked={selectedFields.roadName}
                            onCheckedChange={() => toggleField("roadName")}
                          />
                          <Label htmlFor="roadName">Road Name</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="ward"
                            checked={selectedFields.ward}
                            onCheckedChange={() => toggleField("ward")}
                          />
                          <Label htmlFor="ward">Ward Number</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="length"
                            checked={selectedFields.length}
                            onCheckedChange={() => toggleField("length")}
                          />
                          <Label htmlFor="length">Road Length</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="status"
                            checked={selectedFields.status}
                            onCheckedChange={() => toggleField("status")}
                          />
                          <Label htmlFor="status">Status</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="createdAt"
                            checked={selectedFields.createdAt}
                            onCheckedChange={() => toggleField("createdAt")}
                          />
                          <Label htmlFor="createdAt">Registration Date</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="projectCount"
                            checked={selectedFields.projectCount}
                            onCheckedChange={() => toggleField("projectCount")}
                          />
                          <Label htmlFor="projectCount">Project Count</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="works" className="space-y-4">
                  <div className="space-y-1.5">
                    <Label>Works & Projects Data Selection</Label>
                    <p className="text-sm text-gray-500">
                      Export information about infrastructure work and projects, including costs and timelines
                    </p>
                  </div>

                  <div className="grid gap-6 mt-3">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <Label>Select Fields to Export</Label>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm" onClick={selectAllFields}>
                            Select All
                          </Button>
                          <Button variant="outline" size="sm" onClick={clearAllFields}>
                            Clear All
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="workId"
                            checked={selectedFields.workId}
                            onCheckedChange={() => toggleField("workId")}
                          />
                          <Label htmlFor="workId">Work ID</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="workName"
                            checked={selectedFields.workName}
                            onCheckedChange={() => toggleField("workName")}
                          />
                          <Label htmlFor="workName">Work Name</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="roadInfo"
                            checked={selectedFields.roadInfo}
                            onCheckedChange={() => toggleField("roadInfo")}
                          />
                          <Label htmlFor="roadInfo">Road Information</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="cost"
                            checked={selectedFields.cost}
                            onCheckedChange={() => toggleField("cost")}
                          />
                          <Label htmlFor="cost">Cost</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="vendor"
                            checked={selectedFields.vendor}
                            onCheckedChange={() => toggleField("vendor")}
                          />
                          <Label htmlFor="vendor">Vendor</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="phase"
                            checked={selectedFields.phase}
                            onCheckedChange={() => toggleField("phase")}
                          />
                          <Label htmlFor="phase">Project Phase</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="startDate"
                            checked={selectedFields.startDate}
                            onCheckedChange={() => toggleField("startDate")}
                          />
                          <Label htmlFor="startDate">Start Date</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="endDate"
                            checked={selectedFields.endDate}
                            onCheckedChange={() => toggleField("endDate")}
                          />
                          <Label htmlFor="endDate">End Date</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="description"
                            checked={selectedFields.description}
                            onCheckedChange={() => toggleField("description")}
                          />
                          <Label htmlFor="description">Description</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Filters and Date Range */}
          <Card>
            <CardHeader>
              <CardTitle>Filters & Date Range</CardTitle>
              <CardDescription>Filter the data to be exported</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="wardFilter">Ward</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="wardFilter">
                      <SelectValue placeholder="Select ward" />
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
                </div>

                {exportType === "works" && (
                  <div className="space-y-2">
                    <Label htmlFor="phaseFilter">Project Phase</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="phaseFilter">
                        <SelectValue placeholder="Select phase" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Phases</SelectItem>
                        <SelectItem value="Planning">Planning</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="allDates"
                        checked={dateRange === "all"}
                        onChange={() => setDateRange("all")}
                        className="text-blue-600"
                      />
                      <Label htmlFor="allDates">All Time</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="customDate"
                        checked={dateRange === "custom"}
                        onChange={() => setDateRange("custom")}
                        className="text-blue-600"
                      />
                      <Label htmlFor="customDate">Custom Range</Label>
                    </div>
                  </div>
                </div>

                {dateRange === "custom" && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <Calendar className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <Calendar className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Export Options */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
              <CardDescription>Choose format and download your data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="format">File Format</Label>
                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger id="format">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                    <SelectItem value="csv">CSV (.csv)</SelectItem>
                    <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fileName">File Name</Label>
                <Input
                  id="fileName"
                  placeholder="Enter file name"
                  defaultValue={`ADC_${exportType === "roads" ? "Roads" : "Projects"}_${new Date().toISOString().slice(0, 10)}`}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col pt-2">
              <Button className="w-full" size="lg">
                <FileDown className="mr-2 h-4 w-4" />
                Download {exportType === "roads" ? "Roads" : "Projects"} Data
              </Button>
              <p className="text-xs text-center text-gray-500 mt-2">
                Data will be exported with your selected fields and filters
              </p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Export Preview</CardTitle>
              <CardDescription>Sample of the data to be exported</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-gray-200 p-3">
                <div className="flex items-center space-x-2">
                  <FileSpreadsheet className="h-10 w-10 text-blue-500" />
                  <div>
                    <p className="font-medium">{exportType === "roads" ? "Roads Data" : "Projects Data"}</p>
                    <p className="text-xs text-gray-500">
                      {selectedFormat === "excel"
                        ? "Excel Spreadsheet"
                        : selectedFormat === "csv"
                          ? "CSV File"
                          : "PDF Document"}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex flex-wrap gap-1 mt-2">
                    {exportType === "roads" ? (
                      <>
                        {selectedFields.roadId && <Badge variant="outline">Road ID</Badge>}
                        {selectedFields.roadName && <Badge variant="outline">Road Name</Badge>}
                        {selectedFields.ward && <Badge variant="outline">Ward</Badge>}
                        {selectedFields.length && <Badge variant="outline">Length</Badge>}
                        {selectedFields.status && <Badge variant="outline">Status</Badge>}
                      </>
                    ) : (
                      <>
                        {selectedFields.workId && <Badge variant="outline">Work ID</Badge>}
                        {selectedFields.workName && <Badge variant="outline">Work Name</Badge>}
                        {selectedFields.roadInfo && <Badge variant="outline">Road Info</Badge>}
                        {selectedFields.cost && <Badge variant="outline">Cost</Badge>}
                        {selectedFields.phase && <Badge variant="outline">Phase</Badge>}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

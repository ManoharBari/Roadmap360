"use client"

import { useState } from "react"
import {
  BarChart3,
  CheckCircle,
  Clock,
  FileSpreadsheet,
  HardHat,
  IndianRupee,
  LineChart,
  RouteIcon as Road,
  Tag,
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mocked data for the dashboard
const stats = [
  {
    title: "Total Roads",
    value: "128",
    change: "+6",
    icon: Road,
    color: "bg-blue-500",
  },
  {
    title: "Projects Tagged",
    value: "243",
    change: "+12",
    icon: Tag,
    color: "bg-indigo-500",
  },
  {
    title: "Total Expenditure",
    value: "₹1.4 Cr",
    change: "+₹22L",
    icon: IndianRupee,
    color: "bg-emerald-500",
  },
  {
    title: "Active Projects",
    value: "36",
    change: "+4",
    icon: HardHat,
    color: "bg-amber-500",
  },
]

// Project status distribution
const projectStatusData = [
  { status: "Planning", count: 48, color: "bg-gray-200" },
  { status: "In Progress", count: 36, color: "bg-amber-400" },
  { status: "Completed", count: 159, color: "bg-emerald-400" },
]

// Recent projects data
const recentProjects = [
  {
    id: "PRJ-0123",
    name: "Main Road Resurfacing",
    road: "Narnaul Highway",
    vendor: "Highway Construction Ltd.",
    cost: "₹24,50,000",
    status: "In Progress",
    date: "Started 12 June 2024",
  },
  {
    id: "PRJ-0122",
    name: "Drainage System Upgrade",
    road: "Civil Lines Road",
    vendor: "Urban Infrastructure Co.",
    cost: "₹16,80,000",
    status: "Planning",
    date: "Planned for 25 June 2024",
  },
  {
    id: "PRJ-0121",
    name: "Street Light Installation",
    road: "Gandhi Market Road",
    vendor: "Electro Solutions",
    cost: "₹8,45,000",
    status: "Completed",
    date: "Completed 05 June 2024",
  },
  {
    id: "PRJ-0120",
    name: "Bridge Reinforcement",
    road: "Rewari Link Road",
    vendor: "Bridge Builders Inc.",
    cost: "₹36,20,000",
    status: "In Progress",
    date: "Started 28 May 2024",
  },
]

export default function DashboardPage() {
  const [timeframe, setTimeframe] = useState("month")
  const [wardFilter, setWardFilter] = useState("all")

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Monitor road infrastructure projects and expenditure</p>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <Select value={wardFilter} onValueChange={setWardFilter}>
            <SelectTrigger className="w-[180px]">
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
          <Button>
            <FileSpreadsheet className="w-4 h-4 mr-2" /> Export Report
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
              <div className={`${stat.color} text-white p-2 rounded-md`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-500 flex items-center mt-1">
                {stat.change}
                <span className="text-gray-500 ml-1">this month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Recent Projects */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Project Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Project Status Distribution</CardTitle>
            <CardDescription>Current status of all infrastructure projects</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={timeframe} onValueChange={setTimeframe}>
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
              </div>
            </Tabs>

            {/* Simple bar representation of project status */}
            <div className="mt-6 space-y-4">
              {projectStatusData.map((item) => (
                <div key={item.status} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{item.status}</span>
                    <span className="text-sm text-gray-500">{item.count} projects</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className={`${item.color} h-3 rounded-full`}
                      style={{ width: `${(item.count / 243) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Placeholder for where a chart would go in a real implementation */}
            <div className="flex items-center justify-center h-48 mt-4 border border-dashed border-gray-200 rounded-lg bg-gray-50">
              <div className="flex flex-col items-center text-gray-400">
                <BarChart3 className="w-8 h-8" />
                <span className="text-sm mt-2">Detailed analytics chart would render here</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href="/search">View Detailed Analytics</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Latest updates on infrastructure works</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-start p-3 rounded-md border border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div className="mr-4 mt-1">
                    {project.status === "Completed" ? (
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                    ) : project.status === "In Progress" ? (
                      <Clock className="h-5 w-5 text-amber-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">{project.name}</p>
                      <span className="text-xs text-gray-500">{project.id}</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {project.road} • {project.vendor}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-700 font-medium">{project.cost}</span>
                      <span className="text-xs text-gray-500">{project.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href="/work-tagging">View All Projects</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Ward-wise Road Distribution (placeholder) */}
      <Card>
        <CardHeader>
          <CardTitle>Ward-wise Road Distribution</CardTitle>
          <CardDescription>Breakdown of registered roads by ward</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 border border-dashed border-gray-200 rounded-lg bg-gray-50">
            <div className="flex flex-col items-center text-gray-400">
              <LineChart className="w-8 h-8" />
              <span className="text-sm mt-2">Ward distribution chart would render here</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

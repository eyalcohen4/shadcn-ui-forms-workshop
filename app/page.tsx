"use client"

import { useState } from "react"
import { format } from "date-fns"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Toaster } from "@/components/ui/toaster"
import { CreateEvent, EventParams } from "@/components/create-event"

export default function IndexPage() {
  const [events, setEvents] = useState<EventParams[]>([])

  return (
    <div className="container mt-12 w-full h-full flex  max-w-xl flex-col gap-12 items-center justify-center">
      <div className="flex items-center justify-between w-full">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Events
        </h2>
        <CreateEvent onSubmit={(event) => setEvents([...events, event])} />
      </div>
      <div className="w-full">
        <Table>
          <TableHeader className="border-b bg-slate-800">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.title}>
                <TableCell className="font-bold capitalize">
                  {event.title}
                </TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{format(event.date, "PPP")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Toaster />
    </div>
  )
}

/** https://images.unsplash.com/photo-1576085898274-069be5a26c58?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D */

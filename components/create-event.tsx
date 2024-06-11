"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";



import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";



import { DatePicker } from "./date-picker";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";


export const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  location: z.string().min(1, "Location is required"),
  date: z.string().min(1, "Date is required"),
})

export type EventParams = z.infer<typeof formSchema>

export const CreateEvent = ({
  onSubmit,
}: {
  onSubmit: (event: EventParams) => void
}) => {
  const { toast } = useToast()

  const [open, setOpen] = useState(false)

  const handleSubmit = (event: EventParams) => {
    setOpen(false)
    onSubmit(event)
    toast({
      title: 'Event created successfully!'
    })
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={(updatedOpen) => setOpen(updatedOpen)}>
        <DialogTrigger asChild>
          <Button>Create Event</Button>
        </DialogTrigger>
        <DialogContent>
          <CreateEventForm onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

const CreateEventForm = ({
  onSubmit,
}: {
  onSubmit: (event: EventParams) => void
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      description: "",
      date: new Date().toISOString(),
    },
  })

  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle>Create New Event</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Event Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    Date
                  </FormLabel>
                  <FormControl>
                    <DatePicker
                      date={new Date(field.value)}
                      onChange={(date) =>
                        form.setValue("date", date?.toISOString() || "")
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MapPinIcon className="size-4 text-muted-foreground" />
                    Location
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full justify-start text-left font-normal"
                      placeholder="Event Location"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

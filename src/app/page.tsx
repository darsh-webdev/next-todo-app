"use client";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Todo from "@/components/Todo";
import axios from "axios";

import TodoModel from "@/lib/models/todo.model";

const FormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string(),
});

export default function Home() {
  const { toast } = useToast();
  const [todoData, setTodoData] = useState([]);

  const fetchTodoData = async () => {
    const response = await axios("/api");

    if (response) {
      console.log("🚀 ~ fetchTodoData ~ response:", response.data.todos);
      setTodoData(response.data.todos);
    }
  };

  const deleteTodo = async (id: string) => {
    const response = await axios.delete("/api", {
      params: {
        mongoId: id,
      },
    });

    if (response) {
      toast({
        variant: "success",
        title: "Success",
        description: `${response.data.message}`,
      });
    }

    fetchTodoData();
  };

  const completeTodo = async (id: string) => {
    const response = await axios.put(
      "/api",
      {},
      {
        params: {
          mongoId: id,
        },
      }
    );

    if (response) {
      toast({
        variant: "success",
        title: "Success",
        description: `${response.data.message}`,
      });
    }

    fetchTodoData();
  };

  useEffect(() => {
    fetchTodoData();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const response = await axios.post("/api", values);
      toast({
        variant: "success",
        title: "Success",
        description: `${response.data.message}`,
      });
      form.reset();
      await fetchTodoData();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please try again",
      });
    }
  };

  return (
    <>
      {/* ShadCN form*/}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6 mx-auto mt-16 border-2 border-slate-500 dark:bg-slate-900 p-6 rounded-lg max-w-[700px]"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Title" {...field} />
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
                  <Textarea
                    placeholder="Enter Description"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add Todo</Button>
        </form>
      </Form>

      {/* ShadCN Table */}
      <Table className="mt-10 w-[80%] mx-auto max-w-[900px]">
        <TableCaption>A list of your todos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-center w-[100px]">Status</TableHead>
            <TableHead className="text-center w-[100px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todoData.map((todo: typeof TodoModel, index) => (
            <Todo
              key={index}
              title={todo.title}
              description={todo.description}
              complete={todo.isCompleted}
              id={index}
              mongoId={todo._id}
              deleteTodo={deleteTodo}
              completeTodo={completeTodo}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
}

"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { QuestionSchema } from "@/lib/validation"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import React, { useRef } from "react"
import { Editor } from '@tinymce/tinymce-react';

import dotenv from 'dotenv';
import { Badge } from "../ui/badge"
import Image from "next/image"
dotenv.config();

const Questions = () => {
  const editorRef = useRef();

  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  })

  function onSubmit(values: z.infer<typeof QuestionSchema>) {
    console.log(values)
  }

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === 'Enter' && field.name === 'tags') {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError('tags', {
            type: 'required',
            message: 'Tag must be less than 15 Characters.'
          });
        }

        if (!field.value.includes(tagValue)) {
          form.setValue('tags', [...field.value, tagValue]);
          tagInput.value = '';
          form.clearErrors('tags');
        }
      } else {
        form.trigger();
      }
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel className=" text-sm">
                Question Title<span className="ml-1 font-bold text-destructive">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                {/* <Input className="bg-input min-h-[56px] rounded-lg border border-primary-foreground" {...field} /> */}
              </FormControl>
              <FormDescription className="mt-2.5">
                Be Specific and Imagine you&apos;re asking a question to another person.
              </FormDescription>
              <FormMessage className="font-semibold text-destructive" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-3">
              <FormLabel className=" text-sm">
                Detailed explanation of you're Problem.<span className="ml-1 font-bold text-destructive">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                  onInit={(evt, editor) => { editorRef.current = editor }}
                  initialValue=""
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'codesample', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                      'codesample | bold italic forecolor | alignleft aligncenter |' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style: 'body { font-family:Inter; font-size:16px }',
                  }}
                >
                </Editor>
              </FormControl>
              <FormDescription className="mt-2.5">
                Introduce the problem and expand on what you put in the title. Minimum 20 characters.
              </FormDescription>
              <FormMessage className="font-semibold text-destructive" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel className=" text-sm">
                Tags<span className="ml-1 font-bold text-destructive">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <>
                  <Input className="bg-input min-h-[56px] rounded-lg border border-primary-foreground" placeholder="Add Tags.."
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                    {...field} />

                  {field.value.length > 0 && (
                    <div className="flex items-center justify-start mt-2.5 gap-3">
                      {field.value.map((tag: any) => (
                        <Badge
                          key={tag}
                          className="bg-primary-foreground text-primary-foreground border border-primary-foreground">
                          {tag}
                          <Image
                            src="/assets/icons/close.svg"
                            alt="close"
                            width={16}
                            height={16}
                            className=" object-contain cursor-pointer invert-0"
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="mt-2.5">
                Add upto 5 Tags to describe what your question is about. You need to press enter to add a Tag.
              </FormDescription>
              <FormMessage className="font-semibold text-destructive" />
            </FormItem>
          )}
        />
        <Button className=" bg-purple-800 text-white" type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default Questions
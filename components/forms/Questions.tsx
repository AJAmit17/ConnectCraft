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
import { createQuestion, editQuestion } from "@/actions/question.action"
import { useRouter, usePathname } from "next/navigation"

dotenv.config();

const type: any = "create";

interface Props {
  monogoUserId: string;
  type?: string;
  questionDetails?: string;
}
const Questions = ({ monogoUserId, type, questionDetails }: Props) => {
  const editorRef = useRef();

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const parseQuestionDetails = questionDetails && JSON.parse(questionDetails || "");

  // console.log(parseQuestionDetails);
  const groupedTags = parseQuestionDetails?.tags?.map((tag: any) => tag.name);

  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: parseQuestionDetails ? parseQuestionDetails.title || "" : "",
      explanation: parseQuestionDetails
        ? parseQuestionDetails.content || ""
        : "",
      tags: groupedTags || [],
    },
  });

  async function onSubmit(values: z.infer<typeof QuestionSchema>) {
    setIsSubmitting(true);
    // console.log(values);

    try {
      if (type === "Edit") {
        // navigate to home page
        await editQuestion({
          questionId: parseQuestionDetails._id,
          title: values.title,
          content: values.explanation,
          path: pathname,
        });
        router.push(`/question/${parseQuestionDetails._id}`);
      } else {
        await createQuestion({
          title: values.title,
          content: values.explanation,
          tags: values.tags,
          author: JSON.parse(monogoUserId),
          path: pathname,
        });

        // navigate to home page
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
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

        if (!field.value.includes(tagValue as never)) {
          form.setValue('tags', [...field.value, tagValue]);
          tagInput.value = '';
          form.clearErrors('tags');
        }
      } else {
        form.trigger();
      }
    }
  }

  const handleTagRemover = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue('tags', newTags);
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
                <Input className="bg-input min-h-[56px] rounded-lg border border-primary-foreground" {...field} />
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
                Detailed explanation of you&apos;re Problem.<span className="ml-1 font-bold text-destructive">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                  onInit={(evt, editor) => {
                    //@ts-ignore
                    editorRef.current = editor;
                  }}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue={parseQuestionDetails ? parseQuestionDetails.content || "" : ""}
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
                  />

                  {field.value.length > 0 && (
                    <div className="flex items-center justify-start mt-2.5 gap-3">
                      {field.value.map((tag: any) => (
                        <div key={tag}>
                          <Badge
                            className=" bg-purple-500 text-white flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                          >
                            <span className="px-2">{tag}</span>
                            <Image
                              src="/assets/icons/close.svg"
                              alt="close"
                              width={16}
                              height={16}
                              className="object-contain cursor-pointer invert"
                              onClick={() => handleTagRemover(tag, field)}
                            />
                          </Badge>
                        </div>
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
        <Button
          className=" bg-purple-800 text-white"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? (
              <>
                {type === "Edit" ? "Editing..." : "Posting..."}
              </>
            )
            : (
              <>
                {type === "Edit" ? "Edit Question" : "Ask a Question"}
              </>
            )}
        </Button>
      </form>
    </Form>
  )
}

export default Questions
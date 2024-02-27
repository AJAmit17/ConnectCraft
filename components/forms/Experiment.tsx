"use client"

import { createExperiment } from "@/actions/experiment.action";
import { ExperimentSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod"
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
import dotenv from 'dotenv';
import { Editor } from '@tinymce/tinymce-react';
import { Textarea } from "../ui/textarea";

dotenv.config();

export default function ExperimentForm() {
    const editorRef = useRef(null)
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false)
    const form = useForm<z.infer<typeof ExperimentSchema>>({
        resolver: zodResolver(ExperimentSchema),
        defaultValues: {
            year: 2024,
            aceYear: "",
            Branch: "",
            CCode: "",
            CName: "",
            ExpNo: 0,
            ExpName: "",
            ExpDesc: "",
            ExpSoln: "",
        }
    });

    async function onSubmit(values: z.infer<typeof ExperimentSchema>) {
        setIsSubmitting(true);
        // console.log(values);

        try {
            await createExperiment({
                ...values,
            });

            router.push("/")
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* YEAR - Integer */}
                <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full">
                            <FormLabel className=" text-sm">
                                Year Title<span className="ml-1 font-bold text-destructive">*</span>
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
                {/* ACEYEAR */}
                <FormField
                    control={form.control}
                    name="aceYear"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full">
                            <FormLabel className="text-sm">
                                AceYear Title<span className="ml-1 font-bold text-destructive">*</span>
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
                {/* BRANCH */}
                <FormField
                    control={form.control}
                    name="Branch"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full">
                            <FormLabel className="text-sm">
                                AceYear Title<span className="ml-1 font-bold text-destructive">*</span>
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
                {/* CCode */}
                <FormField
                    control={form.control}
                    name="CCode"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full">
                            <FormLabel className="text-sm">
                                AceYear Title<span className="ml-1 font-bold text-destructive">*</span>
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
                {/* CName */}
                <FormField
                    control={form.control}
                    name="CName"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full">
                            <FormLabel className="text-sm">
                                AceYear Title<span className="ml-1 font-bold text-destructive">*</span>
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
                {/* ExpNo - Integer */}
                <FormField
                    control={form.control}
                    name="ExpNo"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full">
                            <FormLabel className="text-sm">
                                AceYear Title<span className="ml-1 font-bold text-destructive">*</span>
                            </FormLabel>
                            <FormControl className="mt-3.5">
                                <Input
                                    className="bg-input min-h-[56px] rounded-lg border border-primary-foreground"
                                    type="number"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription className="mt-2.5">
                                Be Specific and Imagine you&apos;re asking a question to another person.
                            </FormDescription>
                            <FormMessage className="font-semibold text-destructive" />
                        </FormItem>
                    )}
                />
                {/* ExpName  */}
                <FormField
                    control={form.control}
                    name="ExpName"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full">
                            <FormLabel className="text-sm">
                                AceYear Title<span className="ml-1 font-bold text-destructive">*</span>
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
                {/* ExpDesc */}
                <FormField
                    control={form.control}
                    name="ExpDesc"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full">
                            <FormLabel className="text-sm">
                                AceYear Title<span className="ml-1 font-bold text-destructive">*</span>
                            </FormLabel>
                            <FormControl className="mt-3.5">
                                <Textarea
                                    placeholder="Write the Description here..."
                                    className="bg-input min-h-[300px] rounded-lg border border-primary-foreground"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription className="mt-2.5">
                                Be Specific and Imagine you&apos;re asking a question to another person.
                            </FormDescription>
                            <FormMessage className="font-semibold text-destructive" />
                        </FormItem>
                    )}
                />
                {/* ExpSoln */}
                <FormField
                    control={form.control}
                    name="ExpSoln"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full gap-3">
                            <FormLabel className="text-sm">
                                AceYear Title<span className="ml-1 font-bold text-destructive">*</span>
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
                                    initialValue=" "
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
                                        skin: "oxide-dark",
                                        content_css: "dark"
                                    }}
                                >
                                </Editor>
                            </FormControl>
                            <FormDescription className="mt-2.5">
                                Be Specific and Imagine you&apos;re asking a question to another person.
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
                    Upload Experiment
                </Button>
            </form>
        </Form>
    )
}
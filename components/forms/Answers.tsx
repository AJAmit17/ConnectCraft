"use client"
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { AnswerSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Editor } from '@tinymce/tinymce-react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { CreateAnswer } from '@/actions/answer.action'
import { usePathname } from 'next/navigation'

interface Props {
    question: string;
    questionId: string;
    authorId: string;
}

const Answers = ({
    question,
    questionId,
    authorId,
}: Props) => {
    const pathname = usePathname();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const form = useForm<z.infer<typeof AnswerSchema>>({
        resolver: zodResolver(AnswerSchema),
        defaultValues: {
            answer: '',
        }
    });

    const editorRef = useRef(null)

    const handleCreateAnswer = async (values: z.infer<typeof AnswerSchema>) => {
        setIsSubmitting(true);
        try {
            await CreateAnswer({
                content: values.answer,
                author: JSON.parse(authorId),
                question: questionId,
                path: pathname
            })
            form.reset();
            if (editorRef.current) {
                const editor = editorRef.current as any;
                editor.setContent('');
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
        finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className='mt-9'>
            <div className='flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
                <h4 className=' font-semibold'>Write your Answer Here!!</h4>
                <Button variant="outline" className='rounded-md px-4 py-3'>
                    <Image
                        src="/assets/icons/stars.svg"
                        alt="star"
                        width={12}
                        height={12}
                    />
                    <span className='ml-3'>Generate AI Answer</span>
                </Button>
            </div>
            <Form {...form}>
                <form
                    className='mt-6 flex w-full flex-col gap-10'
                    onSubmit={form.handleSubmit(handleCreateAnswer)}
                >
                    <FormField
                        control={form.control}
                        name="answer"
                        render={({ field }) => (
                            <FormItem className="flex flex-col w-full gap-3">
                                <FormControl className="mt-3.5">
                                    <Editor
                                        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                                        onInit={(evt, editor) => {
                                            //@ts-ignore
                                            editorRef.current = editor
                                        }}
                                        onBlur={field.onBlur}
                                        onEditorChange={(content) => field.onChange(content)}
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
                                <FormMessage className="font-semibold text-destructive" />
                            </FormItem>
                        )}
                    />

                    <div className='flex justify-end'>
                        <Button type="submit" className="bg-violet-600 text-white w-fit" disabled={isSubmitting}>
                            {isSubmitting ? " Submitting..." : "Submit Answer"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default Answers
"use client"

import React, { useEffect } from 'react'

import Prism from "prismjs"
import parse from "html-react-parser"
import { CopyIcon } from '@radix-ui/react-icons'
import { Button } from './ui/button';
import toast from 'react-hot-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-aspnet";
import "prismjs/components/prism-sass";

import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-solidity";
import "prismjs/components/prism-json";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-r";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-go";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-mongodb";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

interface Props {
  data: string;
  type?: string
}

const ParseHtml = ({ data, type }: Props) => {

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const copyCode = () => {
    const value = document.querySelector("code")?.textContent;
    //@ts-ignore
    navigator.clipboard.writeText(value);
    toast.success("Code Copied!!!");
  }

  return (
    <div className='relative w-[1024px] mt-8 pb-20'>
      {
        type == "solution"
          ? (
            <>
              <div className='absolute flex flex-row-reverse right-0 m-2'>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button onClick={copyCode}>
                        <CopyIcon />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy Code!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </>
          )
          : null
      }
      {parse(data)}
    </div>
  )
}

export default ParseHtml
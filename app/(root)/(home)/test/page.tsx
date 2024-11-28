"use client";

import { useState, useRef } from "react";

export default function Home() {
    const [file, setFile] = useState("");
    const [url, setUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const inputFile = useRef(null);

    const uploadFile = async () => {
        try {
            setUploading(true);
            const data = new FormData();
            data.set("file", file);
            const uploadRequest = await fetch("/api/files", {
                method: "POST",
                body: data,
            });
            const signedUrl = await uploadRequest.json();
            setUrl(signedUrl);
            setUploading(false);
        } catch (e) {
            console.log(e);
            setUploading(false);
            alert("Trouble uploading file");
        }
    };

    const handleChange = (e: any) => {
        setFile(e.target.files[0]);
    };

    return (
        <main className="max-w-[500px] min-h-screen m-auto flex flex-col gap-4 justify-center items-center">
            <label className="text-white" htmlFor="file">Choose File</label>
            <input type="file" id="file" ref={inputFile} onChange={handleChange} />
            <button className="bg-white text-black p-2 rounded-md" disabled={uploading} onClick={uploadFile}>
                {uploading ? "Uploading..." : "Upload"}
            </button>
            {url && <a href={url} className="underline" target="_blank">{url}</a>}
        </main>
    );
}
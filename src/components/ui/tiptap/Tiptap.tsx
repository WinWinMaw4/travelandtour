import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const RichTextEditor = ({ value, onChange }: { value: string, onChange: (v: string) => void }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value,
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
    });

    return <EditorContent editor={editor} className="border p-2 rounded min-h-[200px]" />;
};

export default RichTextEditor;

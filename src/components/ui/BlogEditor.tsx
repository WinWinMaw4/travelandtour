import React, { useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";

const BlogEditor = ({ onChange }: { onChange: (data: any) => void }) => {
    const editorRef = useRef<EditorJS | null>(null);

    React.useEffect(() => {
        if (!editorRef.current) {
            editorRef.current = new EditorJS({
                holder: "editorjs",
                autofocus: true,
                tools: {
                    header: Header,
                    image: {
                        class: ImageTool,
                        config: {
                            endpoints: {
                                byFile: "/upload/image", // your backend endpoint
                            },
                        },
                    },
                },
                onChange: async () => {
                    const content = await editorRef.current?.save();
                    onChange(content);
                },
            });
        }

        return () => editorRef.current?.destroy();
    }, []);

    return <div id="editorjs" className="border rounded p-2 min-h-[300px]" />;
};

export default BlogEditor;

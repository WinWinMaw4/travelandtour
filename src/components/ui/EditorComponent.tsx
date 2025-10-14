import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';

// Import tools
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist';
import Quote from '@editorjs/quote';
import Embed from '@editorjs/embed';
import SimpleImage from '@editorjs/simple-image';
import Raw from '@editorjs/raw';
import LinkTool from '@editorjs/link';
import ImageTool from '@editorjs/image';
import Table from '@editorjs/table';

interface EditorComponentProps {
    onChange: (data: any) => void;
}

const EditorComponent: React.FC<EditorComponentProps> = ({ onChange }) => {
    const editorRef = useRef<EditorJS | null>(null);

    useEffect(() => {
        if (!editorRef.current) {
            const editor = new EditorJS({
                holder: 'editorjs',
                autofocus: true,
                placeholder: 'Start writing your blog...',
                tools: {
                    header: {
                        class: Header,
                        inlineToolbar: ['link'],
                        config: {
                            placeholder: 'Enter a heading',
                            levels: [2, 3, 4],
                            defaultLevel: 3,
                        },
                    },
                    list: { class: List, inlineToolbar: true },
                    checklist: { class: Checklist, inlineToolbar: true },
                    quote: { class: Quote, inlineToolbar: true },
                    embed: { class: Embed, config: { services: { youtube: true, vimeo: true, instagram: true, twitter: true } } },
                    simpleImage: { class: SimpleImage, inlineToolbar: true },
                    image: {
                        class: ImageTool,
                        config: {
                            uploader: {
                                uploadByFile(file: File) {
                                    return new Promise((resolve) => {
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            resolve({
                                                success: 1,
                                                file: { url: reader.result as string },
                                            });
                                        };
                                        reader.readAsDataURL(file);
                                    });
                                },
                            },
                        },
                    },
                    raw: Raw,
                    linkTool: { class: LinkTool, config: { endpoint: 'https://api.linkpreview.net/?key=YOUR_API_KEY&q=' } },
                    table: { class: Table, inlineToolbar: true, config: { rows: 2, cols: 2 } },
                },
                async onChange() {
                    if (editorRef.current) {
                        const content = await editorRef.current.save();
                        onChange(content);
                    }
                },
            });

            editorRef.current = editor;

            // ⚡ Add heading styles after editor is ready
            //         editor.isReady.then(() => {
            //             const styleEl = document.createElement('style');
            //             styleEl.innerHTML = `
            //     /* Style headings based on their tag */
            //     .ce-header.h1, .ce-header.h2, .ce-header.h3, .ce-header.h4, .ce-header.h5, .ce-header.h6 {}
            //     h2.ce-header { font-size: 2rem; font-weight: 700; margin: 1rem 0; }
            //     h3.ce-header { font-size: 1.5rem; font-weight: 600; margin: 0.75rem 0; }
            //     h4.ce-header { font-size: 1.25rem; font-weight: 500; margin: 0.5rem 0; }
            // `;
            //             document.getElementById('editorjs')?.appendChild(styleEl);
            //         });

            editor.isReady.then(() => {
                const observer = new MutationObserver(() => {
                    document.querySelectorAll('h2.ce-header').forEach(el => el.classList.add('text-2xl', 'font-bold', 'my-4'));
                    document.querySelectorAll('h3.ce-header').forEach(el => el.classList.add('text-xl', 'font-semibold', 'my-3'));
                    document.querySelectorAll('h4.ce-header').forEach(el => el.classList.add('text-lg', 'font-medium', 'my-2'));
                });
                observer.observe(document.getElementById('editorjs')!, { childList: true, subtree: true });
            });
        }

        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, [onChange]);

    return <div id="editorjs" className="border p-4 rounded bg-white shadow-sm" />;
};

export default EditorComponent;

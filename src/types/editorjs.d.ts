// types/editorjs.d.ts

declare module '@editorjs/link';
declare module '@editorjs/simple-image';
declare module '@editorjs/raw';


// You might need to add other editor.js tools here if they also cause errors:
declare module '@editorjs/list';
declare module '@editorjs/quote';
declare module '@editorjs/checklist';

// etc.

// src/editorjs.d.ts or src/typings.d.ts

// 💡 Fix for node_modules/@editorjs/editorjs/types/tools/adapters/tool-type.ts
declare module '@editorjs/editorjs/types/tools/adapters/tool-type' {
    export enum ToolType {
        Block,
        Inline,
        Tune,
    }
}

// 💡 Fix for node_modules/@editorjs/editorjs/types/utils/popover/popover-event.ts
declare module '@editorjs/editorjs/types/utils/popover/popover-event' {
    export enum PopoverEvent {
        // You'll need to look up the members in your node_modules file, 
        // but it usually looks something like this:
        Open,
        Close,
        ItemSelect,
        ItemHover,
    }
}

// 💡 Fix for node_modules/@editorjs/editorjs/types/utils/popover/popover-item-type.ts
declare module '@editorjs/editorjs/types/utils/popover/popover-item-type' {
    export enum PopoverItemType {
        Block,
        Tune,
        Inline,
    }
}

// You can also try exporting simple types if the enum members aren't used strictly:
/*
declare module '@editorjs/editorjs/types/tools/adapters/tool-type' {
    export type ToolType = any;
}
*/
import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import DOMPurify from 'dompurify';



const RTE = forwardRef(({ placeholder, initialContent, onClose }, ref) => {
    const editor = useRef(null);
    const editorContent = useRef(initialContent || '');


    useEffect(() => {
        editorContent.current = DOMPurify.sanitize(initialContent || '');
    }, [initialContent]);


    useImperativeHandle(ref, () => ({
        getContent: () => editorContent.current,
        setContent: (content) => {
            editorContent.current = content;
            if (editor.current) {
                editor.current.setContent(content);
            }
        },
    }));

    return (
        <div className="border border-gray-300 rounded-md shadow-md bg-white w-full max-w-screen-md mx-auto overflow-hidden p-0">
            <JoditEditor
                ref={editor}
                value={editorContent.current}
                config={{
                    readonly: false,
                    placeholder: placeholder || 'Start typing...',
                    buttons: [
                        'bold',
                        'italic',
                        'underline',
                        'strikethrough',
                        'ul',
                        'ol',
                        'outdent',
                        'indent',
                        'quote',
                        'table',
                        'code',
                        'undo',
                        'redo',
                        'source',
                    ],

                    height: 300,


                }}
                onChange={(newContent) => {


                    const sanitizedContent = DOMPurify.sanitize(newContent);
                    editorContent.current = sanitizedContent;
                }}
                className="w-full"

            />

        </div>
    );
});
export default RTE 
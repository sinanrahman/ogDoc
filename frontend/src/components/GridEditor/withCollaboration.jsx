import React, { useEffect } from 'react';
import { QuillBinding } from 'y-quill';
import { initYDoc, getSharedText, applyUpdate } from '../../collaboration/ydoc';
import { initAwareness } from '../../collaboration/awareness';
import { initSocket, emitUpdate, onUpdate } from '../../collaboration/socket';

const withCollaboration = (Editor) => {
  return (props) => {
    const { docId = 'default-doc', quillRef, serverUrl = 'http://localhost:3001' } = props;

    useEffect(() => {
      if (!docId) return;

      try {
        initYDoc(docId);
        initAwareness();
        initSocket(serverUrl, docId);

        onUpdate(docId, (update, clientId) => {
          applyUpdate(update, `remote-${clientId}`);
        });

        const ydoc = getSharedText().doc;
        ydoc.on('update', (update, origin) => {
          if (!origin?.startsWith('remote')) {
            emitUpdate(docId, update);
          }
        });
      } catch (err) {
        console.error('Collaboration setup failed:', err);
      }
    }, [docId, serverUrl]);

    useEffect(() => {
      if (quillRef?.current) {
        try {
          new QuillBinding(getSharedText(), quillRef.current);
        } catch (err) {
          console.warn('Quill binding failed:', err);
        }
      }
    }, [quillRef]);

    return <Editor {...props} />;
  };
};

export default withCollaboration;
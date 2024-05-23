import * as React from "react";
import {
  Button,
  DropZone,
  Flex,
  Text,
  VisuallyHidden,
} from "@aws-amplify/ui-react";
import { Fragment, useState } from "react";

export default function UploadFile({
  acceptedFileTypes,
}: {
  acceptedFileTypes: string[];
}) {
  const [files, setFiles] = useState<never[] | File[]>([]);
  const hiddenInput = React.useRef<HTMLInputElement | null>(null);

  const onFilePickerChange = (event: { target: { files: any } }) => {
    const { files } = event.target;
    if (!files || files.length === 0) {
      return;
    }
    setFiles(Array.from(files));
  };

  return (
    <Fragment>
      <DropZone
        acceptedFileTypes={acceptedFileTypes}
        onDropComplete={({ acceptedFiles }) => {
          setFiles(acceptedFiles);
        }}
      >
        <Flex direction="column" alignItems="center">
          <Text>Drag files here or</Text>
          <Button size="small" onClick={() => hiddenInput?.current?.click()}>
            Browse
          </Button>
        </Flex>
        <VisuallyHidden>
          <input
            type="file"
            tabIndex={-1}
            ref={hiddenInput}
            onChange={onFilePickerChange}
            multiple={true}
            accept={acceptedFileTypes.join(",")}
          />
        </VisuallyHidden>
      </DropZone>
      {files.map((file) => (
        <Text key={file.name}>{file.name}</Text>
      ))}
    </Fragment>
  );
}

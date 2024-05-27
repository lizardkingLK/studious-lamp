import * as React from "react";
import {
  Button,
  DropZone,
  Flex,
  Text,
  VisuallyHidden,
} from "@aws-amplify/ui-react";
import { Fragment } from "react";

export default function UploadFile({
  fileType,
  acceptedFileTypes,
  files,
  setFiles,
  uploadFile,
}: {
  fileType: string;
  acceptedFileTypes: string[];
  files: never[] | File[];
  setFiles: React.Dispatch<React.SetStateAction<never[] | File[]>>;
  uploadFile: (file: File, fileType: string) => void;
}) {
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
        <Flex
          key={file.name}
          direction={"row"}
          gap={"small"}
          justifyContent={"space-between"}
        >
          <Text color={"font.secondary"}>{file.name}</Text>
          <Button onClick={() => uploadFile(file, fileType)}>ADD</Button>
        </Flex>
      ))}
    </Fragment>
  );
}

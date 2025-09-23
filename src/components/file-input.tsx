import { IconX, IconLoader2, IconSend2 } from "@tabler/icons-react";
import { Input } from "./ui/input";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface FileInputProps {
  isLoading: boolean;
}

const FileInput = ({ isLoading }: FileInputProps) => {
  const [fileName, setFileName] = useState<string>("");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (!extension) return;
    if (["csv", "xlsx", "json"].includes(extension)) {
      // extractData(file, extension);
    } else {
      removeFile(undefined);
      console.error("Unsupported file type:", extension);
    }
  };
  const removeFile = (e: React.MouseEvent<HTMLButtonElement> | undefined) => {
    e?.stopPropagation();
    setFileName("");
    if (!inputFileRef.current) return;
    inputFileRef.current.value = "";
  };
  const addFile = () => {
    if (!inputFileRef.current) return;
    inputFileRef.current.click();
  };

  return (
    <div
      className={cn(
        "relative w-full border-input border-dashed rounded-md border bg-transparent px-3 py-14 text-base shadow-xs dark:bg-input/30 flex justify-center",
        !fileName && "cursor-pointer"
      )}
      onClick={addFile}
    >
      <Input
        type="file"
        className="hidden"
        accept=".csv, .xlsx"
        onChange={handleFileChange}
        ref={inputFileRef}
      />
      <p>
        {fileName ? (
          <span className="text-sm">{fileName}</span>
        ) : (
          <span className="text-sm">No file chosen. Click to upload</span>
        )}
      </p>
      {fileName && (
        <>
          <button onClick={removeFile} type="reset">
            <IconX className="cursor-pointer size-5 absolute right-3 top-3" />
          </button>
          <Button
            className="cursor-pointer absolute bottom-3 right-3"
            type="submit"
            onClick={e => e.stopPropagation()}
          >
            {isLoading ? (
              <IconLoader2 className="animate-spin" />
            ) : (
              <IconSend2 className="size-5" />
            )}
            Upload
          </Button>
        </>
      )}
    </div>
  );
};

export default FileInput;

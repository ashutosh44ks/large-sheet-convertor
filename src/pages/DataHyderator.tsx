import FileInput from "@/components/file-input";
import { useBooksData } from "@/hooks/useBooksData";
import { extractCSVData } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router";

const DataHyderator = () => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState<boolean>(false);
  const { storeBooks } = useBooksData();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fileRef: HTMLInputElement | null =
      e.currentTarget.querySelector("input[type='file']");
    if (fileRef !== null) {
      const fileValue = fileRef.files?.[0];
      if (fileValue) {
        setIsPending(true);
        // extract the data and then
        const extractedData = await extractCSVData(fileValue);
        storeBooks(extractedData);
        // store the uploaded data to context/redux
        setIsPending(false);
        navigate("/listings");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Before You Go</h1>
      <p className="text-gray-600 text-center mb-6">
        Bulk upload your books data here. Use sample file present in the root
        directory as a reference.
      </p>
      <form
        className="flex gap-4 items-center justify-center w-3/4"
        onSubmit={handleSubmit}
      >
        <FileInput isLoading={isPending} />
      </form>
    </div>
  );
};

export default DataHyderator;

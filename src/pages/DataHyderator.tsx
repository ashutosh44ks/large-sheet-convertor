import FileInput from "@/components/file-input";
import RainbowText from "@/components/rainbow-text";
import { Button } from "@/components/ui/button";
import { useDataContext } from "@/hooks/useDataContext";
import { ROUTES } from "@/lib/constants";
import { extractCSVData } from "@/lib/utils";
import {
  getSampleNames,
  getSampleCSV,
  csvStringToFile,
  type SampleCSVKey,
} from "@/lib/sample-csvs";
import { useState } from "react";
import { Link } from "react-router";

const DataHyderator = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [stats, setStats] = useState<{
    time: number;
    rows: number;
  } | null>(null);
  const { storeRecords } = useDataContext();

  const handleLoadSample = async (sampleKey: SampleCSVKey) => {
    setIsPending(true);
    try {
      const sample = getSampleCSV(sampleKey);
      const csvFile = csvStringToFile(sample.data, sample.name);
      const extractedData = await extractCSVData(csvFile);
      storeRecords(extractedData.data, extractedData.columnNames);
      setStats({
        time: extractedData.timeTaken / 1000,
        rows: extractedData.data.length,
      });
    } catch (error) {
      console.error("Error loading sample:", error);
    } finally {
      setIsPending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fileRef: HTMLInputElement | null =
      e.currentTarget.querySelector("input[type='file']");
    if (fileRef !== null) {
      const fileValue = fileRef.files?.[0];
      if (fileValue) {
        setIsPending(true);
        // extract the data and then store the uploaded data to context
        const extractedData = await extractCSVData(fileValue);
        storeRecords(extractedData.data, extractedData.columnNames);
        setStats({
          time: extractedData.timeTaken / 1000,
          rows: extractedData.data.length,
        });
        // `Processed ${extractedData.data.length} records in ${(
        //   extractedData.timeTaken / 1000
        // ).toFixed(2)} seconds.`
        //
        setIsPending(false);
        // navigate(ROUTES.LISTINGS);
      }
    }
  };

  if (stats !== null)
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-8rem)]">
        <h1 className="text-3xl font-bold mb-4">Upload Successful!</h1>
        <p className="text-gray-600 dark:text-gray-200 text-center mb-6 flex gap-1 text-lg">
          Processed <RainbowText>{stats.rows.toLocaleString()}</RainbowText> records in{" "}
          <RainbowText>{stats.time.toFixed(2)}</RainbowText> seconds.
        </p>
        <Link to={ROUTES.LISTINGS}>
          <Button>View Data</Button>
        </Link>
      </div>
    );
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-8rem)]">
      <h1 className="text-3xl font-bold mb-4">Before You Go</h1>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
        Upload your CSV data or try a sample to see the app in action
      </p>
      
      {/* File Upload Section */}
      <form
        className="flex gap-4 items-center justify-center w-3/4 mb-8"
        onSubmit={handleSubmit}
      >
        <FileInput isLoading={isPending} />
      </form>

      {/* Sample CSV Buttons Section */}
      <div className="text-center">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
          Or load a sample:
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          {getSampleNames().map((sampleKey) => {
            const sample = getSampleCSV(sampleKey);
            return (
              <Button
                key={sampleKey}
                variant="outline"
                onClick={() => handleLoadSample(sampleKey)}
                disabled={isPending}
                title={sample.description}
              >
                {sample.name}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DataHyderator;

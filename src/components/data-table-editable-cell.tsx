import { type CellContext,  } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import type { Book } from "@/hooks/BooksContext";

export const EditableCell = ({
  getValue,
  row,
  column,
  table,
}: CellContext<Book, unknown>) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      value={value as string}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      className="p-1 w-full"
    />
  );
};
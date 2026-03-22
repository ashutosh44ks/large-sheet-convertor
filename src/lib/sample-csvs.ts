/**
 * Sample CSV data for demonstration purposes
 * Each sample contains both the raw CSV string and metadata
 */

export const SAMPLE_CSVS = {
  books: {
    name: "Books",
    description: "Sample books collection with title, author, genre, published year, and ISBN",
    data: `title,author,genre,publishedYear,isbn
The Great Gatsby,F. Scott Fitzgerald,Fiction,1925,978-0743273565
To Kill a Mockingbird,Harper Lee,Fiction,1960,978-0061120084
1984,George Orwell,Dystopian,1949,978-0451524935
Pride and Prejudice,Jane Austen,Romance,1813,978-0141439518
The Catcher in the Rye,J.D. Salinger,Fiction,1951,978-0316769174
Wuthering Heights,Emily Brontë,Romance,1847,978-0141439556
Jane Eyre,Charlotte Brontë,Romance,1847,978-0141441146
The Hobbit,J.R.R. Tolkien,Fantasy,1937,978-0547928227
The Lord of the Rings,J.R.R. Tolkien,Fantasy,1954,978-0544003415
Harry Potter and the Philosopher's Stone,J.K. Rowling,Fantasy,1997,978-0747532699`,
  },
  inventory: {
    name: "Inventory",
    description: "Sample product inventory with product ID, name, quantity, and price",
    data: `product_id,product_name,quantity,price
P001,Laptop,5,999.99
P002,Desktop Computer,3,1299.99
P003,Monitor 27",8,299.99
P004,Keyboard,25,49.99
P005,Mouse,40,29.99
P006,USB-C Cable,100,9.99
P007,HDMI Cable,75,14.99
P008,Power Adapter,12,79.99
P009,External SSD 1TB,6,149.99
P010,Webcam,15,79.99`,
  },
  contacts: {
    name: "Contacts",
    description: "Sample contact list with names, emails, and phone numbers",
    data: `first_name,last_name,email,phone
John,Smith,john.smith@example.com,555-0101
Jane,Doe,jane.doe@example.com,555-0102
Robert,Johnson,robert.johnson@example.com,555-0103
Mary,Williams,mary.williams@example.com,555-0104
Michael,Brown,michael.brown@example.com,555-0105
Patricia,Jones,patricia.jones@example.com,555-0106
William,Garcia,william.garcia@example.com,555-0107
Jennifer,Miller,jennifer.miller@example.com,555-0108
David,Davis,david.davis@example.com,555-0109
Elizabeth,Rodriguez,elizabeth.rodriguez@example.com,555-0110`,
  },
  employees: {
    name: "Employees",
    description: "Sample employee data with ID, name, department, and salary",
    data: `employee_id,employee_name,department,salary
E001,Alice Johnson,Engineering,95000
E002,Bob Smith,Engineering,90000
E003,Carol White,Sales,75000
E004,David Brown,Sales,72000
E005,Eve Davis,HR,68000
E006,Frank Miller,IT,85000
E007,Grace Wilson,IT,82000
E008,Henry Moore,Finance,88000
E009,Iris Taylor,Finance,86000
E010,Jack Anderson,Operations,79000`,
  },
};

export type SampleCSVKey = keyof typeof SAMPLE_CSVS;

/**
 * Get all available sample names
 */
export const getSampleNames = (): SampleCSVKey[] => {
  return Object.keys(SAMPLE_CSVS) as SampleCSVKey[];
};

/**
 * Get a sample CSV by key
 */
export const getSampleCSV = (key: SampleCSVKey) => {
  return SAMPLE_CSVS[key];
};

/**
 * Convert CSV string to File object for processing
 */
export const csvStringToFile = (csvData: string, filename: string): File => {
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  return new File([blob], `${filename}.csv`, { type: "text/csv" });
};

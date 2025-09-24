# Large Sheet Convertor

A performant web application for viewing, editing, and managing large CSV datasets with real-time modification tracking.

## Technologies

- **React** - UI framework
- **TypeScript** - Type safety
- **TanStack Table** - Data table with sorting, filtering, pagination
- **Tailwind CSS** - Styling
- **Papaparse** - CSV parsing
- **Vite** - Build tool and dev server

## Features

- CSV file upload and parsing
- Editable table cells with real-time updates
- Row modification highlighting
- Search and column filtering
- Data export functionality
- Optimized for large datasets

## Deployment

Deployed on Vercel: [Live Demo](https://large-sheet-convertor.vercel.app)

## Generate Sample CSV

To generate a sample CSV file:

- Use the Python script at `src/lib/csv-gen.py`.
- A sample CSV with 10,000 rows is available at `src/lib/books.csv`.
- You can also upload your own CSV file. Ensure it follows this format:
    ```
    title,author,genre,publishedYear,isbn
    ```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
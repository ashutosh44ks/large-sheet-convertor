import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <div className="space-y-4">
      {/* Header skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-4 w-[300px]" />
      </div>
      
      {/* Toolbar skeleton */}
      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
        <Skeleton className="h-6 w-[100px]" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-[200px]" />
          <Skeleton className="h-9 w-[100px]" />
        </div>
      </div>
      
      {/* Table skeleton */}
      <div className="border rounded-md">
        <div className="border-b p-4">
          <div className="flex gap-4">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-4 w-[80px]" />
          </div>
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border-b p-4 last:border-b-0">
            <div className="flex gap-4">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-4 w-[80px]" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-[150px]" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-[60px]" />
          <Skeleton className="h-8 w-[80px]" />
          <Skeleton className="h-8 w-[60px]" />
          <Skeleton className="h-8 w-[60px]" />
        </div>
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <TableSkeleton />
    </div>
  );
}

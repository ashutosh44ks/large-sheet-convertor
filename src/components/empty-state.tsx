import { Button } from "@/components/ui/button";
import { IconDatabase, IconUpload, IconFileText } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  icon = <IconDatabase size={48} />,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-muted-foreground mb-4">{icon}</div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md mb-6">{description}</p>
      {action && (
        <Button onClick={action.onClick} className="gap-2">
          <IconUpload size={16} />
          {action.label}
        </Button>
      )}
    </div>
  );
}

export function NoDataState() {
  const navigate = useNavigate();
  return (
    <EmptyState
      icon={<IconFileText size={48} />}
      title="No books found"
      description="It looks like you don't have any books in your collection yet. Import some data to get started."
      action={{
        label: "Import Books",
        onClick: () => navigate("/"),
      }}
    />
  );
}

export function NoSearchResultsState({ searchTerm }: { searchTerm: string }) {
  return (
    <EmptyState
      icon={<IconDatabase size={48} />}
      title="No results found"
      description={`No books match your search for "${searchTerm}". Try adjusting your search terms or filters.`}
    />
  );
}

import { FolderCodeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function EmptyServices({ onAction }: { onAction: () => void }) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderCodeIcon />
        </EmptyMedia>
        <EmptyTitle>No Services Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any Service yet. Get started by creating your
          first service.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button onClick={onAction}>Create Service</Button>
      </EmptyContent>
    </Empty>
  );
}

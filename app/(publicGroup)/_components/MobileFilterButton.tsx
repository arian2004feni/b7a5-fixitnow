import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

export function MobileFilterButton() {
  return (
    <Button variant="outline" className="lg:hidden h-10">
      <Filter className="mr-2 size-4" />
      Filters
    </Button>
  );
}

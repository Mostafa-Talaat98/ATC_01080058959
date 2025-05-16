
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { 
  ChevronFirst, 
  ChevronLeft, 
  ChevronRight, 
  ChevronLast 
} from "lucide-react";

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  // Add compound components to ensure TypeScript recognizes them
  Item?: typeof PaginationItem;
  Previous?: typeof PaginationPrevious;
  Next?: typeof PaginationNext;
  First?: typeof PaginationFirst;
  Last?: typeof PaginationLast;
  List?: typeof PaginationList;
}

interface PaginationItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  value?: number;
}

const PaginationItem = React.forwardRef<
  HTMLButtonElement,
  PaginationItemProps
>(({ className, isActive, value, ...props }, ref) => (
  <Button
    ref={ref}
    aria-current={isActive ? "page" : undefined}
    variant={isActive ? "default" : "outline"}
    size="icon"
    className={cn(
      "h-9 w-9",
      className
    )}
    {...props}
  >
    <span className="sr-only">{`Page ${value}`}</span>
    <span aria-hidden="true">{value}</span>
  </Button>
));
PaginationItem.displayName = "PaginationItem";

const PaginationPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    variant="outline"
    size="icon"
    className={cn("h-9 w-9", className)}
    {...props}
  >
    <span className="sr-only">Previous page</span>
    <ChevronLeft className="h-4 w-4" />
  </Button>
));
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    variant="outline"
    size="icon"
    className={cn("h-9 w-9", className)}
    {...props}
  >
    <span className="sr-only">Next page</span>
    <ChevronRight className="h-4 w-4" />
  </Button>
));
PaginationNext.displayName = "PaginationNext";

const PaginationFirst = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    variant="outline"
    size="icon"
    className={cn("h-9 w-9", className)}
    {...props}
  >
    <span className="sr-only">First page</span>
    <ChevronFirst className="h-4 w-4" />
  </Button>
));
PaginationFirst.displayName = "PaginationFirst";

const PaginationLast = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    variant="outline"
    size="icon"
    className={cn("h-9 w-9", className)}
    {...props}
  >
    <span className="sr-only">Last page</span>
    <ChevronLast className="h-4 w-4" />
  </Button>
));
PaginationLast.displayName = "PaginationLast";

const PaginationList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-1", className)}
    {...props}
  />
));
PaginationList.displayName = "PaginationList";

// Create the Pagination component with properly typed compound components
const Pagination = Object.assign(
  React.forwardRef<HTMLDivElement, PaginationProps>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-wrap items-center gap-1", className)}
      {...props}
    />
  )),
  {
    Item: PaginationItem,
    Previous: PaginationPrevious,
    Next: PaginationNext,
    First: PaginationFirst,
    Last: PaginationLast,
    List: PaginationList
  }
);

Pagination.displayName = "Pagination";

export { Pagination };

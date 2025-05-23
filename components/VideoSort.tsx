"use client";

import type { SortDirection } from "@/types";

import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";

export function VideoSort() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    params.delete("page");
    replace(`${pathname}?${params.toString()}`);
  };

  const toggleDirection = () => {
    const params = new URLSearchParams(searchParams);
    const currentDirection = (params.get("direction") ||
      "desc") as SortDirection;

    params.set("direction", currentDirection === "desc" ? "asc" : "desc");
    params.delete("page");
    replace(`${pathname}?${params.toString()}`);
  };

  const sort = searchParams.get("sort");
  const sortDirection = searchParams.get("direction") || "desc";

  return (
    <div className="flex gap-2 items-center w-full sm:w-auto">
      <Select
        defaultSelectedKeys={sort ? [sort] : undefined}
        label="Sort by"
        className="w-full sm:w-[200px]"
        size="sm"
        onChange={(value) => handleSortChange(value.target.value)}
      >
        <SelectItem key="created_at">Creation date</SelectItem>
        <SelectItem key="title">Title</SelectItem>
      </Select>
      <Button
        isIconOnly
        isDisabled={!sort}
        variant="flat"
        aria-label="Toggle sort direction"
        size="lg"
        onPress={toggleDirection}
      >
        {sortDirection === "asc" ? (
          <ArrowUpWideNarrow />
        ) : (
          <ArrowDownWideNarrow />
        )}
      </Button>
    </div>
  );
}

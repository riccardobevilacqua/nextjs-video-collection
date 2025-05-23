"use client";

import { ChangeEvent } from "react";
import { Input } from "@heroui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Search } from "lucide-react";

import { searchTermSchema } from "@/helpers/validation";

export function VideoSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    const result = searchTermSchema.safeParse(term);

    if (result.success && result.data) {
      params.set("searchTerm", result.data);
    } else {
      params.delete("searchTerm");
    }
    params.delete("page");
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="w-full">
      <Input
        className="w-full"
        defaultValue={searchParams.get("searchTerm")?.toString()}
        placeholder="Search videos by title..."
        type="search"
        startContent={<Search className="text-default-400" size={20} />}
        variant="flat"
        radius="full"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleSearch(e.target.value)
        }
      />
    </div>
  );
}

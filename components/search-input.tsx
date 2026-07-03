"use client";
import { Input } from "./ui/input";
import { useDebouncedCallback } from "use-debounce";
import { useQueryState } from "nuqs";
import {searchParser} from "@/features/tickets/search-params";

type SearchInputProps = {
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
};

const SearchInput = ({ placeholder, value, onChange }: SearchInputProps) => {

  const handleSearch = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  }, 300);

  return <Input defaultValue={value} placeholder={placeholder} onChange={handleSearch} />;
};

export { SearchInput };














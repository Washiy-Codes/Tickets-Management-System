"use client";

import { useQueryState, useQueryStates } from "nuqs";
import { SearchInput } from "@/components/search-input";
import { paginationOptions, paginationParser, searchParser } from "../search-params";

type TicketSearchInputProps = {
  placeholder: string;
};

const TicketSearchInput = ({ placeholder }: TicketSearchInputProps) => {
  const [search, setSearch] = useQueryState("search", searchParser);
  
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions
  );
  const handleSearch = (value: string) => {
    setPagination({ ...pagination, page: 0 }); // Reset to the first page when search changes
    setSearch(value);
  }

  return (
    <SearchInput
      value={search}
      onChange={handleSearch}
      placeholder={placeholder}
    />
  );
};

export { TicketSearchInput };
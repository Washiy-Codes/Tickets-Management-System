"use client";
import { useQueryStates } from "nuqs";
import { SortSelect, SortSelectOption } from "@/components/sort-select";
import { sortParser, sortOptions } from "../search-params";

type TicketSortSelectProps = {
  options: SortSelectOption[];
};

const TicketSortSelect = ({ options }: TicketSortSelectProps) => {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);

  return (
  <div className="flex justify-end h-10">
    <SortSelect options={options} value={sort} onChange={setSort} />
  </div>
  );

};

export { TicketSortSelect };
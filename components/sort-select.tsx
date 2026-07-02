"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
type options = {
  label: string;
  value: string;
};
type SortSelectProps = {
  defaultValue: string;
  options: options[];
};

const SortSelect = ({defaultValue, options}: SortSelectProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
const handleSort = (value: string) => {
  const params = new URLSearchParams(searchParams);
    if (value === defaultValue || !value) {
    params.delete("sort");
  } else {
    params.set("sort", value);
  }

  replace(`${pathname}?${params.toString()}`, {
    scroll: false,
  });
};

return(
    <Select defaultValue={searchParams.get("sort")?.toString() || defaultValue} onValueChange={handleSort}>
  <SelectTrigger className="w-32"> 
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    {options.map((option) => (
      <SelectItem key={option.value} value={option.value}>
        {option.label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
)
};

export { SortSelect };






// const handleSort = (value: string) => {
  //   const params = new URLSearchParams(searchParams);
  //   if(value === defaultValue) {
  //     params.delete("sort");
  //   }else if(value){
  //       params.set("sort", value);
  //   }
  //   if (value) {
  //     params.set("sort", value);
  //   } else {
  //     params.delete("sort");
  //   }

  //   replace(`${pathname}?${params.toString()}`, {
  //     scroll: false,
  //   });
  // };
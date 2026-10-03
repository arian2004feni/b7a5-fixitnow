"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export default function ServicesSeachBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (value: string) => {
    // console.log(value);

    // const params = new URLSearchParams()

    // if(value){
    //     params.set("searchTerm", value)
    // }else{
    //     params.delete("searchTerm")
    // }

    // router.replace(`${pathname}?${params.toString()}`)

    if (debouncedReference.current) {
      clearTimeout(debouncedReference.current);
    }

    debouncedReference.current = setTimeout(() => {

      const params = new URLSearchParams();

      if (value) {
        params.set("searchTerm", value);
      } else {
        params.delete("searchTerm");
      }

      router.replace(`${pathname}?${params.toString()}`);
    }, 500);
  };

  return (
    <InputGroup className="max-w-2xl h-14 px-2 rounded-xl mt-6 shadow">
      <InputGroupInput
        defaultValue={
          searchParams.get("searchTerm")
            ? searchParams.get("searchTerm")?.toString()
            : ""
        }
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search..."
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      {/* <InputGroupAddon align="inline-end">12 results</InputGroupAddon> */}
    </InputGroup>
  );
}

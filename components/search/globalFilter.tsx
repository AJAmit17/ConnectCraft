"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";
import { GlobalSearchFilters } from "@/constants/filter";

const GlobalFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeParams = searchParams.get("type");

  const [active, setActive] = useState(typeParams || "");

  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive(""); // reset active state

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(item); // set active state

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: item.toLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="flex items-center gap-5">
      <p className="text-white">Type:</p>

      <div className="flex gap-3 flex-wrap">
        {GlobalSearchFilters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            className={`border border-white rounded-3xl px-5 py-2 capitalize ${
              active === filter.value
                ? " bg-purple-900 text-white"
                : " text-gray-200"
            }`}
            onClick={() => handleTypeClick(filter.value)}
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GlobalFilters;
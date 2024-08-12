'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import LocalSearchbar from '@/components/search/localSearch';

import { Country } from '@/Types';
import { formUrlQuery } from '@/lib/utils';
import { MapPin } from 'lucide-react';

interface JobsFilterProps {
  countriesList: Country[];
}

const JobsFilter = ({ countriesList }: JobsFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleUpdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'location',
      value
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="relative mt-11 flex w-full justify-between gap-5 max-sm:flex-col sm:items-center">
      <LocalSearchbar
        route={pathname}
        iconPosition="left"
        imgSrc="https://cdn.icon-icons.com/icons2/1129/PNG/512/searchmagnifierinterfacesymbol1_79893.png"
        placeholder="Job Title, Company, or Keywords"
        otherClasses="flex-1 max-sm:w-full"
      />

      <Select onValueChange={(value) => handleUpdateParams(value)}>
        <SelectTrigger className="text-sm font-normal bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] flex min-h-[56px] items-center gap-3 border border-[hsl(var(--border))] p-4 sm:max-w-[210px]">
          <MapPin />
          <div className="flex-1 text-left truncate">
            <SelectValue placeholder="Select Location" />
          </div>
        </SelectTrigger>

        <SelectContent className="text-sm font-semibold text-[hsl(var(--popover-foreground))] max-h-[350px] max-w-[210px] bg-[hsl(var(--popover))] overflow-y-auto">
          <SelectGroup>
            {countriesList ? (
              countriesList
                .sort((a, b) =>
                  ('' + a.name.common).localeCompare(b.name.common)
                )
                .map((country: Country) => (
                  <SelectItem
                    key={country.name.common}
                    value={country.name.common}
                    className="cursor-pointer hover:bg-[hsl(var(--muted))]"
                  >
                    {country.name.common}
                  </SelectItem>
                ))
            ) : (
              <SelectItem value="No results found">
                No results found
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default JobsFilter;
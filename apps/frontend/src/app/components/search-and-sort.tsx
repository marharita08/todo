import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  SortOrder,
  SortBy,
  SortOrderToLabelMap,
  SortByToLabelMap,
} from "@/const";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface SearchAndSortProps {
  search: string;
  setSearch: (search: string) => void;
  sortBy: SortBy;
  setSortBy: (sortBy: SortBy) => void;
  sortOrder: SortOrder;
  setSortOrder: (sortOrder: SortOrder) => void;
}

export const SearchAndSort: React.FC<SearchAndSortProps> = ({
  search,
  setSearch,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        label="Search"
        isEmpty={!search}
        startIcon={<SearchIcon className="w-4 h-4" />}
      />
      <Select
        value={sortBy}
        onValueChange={(value) => setSortBy(value as SortBy)}
      >
        <SelectTrigger
          label="Sort By"
          value={sortBy}
        />
        <SelectContent>
          {Object.values(SortBy).map((sortBy) => (
            <SelectItem key={sortBy} value={sortBy}>
              {SortByToLabelMap[sortBy]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={sortOrder}
        onValueChange={(value) => setSortOrder(value as SortOrder)}
      >
        <SelectTrigger label="Sort Order" value={sortOrder} />
        <SelectContent>
          {Object.values(SortOrder).map((sortOrder) => (
            <SelectItem key={sortOrder} value={sortOrder}>
              {SortOrderToLabelMap[sortOrder]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

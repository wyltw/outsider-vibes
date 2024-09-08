import { cn } from "@/lib/utils";

type GenreListProps = { listType: "style" | "genre"; list: string[] };

export default function GenreList({ listType, list }: GenreListProps) {
  return (
    <>
      <ul
        className={cn(
          "flex flex-wrap gap-x-1 text-sm",
          listType === "style" && "text-black/50",
        )}
      >
        {list.map((item, i) => (
          <li
            className={cn("inline", listType === "style" && "leading-tight")}
            key={item + i}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

import type { CollectionEntry } from "astro:content";
import type { ReactElement } from "react";

type BlogData = Omit<CollectionEntry<"blog">["data"], "updatedDate">;

export interface ArticleCardProps extends BlogData {
  slug: CollectionEntry<"blog">["slug"];
}

export const ArticleCard = ({
  heroImage,
  slug,
  title,
  pubDate,
  description,
  imgAlt,
}: ArticleCardProps): ReactElement => {
  const date = pubDate.toString().substring(0, 15);
  const absoluteSlug = `/blog/${slug}`;

  return (
    <article className="h-full">
      <a
        className="flex flex-col h-full transition-shadow duration-150 ease-in-out shadow-sm hover:shadow-md rounded-2xl"
        href={absoluteSlug}
      >
        <div className="overflow-hidden rounded-2xl">
          <img
            className="min-w-full min-h-full object-cover"
            src={heroImage}
            alt={imgAlt}
          />
        </div>

        <div className="p-4 flex flex-col justify-start xxlmin:w-1/2 xxlmax:w-full  h-auto">
          <p className="pb-4 text-xs font-thin ">{date}</p>
          <h2 className="pb-8 text-lg font-bold">{title}</h2>
          <p className="pb-8 test-base font-light">{description}</p>
        </div>
      </a>
    </article>
  );
};

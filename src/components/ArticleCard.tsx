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
    <article>
      <a
        className="flex flex-col transition-shadow duration-150 ease-in-out shadow-sm hover:shadow-md rounded-2xl"
        href={absoluteSlug}
      >
        <div className="sm:h-64 h-44">
          <div className="w-full h-full overflow-hidden rounded-2xl">
            <img
              className="min-w-full min-h-full object-cover"
              src={heroImage}
              alt={imgAlt}
            />
          </div>
        </div>

        <div className="p-4 flex flex-col justify-start xxlmin:w-1/2 xxlmax:w-full md:h-64 h-auto">
          <p className="text-xs font-thin pb-4">{date}</p>
          <h2 className="text-lg font-bold pb-8">{title}</h2>
          <p className="test-base font-light pb-8">{description}</p>
        </div>
      </a>
    </article>
  );
};

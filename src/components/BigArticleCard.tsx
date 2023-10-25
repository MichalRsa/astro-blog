import type { CollectionEntry } from "astro:content";
import type { ReactElement } from "react";

type BlogData = Omit<CollectionEntry<"blog">["data"], "updatedDate">;

export interface ArticleCardProps extends BlogData {
  slug: CollectionEntry<"blog">["slug"];
}

export const BigArticleCard = ({
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
    <article className="flex h-screen">
      <a
        className="container my-auto flex h-64 max-w-6xl flex-row md:h-96"
        href={absoluteSlug}
      >
        <div className="w-7/12 overflow-hidden rounded-2xl">
          <img
            className="h-full w-full object-cover"
            src={heroImage}
            alt={imgAlt}
          />
        </div>
        <div className="justify flex w-5/12 flex-col p-8">
          <p className="pb-8 text-xs font-thin">{date}</p>
          <h2 className="pb-8 text-lg md:text-4xl font-bold">{title}</h2>
          <p className="pb-8 test-base font-light">{description}</p>
        </div>
      </a>
    </article>
  );
};

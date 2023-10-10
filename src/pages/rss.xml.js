import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { TITLE, DESCRIPTION } from "../consts";

export async function get(context) {
  const posts = await getCollection("blog");
  return rss({
    title: TITLE.BLOG,
    description: DESCRIPTION.BLOG,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.slug}/`,
    })),
  });
}

import { getPostsForListing } from "@/lib/blog-db"
import BlogList from "./BlogList"

export const dynamic = "force-dynamic"

export default function BlogPage() {
  const posts = getPostsForListing()
  return <BlogList posts={posts} />
}

import React from "react";
import fs from "fs"
import MarkdownPost from "../components/MarkdownPost";
import matter from "gray-matter";

import Footer from "../components/IndexSections/Footer";
import Header from "../components/IndexSections/Header";

interface PostProps {
  content: any;
  frontmatter: any;
}

export default function PrivacyPage({ content, frontmatter }: PostProps) {
  return (
    <>
      {/* NOTE: SEO is defined within MarkdownPost */}
      <Header text_contrast={false} />
      <MarkdownPost content={content} frontmatter={frontmatter} />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const markdownWithMetadata = fs
    .readFileSync("./public/markdown/privacy.md")
    .toString();

  const { data, content } = matter(markdownWithMetadata);

  // Convert post date to format: Month day, Year
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = data.date.toLocaleDateString("en-US", options);

  const frontmatter = {
    ...data,
    date: formattedDate,
  };

  return {
    props: {
      content: `${content}`,
      frontmatter,
    },
  };
}
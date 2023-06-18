import React from "react";
import fs from "fs";
import path from "path";
import MarkdownPost from "../../components/MarkdownPost";
import matter from "gray-matter";

import Footer from "../../components/IndexSections/Footer";
import Header from "../../components/IndexSections/Header";

interface PostProps {
  content: any;
  frontmatter: any; f
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

export async function getStaticPaths() {
  const files = fs.readdirSync("content");

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMetadata = fs
    .readFileSync(path.join("content/", slug + ".md"))
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

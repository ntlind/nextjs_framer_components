// @ts-nocheck

import React from "react";
import matter from "gray-matter";
import Link from "next/link";
import SEO from "../../components/SEO";
import Footer from "../../components/IndexSections/Footer";
import Header from "../../components/IndexSections/Header";

function BlogList({ posts, endPost = posts.length, filterTop = false }) {

  const startPost = filterTop ? 1 : 0

  const filtered_posts = posts.slice(startPost, endPost);

  return (
    <div>
      {filtered_posts.map(
        ({
          frontmatter: { title, description, date, image, image_alt },
          slug,
          content,
        }) => (
          <Link href={"/blog/[slug]"} as={`/blog/${slug}`} key={slug}>
            <div className="grid grid-cols-12 mb-6 space-x-6 hover:shadow-2xl transition duration-300 cursor-pointer bg-white">
              <div className='col-span-12 sm:col-span-4'>
                <img
                  src={image}
                  alt={image_alt}
                  className="h-48 w-96 object-cover"
                />
              </div>
              <div className='col-span-12 sm:col-span-8 flex flex-col w-full justify-center pr-12 pb-8'>
                <div className="text-2xl font-bold mt-4 sm:mt-0">{title}</div>
                <div className="mt-2 sm:mt-4 mb-8 sm:mb-12">{description}</div>
                <div className="text-gray-500">{date}</div>
              </div>
            </div>
          </Link>
        )
      )}
    </div>
  )
}

function Blog({ title, posts, endPost, filterTop, showButton }) {

  function thinRightArrow() {
    return (
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" /></svg>
    )
  }

  return (
    <div className='section flex flex-row'>
      <div className='pb-12'>
        <div className="tracking-tight font-bold text-4xl text-center mb-12">
          {title}
        </div>
        <BlogList posts={posts} endPost={endPost} filterTop={filterTop} />
        {showButton &&
          <div className='flex justify-center items-center mt-10'>
            <a href="https://quantile.app/blog" className='py-1 theme-nofill-button rounded'>
              See all
            </a>
          </div>
        }
      </div>
    </div>
  );
}


export default function Home({ props, posts }) {
  function getFeaturedPost(posts) {
    // if multiple posts are marked as featured, choose the latest one
    return posts.filter((post) => post.frontmatter.featured === 1)[0];
  }

  const featured_post = getFeaturedPost(posts);

  return (
    <div id="top" className="relative">
      <SEO
        title="Blog Posts"
        description="An interactive GUI to simplify hierarchical forecasting"
      />
      <div className="bg-fixed z-0 relative bg-no-repeat bg-cover cursor-pointer"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(" + featured_post.frontmatter.image + ")", backgroundSize: "cover", backgroundRepeat: "no-repeat",
          backgroundPosition: "center top"
        }}
      >
        <Header />
        <Link
          href={"/blog/[slug]"}
          as={`/blog/${featured_post.slug}`}
        >
          <div className='section'>
            <span role="img" aria-label={featured_post.frontmatter.image_alt}>
              {" "}
            </span>
            <div className='flex flex-col text-white py-0 pb-8 w-full justify-center h-screen-7/12'>
              <div className='text-lg text-gray-400'>
                Featured
              </div>
              <div className="text-4xl font-bold tracking-tight mt-6 mb-4">
                {featured_post.frontmatter.title}
              </div>
              {featured_post.frontmatter.description}
            </div>
          </div>
        </Link>
      </div>
      <div className='bg-white relative z-1 absolute'>
        <Blog title="All posts" posts={posts} />
        <Footer />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const fs = require("fs");

  const files = fs.readdirSync(`${process.cwd()}/content`);

  const posts = files
    .map((filename) => {
      const markdownWithMetadata = fs
        .readFileSync(`content/${filename}`)
        .toString();

      const { data } = matter(markdownWithMetadata);

      // Convert post date to format: Month day, Year
      const options = { year: "numeric", month: "long", day: "numeric" };
      const formattedDate = data.date.toLocaleDateString("en-US", options);

      const frontmatter = {
        ...data,
        date: formattedDate,
      };

      return {
        slug: filename.replace(".md", ""),
        frontmatter,
      };
    })
    .sort(
      (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    );

  return {
    props: {
      posts,
    },
  };
}

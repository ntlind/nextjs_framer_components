import React, { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown"; // converts markdown to html
import rehypeRaw from "rehype-raw"; // allows html to render in markdown files
import rehypeSlug from "rehype-slug"; // adds IDs to headings
import {
    AnimatePresence,
    motion,
    useTransform,
    useViewportScroll,
} from "framer-motion";


import SmoothScrollButton from "./SmoothScrollButton";

import Zoom from "react-medium-image-zoom";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import SEO from "../components/SEO";

interface PostProps {
    content: any;
    frontmatter: any;
    hero?: any;
    toc?: boolean
}

export default function MarkdownPost({ content, frontmatter, hero = true, toc = true }: PostProps) {
    const components = getMarkdownStyles();
    let [initialMount, setInitialMount] = useState(true)
    let [headerArray, setHeaderArray] = useState(null)
    const [activeId, setActiveId] = useState();
    useIntersectionObserver(setActiveId);

    const { scrollY } = useViewportScroll();
    const o1 = useTransform(scrollY, [0, 500, 600], [0, 0, 1]);

    useEffect(() => {
        if (initialMount) {
            let array = []

            // assumes you're only using h2 and h3 for section titles
            document.querySelectorAll("h2, h3").forEach((e) => {
                if (e.localName == "h2") {
                    // @ts-ignore
                    array.push({ text: e.innerText, id: e.id, children: [] })
                } else {
                    // @ts-ignore
                    array[array.length - 1].children.push({ text: e.innerText, id: e.id })
                }
            }
            )
            setInitialMount(false)
            setHeaderArray(array)
        }
    })

    return (
        <div id="top" className="relative">
            <SEO
                title={frontmatter.title}
                description={frontmatter.description}
            />
            {toc &&
                <AnimatePresence>
                    <motion.div className="hidden lg:flex fixed z-50 flex-col inset-y-24 space-y-4 pl-8 text-sm whitespace-nowrap overflow-hidden"
                        style={{ opacity: o1 }}
                    >{
                            headerArray?.map((item, index) =>
                                <div>
                                    <SmoothScrollButton children={< a
                                        className={
                                            (activeId == item.id) ? "cursor-pointer text-left text-black font-bold block text-ellipsis whitespace-nowrap w-48 xl:w-64 overflow-hidden" : "cursor-pointer text-left text-gray-500 hover:text-black block text-ellipsis whitespace-nowrap w-48 xl:w-64 overflow-hidden"
                                        }
                                    >
                                        {index + 1}.&nbsp;&nbsp;&nbsp;&nbsp;{item.text}
                                    </a>} section={item.id} />
                                    {item.children?.map((child, childIndex) =>
                                        <div className="">
                                            <SmoothScrollButton children={< a
                                                className={
                                                    (activeId == child.id) ? "mt-1 ml-4 cursor-pointer text-left text-black font-bold block text-ellipsis whitespace-nowrap w-48 xl:w-64 overflow-hidden" : "mt-1 ml-4 cursor-pointer text-left text-gray-500 hover:text-black block text-ellipsis whitespace-nowrap w-48 xl:w-64 overflow-hidden"
                                                }
                                            >
                                                {'abcdefghijklmnopqrstuvwxyz'[childIndex]}.&nbsp;&nbsp;&nbsp;&nbsp;{child.text}
                                            </a>} section={child.id} />
                                        </div>
                                    )}
                                </div>
                            )
                        }</motion.div>
                </AnimatePresence>}
            {
                hero && <div id="hero"
                    className="bg-fixed z-0 relative bg-no-repeat bg-cover"
                    style={{
                        background:
                            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(" +
                            frontmatter.image +
                            ")",
                    }}
                >
                    <span role="img" aria-label={frontmatter.image_alt}>
                        {" "}
                    </span>
                    <div id="hero" className="flex flex-col text-white section py-0 pb-8 w-full justify-center h-screen-9/12">
                        <div className="text-4xl font-bold leading-12 z-40 pt-24">
                            {frontmatter.title}
                        </div>
                        <div className="text-responsive leading-12 z-40 mt-4 max-w-2xl">
                            {frontmatter.description}
                        </div>
                        <div className="text-gray-200 mt-24">
                            Last updated on {frontmatter.date}
                        </div>
                    </div>
                </div>
            }

            <div className="bg-white relative z-1">
                <div className="section max-w-screen-md mx-auto prose lg:prose-lg prose-stone">
                    <ReactMarkdown
                        rehypePlugins={[rehypeRaw, rehypeSlug]}
                        children={content}
                        components={components}
                    />
                </div>
            </div>
        </div >
    );
}

function getMarkdownStyles() {
    return {
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
                <SyntaxHighlighter
                    children={String(children).replace(/\n$/, "")}
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                />
            ) : (
                <code className={className} {...props}>
                    {children}
                </code>
            );
        },
        a: ({ node, ...props }) => (
            <a
                style={{
                    color: "#3c7cff",
                    textDecoration: "underline",
                }}
                {...props}
            />
        ),
        img: ({ node, ...props }) => (
            <Zoom>
                <img className="xl:w-7/12 3xl:w-11/12 mx-auto" {...props} />{" "}
            </Zoom>
        ),
    };
}

const useIntersectionObserver = (setActiveId) => {
    const headingElementsRef = useRef({});
    useEffect(() => {
        const callback = (headings) => {
            headingElementsRef.current = headings.reduce((map, headingElement) => {
                map[headingElement.target.id] = headingElement;
                return map;
            }, headingElementsRef.current);

            const visibleHeadings = [];
            Object.keys(headingElementsRef.current).forEach((key) => {
                const headingElement = headingElementsRef.current[key];
                if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
            });

            const getIndexFromId = (id) =>
                headingElements.findIndex((heading) => heading.id === id);

            if (visibleHeadings.length === 1) {
                setActiveId(visibleHeadings[0].target.id);
            } else if (visibleHeadings.length > 1) {
                const sortedVisibleHeadings = visibleHeadings.sort(
                    // @ts-ignore
                    (a, b) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id)
                );
                setActiveId(sortedVisibleHeadings[0].target.id);
            }
        };

        const observer = new IntersectionObserver(callback, {
            rootMargin: "0px 0px -40% 0px"
        });

        const headingElements = Array.from(document.querySelectorAll("h2, h3"));

        headingElements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, [setActiveId]);
};
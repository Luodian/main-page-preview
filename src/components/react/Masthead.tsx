import React from "react";
import type { CollectionEntry } from "astro:content";
import FormattedDate from "./FormattedDate";
import Separator from "./Separator";
import LazyImage from "./LazyImage";
import { HiCalendar, HiBookOpen } from "react-icons/hi";

interface MastheadProps {
  content: CollectionEntry<"post">;
  postSeries?: CollectionEntry<"series"> | null;
}

const Masthead: React.FC<MastheadProps> = ({ content, postSeries }) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: "long",
  };

  // Get reading time from content metadata
  const readingTime = (content as any).rendered?.metadata?.frontmatter
    ?.readingTime
    ? `${(content as any).rendered.metadata.frontmatter.readingTime}`
    : "Less than one minute read";

  return (
    <div className="max-w-5xl mx-auto px-3 md:px-0">
      {/* Tags and Series */}
      <div className="mb-4 flex flex-wrap justify-center gap-2 mx-auto">
        {/* Tags */}
        {content.data.mainTags?.length ? (
          <>
            {content.data.mainTags.map((tag) => (
              <a
                key={tag}
                aria-label={`View all posts with the tag: ${tag}`}
                href={`/tags/${tag}`}
              >
                <div className="rounded-full border-2 px-2 text-xs md:text-base hover:border-slate-400 hover:text-slate-950 transition-colors">
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </div>
              </a>
            ))}
          </>
        ) : null}
      </div>

      {/* Title */}
      <div className="flex justify-center">
        <h1
          className="text-xl md:!text-6xl text-slate-950 text-center"
          title={content.data.title}
          data-pagefind-body
        >
          {content.data.title}
        </h1>
      </div>

      {/* Date and Reading Time */}
      <div className="flex flex-wrap items-center justify-center text-lighter text-xs md:text-sm mt-[1.0625rem] mx-auto mb-2">
        <span className="flex items-center h-[1.75rem]">
          <HiCalendar className="flex items-center h-3 w-3 md:h-4 md:w-4 me-1" />
          <FormattedDate
            date={content.data.publishDate}
            dateTimeOptions={dateTimeOptions}
            className="flex flex-shrink-0"
          />
        </span>
        <Separator type="smallDot" />
        <span className="flex items-center h-[1.75rem]">
          <HiBookOpen className="flex items-center h-4 w-4 md:h-5 md:w-5 me-1" />
          {readingTime}
        </span>
        {content.data.updatedDate && (
          <>
            <Separator type="dot" />
            <span className="h-[1.75rem] flex items-center flex-shrink-0 rounded-lg bg-accent-two/5 text-accent-two py-1 px-2 text-sm gap-x-1">
              Updated:
              <FormattedDate
                className="flex flex-shrink-0"
                date={content.data.updatedDate}
                dateTimeOptions={dateTimeOptions}
              />
            </span>
          </>
        )}
      </div>

      {/* Draft Status */}
      {content.data.draft && (
        <span className="text-base text-red-500 ml-2">(Draft)</span>
      )}

      {/* Cover Image */}
      {content.data.coverImage && (
        <div className="mb-4 mt-2 overflow-auto rounded-lg">
          <LazyImage
            alt={content.data.coverImage.alt}
            className="object-cover"
            fetchPriority="high"
            loading="lazy"
            src={content.data.coverImage.src.src}
            rounded={true}
            skeletonClass="rounded-lg"
          />
        </div>
      )}

      {/* Description */}
      <p
        className="text-textColor text-center max-w-3xl text-sm md:text-base mx-4 md:mx-auto"
        data-pagefind-body
      >
        {content.data.description}
      </p>
    </div>
  );
};

export default Masthead;

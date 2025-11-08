"use client";

import React, { useState } from "react";
import { HiOutlineDocumentText, HiClipboard, HiCheck } from "react-icons/hi";
import { FaRegCopy } from "react-icons/fa";
import { Badge } from "./Badge";

interface PostFooterProps {
  authors: Array<{
    name: string;
    url?: string;
  }>;
  topics: string[];
  acknowledgement?: string;
  bibtex?: string;
  year?: string | number;
}

export default function PostFooter({
  authors,
  topics,
  acknowledgement,
  bibtex,
  year,
}: PostFooterProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isMobileCopied, setIsMobileCopied] = useState(false);

  const handleCopyBibtex = async () => {
    if (!bibtex) return;

    try {
      await navigator.clipboard.writeText(bibtex);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy citation:", err);
    }
  };

  const handleMobileCopyBibtex = async () => {
    if (!bibtex) return;

    try {
      await navigator.clipboard.writeText(bibtex);
      setIsMobileCopied(true);
      setTimeout(() => setIsMobileCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy citation:", err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsCopied(false);
  };

  return (
    <>
      <div className="w-full max-w-7xl mx-auto rounded-lg bg-accent-base/5 border border-special-light p-6 space-y-6 mt-8">
        {/* Topics/Tags Section */}
        <div className="flex flex-wrap gap-2">
          {year && (
            <Badge variant="default" showHash={false}>
              {String(year)}
            </Badge>
          )}
          {topics.map((topic) => (
            <Badge key={topic} variant="secondary" showHash={false}>
              {topic.charAt(0).toUpperCase() + topic.slice(1)}
            </Badge>
          ))}
        </div>

        {/* Author Section */}
        <div className="space-y-2 text-xs md:text-sm">
          <p className=" text-lighter">
            {authors.length === 1 ? "Author" : "Authors"}
          </p>
          <div className="flex flex-wrap gap-2">
            {authors.map((author, index) => (
              <span key={index} className="text-textColor">
                {author.url ? (
                  <a
                    href={author.url}
                    className="underline hover:text-accent-base transition-colors"
                  >
                    {author.name}
                  </a>
                ) : (
                  author.name
                )}
                {index < authors.length - 1 && ", "}
              </span>
            ))}
          </div>
        </div>

        {/* Acknowledgement Section (Optional) */}
        {acknowledgement && (
          <div className="space-y-2">
            <p className="text-xs md:text-sm text-lighter">Acknowledgement</p>
            <p className="text-xs md:text-sm text-textColor leading-relaxed">
              {acknowledgement}
            </p>
          </div>
        )}

        {/* BibTeX Export Section (Optional) */}
        {bibtex && (
          <div className="pt-4 border-t border-black/20">
            {/* Desktop: Modal Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden md:flex items-center gap-2 pl-3 pr-4 py-2 text-sm bg-transparent border border-accent-base text-accent-base rounded-lg hover:bg-accent-base/10 transition-colors"
            >
              <HiOutlineDocumentText className="h-5 w-5" />
              Export BibTeX Citation
            </button>

            {/* Mobile: Direct Copy Button */}
            <button
              onClick={handleMobileCopyBibtex}
              className="flex md:hidden items-center gap-2 pl-3 pr-4 py-2 text-xs bg-accent-base text-bgColor rounded-lg hover:brightness-110 transition-all"
            >
              {isMobileCopied ? (
                <>
                  <HiCheck className="h-3 w-3" />
                  Copied Citation!
                </>
              ) : (
                <>
                  <FaRegCopy className="h-3 w-3" />
                  Copy BibTeX Citation
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Modal - Desktop Only */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-bgColor rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-textColor">
                  BibTeX Citation
                </h3>
                <p className="text-sm text-lighter mt-1">
                  Copy the citation below to use in your bibliography
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <pre className="bg-accent-base/10 p-4 rounded-lg text-sm overflow-x-auto border border-special-light">
                    <code className="text-textColor">{bibtex}</code>
                  </pre>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleCopyBibtex}
                    className="flex items-center gap-2 px-4 py-2 bg-accent-base text-bgColor rounded-lg hover:brightness-110 transition-all flex-1 justify-center"
                  >
                    {isCopied ? (
                      <>
                        <HiCheck className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <HiClipboard className="h-4 w-4" />
                        Copy to Clipboard
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

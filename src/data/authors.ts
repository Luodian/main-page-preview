// Centralized author database
// This file contains author information that can be referenced across the project
// When authors are defined in frontmatter without URLs, this database will be used as fallback

export interface AuthorData {
  name: string;
  url: string;
  affiliation?: string;
}

export const AUTHORS: Record<string, AuthorData> = {
  "Bo Li": {
    name: "Bo Li",
    url: "https://brianboli.com/",
    affiliation: "NTU",
  },
  "Chen Change Loy": {
    name: "Chen Change Loy",
    url: "https://www.mmlab-ntu.com/person/ccloy/index.html",
    affiliation: "NTU",
  },
  "Fanyi Pu": {
    name: "Fanyi Pu",
    url: "http://pufanyi.github.io/",
    affiliation: "NTU",
  },
  "Jingkang Yang": {
    name: "Jingkang Yang",
    url: "https://jingkang50.github.io/",
    affiliation: "NTU",
  },
  "Kaichen Zhang": {
    name: "Kaichen Zhang",
    url: "http://kcz358.github.io/",
    affiliation: "NTU",
  },
  "Kairui Hu": {
    name: "Kairui Hu",
    url: "https://scholar.google.com/citations?user=_oHHACwAAAAJ",
    affiliation: "NTU",
  },
  "Luu Minh Thang": {
    name: "Luu Minh Thang",
    url: "https://github.com/Devininthelab",
    affiliation: "NTU",
  },
  "Nguyen Quang Trung": {
    name: "Nguyen Quang Trung",
    url: "https://github.com/ngquangtrung57",
    affiliation: "NTU",
  },
  "Pham Ba Cong": {
    name: "Pham Ba Cong",
    url: "https://pbcong.netlify.app/",
    affiliation: "NTU",
  },
  "Shuai Liu": {
    name: "Shuai Liu",
    url: "https://choiszt.github.io/",
    affiliation: "NTU",
  },
  "Yezhen Wang": {
    name: "Yezhen Wang",
    url: "https://scholar.google.com/citations?user=g-VEnLEAAAAJ&hl=zh-CN",
    affiliation: "NTU",
  },
  "Ziwei Liu": {
    name: "Ziwei Liu",
    url: "https://liuziwei7.github.io/",
    affiliation: "NTU",
  },
  "Yuanhan Zhang": {
    name: "Yuanhan Zhang",
    url: "https://zhangyuanhan-ai.github.io/",
    affiliation: "LMMS-Lab",
  },
  "LMMS-Lab Team": {
    name: "LMMS-Lab Team",
    url: "https://lmms-lab.github.io/",
    affiliation: "LMMS-Lab",
  },
};

// Helper function to get author data with URL priority
export function getAuthorWithUrl(authorInput: {
  name: string;
  url?: string;
  main?: boolean;
}): {
  name: string;
  url?: string;
  main?: boolean;
} {
  const { name, url, main } = authorInput;

  // If URL is explicitly provided in frontmatter, use it (highest priority)
  if (url) {
    return { name, url, main };
  }

  // Otherwise, try to find in centralized database
  const centralAuthor = AUTHORS[name];
  if (centralAuthor) {
    return { name, url: centralAuthor.url, main };
  }

  // Fallback: return name without URL
  return { name, main };
}

// Helper function to get all author data for a list
export function processAuthorsList(
  authors: Array<{ name: string; url?: string; main?: boolean }>
): Array<{ name: string; url?: string; main?: boolean }> {
  return authors.map(getAuthorWithUrl);
}

import type { Document } from "@prismicio/client/types/documents";

const linkResolver = (doc: Document) => {
  // Define the url depending on the document type
  if (doc.type === "page") {
    return "/page/" + doc.uid;
  } else if (doc.type === "project") {
    return "/project/" + doc.uid;
  }

  // Default to homepage
  return "/";
};

export default linkResolver;

import Callout from "./Callout.astro";
import CodeDemo from "./CodeDemo.astro";
import Gallery from "./Gallery.astro";
import LiveCodeEditor from "./LiveCodeEditorWrapper.astro";
import ResponsiveImage from "./ResponsiveImage.tsx";
import Collapsible from "./CollapsibleWrapper.astro";
import { Badge } from "@/components/react/Badge.tsx";
import FormattedDate from "@/components/react/FormattedDate.tsx";
import LazyImage from "@/components/react/LazyImage.tsx";

export const components = {
  Callout,
  CodeDemo,
  Gallery,
  LiveCodeEditor,
  ResponsiveImage,
  Collapsible,
  Badge,
  FormattedDate,
  LazyImage,
};

export {
  Callout,
  CodeDemo,
  Gallery,
  LiveCodeEditor,
  ResponsiveImage,
  Collapsible,
  Badge,
  FormattedDate,
  LazyImage,
};

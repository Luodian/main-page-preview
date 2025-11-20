import type React from "react";
import {
  HiOutlineDocumentText,
  HiOutlinePlay,
  HiOutlineLink,
} from "react-icons/hi2";
import { GoLinkExternal } from "react-icons/go";
import { LuCodeXml } from "react-icons/lu";
import { FiDatabase } from "react-icons/fi";
import { FaGithub, FaRocket } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ResourceType = "github" | "paper" | "model" | "dataset" | "demo" | "link";

interface Resource {
  type: ResourceType;
  title: string;
  description?: string;
  url: string;
}

interface GroupedResource {
  name: string;
  url: string;
  metadata?: string;
}

interface ResourceGroup {
  type: ResourceType;
  title: string;
  description?: string;
  items: GroupedResource[];
}

interface ResourceCardProps {
  title?: string;
  description?: string;
  resources?: Resource[];
  groups?: ResourceGroup[];
}

const resourceIcons: Record<ResourceType, React.ReactNode> = {
  github: <FaGithub className="h-4 w-4" />,
  paper: <HiOutlineDocumentText className="h-4 w-4" />,
  model: <FaRocket className="h-4 w-4" />,
  dataset: <FiDatabase className="h-4 w-4" />,
  demo: <HiOutlinePlay className="h-4 w-4" />,
  link: <HiOutlineLink className="h-4 w-4" />,
};

const resourceLabels: Record<ResourceType, string> = {
  github: "GitHub",
  paper: "Paper",
  model: "Model",
  dataset: "Dataset",
  demo: "Demo",
  link: "Link",
};

export function ResourceCard({
  title = "Resources",
  description,
  resources,
  groups,
}: ResourceCardProps) {
  return (
    <Card className="w-full max-w-3xl mx-auto bg-muted/50 border-border">
      <CardHeader>
        <CardTitle className="text-base md:text-xl">{title}</CardTitle>
        {description && (
          <CardDescription className="text-xs md:text-base">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {resources && resources.length > 0 && (
          <div className="space-y-3">
            {resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between md:justify-start items-center md:items-start gap-3 p-4 rounded-lg bg-slate-50 text-slate-950 hover:bg-slate-100 hover:no-underline transition-colors group"
              >
                <div className="flex items-center gap-2 min-w-[100px]">
                  <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {resourceIcons[resource.type]}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {resourceLabels[resource.type]}
                  </Badge>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground text-right text-xs md:text-base group-hover:text-primary transition-colors">
                      {resource.title}
                    </span>
                    <GoLinkExternal className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                  </div>
                  <div className="hidden md:flex justify-start">
                    {resource.description && (
                      <p className="text-xs md:text-sm opacity-70 text-start mt-1 leading-relaxed mb-2">
                        {resource.description}
                      </p>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {groups && groups.length > 0 && (
          <div className="space-y-6 text-card-foreground">
            {groups.map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-3">
                <div className="flex items-center justify-start gap-2">
                  <div className="text-muted-foreground">
                    {resourceIcons[group.type]}
                  </div>
                  <div className="font-semibold text-start text-foreground text-base md:text-xl">
                    {group.title}
                  </div>
                </div>
                {group.description && (
                  <div className="text-xs md:text-base text-muted-foreground leading-relaxed">
                    {group.description}
                  </div>
                )}
                <div className="rounded-lg border border-border bg-background overflow-hidden">
                  <div className="divide-y divide-border">
                    {group.items.map((item, itemIndex) => (
                      <a
                        key={itemIndex}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-slate-50 text-slate-950 hover:bg-slate-100 hover:no-underline transition-colors group"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0 text-xs md:text-sm">
                          <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {item.name}
                          </span>
                          {item.metadata && (
                            <Badge
                              variant="secondary"
                              className="text-xs ml-auto whitespace-nowrap"
                            >
                              {item.metadata}
                            </Badge>
                          )}
                        </div>
                        <GoLinkExternal className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 ml-2" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

import { HelmetProvider, Helmet } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DEFAULT_SITE_NAME } from "@/lib/site";

const PageMeta = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <Helmet>
    <title>{title ? `${title} | ${DEFAULT_SITE_NAME}` : DEFAULT_SITE_NAME}</title>
    <meta name="description" content={description} />
  </Helmet>
);

export const AppWrapper = ({ children }: { children: React.ReactNode }) => (
  <HelmetProvider>
    <TooltipProvider>
      {children}
    </TooltipProvider>
  </HelmetProvider>
);

export default PageMeta;

import AnimatedSection from "./AnimatedSection";
import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

const PageHeader = ({ title, subtitle, action }: Props) => (
  <div className="bg-foreground pt-28 pb-16 md:pt-36 md:pb-20 px-4">
    <div className="container">
      <AnimatedSection>
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-background">{title}</h1>
        {subtitle && <p className="mt-3 text-background/60 max-w-2xl text-lg">{subtitle}</p>}
        {action && <div className="mt-6">{action}</div>}
      </AnimatedSection>
    </div>
  </div>
);

export default PageHeader;

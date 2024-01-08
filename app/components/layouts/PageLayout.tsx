import { FC, ReactNode } from "react";
import Header from "../Header";

interface PageLayoutProps {
  children: ReactNode[];
}

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="page-layout container mx-auto max-h-[100vh]">
      <header className="page-layout-in-header">
        <Header />
      </header>
      <main className="page-layout-in-main">{children?.[0]}</main>
      <aside className="page-layout-in-aside overflow-y-scroll">
        {children?.[1]}
      </aside>
    </div>
  );
};

export default PageLayout;

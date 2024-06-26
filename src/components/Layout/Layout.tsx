import { ReactNode } from "react";

import "./Layout.css";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <div className="layout-header">Markdown Previewer</div>
      <div className="layout-content-container">
        <div className="layout-content">{children}</div>
      </div>
    </div>
  );
};

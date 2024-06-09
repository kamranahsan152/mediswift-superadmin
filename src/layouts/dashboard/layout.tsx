import { useSettings } from "src/hooks/use-settings";

import { useSections } from "./config";
import { VerticalLayout } from "./vertical-layout";
import { Outlet } from "react-router";
import { Suspense } from "react";

export const Layout = (props: any) => {
  const settings = useSettings();
  const sections = useSections();

  return (
    <VerticalLayout
      sections={sections}
      navColor={settings.navColor}
      {...props}
    />
  );
};

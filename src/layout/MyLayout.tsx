import { Layout, LayoutProps } from "react-admin";
import MyMenu from "./MyMenu";

const MyLayout = ({ children, ...rest }: LayoutProps) => {
  return (
    <Layout
      {...rest}
      menu={MyMenu}
      sx={(theme) => ({
        "& .RaLayout-appFrame": {
          marginTop: 0,
        },
        "& .RaLayout-content": {
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
          padding: 24,
        },
        "& .RaTopAppBar-toolbar": {
          backgroundColor: "#1e293b", // Slate 800 (Matchers Sidebar)
          color: "#ffffff",
          borderBottom: `1px solid #334155`, // Subtle border
        },
        "& .MuiDrawer-paper": {
          backgroundColor: "#1e293b", // Slate 800 - Dark Sidebar
          color: "#ffffff",
          borderRight: "none",
        },
      })}
    >
      {children}
    </Layout>
  );
};

export default MyLayout;

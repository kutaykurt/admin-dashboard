import { Layout, LayoutProps, Sidebar } from "react-admin";
import MyMenu from "./MyMenu";

const MySidebar = (props: any) => (
  <Sidebar
    {...props}
    sx={{
      "& .MuiDrawer-paper": {
        backgroundColor: "#1e293b !important",
        color: "#ffffff !important",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1200,
        borderRight: "none",
      },
    }}
  />
);

const MyLayout = ({ children, ...rest }: LayoutProps) => {
  return (
    <Layout
      {...rest}
      sidebar={MySidebar}
      menu={MyMenu}
      sx={(theme) => ({
        "& .RaLayout-appFrame": {
          marginTop: 0,
          // Removed overflow: hidden to restore natural scroll
        },
        "& .RaLayout-content": {
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
          padding: 24,
          marginLeft: "240px", // Push content for fixed sidebar
          transition: "margin-left 0.2s",
          [theme.breakpoints.down("md")]: {
            marginLeft: 0,
          },
        },
        "& .RaTopAppBar-toolbar": {
          backgroundColor: "#1e293b",
          color: "#ffffff",
          borderBottom: `1px solid #334155`,
          zIndex: 1201, // Above Sidebar
          position: "relative",
        },
      })}
    >
      {children}
    </Layout>
  );
};

export default MyLayout;

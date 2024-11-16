type SidebarLink = {
  label: string;
  route: string;
};

export const sidebarLinks: SidebarLink[] = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Community",
    route: "/community",
  },
  {
    label: "Collections",
    route: "/collection",
  },
  {
    label: "Tags",
    route: "/tags",
  },
  {
    label: "Profile",
    route: "/profile",
  },
  {
    label: "Ask a Question",
    route: "/ask-questions",
  },
  {
    label: "Lab Experiments",
    route: "/experiments",
  },
  {
    label: "Jobs",
    route: "/jobs",
  },
];

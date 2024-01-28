type SidebarLink = {
    label: string;
    route: string;
    imageURL: string;
}

export const sidebarLinks: SidebarLink[] = [
    {
        label: "Home",
        route: "/",
        imageURL : "/assets/icons/home.svg",
    },
    {
        label: "Community",
        route: "/community",
        imageURL : "/assets/icons/suitcase.svg"
    },
    {
        label: "Collections",
        route: "/computer",
        imageURL : "/assets/icons/Computer.svg"
    },
    {
        label: "Tags",
        route: "/testing",
        imageURL : "/assets/icons/job-search.svg"
    },
]
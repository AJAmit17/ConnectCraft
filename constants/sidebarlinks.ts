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
        label: "Tags",
        route: "/tags",
        imageURL : "/assets/icons/tag.svg"
    },
]
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
        imageURL : "/assets/icons/users.svg"
    },    
    {
        label: "Collections",
        route: "/collection",
        imageURL : "/assets/icons/star.svg"
    },
    {
        label: "Tags",
        route: "/tags",
        imageURL : "/assets/icons/tag.svg"
    },
    {
        label: "Profile",
        route: "/profile",
        imageURL : "/assets/icons/user.svg"
    },
    {
        label: "Ask a Question",
        route: "/ask-question",
        imageURL : "/assets/icons/question.svg"
    }
]
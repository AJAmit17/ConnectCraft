export interface SidebarLink {
  route: string;
  label: string;
}

export interface ParamsProps {
  params: {
    id: string;
  };
}

export interface SearchParamsProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

export interface URLProps {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | undefined;
  };
}

export interface FilterProps {
  name: string;
  value: string;
}
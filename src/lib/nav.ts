export type NavLink = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

export type NavCta = { label: string; href: string };

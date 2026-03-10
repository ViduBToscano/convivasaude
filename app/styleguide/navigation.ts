export interface NavItem {
  name: string
  href: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const navigation: NavSection[] = [
  {
    title: "Fundação",
    items: [
      { name: "Tokens de Design", href: "/styleguide" },
    ]
  },
  {
    title: "Componentes",
    items: [
      { name: "Card", href: "/styleguide/components/card" },
      { name: "Dialog", href: "/styleguide/components/dialog" },
      { name: "Navigation Menu", href: "/styleguide/components/navigation-menu" },
      { name: "Chart", href: "/styleguide/components/chart" },
      { name: "Skeleton", href: "/styleguide/components/skeleton" },
    ]
  }
]

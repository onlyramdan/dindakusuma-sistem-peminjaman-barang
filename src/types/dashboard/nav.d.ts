import { z } from "zod";

const NavItem = z.object({
  title: z.string(),
  href: z.string().optional(),
  disabled: z.boolean().optional(),
  external: z.boolean().optional(),
  icon: z.string().optional(),
  label: z.string().optional(),
});
const NavItemWithChildren = NavItem.extend({
  items: z.array(NavItemWithChildren).optional(),
  role: z.string().optional(),
});

type SidebarNavItem = z.infer<typeof NavItemWithChildren>;

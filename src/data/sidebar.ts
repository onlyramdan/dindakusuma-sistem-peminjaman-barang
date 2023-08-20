import { SidebarNavItem } from "@/types/dashboard/nav";

interface SidebarConfig {
  sidebarNav: SidebarNavItem[];
}

export const sidebarConfig: SidebarConfig = {
  sidebarNav: [
    {
      title: "Dashboard",
      items: [
        {
          title: "Beranda",
          href: "/dashboard",
          items: [],
        },
        {
          title: "Pengguna",
          href: "/dashboard/users",
          items: [],
          role: "admin",
        },
      ],
    },
    {
      title: "Master Data",
      items: [
        {
          title: "Master Kategori Buku",
          href: "/dashboard/book-categories",
          items: [],
          role: "admin",
        },
        {
          title: "Master Lokasi Buku",
          href: "/dashboard/book-locations",
          items: [],
          role: "admin",
        },
        {
          title: "Master Buku",
          href: "/dashboard/books",
          subHref: ["/dashboard/books/create", "/dashboard/books/edit/:id"],
          items: [],
          role: "admin",
        },
        {
          title: "Master Ruangan",
          href: "/dashboard/rooms",
          items: [],
          role: "admin",
        },
        {
          title: "Master Status",
          href: "/dashboard/statuses",
          items: [],
          role: "admin",
        },
      ],
      role: "admin",
    },
    {
      title: "Inventaris Buku",
      items: [
        {
          title: "Data Buku",
          href: "/dashboard/books-data",
          items: [],
        },
        {
          title: "Peminjaman Buku",
          href: "/dashboard/books-loans",
          items: [],
        },
        {
          title: "Riwayat Peminjaman Buku",
          href: "/dashboard/books-loans-history",
          items: [],
        },
      ],
    },
    {
      title: "Inventaris Ruangan",
      items: [
        {
          title: "Peminjaman Ruangan",
          href: "/dashboard/rooms-loans",
          items: [],
        },
        {
          title: "Riwayat Peminjaman Ruangan",
          href: "/dashboard/rooms-loans-history",
          items: [],
        },
      ],
    },
    {
      title: "Akun",
      items: [
        {
          title: "Pengaturan Akun",
          href: "/dashboard/account/settings",
          items: [],
        },
      ],
    },
  ],
};

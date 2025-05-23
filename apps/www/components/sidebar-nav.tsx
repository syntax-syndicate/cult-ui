"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SidebarNavItem } from "types/nav"

import { cn } from "@/lib/utils"

export interface DocsSidebarNavProps {
  items: SidebarNavItem[]
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname()

  return items.length ? (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className={cn("pb-4")}>
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
            {item.title}
          </h4>
          {item?.items?.length && (
            <DocsSidebarNavItems items={item.items} pathname={pathname} />
          )}
        </div>
      ))}
    </div>
  ) : null
}

interface DocsSidebarNavItemsProps {
  items: SidebarNavItem[]
  pathname: string | null
}

export function DocsSidebarNavItems({
  items,
  pathname,
}: DocsSidebarNavItemsProps) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm">
      {items.map((item, index) => (
        <NavItem key={index} item={item} pathname={pathname} />
      ))}
    </div>
  ) : null
}

interface NavItemProps {
  item: SidebarNavItem
  pathname: string | null
}

function NavItem({ item, pathname }: NavItemProps) {
  const isActive = pathname === item.href
  const hasChildren = item.items && item.items.length > 0

  if (hasChildren) {
    return (
      <div>
        <span className="flex w-full cursor-default items-center rounded-md p-2 text-xs font-medium text-muted-foreground">
          {item.title}
        </span>
        <div className="ml-3 border-l border-border pl-3">
          <DocsSidebarNavItems items={item.items} pathname={pathname} />
        </div>
      </div>
    )
  }

  if (item.href && !item.disabled) {
    return (
      <Link
        href={item.href}
        className={cn(
          "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
          item.disabled && "cursor-not-allowed opacity-60",
          isActive ? "font-medium text-foreground" : "text-muted-foreground"
        )}
        target={item.external ? "_blank" : ""}
        rel={item.external ? "noreferrer" : ""}
      >
        {item.title}
        {item.label === "new" && (
          <span className="ml-2 rounded-sm border border-black bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
            {item.label}
          </span>
        )}
        {item.label === "recent" && (
          <span className="ml-2 rounded-sm border border-black  px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
            {item.label}
          </span>
        )}
        {item.label === "updated" && (
          <span className="ml-2 rounded-sm border border-black bg-pink-400 px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
            {item.label}
          </span>
        )}
      </Link>
    )
  }

  return (
    <span
      className={cn(
        "flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline",
        item.disabled && "cursor-not-allowed opacity-60"
      )}
    >
      {item.title}
      {item.label && (
        <span className="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline">
          {item.label}
        </span>
      )}
    </span>
  )
}

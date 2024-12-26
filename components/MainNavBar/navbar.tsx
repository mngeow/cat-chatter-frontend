"use client";

import type {NavbarProps} from "@nextui-org/react";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  Link
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function MainNavBar(props: NavbarProps) {
  const pathname = usePathname();

  return (
    <Navbar
      {...props}
      classNames={{
        base: "py-4 backdrop-filter-none bg-transparent",
        wrapper: "px-0 w-full justify-center bg-transparent",
        item: "hidden md:flex",
      }}
      height="54px"
    >
      <NavbarContent
        className="gap-4 rounded-full border-small border-default-200/20 bg-background/60 px-2 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
        justify="center"
      >
        {/* Toggle */}
        <NavbarMenuToggle className="ml-2 text-default-400 md:hidden" />

        {/* Logo */}
        <NavbarBrand className="mr-2 w-[40vw] md:w-auto md:max-w-fit">
          <div className="rounded-full bg-foreground text-background">
          </div>
          <span className="ml-2 font-medium md:hidden">ACME</span>
        </NavbarBrand>

        {/* Updated Items */}
        <NavbarItem isActive={pathname === "/"}>
          <Link className={pathname === "/" ? "text-white" : "text-gray-500"} href="/" size="sm">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/pricing"}>
          <Link 
            className={pathname === "/pricing" ? "text-white" : "text-gray-500"}
            href="/pricing" 
            size="sm"
          >
            Pricing
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/about"}>
          <Link 
            className={pathname === "/about" ? "text-white" : "text-gray-500"}
            href="/about" 
            size="sm"
          >
            About Us
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Menu */}
      <NavbarMenu
        className="top-[calc(var(--navbar-height)/2)] mx-auto mt-16 max-h-[40vh] max-w-[80vw] rounded-large border-small border-default-200/20 bg-background/60 py-6 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
        motionProps={{
          initial: {opacity: 0, y: -20},
          animate: {opacity: 1, y: 0},
          exit: {opacity: 0, y: -20},
          transition: {
            ease: "easeInOut",
            duration: 0.2,
          },
        }}
      >
      </NavbarMenu>
    </Navbar>
  );
}

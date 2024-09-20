"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-transparent ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image src='/iirda__1_-removebg-preview (1).png' alt="Logo" width={150} height={100} />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="space-x-1">
              <NavItem href="/" className="text-white">Home</NavItem>
              <NavItemWithDropdown trigger="Services" >
                <DropdownContent title="Services">
                  <ListItem href="/services/corporate-event-management" title="Corporate" >
                    Corporate event management
                  </ListItem>
                  <ListItem href="/products/wedding" title="Wedding">
                    Wedding planner
                  </ListItem>
                  <ListItem href="/services/music-entertainments" >Music and entertainmets </ListItem>
                  <ListItem href="/services/private-parties">Private parties</ListItem>
                </DropdownContent>
              </NavItemWithDropdown>

              <NavItemWithDropdown trigger="About" >
                <DropdownContent title="About">
                  <ListItem href="/about/stories" title="Stories" >
                    Story of iirda
                  </ListItem>
                  <ListItem href="/products/photos" title="Photo">
                    Photo gallery of iirda events
                  </ListItem>
                </DropdownContent>
              </NavItemWithDropdown>
              <NavItem href="/contact" className="text-white">Contact</NavItem>
              <NavItem href="/partner" className="text-white">Working Partner</NavItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Navigation Toggle */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <MobileNavItem href="/" className="text-white">Home</MobileNavItem>
              <MobileNavItemWithDropdown title="Services">
                <MobileDropdownItem href="/products/corporate-event-management" className="text-white">Corporate events</MobileDropdownItem>
                <MobileDropdownItem href="/services/wedding-planner" className="text-white">Wedding planner</MobileDropdownItem>
                <MobileDropdownItem href="/services/music-entertainments" className="text-white">Music and entertainmets</MobileDropdownItem>
                <MobileDropdownItem href="/services/private-parties" className="text-white">Private parties</MobileDropdownItem>
              </MobileNavItemWithDropdown>

              <MobileNavItemWithDropdown title="About" >
                <MobileDropdownItem href="/about/stories" className="text-white">Story of iirda</MobileDropdownItem>
                <MobileDropdownItem href="/services/photos" className="text-white">Photo Gallery</MobileDropdownItem>
              </MobileNavItemWithDropdown>
              <MobileNavItem href="/" className="text-white">+91-8304050894</MobileNavItem>
              <MobileNavItem href="/partner" className="text-white">Working partner</MobileNavItem>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

function NavItem({
  href,
  className = "",
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`block py-2 text-base font-medium hover:text-gray-900 hover:bg-gray-50 ${className}`}
    >
      {children}
    </Link>
  );
}

function NavItemWithDropdown({ trigger, children }: { trigger: string; children: React.ReactNode }) {
  return (
    <NavigationMenuItem>
      {/* Set text to white initially */}
      <NavigationMenuTrigger className="text-white">
        {trigger}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        {children}
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}


function DropdownContent({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
      {children}
    </ul>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

function MobileNavItem({
  href,
  className = "",
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`block py-2 text-base font-medium hover:text-yellow-400 ${className}`}
    >
      {children}
    </Link>
  );
}

function MobileNavItemWithDropdown({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <button
        className="flex justify-between items-center w-full py-2 text-base font-medium text-white hover:text-yellow-400" // White text initially, yellow on hover
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <svg
          className={`h-5 w-5 transform ${isOpen ? 'rotate-180' : ''} text-white hover:text-yellow-400`} // White icon initially, yellow on hover
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && <div className="ml-4">{children}</div>}
    </div>
  );
}


function MobileDropdownItem({
  href,
  className = "",
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`block py-2 text-sm font-medium hover:text-yellow-400 ${className}`}
    >
      {children}
    </Link>
  );
}

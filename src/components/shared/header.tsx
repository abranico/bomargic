"use client";

import { Search, Map, LayoutGrid, LogOut, User, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { UserButton, UserProfile } from "@clerk/nextjs";

interface Props {
  currentView: "classic" | "map";
  onViewChange: (view: "classic" | "map") => void;
  onOpenSettings: () => void;
}

export default function Header({
  currentView,
  onViewChange,
  onOpenSettings,
}: Props) {
  return (
    <header className="fixed w-full border-b border-border h-16 px-4 flex items-center gap-4 bg-background text-white z-10">
      {/* {isMobile && <SidebarTrigger className="mr-2" />} */}

      <Link href="/" className="flex items-center gap-2 mr-4">
        <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-semibold">B</span>
        </div>
        {/* {!isMobile && <span className="font-medium">Bookmarks</span>} */}
        <span className="font-medium">Bookmarks</span>
      </Link>

      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar bookmarks..." className="pl-9 h-9 w-full" />
      </div>

      <div className="flex items-center gap-1 ml-auto">
        <Button
          variant={currentView === "classic" ? "default" : "ghost"}
          size="icon"
          onClick={() => onViewChange("classic")}
          className="h-9 w-9"
        >
          <LayoutGrid className="h-4 w-4" />
        </Button>
        <Button
          variant={currentView === "map" ? "default" : "ghost"}
          size="icon"
          onClick={() => onViewChange("map")}
          className="h-9 w-9"
        >
          <Map className="h-4 w-4" />
        </Button>
      </div>

      <UserButton />
    </header>
  );
}

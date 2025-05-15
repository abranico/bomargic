"use client";

import FolderTree from "@/components/home/folder-tree";
import ResourceList from "@/components/home/resource-list";
import Header from "@/components/shared/header";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useState } from "react";

export default function Home() {
  const [currentView, setCurrentView] = useState<"classic" | "map">("classic");
  const [currentPage, setCurrentPage] = useState<"main" | "settings">("main");
  const [currentFolder, setCurrentFolder] = useState({
    id: "2",
    name: "React",
    path: ["Inicio", "Libros", "React"],
  });

  const handleOpenSettings = () => {
    setCurrentPage("settings");
  };

  return (
    <div className="min-h-screen flex flex-col ">
      <Header
        currentView={currentView}
        onOpenSettings={handleOpenSettings}
        onViewChange={setCurrentView}
      />

      <SidebarProvider className="mt-16">
        <div className="flex flex-1 overflow-hidden ">
          {currentView === "classic" && (
            <Sidebar className="pt-0  mt-16">
              <SidebarContent className="">
                <FolderTree
                  currentFolder={currentFolder.id}
                  onSelectFolder={setCurrentFolder}
                />
              </SidebarContent>
            </Sidebar>
          )}
          <main className="flex-1 overflow-hidden ">
            <ResourceList
              currentFolder={currentFolder}
              currentView={currentView}
            />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}

"use client";

import * as React from "react";
import {
  ChevronRight,
  Folder,
  FolderPlus,
  MoreHorizontal,
  Plus,
  Pencil,
  Trash2,
  GripVertical,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Tipo para las carpetas
interface FolderType {
  id: string;
  name: string;
  children: FolderType[];
  bookmarks?: number; // Número de bookmarks en la carpeta
}

// Datos iniciales de ejemplo para las carpetas
const initialFolders: FolderType[] = [
  {
    id: "1",
    name: "Libros",
    bookmarks: 0,
    children: [
      {
        id: "2",
        name: "React",
        bookmarks: 5,
        children: [],
      },
      {
        id: "3",
        name: "JavaScript",
        bookmarks: 3,
        children: [],
      },
    ],
  },
  {
    id: "4",
    name: "Artículos",
    bookmarks: 0,
    children: [
      {
        id: "5",
        name: "Tecnología",
        bookmarks: 2,
        children: [],
      },
    ],
  },
  {
    id: "6",
    name: "Recursos",
    bookmarks: 7,
    children: [],
  },
];

interface FolderTreeProps {
  currentFolder: string;
  onSelectFolder: (folder: {
    id: string;
    name: string;
    path: string[];
  }) => void;
}

export default function FolderTree({
  currentFolder,
  onSelectFolder,
}: FolderTreeProps) {
  const [folders, setFolders] = React.useState<FolderType[]>(initialFolders);
  const [draggingId, setDraggingId] = React.useState<string | null>(null);
  const [dragOverId, setDragOverId] = React.useState<string | null>(null);
  const [isNewBookmarkDialogOpen, setIsNewBookmarkDialogOpen] =
    React.useState(false);
  const [parentFolderId, setParentFolderId] = React.useState<string | null>(
    null
  );
  const [newBookmarkUrl, setNewBookmarkUrl] = React.useState("");
  const [newBookmarkName, setNewBookmarkName] = React.useState("");
  const [editingFolderId, setEditingFolderId] = React.useState<string | null>(
    null
  );
  const [editingFolderName, setEditingFolderName] = React.useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [folderToDelete, setFolderToDelete] = React.useState<FolderType | null>(
    null
  );

  // Función para encontrar una carpeta por ID
  const findFolder = (folders: FolderType[], id: string): FolderType | null => {
    for (const folder of folders) {
      if (folder.id === id) {
        return folder;
      }
      if (folder.children.length > 0) {
        const found = findFolder(folder.children, id);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  // Función para encontrar el padre de una carpeta
  const findParentFolder = (
    folders: FolderType[],
    id: string
  ): { parent: FolderType | null; index: number } => {
    for (const folder of folders) {
      const childIndex = folder.children.findIndex((child) => child.id === id);
      if (childIndex !== -1) {
        return { parent: folder, index: childIndex };
      }
      if (folder.children.length > 0) {
        const result = findParentFolder(folder.children, id);
        if (result.parent) {
          return result;
        }
      }
    }
    return { parent: null, index: -1 };
  };

  // Función para obtener la ruta de una carpeta
  const getFolderPath = (
    folders: FolderType[],
    id: string,
    currentPath: string[] = ["Inicio"]
  ): string[] | null => {
    for (const folder of folders) {
      if (folder.id === id) {
        return [...currentPath, folder.name];
      }
      if (folder.children.length > 0) {
        const path = getFolderPath(folder.children, id, [
          ...currentPath,
          folder.name,
        ]);
        if (path) {
          return path;
        }
      }
    }
    return null;
  };

  // Función para clonar el árbol de carpetas
  const cloneFolders = (folders: FolderType[]): FolderType[] => {
    return folders.map((folder) => ({
      ...folder,
      children: cloneFolders(folder.children),
    }));
  };

  // Función para manejar el inicio del arrastre
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.stopPropagation();
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
    setDraggingId(id);
  };

  // Función para manejar el arrastre sobre una carpeta
  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggingId !== id) {
      setDragOverId(id);
    }
  };

  // Función para manejar cuando se deja de arrastrar sobre una carpeta
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverId(null);
  };

  // Función para manejar la suelta de una carpeta
  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    e.stopPropagation();

    const draggedId = e.dataTransfer.getData("text/plain");

    if (draggedId === targetId) {
      setDraggingId(null);
      setDragOverId(null);
      return;
    }

    // Clonar el árbol de carpetas
    const newFolders = cloneFolders(folders);

    // Encontrar la carpeta arrastrada y su padre
    const draggedFolder = findFolder(newFolders, draggedId);
    const { parent: draggedParent, index: draggedIndex } = findParentFolder(
      newFolders,
      draggedId
    );

    // Encontrar la carpeta objetivo
    const targetFolder = findFolder(newFolders, targetId);

    if (!draggedFolder || !targetFolder) {
      setDraggingId(null);
      setDragOverId(null);
      return;
    }

    // Si la carpeta arrastrada tiene un padre, eliminarla de su ubicación actual
    if (draggedParent) {
      draggedParent.children.splice(draggedIndex, 1);
    } else {
      // Si no tiene padre, está en el nivel superior
      const index = newFolders.findIndex((f) => f.id === draggedId);
      if (index !== -1) {
        newFolders.splice(index, 1);
      }
    }

    // Añadir la carpeta arrastrada a la carpeta objetivo
    targetFolder.children.push(draggedFolder);

    // Actualizar el estado
    setFolders(newFolders);
    setDraggingId(null);
    setDragOverId(null);

    toast("Carpeta movida", {
      description: `"${draggedFolder.name}" se ha movido a "${targetFolder.name}"`,
    });
  };

  // Función para manejar el fin del arrastre
  const handleDragEnd = () => {
    setDraggingId(null);
    setDragOverId(null);
  };

  // Función para iniciar la edición en línea
  const handleRenameClick = (folder: FolderType) => {
    setEditingFolderId(folder.id);
    setEditingFolderName(folder.name);
  };

  // Función para guardar el nombre editado
  const handleSaveRename = (id: string) => {
    if (!editingFolderName.trim()) {
      // Si es una nueva carpeta y no tiene nombre, eliminarla
      if (id.startsWith("new-folder-")) {
        const newFolders = cloneFolders(folders);
        const { parent, index } = findParentFolder(newFolders, id);

        if (parent) {
          parent.children.splice(index, 1);
          setFolders(newFolders);
        } else {
          const index = newFolders.findIndex((f) => f.id === id);
          if (index !== -1) {
            newFolders.splice(index, 1);
            setFolders(newFolders);
          }
        }
      }
      setEditingFolderId(null);
      setEditingFolderName("");
      return;
    }

    const newFolders = cloneFolders(folders);
    const folder = findFolder(newFolders, id);

    if (folder) {
      folder.name = editingFolderName.trim();
      setFolders(newFolders);

      // Si la carpeta actual es la que se está renombrando, actualizar la selección
      if (currentFolder === id) {
        const path = getFolderPath(newFolders, id);
        if (path) {
          onSelectFolder({ id: id, name: editingFolderName.trim(), path });
        }
      }

      // Solo mostrar toast si no es una nueva carpeta
      if (!id.startsWith("new-folder-")) {
        toast("Carpeta renombrada", {
          description: `La carpeta ha sido renombrada a "${editingFolderName.trim()}"`,
        });
      }
    }

    setEditingFolderId(null);
    setEditingFolderName("");
  };

  // Función para cancelar la edición
  const handleCancelRename = () => {
    // Si es una nueva carpeta y se cancela la edición, eliminarla
    if (editingFolderId && editingFolderId.startsWith("new-folder-")) {
      const newFolders = cloneFolders(folders);
      const { parent, index } = findParentFolder(newFolders, editingFolderId);

      if (parent) {
        parent.children.splice(index, 1);
        setFolders(newFolders);
      } else {
        const index = newFolders.findIndex((f) => f.id === editingFolderId);
        if (index !== -1) {
          newFolders.splice(index, 1);
          setFolders(newFolders);
        }
      }
    }

    setEditingFolderId(null);
    setEditingFolderName("");
  };

  // Función para manejar teclas durante la edición
  const handleRenameKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveRename(id);
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCancelRename();
    }
  };

  // Función para verificar si se puede eliminar una carpeta
  const handleDeleteClick = (folder: FolderType) => {
    // Verificar si la carpeta tiene bookmarks
    if (folder.bookmarks && folder.bookmarks > 0) {
      setFolderToDelete(folder);
      setIsDeleteDialogOpen(true);
      return;
    }

    // Si no tiene bookmarks, eliminar directamente
    handleDelete(folder.id);
  };

  // Función para eliminar una carpeta
  const handleDelete = (id: string) => {
    const folder = findFolder(folders, id);

    if (folder && folder.bookmarks && folder.bookmarks > 0) {
      toast("No se puede eliminar", {
        description:
          "La carpeta contiene bookmarks. Elimina o mueve los bookmarks primero.",
      });
      return;
    }

    const newFolders = cloneFolders(folders);
    const { parent, index } = findParentFolder(newFolders, id);

    if (parent) {
      // Si tiene padre, eliminarla de sus hijos
      parent.children.splice(index, 1);
    } else {
      // Si no tiene padre, está en el nivel superior
      const index = newFolders.findIndex((f) => f.id === id);
      if (index !== -1) {
        newFolders.splice(index, 1);
      }
    }

    setFolders(newFolders);

    // Si la carpeta eliminada era la seleccionada, seleccionar la carpeta "Inicio"
    if (currentFolder === id) {
      onSelectFolder({ id: "home", name: "Inicio", path: ["Inicio"] });
    }

    toast("Carpeta eliminada", {
      description: "La carpeta ha sido eliminada correctamente",
    });

    setIsDeleteDialogOpen(false);
    setFolderToDelete(null);
  };

  // Función para crear una nueva subcarpeta directamente
  const handleNewFolderClick = (parentId: string | null = null) => {
    const newFolders = cloneFolders(folders);
    const newFolderId = `new-folder-${Date.now()}`;

    const newFolder: FolderType = {
      id: newFolderId,
      name: "",
      bookmarks: 0,
      children: [],
    };

    if (parentId) {
      // Añadir como subcarpeta
      const parentFolder = findFolder(newFolders, parentId);
      if (parentFolder) {
        parentFolder.children.push(newFolder);
      }
    } else {
      // Añadir al nivel superior
      newFolders.push(newFolder);
    }

    setFolders(newFolders);

    // Iniciar edición inmediatamente
    setEditingFolderId(newFolderId);
    setEditingFolderName("");
  };

  // Función para abrir el diálogo de nuevo bookmark
  const handleNewBookmarkClick = (folderId: string) => {
    setParentFolderId(folderId);
    setNewBookmarkUrl("");
    setNewBookmarkName("");
    setIsNewBookmarkDialogOpen(true);
  };

  // Función para crear un nuevo bookmark
  const handleCreateBookmark = () => {
    if (!newBookmarkUrl.trim() || !parentFolderId) return;

    // Aquí normalmente se añadiría el bookmark a la base de datos
    // Para este ejemplo, incrementamos el contador de bookmarks en la carpeta
    const newFolders = cloneFolders(folders);
    const folder = findFolder(newFolders, parentFolderId);

    if (folder) {
      folder.bookmarks = (folder.bookmarks || 0) + 1;
      setFolders(newFolders);
    }
    toast("Bookmark creado", {
      description: `El bookmark "${
        newBookmarkName || newBookmarkUrl
      }" ha sido añadido correctamente`,
    });

    setIsNewBookmarkDialogOpen(false);
    setNewBookmarkUrl("");
    setNewBookmarkName("");
    setParentFolderId(null);
  };

  // Función recursiva para renderizar las carpetas
  const renderFolder = (folder: FolderType, path: string[] = ["Inicio"]) => {
    const isActive = folder.id === currentFolder;
    const hasChildren = folder.children && folder.children.length > 0;
    const currentPath = [...path, folder.name];
    const isDragging = draggingId === folder.id;
    const isDragOver = dragOverId === folder.id;
    const isEditing = editingFolderId === folder.id;

    return (
      <div
        key={folder.id}
        draggable={!isEditing}
        onDragStart={(e) => handleDragStart(e, folder.id)}
        onDragOver={(e) => handleDragOver(e, folder.id)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, folder.id)}
        onDragEnd={handleDragEnd}
        className={`relative ${isDragging ? "opacity-50" : ""} ${
          isDragOver ? "bg-primary/10 rounded-md" : ""
        }`}
      >
        {!hasChildren ? (
          <SidebarMenuItem>
            <div className="flex items-center w-full">
              <div className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground mr-1">
                <GripVertical className="h-4 w-4" />
              </div>
              <SidebarMenuButton
                isActive={isActive}
                onClick={() =>
                  !isEditing &&
                  onSelectFolder({
                    id: folder.id,
                    name: folder.name,
                    path: currentPath,
                  })
                }
                className="flex-1"
              >
                <Folder className="h-4 w-4 mr-2" />
                {isEditing ? (
                  <div
                    className="flex-1 flex items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Input
                      value={editingFolderName}
                      onChange={(e) => setEditingFolderName(e.target.value)}
                      onKeyDown={(e) => handleRenameKeyDown(e, folder.id)}
                      onBlur={() => handleSaveRename(folder.id)}
                      autoFocus
                      className="h-6 py-0 px-1 text-sm"
                      placeholder="Nombre de carpeta"
                    />
                  </div>
                ) : (
                  <span>{folder.name || "Nueva carpeta"}</span>
                )}
              </SidebarMenuButton>
              {!isEditing && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 absolute right-1 top-0"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleNewBookmarkClick(folder.id)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      <span>Nuevo bookmark</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleNewFolderClick(folder.id)}
                    >
                      <FolderPlus className="mr-2 h-4 w-4" />
                      <span>Nueva subcarpeta</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleRenameClick(folder)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      <span>Renombrar</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={
                        folder.bookmarks && folder.bookmarks > 0
                          ? "text-destructive/50"
                          : "text-destructive"
                      }
                      onClick={() => handleDeleteClick(folder)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Eliminar</span>
                      {folder.bookmarks && folder.bookmarks > 0 && (
                        <span className="ml-auto text-xs">
                          ({folder.bookmarks})
                        </span>
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </SidebarMenuItem>
        ) : (
          <Collapsible defaultOpen={isActive}>
            <SidebarMenuItem>
              <div className="flex items-center w-full">
                <div className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground mr-1">
                  <GripVertical className="h-4 w-4" />
                </div>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="flex-1">
                    <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    <Folder className="h-4 w-4 mr-2" />
                    {isEditing ? (
                      <div
                        className="flex-1 flex items-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Input
                          value={editingFolderName}
                          onChange={(e) => setEditingFolderName(e.target.value)}
                          onKeyDown={(e) => handleRenameKeyDown(e, folder.id)}
                          onBlur={() => handleSaveRename(folder.id)}
                          autoFocus
                          className="h-6 py-0 px-1 text-sm"
                          placeholder="Nombre de carpeta"
                        />
                      </div>
                    ) : (
                      <span>{folder.name || "Nueva carpeta"}</span>
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                {!isEditing && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 absolute right-1 top-0"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleNewBookmarkClick(folder.id)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        <span>Nuevo bookmark</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleNewFolderClick(folder.id)}
                      >
                        <FolderPlus className="mr-2 h-4 w-4" />
                        <span>Nueva subcarpeta</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleRenameClick(folder)}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        <span>Renombrar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className={
                          folder.bookmarks && folder.bookmarks > 0
                            ? "text-destructive/50"
                            : "text-destructive"
                        }
                        onClick={() => handleDeleteClick(folder)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Eliminar</span>
                        {folder.bookmarks && folder.bookmarks > 0 && (
                          <span className="ml-auto text-xs">
                            ({folder.bookmarks})
                          </span>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </SidebarMenuItem>
            <CollapsibleContent>
              <SidebarMenuSub>
                {folder.children.map((child) => (
                  <SidebarMenuSubItem key={child.id}>
                    {renderFolder(child, currentPath)}
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>
    );
  };

  return (
    <>
      <SidebarGroup>
        <div className="flex justify-between items-center ">
          <SidebarGroupLabel>Carpetas</SidebarGroupLabel>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5"
            onClick={() => handleNewFolderClick()}
          >
            <FolderPlus className="h-4 w-4" />
          </Button>
        </div>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={currentFolder === "home"}
                onClick={() =>
                  onSelectFolder({
                    id: "home",
                    name: "Inicio",
                    path: ["Inicio"],
                  })
                }
              >
                <Folder className="h-4 w-4 mr-2" />
                <span>Inicio</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {folders.map((folder) => renderFolder(folder))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Diálogo para nuevo bookmark */}
      <Dialog
        open={isNewBookmarkDialogOpen}
        onOpenChange={setIsNewBookmarkDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nuevo bookmark</DialogTitle>
            <DialogDescription>
              Añade un nuevo bookmark a la carpeta seleccionada.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="bookmark-url">URL</Label>
              <Input
                id="bookmark-url"
                value={newBookmarkUrl}
                onChange={(e) => setNewBookmarkUrl(e.target.value)}
                placeholder="https://ejemplo.com"
                type="url"
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bookmark-name">Nombre (opcional)</Label>
              <Input
                id="bookmark-name"
                value={newBookmarkName}
                onChange={(e) => setNewBookmarkName(e.target.value)}
                placeholder="Nombre del bookmark"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewBookmarkDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleCreateBookmark}>Añadir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para confirmar eliminación de carpeta con bookmarks */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-destructive">
              <AlertCircle className="h-5 w-5 mr-2" />
              No se puede eliminar la carpeta
            </DialogTitle>
            <DialogDescription>
              La carpeta "{folderToDelete?.name}" contiene{" "}
              {folderToDelete?.bookmarks} bookmarks. Debes eliminar o mover los
              bookmarks antes de poder eliminar la carpeta.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Entendido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

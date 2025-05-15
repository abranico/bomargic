"use client"

import * as React from "react"
import { ExternalLink, Folder, GripVertical, MoreHorizontal, Plus, Map } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useIsMobile } from "@/hooks/use-mobile"

// Datos de ejemplo para los recursos
const initialResources = [
  {
    id: "1",
    title: "React Documentation",
    url: "https://reactjs.org",
    favicon: "/placeholder.svg?height=16&width=16",
    folders: ["React", "Documentación", "Frontend"],
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: "2",
    title: "React Hooks API Reference",
    url: "https://reactjs.org/docs/hooks-reference.html",
    favicon: "/placeholder.svg?height=16&width=16",
    folders: ["React", "Hooks", "API"],
    coordinates: { lat: 34.0522, lng: -118.2437 },
  },
  {
    id: "3",
    title: "React Router Documentation",
    url: "https://reactrouter.com",
    favicon: "/placeholder.svg?height=16&width=16",
    folders: ["React", "Router", "Frontend"],
    coordinates: { lat: 51.5074, lng: -0.1278 },
  },
  {
    id: "4",
    title: "Redux Toolkit Documentation",
    url: "https://redux-toolkit.js.org",
    favicon: "/placeholder.svg?height=16&width=16",
    folders: ["React", "Redux", "Estado"],
    coordinates: { lat: 48.8566, lng: 2.3522 },
  },
  {
    id: "5",
    title: "React Query Documentation",
    url: "https://tanstack.com/query",
    favicon: "/placeholder.svg?height=16&width=16",
    folders: ["React", "Query", "Datos"],
    coordinates: { lat: 35.6762, lng: 139.6503 },
  },
]

interface ResourceListProps {
  currentFolder: {
    id: string
    name: string
    path: string[]
  }
  currentView: "classic" | "map"
}

export default function ResourceList({ currentFolder, currentView }: ResourceListProps) {
  const isMobile = useIsMobile()
  const [newUrl, setNewUrl] = React.useState("")
  const [resources, setResources] = React.useState(initialResources)
  const [draggingId, setDraggingId] = React.useState<string | null>(null)
  const [dragOverId, setDragOverId] = React.useState<string | null>(null)
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null)

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para agregar un nuevo recurso
    setNewUrl("")
  }

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id)
    e.dataTransfer.effectAllowed = "move"
    setDraggingId(id)
  }

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    if (draggingId !== id) {
      setDragOverId(id)
    }
  }

  const handleDragEnter = (e: React.DragEvent, id: string) => {
    e.preventDefault()
    if (draggingId !== id) {
      setDragOverId(id)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOverId(null)
  }

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    const draggedId = e.dataTransfer.getData("text/plain")

    if (draggedId === targetId) return

    const draggedIndex = resources.findIndex((item) => item.id === draggedId)
    const targetIndex = resources.findIndex((item) => item.id === targetId)

    if (draggedIndex === -1 || targetIndex === -1) return

    // Crear una copia del array de recursos
    const newResources = [...resources]

    // Eliminar el elemento arrastrado
    const [draggedItem] = newResources.splice(draggedIndex, 1)

    // Insertar el elemento en la nueva posición
    newResources.splice(targetIndex, 0, draggedItem)

    // Actualizar el estado
    setResources(newResources)
    setDraggingId(null)
    setDragOverId(null)
  }

  const handleDragEnd = () => {
    setDraggingId(null)
    setDragOverId(null)
  }

  if (currentView === "map") {
    return (
      <div className="flex flex-col h-full w-full">
        <div className="border-b p-4">
          <div className="flex items-center mb-4">
            <h1 className="text-2xl font-semibold">Vista de Mapa</h1>
          </div>
          <form onSubmit={handleAddResource} className="flex gap-2">
            <Input
              placeholder="Pegar URL para agregar nuevo bookmark"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <Plus className="h-4 w-4 mr-2" />
              Agregar
            </Button>
          </form>
        </div>
        <div className="flex-1 p-4 overflow-auto">
          <div className="bg-muted/30 rounded-lg h-full flex items-center justify-center">
            <div className="text-center p-8">
              <Map className="h-16 w-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-medium mb-2">Vista de Mapa Global</h3>
              <p className="text-muted-foreground max-w-md mb-4">
                Visualización geográfica de todos tus bookmarks basada en su contenido o metadatos.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 max-w-2xl mx-auto">
                {resources.map((resource) => (
                  <Card key={resource.id} className="overflow-hidden p-2 flex flex-col items-center">
                    <img src={resource.favicon || "/placeholder.svg"} alt="" className="h-6 w-6 mb-1" />
                    <p className="text-xs text-center truncate w-full">{resource.title}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="border-b p-4">
        <div className="flex items-center mb-4">
          <h1 className="text-2xl font-semibold">{currentFolder.name}</h1>
          <span className="ml-2 text-muted-foreground">({resources.length})</span>
        </div>

        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            {currentFolder.path.map((item, index) => {
              const isLast = index === currentFolder.path.length - 1
              return (
                <React.Fragment key={index}>
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{item}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href="#">{item}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>

        <form onSubmit={handleAddResource} className="flex gap-2">
          <Input
            placeholder="Pegar URL para agregar nuevo bookmark"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">
            <Plus className="h-4 w-4 mr-2" />
            Agregar
          </Button>
        </form>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        <div className="flex flex-col gap-3 w-full">
          {resources.map((resource) => (
            <Card
              key={resource.id}
              className={`overflow-hidden transition-all w-full ${
                draggingId === resource.id
                  ? "border-primary shadow-md opacity-70"
                  : dragOverId === resource.id
                    ? "border-primary/50 shadow-sm -translate-y-1"
                    : ""
              }`}
              draggable
              onDragStart={(e) => handleDragStart(e, resource.id)}
              onDragOver={(e) => handleDragOver(e, resource.id)}
              onDragEnter={(e) => handleDragEnter(e, resource.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, resource.id)}
              onDragEnd={handleDragEnd}
            >
              <CardHeader className="p-3">
                <div className="flex items-start gap-3 w-full">
                  <div
                    className="cursor-grab active:cursor-grabbing mt-1 text-muted-foreground hover:text-foreground transition-colors"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <GripVertical className="h-5 w-5" />
                  </div>

                  <img src={resource.favicon || "/placeholder.svg"} alt="" className="h-5 w-5 mt-0.5" />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base mb-1">{resource.title}</CardTitle>
                        <CardDescription className="text-xs mb-2">{resource.url}</CardDescription>
                      </div>

                      <div className="flex items-center gap-2 ml-2 shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 rounded-full"
                          onClick={() => window.open(resource.url, "_blank")}
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">Abrir enlace</span>
                        </Button>

                        <DropdownMenu
                          open={openMenuId === resource.id}
                          onOpenChange={(open) => {
                            setOpenMenuId(open ? resource.id : null)
                          }}
                        >
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Más opciones</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem>
                              <span>Editar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <span>Quitar de carpeta</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <span>Clonar a otra carpeta</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <span>Eliminar de todas las carpetas</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-1">
                      <span className="text-xs text-muted-foreground mr-1 flex items-center">
                        <Folder className="h-3 w-3 mr-1" />
                      </span>
                      {resource.folders.map((folder) => (
                        <Badge
                          key={folder}
                          variant="outline"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-xs py-0"
                        >
                          {folder}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}

          {/* Zona de soltar para el último elemento */}
          {draggingId && (
            <div
              className="h-16 border-2 border-dashed border-primary/30 rounded-md mt-1 transition-all"
              onDragOver={(e) => {
                e.preventDefault()
                e.dataTransfer.dropEffect = "move"
              }}
              onDrop={(e) => {
                e.preventDefault()
                const draggedId = e.dataTransfer.getData("text/plain")

                // Mover el elemento al final de la lista
                const newResources = [...resources]
                const draggedIndex = newResources.findIndex((item) => item.id === draggedId)

                if (draggedIndex !== -1) {
                  const [draggedItem] = newResources.splice(draggedIndex, 1)
                  newResources.push(draggedItem)
                  setResources(newResources)
                }

                setDraggingId(null)
                setDragOverId(null)
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

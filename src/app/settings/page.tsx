import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

import {
  ArrowLeft,
  Check,
  Cloud,
  Download,
  Globe,
  HardDrive,
  Import,
  Key,
  Lock,
  LogOut,
  Moon,
  Palette,
  Save,
  Settings,
  Sun,
  Upload,
  User,
  Users,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <section className="flex flex-col h-full w-full">
      <header className="border-b p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold">Configuración</h1>
        </div>
        <p className="text-muted-foreground">
          Personaliza tu experiencia y gestiona tus preferencias.
        </p>
      </header>

      <div className="flex-1 p-4 overflow-auto">
        <Tabs defaultValue="general" className="w-full">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-64 shrink-0">
              <TabsList className="flex flex-col h-auto bg-transparent p-0 w-full">
                <TabsTrigger
                  value="general"
                  className="justify-start w-full mb-1 data-[state=active]:bg-muted cursor-pointer hover:bg-muted"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  General
                </TabsTrigger>
                <TabsTrigger
                  value="appearance"
                  className="justify-start w-full mb-1 data-[state=active]:bg-muted cursor-pointer hover:bg-muted"
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Apariencia
                </TabsTrigger>
                <TabsTrigger
                  value="account"
                  className="justify-start w-full mb-1 data-[state=active]:bg-muted cursor-pointer hover:bg-muted"
                >
                  <User className="h-4 w-4 mr-2" />
                  Cuenta
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="justify-start w-full mb-1 data-[state=active]:bg-muted cursor-pointer hover:bg-muted"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Seguridad
                </TabsTrigger>
                <TabsTrigger
                  value="sync"
                  className="justify-start w-full mb-1 data-[state=active]:bg-muted cursor-pointer hover:bg-muted"
                >
                  <Cloud className="h-4 w-4 mr-2" />
                  Sincronización
                </TabsTrigger>
                <TabsTrigger
                  value="sharing"
                  className="justify-start w-full mb-1 data-[state=active]:bg-muted cursor-pointer hover:bg-muted"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Compartir
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1">
              <TabsContent value="general" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuración General</CardTitle>
                    <CardDescription>
                      Configura las opciones básicas de la aplicación.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="language">Idioma</Label>
                        <Select defaultValue="es">
                          <SelectTrigger id="language">
                            <SelectValue placeholder="Seleccionar idioma" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="de">Deutsch</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="default-view">
                          Vista predeterminada
                        </Label>
                        <Select defaultValue="classic">
                          <SelectTrigger id="default-view">
                            <SelectValue placeholder="Seleccionar vista" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="classic">Clásica</SelectItem>
                            <SelectItem value="map">Mapa</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="auto-save">Guardado automático</Label>
                          <div className="text-sm text-muted-foreground">
                            Guardar automáticamente los cambios en los bookmarks
                          </div>
                        </div>
                        <Switch id="auto-save" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="auto-fetch">
                            Obtener metadatos automáticamente
                          </Label>
                          <div className="text-sm text-muted-foreground">
                            Extraer automáticamente título, descripción e imagen
                            al añadir URLs
                          </div>
                        </div>
                        <Switch id="auto-fetch" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Apariencia</CardTitle>
                    <CardDescription>
                      Personaliza la apariencia visual de la aplicación.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label>Tema</Label>
                        <div className="grid grid-cols-3 gap-2 pt-2">
                          <Button variant="outline" className="justify-start">
                            <Sun className="h-4 w-4 mr-2" />
                            Claro
                          </Button>
                          <Button variant="default" className="justify-start">
                            <Moon className="h-4 w-4 mr-2" />
                            Oscuro
                          </Button>
                          <Button variant="outline" className="justify-start">
                            <Globe className="h-4 w-4 mr-2" />
                            Sistema
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="card-size">Tamaño de tarjetas</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger id="card-size">
                            <SelectValue placeholder="Seleccionar tamaño" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Pequeño</SelectItem>
                            <SelectItem value="medium">Mediano</SelectItem>
                            <SelectItem value="large">Grande</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="default-sort">
                          Ordenación predeterminada
                        </Label>
                        <Select defaultValue="date-desc">
                          <SelectTrigger id="default-sort">
                            <SelectValue placeholder="Seleccionar ordenación" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="date-desc">
                              Más recientes primero
                            </SelectItem>
                            <SelectItem value="date-asc">
                              Más antiguos primero
                            </SelectItem>
                            <SelectItem value="alpha-asc">
                              Alfabético (A-Z)
                            </SelectItem>
                            <SelectItem value="alpha-desc">
                              Alfabético (Z-A)
                            </SelectItem>
                            <SelectItem value="custom">
                              Personalizado
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="show-favicons">
                            Mostrar favicons
                          </Label>
                          <div className="text-sm text-muted-foreground">
                            Mostrar iconos de sitios web junto a los bookmarks
                          </div>
                        </div>
                        <Switch id="show-favicons" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="compact-view">Vista compacta</Label>
                          <div className="text-sm text-muted-foreground">
                            Reducir el espacio entre elementos para mostrar más
                            contenido
                          </div>
                        </div>
                        <Switch id="compact-view" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="account" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Información de Cuenta</CardTitle>
                    <CardDescription>
                      Actualiza tu información personal y preferencias de
                      cuenta.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">Nombre</Label>
                          <Input id="first-name" defaultValue="Juan" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Apellido</Label>
                          <Input id="last-name" defaultValue="Pérez" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue="juan.perez@ejemplo.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Biografía</Label>
                        <Textarea
                          id="bio"
                          placeholder="Cuéntanos sobre ti..."
                          className="min-h-[100px]"
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="marketing">
                            Recibir actualizaciones
                          </Label>
                          <div className="text-sm text-muted-foreground">
                            Recibir noticias y actualizaciones sobre la
                            aplicación
                          </div>
                        </div>
                        <Switch id="marketing" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" className="text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      Cerrar sesión
                    </Button>
                    <Button>
                      {false ? (
                        <>Guardando...</>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Guardar cambios
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Seguridad</CardTitle>
                    <CardDescription>
                      Gestiona la seguridad de tu cuenta y tus datos.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">
                          Contraseña actual
                        </Label>
                        <Input id="current-password" type="password" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="new-password">Nueva contraseña</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">
                            Confirmar contraseña
                          </Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="two-factor">
                            Autenticación de dos factores
                          </Label>
                          <div className="text-sm text-muted-foreground">
                            Añade una capa adicional de seguridad a tu cuenta
                          </div>
                        </div>
                        <Switch id="two-factor" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="session-timeout">
                            Cierre de sesión automático
                          </Label>
                          <div className="text-sm text-muted-foreground">
                            Cerrar sesión automáticamente después de un período
                            de inactividad
                          </div>
                        </div>
                        <Switch id="session-timeout" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="ml-auto">
                      {false ? (
                        <>Guardando...</>
                      ) : (
                        <>
                          <Key className="h-4 w-4 mr-2" />
                          Actualizar seguridad
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="sync" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Sincronización y Respaldo</CardTitle>
                    <CardDescription>
                      Gestiona la sincronización de tus bookmarks y opciones de
                      respaldo.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="auto-sync">
                            Sincronización automática
                          </Label>
                          <div className="text-sm text-muted-foreground">
                            Sincronizar automáticamente tus bookmarks entre
                            dispositivos
                          </div>
                        </div>
                        <Switch id="auto-sync" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="backup">Respaldo automático</Label>
                          <div className="text-sm text-muted-foreground">
                            Crear respaldos automáticos de tus bookmarks
                          </div>
                        </div>
                        <Switch id="backup" defaultChecked />
                      </div>

                      <div>
                        <Label htmlFor="backup-frequency">
                          Frecuencia de respaldo
                        </Label>
                        <Select defaultValue="weekly">
                          <SelectTrigger id="backup-frequency">
                            <SelectValue placeholder="Seleccionar frecuencia" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Diario</SelectItem>
                            <SelectItem value="weekly">Semanal</SelectItem>
                            <SelectItem value="monthly">Mensual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label>Importar/Exportar</Label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            variant="outline"
                            className="w-full sm:w-auto"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Exportar bookmarks
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full sm:w-auto"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Importar bookmarks
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Servicios de terceros</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <Button variant="outline" className="justify-start">
                            <HardDrive className="h-4 w-4 mr-2" />
                            Google Drive
                          </Button>
                          <Button variant="outline" className="justify-start">
                            <HardDrive className="h-4 w-4 mr-2" />
                            Dropbox
                          </Button>
                          <Button variant="outline" className="justify-start">
                            <Import className="h-4 w-4 mr-2" />
                            Importar de Chrome
                          </Button>
                          <Button variant="outline" className="justify-start">
                            <Import className="h-4 w-4 mr-2" />
                            Importar de Firefox
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sharing" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Compartir y Colaboración</CardTitle>
                    <CardDescription>
                      Configura cómo compartir tus bookmarks y colaborar con
                      otros.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="public-profile">Perfil público</Label>
                          <div className="text-sm text-muted-foreground">
                            Permitir que otros usuarios vean tu perfil
                          </div>
                        </div>
                        <Switch id="public-profile" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="public-collections">
                            Colecciones públicas
                          </Label>
                          <div className="text-sm text-muted-foreground">
                            Permitir que otros usuarios vean tus colecciones
                            públicas
                          </div>
                        </div>
                        <Switch id="public-collections" defaultChecked />
                      </div>

                      <div>
                        <Label htmlFor="default-sharing">
                          Permisos predeterminados
                        </Label>
                        <Select defaultValue="private">
                          <SelectTrigger id="default-sharing">
                            <SelectValue placeholder="Seleccionar permisos" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="private">Privado</SelectItem>
                            <SelectItem value="public">Público</SelectItem>
                            <SelectItem value="shared">
                              Compartido con específicos
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Colaboradores</Label>
                          <Button variant="outline" size="sm">
                            <Users className="h-4 w-4 mr-2" />
                            Añadir
                          </Button>
                        </div>
                        <Card className="border border-muted">
                          <CardContent className="p-3">
                            <div className="text-sm text-muted-foreground text-center py-6">
                              No tienes colaboradores actualmente
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="space-y-2">
                        <Label>Integración con redes sociales</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <Button variant="outline" className="justify-start">
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            Twitter conectado
                          </Button>
                          <Button variant="outline" className="justify-start">
                            Conectar con Facebook
                          </Button>
                          <Button variant="outline" className="justify-start">
                            Conectar con LinkedIn
                          </Button>
                          <Button variant="outline" className="justify-start">
                            Conectar con Mastodon
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
}

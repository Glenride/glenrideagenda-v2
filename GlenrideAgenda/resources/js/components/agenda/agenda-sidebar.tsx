import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { cn } from '@/lib/utils';
import { Category, FilterType, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { CalendarDays, ChevronRight, FolderOpen, MoreHorizontal, Pencil, Plus, Star, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AgendaSidebarProps {
    categories: Category[];
    selectedProjectId: number | null;
    activeFilter: FilterType;
    onSelectProject: (projectId: number | null, filter: FilterType) => void;
    onCreateCategory: (name: string) => Promise<void>;
    onUpdateCategory: (categoryId: number, name: string) => Promise<void>;
    onDeleteCategory: (categoryId: number) => Promise<void>;
    onCreateProject: (categoryId: number, name: string) => Promise<void>;
    onUpdateProject: (projectId: number, name: string) => Promise<void>;
    onDeleteProject: (projectId: number) => Promise<void>;
}

type DialogMode = 'create-category' | 'edit-category' | 'create-project' | 'edit-project' | null;

export function AgendaSidebar({
    categories,
    selectedProjectId,
    activeFilter,
    onSelectProject,
    onCreateCategory,
    onUpdateCategory,
    onDeleteCategory,
    onCreateProject,
    onUpdateProject,
    onDeleteProject,
}: AgendaSidebarProps) {
    const [openCategories, setOpenCategories] = useState<Record<number, boolean>>({});
    const [dialogMode, setDialogMode] = useState<DialogMode>(null);
    const [dialogName, setDialogName] = useState('');
    const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
    const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
    const [targetCategoryId, setTargetCategoryId] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize open categories when categories change
    useEffect(() => {
        setOpenCategories((prev) => {
            const next = { ...prev };
            categories.forEach((cat) => {
                if (next[cat.id] === undefined) {
                    next[cat.id] = true;
                }
            });
            return next;
        });
    }, [categories]);

    const toggleCategory = (categoryId: number) => {
        setOpenCategories((prev) => ({
            ...prev,
            [categoryId]: !prev[categoryId],
        }));
    };

    const openCreateCategoryDialog = () => {
        setDialogMode('create-category');
        setDialogName('');
    };

    const openEditCategoryDialog = (category: Category) => {
        setDialogMode('edit-category');
        setDialogName(category.name);
        setEditingCategoryId(category.id);
    };

    const openCreateProjectDialog = (categoryId: number) => {
        setDialogMode('create-project');
        setDialogName('');
        setTargetCategoryId(categoryId);
    };

    const openEditProjectDialog = (project: { id: number; name: string }) => {
        setDialogMode('edit-project');
        setDialogName(project.name);
        setEditingProjectId(project.id);
    };

    const closeDialog = () => {
        setDialogMode(null);
        setDialogName('');
        setEditingCategoryId(null);
        setEditingProjectId(null);
        setTargetCategoryId(null);
    };

    const handleSubmit = async () => {
        if (!dialogName.trim()) return;

        setIsSubmitting(true);
        try {
            switch (dialogMode) {
                case 'create-category':
                    await onCreateCategory(dialogName.trim());
                    break;
                case 'edit-category':
                    if (editingCategoryId) {
                        await onUpdateCategory(editingCategoryId, dialogName.trim());
                    }
                    break;
                case 'create-project':
                    if (targetCategoryId) {
                        await onCreateProject(targetCategoryId, dialogName.trim());
                    }
                    break;
                case 'edit-project':
                    if (editingProjectId) {
                        await onUpdateProject(editingProjectId, dialogName.trim());
                    }
                    break;
            }
            closeDialog();
        } catch (error) {
            console.error('Failed to submit:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteCategory = async (categoryId: number) => {
        if (confirm('Are you sure you want to delete this category? All projects and notes within will be deleted.')) {
            await onDeleteCategory(categoryId);
        }
    };

    const handleDeleteProject = async (projectId: number) => {
        if (confirm('Are you sure you want to delete this project? All notes within will be deleted.')) {
            await onDeleteProject(projectId);
        }
    };

    const getDialogTitle = () => {
        switch (dialogMode) {
            case 'create-category':
                return 'New Category';
            case 'edit-category':
                return 'Edit Category';
            case 'create-project':
                return 'New Project';
            case 'edit-project':
                return 'Edit Project';
            default:
                return '';
        }
    };

    const getDialogDescription = () => {
        switch (dialogMode) {
            case 'create-category':
                return 'Create a new category to organize your projects.';
            case 'edit-category':
                return 'Update the category name.';
            case 'create-project':
                return 'Create a new project within this category.';
            case 'edit-project':
                return 'Update the project name.';
            default:
                return '';
        }
    };

    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <div className="flex h-screen w-64 flex-col border-r bg-muted/30">
                {/* App Header */}
                <div className="flex h-14 items-center border-b px-4">
                    <h1 className="text-lg font-semibold">Agenda</h1>
                </div>

                {/* Overview Section */}
                <div className="border-b p-3">
                    <h3 className="text-muted-foreground mb-2 px-2 text-xs font-semibold uppercase tracking-wider">
                        Overview
                    </h3>
                    <div className="space-y-1">
                        <Button
                            variant={activeFilter === 'on_agenda' ? 'secondary' : 'ghost'}
                            className="w-full justify-start"
                            onClick={() => onSelectProject(null, 'on_agenda')}
                        >
                            <Star className="mr-2 h-4 w-4 text-amber-500" />
                            On the Agenda
                        </Button>
                        <Button
                            variant={activeFilter === 'today' ? 'secondary' : 'ghost'}
                            className="w-full justify-start"
                            onClick={() => onSelectProject(null, 'today')}
                        >
                            <CalendarDays className="mr-2 h-4 w-4 text-blue-500" />
                            Today
                        </Button>
                    </div>
                </div>

                {/* Projects Section */}
                <div className="flex-1 overflow-y-auto p-3">
                    <div className="mb-2 flex items-center justify-between px-2">
                        <h3 className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                            Projects
                        </h3>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={openCreateCategoryDialog}
                            title="Add Category"
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="space-y-1">
                        {categories.length === 0 ? (
                            <div className="text-muted-foreground px-2 py-4 text-center text-sm">
                                <p>No categories yet</p>
                                <Button variant="link" className="mt-1 h-auto p-0 text-sm" onClick={openCreateCategoryDialog}>
                                    Create your first category
                                </Button>
                            </div>
                        ) : (
                            categories.map((category) => (
                                <Collapsible
                                    key={category.id}
                                    open={openCategories[category.id]}
                                    onOpenChange={() => toggleCategory(category.id)}
                                >
                                    <div className="group flex items-center">
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" className="flex-1 justify-start px-2 font-medium">
                                                <ChevronRight
                                                    className={cn(
                                                        'mr-1 h-4 w-4 transition-transform',
                                                        openCategories[category.id] && 'rotate-90',
                                                    )}
                                                />
                                                {category.name}
                                            </Button>
                                        </CollapsibleTrigger>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 opacity-0 group-hover:opacity-100"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => openEditCategoryDialog(category)}>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-destructive"
                                                    onClick={() => handleDeleteCategory(category.id)}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <CollapsibleContent className="space-y-1 pl-4">
                                        {category.projects?.map((project) => (
                                            <div key={project.id} className="group/project flex items-center">
                                                <Button
                                                    variant={
                                                        selectedProjectId === project.id && activeFilter === 'project'
                                                            ? 'secondary'
                                                            : 'ghost'
                                                    }
                                                    className="flex-1 justify-start pl-4"
                                                    onClick={() => onSelectProject(project.id, 'project')}
                                                >
                                                    <FolderOpen className="mr-2 h-4 w-4" />
                                                    {project.name}
                                                </Button>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-6 w-6 opacity-0 group-hover/project:opacity-100"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => openEditProjectDialog(project)}>
                                                            <Pencil className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-destructive"
                                                            onClick={() => handleDeleteProject(project.id)}
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        ))}
                                        <Button
                                            variant="ghost"
                                            className="text-muted-foreground hover:text-foreground w-full justify-start pl-4"
                                            onClick={() => openCreateProjectDialog(category.id)}
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Project
                                        </Button>
                                    </CollapsibleContent>
                                </Collapsible>
                            ))
                        )}
                    </div>
                </div>

                {/* User Menu */}
                <div className="border-t p-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-full justify-start gap-2 px-2">
                                <UserInfo user={auth.user} compact />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="start" side="top">
                            <UserMenuContent user={auth.user} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Create/Edit Dialog */}
            <Dialog open={dialogMode !== null} onOpenChange={(open) => !open && closeDialog()}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{getDialogTitle()}</DialogTitle>
                        <DialogDescription>{getDialogDescription()}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={dialogName}
                                onChange={(e) => setDialogName(e.target.value)}
                                placeholder={dialogMode?.includes('category') ? 'Category name' : 'Project name'}
                                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                autoFocus
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={closeDialog}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} disabled={!dialogName.trim() || isSubmitting}>
                            {isSubmitting ? 'Saving...' : dialogMode?.startsWith('create') ? 'Create' : 'Save'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

import { AgendaSidebar } from '@/components/agenda/agenda-sidebar';
import { NoteEditor } from '@/components/agenda/note-editor';
import { NoteList } from '@/components/agenda/note-list';
import { Category, FilterType, Note, Project } from '@/types';
import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface AgendaProps {
    initialCategories: Category[];
    initialNotes: Note[];
}

export function Agenda({ initialCategories, initialNotes }: AgendaProps) {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [notes, setNotes] = useState<Note[]>(initialNotes);
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const [isLoading, setIsLoading] = useState(false);

    // Flatten projects from categories for easy access
    const allProjects = useMemo(() => {
        return categories.flatMap((cat) => cat.projects || []);
    }, [categories]);

    // Fetch notes based on current filter
    const fetchNotes = useCallback(async () => {
        setIsLoading(true);
        try {
            const params: Record<string, string | number | boolean> = {};

            if (activeFilter === 'project' && selectedProjectId) {
                params.project_id = selectedProjectId;
            } else if (activeFilter === 'on_agenda') {
                params.on_agenda = true;
            } else if (activeFilter === 'today') {
                params.today = true;
            }

            const response = await axios.get('/api/notes', { params });
            setNotes(response.data);
        } catch (error) {
            console.error('Failed to fetch notes:', error);
        } finally {
            setIsLoading(false);
        }
    }, [activeFilter, selectedProjectId]);

    // Fetch notes when filter changes
    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    // Refresh categories
    const refreshCategories = async () => {
        try {
            const response = await axios.get('/api/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    // Handle project/filter selection
    const handleSelectProject = (projectId: number | null, filter: FilterType) => {
        setSelectedProjectId(projectId);
        setActiveFilter(filter);
        setSelectedNoteId(null);
    };

    // Handle note selection
    const handleSelectNote = (noteId: number) => {
        setSelectedNoteId(noteId);
    };

    // Category CRUD
    const handleCreateCategory = async (name: string) => {
        try {
            const response = await axios.post('/api/categories', { name });
            setCategories([...categories, response.data]);
            return response.data;
        } catch (error) {
            console.error('Failed to create category:', error);
            throw error;
        }
    };

    const handleUpdateCategory = async (categoryId: number, name: string) => {
        try {
            const response = await axios.put(`/api/categories/${categoryId}`, { name });
            setCategories(categories.map((cat) => (cat.id === categoryId ? { ...cat, ...response.data } : cat)));
        } catch (error) {
            console.error('Failed to update category:', error);
            throw error;
        }
    };

    const handleDeleteCategory = async (categoryId: number) => {
        try {
            await axios.delete(`/api/categories/${categoryId}`);
            setCategories(categories.filter((cat) => cat.id !== categoryId));
            if (selectedProjectId && categories.find((c) => c.id === categoryId)?.projects?.some((p) => p.id === selectedProjectId)) {
                setSelectedProjectId(null);
                setActiveFilter('on_agenda');
            }
        } catch (error) {
            console.error('Failed to delete category:', error);
            throw error;
        }
    };

    // Project CRUD
    const handleCreateProject = async (categoryId: number, name: string) => {
        try {
            const response = await axios.post('/api/projects', { category_id: categoryId, name });
            await refreshCategories();
            return response.data;
        } catch (error) {
            console.error('Failed to create project:', error);
            throw error;
        }
    };

    const handleUpdateProject = async (projectId: number, name: string) => {
        try {
            const response = await axios.put(`/api/projects/${projectId}`, { name });
            await refreshCategories();
            return response.data;
        } catch (error) {
            console.error('Failed to update project:', error);
            throw error;
        }
    };

    const handleDeleteProject = async (projectId: number) => {
        try {
            await axios.delete(`/api/projects/${projectId}`);
            await refreshCategories();
            if (selectedProjectId === projectId) {
                setSelectedProjectId(null);
                setActiveFilter('on_agenda');
            }
        } catch (error) {
            console.error('Failed to delete project:', error);
            throw error;
        }
    };

    // Note CRUD
    const handleCreateNote = async () => {
        if (!selectedProjectId) return;

        try {
            const response = await axios.post('/api/notes', {
                project_id: selectedProjectId,
                title: 'Untitled Note',
                content: '',
            });
            setNotes([response.data, ...notes]);
            setSelectedNoteId(response.data.id);
        } catch (error) {
            console.error('Failed to create note:', error);
        }
    };

    const handleUpdateNote = async (noteId: number, updates: Partial<Note>) => {
        try {
            const response = await axios.put(`/api/notes/${noteId}`, updates);
            // Use functional update to avoid stale closure issues
            setNotes((prevNotes) => prevNotes.map((n) => (n.id === noteId ? response.data : n)));
        } catch (error) {
            console.error('Failed to update note:', error);
        }
    };

    const handleDeleteNote = async (noteId: number) => {
        try {
            await axios.delete(`/api/notes/${noteId}`);
            setNotes(notes.filter((n) => n.id !== noteId));
            if (selectedNoteId === noteId) {
                setSelectedNoteId(null);
            }
        } catch (error) {
            console.error('Failed to delete note:', error);
        }
    };

    const handleToggleAgenda = async (noteId: number) => {
        try {
            const response = await axios.post(`/api/notes/${noteId}/toggle-agenda`);
            setNotes(notes.map((n) => (n.id === noteId ? response.data : n)));
        } catch (error) {
            console.error('Failed to toggle agenda:', error);
        }
    };

    const selectedNote = useMemo(() => {
        return notes.find((n) => n.id === selectedNoteId) || null;
    }, [notes, selectedNoteId]);

    return (
        <div className="flex h-screen w-full bg-background">
            {/* Sidebar - Categories & Projects */}
            <AgendaSidebar
                categories={categories}
                selectedProjectId={selectedProjectId}
                activeFilter={activeFilter}
                onSelectProject={handleSelectProject}
                onCreateCategory={handleCreateCategory}
                onUpdateCategory={handleUpdateCategory}
                onDeleteCategory={handleDeleteCategory}
                onCreateProject={handleCreateProject}
                onUpdateProject={handleUpdateProject}
                onDeleteProject={handleDeleteProject}
            />

            {/* Note List */}
            <NoteList
                notes={notes}
                selectedNoteId={selectedNoteId}
                activeFilter={activeFilter}
                onSelectNote={handleSelectNote}
                onCreateNote={handleCreateNote}
            />

            {/* Note Editor */}
            <NoteEditor
                note={selectedNote}
                projects={allProjects}
                onUpdate={handleUpdateNote}
                onDelete={handleDeleteNote}
                onToggleAgenda={handleToggleAgenda}
            />
        </div>
    );
}


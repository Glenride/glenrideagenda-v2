import { TiptapEditor } from '@/components/agenda/tiptap-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Note, Project } from '@/types';
import { CalendarDays, Check, Loader2, Star, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface NoteEditorProps {
    note: Note | null;
    projects: Project[];
    onUpdate: (noteId: number, updates: Partial<Note>) => void;
    onDelete: (noteId: number) => void;
    onToggleAgenda: (noteId: number) => void;
}

export function NoteEditor({ note, projects, onUpdate, onDelete, onToggleAgenda }: NoteEditorProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [linkedDate, setLinkedDate] = useState<string>('');
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content || '');
            setLinkedDate(note.linked_date || '');
            setLastSaved(null);
        }
    }, [note?.id]);

    // Cleanup debounce timer on unmount
    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

    if (!note) {
        return (
            <div className="text-muted-foreground flex flex-1 items-center justify-center">
                <p>Select a note to view and edit</p>
            </div>
        );
    }

    const handleTitleBlur = () => {
        if (title !== note.title) {
            setIsSaving(true);
            onUpdate(note.id, { title });
            setTimeout(() => {
                setIsSaving(false);
                setLastSaved(new Date());
            }, 300);
        }
    };

    const handleContentChange = (newContent: string) => {
        setContent(newContent);

        // Clear existing timer
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        // Debounce save - wait 500ms after user stops typing
        debounceTimerRef.current = setTimeout(() => {
            setIsSaving(true);
            onUpdate(note.id, { content: newContent });
            setTimeout(() => {
                setIsSaving(false);
                setLastSaved(new Date());
            }, 300);
        }, 500);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        setLinkedDate(newDate);
        onUpdate(note.id, { linked_date: newDate || null });
    };

    const projectName = note.project?.name || projects.find((p) => p.id === note.project_id)?.name || 'Unknown Project';

    return (
        <div className="flex flex-1 flex-col overflow-hidden bg-background">
            {/* Toolbar */}
            <div className="flex items-center justify-between border-b px-4 py-2">
                <div className="flex items-center gap-3">
                    <span className="text-muted-foreground text-sm">{projectName}</span>
                    {/* Save status indicator */}
                    <span className="text-muted-foreground flex items-center gap-1 text-xs">
                        {isSaving ? (
                            <>
                                <Loader2 className="h-3 w-3 animate-spin" />
                                <span>Saving...</span>
                            </>
                        ) : lastSaved ? (
                            <>
                                <Check className="h-3 w-3 text-green-500" />
                                <span>Saved</span>
                            </>
                        ) : null}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onToggleAgenda(note.id)}
                        title={note.is_on_agenda ? 'Remove from Agenda' : 'Add to Agenda'}
                    >
                        <Star
                            className={cn('h-5 w-5', note.is_on_agenda ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground')}
                        />
                    </Button>
                    <div className="flex items-center gap-1">
                        <CalendarDays className="text-muted-foreground h-4 w-4" />
                        <Input
                            type="date"
                            value={linkedDate}
                            onChange={handleDateChange}
                            className="h-8 w-auto border-0 bg-transparent px-1"
                        />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(note.id)} title="Delete note">
                        <Trash2 className="text-destructive h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleTitleBlur}
                    placeholder="Note title"
                    className="mb-4 border-0 bg-transparent p-0 text-2xl font-bold shadow-none focus-visible:ring-0"
                />
                <TiptapEditor content={content} onChange={handleContentChange} placeholder="Start writing your note..." />
            </div>
        </div>
    );
}

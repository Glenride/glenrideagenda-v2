import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FilterType, Note } from '@/types';
import { CalendarDays, Plus, Star } from 'lucide-react';

interface NoteListProps {
    notes: Note[];
    selectedNoteId: number | null;
    activeFilter: FilterType;
    onSelectNote: (noteId: number) => void;
    onCreateNote: () => void;
}

export function NoteList({ notes, selectedNoteId, activeFilter, onSelectNote, onCreateNote }: NoteListProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
        });
    };

    const getFilterTitle = () => {
        switch (activeFilter) {
            case 'on_agenda':
                return 'On the Agenda';
            case 'today':
                return 'Today';
            default:
                return 'Notes';
        }
    };

    const stripHtml = (html: string) => {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    return (
        <div className="flex h-screen w-80 flex-col border-r bg-background">
            {/* Header */}
            <div className="flex items-center justify-between border-b p-4">
                <h2 className="text-lg font-semibold">{getFilterTitle()}</h2>
                {activeFilter === 'project' && (
                    <Button variant="ghost" size="icon" onClick={onCreateNote}>
                        <Plus className="h-5 w-5" />
                    </Button>
                )}
            </div>

            {/* Note List */}
            <div className="flex-1 overflow-y-auto">
                {notes.length === 0 ? (
                    <div className="text-muted-foreground flex h-full flex-col items-center justify-center p-4 text-center">
                        <p className="text-sm">No notes yet</p>
                        {activeFilter === 'project' && (
                            <Button variant="link" className="mt-2" onClick={onCreateNote}>
                                Create your first note
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="divide-y">
                        {notes.map((note) => (
                            <button
                                key={note.id}
                                className={cn(
                                    'hover:bg-muted/50 w-full px-4 py-3 text-left transition-colors',
                                    selectedNoteId === note.id && 'bg-muted',
                                )}
                                onClick={() => onSelectNote(note.id)}
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0 flex-1">
                                        <h3 className="truncate font-medium">{note.title || 'Untitled'}</h3>
                                        {note.content && (
                                            <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                                                {stripHtml(note.content)}
                                            </p>
                                        )}
                                        <div className="text-muted-foreground mt-2 flex items-center gap-2 text-xs">
                                            <span>{formatDate(note.created_at)}</span>
                                            {note.project && activeFilter !== 'project' && (
                                                <>
                                                    <span>•</span>
                                                    <span>{note.project.name}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        {note.is_on_agenda && <Star className="h-4 w-4 fill-amber-500 text-amber-500" />}
                                        {note.linked_date && <CalendarDays className="h-4 w-4 text-blue-500" />}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

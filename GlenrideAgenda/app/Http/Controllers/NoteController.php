<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NoteController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Auth::user()->notes()->with('project.category');

        // Filter by project
        if ($request->has('project_id')) {
            $query->where('project_id', $request->project_id);
        }

        // Filter by "On the Agenda"
        if ($request->boolean('on_agenda')) {
            $query->where('is_on_agenda', true);
        }

        // Filter by today's date
        if ($request->boolean('today')) {
            $query->whereDate('linked_date', today());
        }

        $notes = $query->orderByDesc('created_at')->get();

        return response()->json($notes);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'is_on_agenda' => 'boolean',
            'linked_date' => 'nullable|date',
        ]);

        // Verify the project belongs to the user
        $project = Auth::user()->projects()->findOrFail($validated['project_id']);

        $note = Auth::user()->notes()->create([
            'project_id' => $project->id,
            'title' => $validated['title'],
            'content' => $validated['content'] ?? null,
            'is_on_agenda' => $validated['is_on_agenda'] ?? false,
            'linked_date' => $validated['linked_date'] ?? null,
        ]);

        return response()->json($note->load('project.category'), 201);
    }

    public function show(Note $note): JsonResponse
    {
        $this->authorize('view', $note);

        return response()->json($note->load('project.category'));
    }

    public function update(Request $request, Note $note): JsonResponse
    {
        $this->authorize('update', $note);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'nullable|string',
            'is_on_agenda' => 'sometimes|boolean',
            'linked_date' => 'nullable|date',
            'project_id' => 'sometimes|required|exists:projects,id',
        ]);

        if (isset($validated['project_id'])) {
            // Verify the new project belongs to the user
            Auth::user()->projects()->findOrFail($validated['project_id']);
        }

        $note->update($validated);

        return response()->json($note->load('project.category'));
    }

    public function destroy(Note $note): JsonResponse
    {
        $this->authorize('delete', $note);

        $note->delete();

        return response()->json(null, 204);
    }

    public function restore(Note $note): JsonResponse
    {
        $this->authorize('restore', $note);

        $note->restore();

        return response()->json($note->load('project.category'));
    }

    public function toggleAgenda(Note $note): JsonResponse
    {
        $this->authorize('update', $note);

        $note->update(['is_on_agenda' => !$note->is_on_agenda]);

        return response()->json($note->load('project.category'));
    }
}

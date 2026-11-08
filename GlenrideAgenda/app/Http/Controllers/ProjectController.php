<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function index(): JsonResponse
    {
        $projects = Auth::user()
            ->projects()
            ->with('category')
            ->orderBy('name')
            ->get();

        return response()->json($projects);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
        ]);

        // Verify the category belongs to the user
        $category = Auth::user()->categories()->findOrFail($validated['category_id']);

        $project = Auth::user()->projects()->create([
            'category_id' => $category->id,
            'name' => $validated['name'],
        ]);

        return response()->json($project->load('category'), 201);
    }

    public function update(Request $request, Project $project): JsonResponse
    {
        $this->authorize('update', $project);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'category_id' => 'sometimes|required|exists:categories,id',
        ]);

        if (isset($validated['category_id'])) {
            // Verify the new category belongs to the user
            Auth::user()->categories()->findOrFail($validated['category_id']);
        }

        $project->update($validated);

        return response()->json($project->load('category'));
    }

    public function destroy(Project $project): JsonResponse
    {
        $this->authorize('delete', $project);

        $project->delete();

        return response()->json(null, 204);
    }

    public function restore(Project $project): JsonResponse
    {
        $this->authorize('restore', $project);

        $project->restore();

        return response()->json($project->load('category'));
    }
}

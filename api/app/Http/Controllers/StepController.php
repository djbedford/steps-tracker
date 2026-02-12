<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\Steps\LogDailySteps;
use App\Http\Resources\StepResource;
use App\Models\Step;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class StepController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        // In the future, filter this by the logged-in user
        $steps = Step::query()->orderByDesc('date')->get();

        return StepResource::collection($steps);
    }

    public function store(Request $request, LogDailySteps $action): StepResource
    {
        $validated = $request->validate([
            'date' => ['required', 'date'],
            'stepCount' => ['required', 'integer', 'min:0'],
        ]);

        // Temporary: Ensure a user exists for testing
        $user = User::firstOrCreate(
            ['email' => 'test@example.com'],
            ['name' => 'Test User', 'password' => 'password']
        );

        $step = $action->handle(
            $user,
            $validated['date'],
            (int) $validated['stepCount']
        );

        return new StepResource($step);
    }
}
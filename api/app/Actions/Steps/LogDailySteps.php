<?php

declare(strict_types=1);

namespace App\Actions\Steps;

use App\Models\Step;
use App\Models\User;

class LogDailySteps
{
    public function handle(User $user, string $date, int $count): Step
    {
        return Step::updateOrCreate(
            [
                'user_id' => $user->id,
                'date' => $date,
            ],
            [
                'step_count' => $count,
            ]
        );
    }
}
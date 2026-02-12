"use client";

import { useState, useEffect, FormEvent } from "react";

// Define the structure of a Step object based on the API response
interface Step {
  id: number;
  date: string;
  stepCount: number;
}

// The main component for the page
export default function Home() {
  // State for the list of steps
  const [steps, setSteps] = useState<Step[]>([]);
  // State for form inputs
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [stepCount, setStepCount] = useState("");
  // State for loading and error messages
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Function to fetch steps from the API
  const fetchSteps = async () => {
    try {
      const response = await fetch(`${API_URL}/steps`);
      if (!response.ok) {
        throw new Error("Failed to fetch steps.");
      }
      const data = await response.json();
      setSteps(data.data); // Laravel wraps collections in a 'data' object
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unknown error occurred while fetching steps."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch steps when the component mounts
  useEffect(() => {
    fetchSteps();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!date || !stepCount) {
      setError("Both date and step count are required.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/steps`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          date,
          stepCount: parseInt(stepCount, 10),
        }),
      });

      if (!response.ok) {
        // Try to parse the error response from Laravel
        const errorData = await response.json();
        const message =
          errorData.message || "An error occurred while submitting the form.";
        throw new Error(message);
      }

      // Clear form and error, then refresh the list
      setDate(new Date().toISOString().split("T")[0]);
      setStepCount("");
      setError(null);
      await fetchSteps();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unknown submission error occurred."
      );
    }
  };

  return (
    <main className="container mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
      <div className="space-y-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Daily Steps Tracker
        </h1>

        {/* Form for adding new steps */}
        <section>
          <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Log New Steps</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="stepCount" className="block text-sm font-medium text-gray-700">
                  Step Count
                </label>
                <input
                  id="stepCount"
                  type="number"
                  value={stepCount}
                  onChange={(e) => setStepCount(e.target.value)}
                  placeholder="e.g., 10000"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save Steps
              </button>
            </div>
          </form>
        </section>

        {/* Section to display the list of steps */}
        <section>
          <h2 className="text-xl font-semibold">History</h2>
          <div className="mt-4 rounded-lg border bg-white shadow-sm">
            {isLoading ? (
              <p className="p-6 text-center text-gray-500">Loading...</p>
            ) : steps.length === 0 ? (
                <p className="p-6 text-center text-gray-500">No steps logged yet.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {steps.map((step) => (
                  <li key={step.id} className="flex items-center justify-between p-4">
                    <div className="font-medium text-gray-800">{step.date}</div>
                    <div className="text-gray-600">{step.stepCount.toLocaleString()} steps</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

'use client'

interface PokemonPageClientProps {
  initialData: unknown
}

export function PokemonPageClient({ initialData }: PokemonPageClientProps) {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Pokemon List</h1>
      <p className="text-gray-600">Pokemon list will be implemented here</p>
      <pre className="mt-4 text-xs bg-gray-100 p-4 rounded overflow-auto">
        {JSON.stringify(initialData, null, 2)}
      </pre>
    </div>
  )
}

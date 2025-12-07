'use client'

interface PokemonDetailClientProps {
  initialData: unknown
}

export function PokemonDetailClient({
  initialData,
}: PokemonDetailClientProps) {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Pokemon Detail</h1>
      <p className="text-gray-600">Pokemon detail will be implemented here</p>
      <pre className="mt-4 text-xs bg-gray-100 p-4 rounded overflow-auto">
        {JSON.stringify(initialData, null, 2)}
      </pre>
    </div>
  )
}

import TodoList from '@/components/TodoList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto max-w-xl px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Todo List</h1>
        <TodoList />
      </div>
    </div>
  );
}

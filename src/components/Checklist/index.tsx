import React, { useState } from "react";
import { Plus, Trash, Pencil } from "lucide-react";

const Checklist = () => {
  const [items, setItems] = useState([
    { id: 1, text: "Task 1", completed: false },
    { id: 2, text: "Task 2", completed: false },
    { id: 3, text: "Task 3", completed: false },
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const toggleCompletion = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const addItem = (index: number) => {
    const newItem = { id: Date.now(), text: "Novo item", completed: false };
    const newItems = [...items];
    newItems.splice(index + 1, 0, newItem); // Adiciona o item logo abaixo
    setItems(newItems);
  };

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleEdit = (id: number, newText: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, text: newText } : item))
    );
  };

  return (
    <div className="h-full bg-gray-200 p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 flex justify-center">Onboarding</h2>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-4 p-3 bg-white rounded-lg shadow-md hover:bg-gray-100 relative group"
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleCompletion(item.id)}
                className="w-6 h-6 cursor-pointer"
              />
              <input
                type="text"
                value={item.text}
                onChange={(e) => handleEdit(item.id, e.target.value)}
                className={`bg-transparent focus:outline-none w-full ${
                  item.completed ? "line-through text-gray-500" : "text-gray-900"
                }`}/>
            </div>

            {/* Botões de ação (somente aparecem ao passar o mouse) */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {/* <button onClick={() => addItem(index)} className="p-1 bg-green-500 text-white rounded"> */}
              <button onClick={() => addItem(index)} className="p-1 bg-green-500 text-white rounded-full hover:bg-green-600">
              <Plus size={16} />
              </button>
              <button onClick={() => removeItem(item.id)} className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600">
              <Trash size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Checklist;

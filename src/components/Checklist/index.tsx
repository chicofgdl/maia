import React, { useState } from "react";
import { Plus, Trash, ChevronDown } from "lucide-react";

const Checklist = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      title: "Github",
      expanded: false,
      items: [
        { id: 101, text: "Criar repositório", completed: false },
        { id: 102, text: "Adicionar README", completed: false },
      ],
    },
    {
      id: 2,
      title: "Configurações",
      expanded: false,
      items: [
        { id: 201, text: "Configurar SSH", completed: false },
        { id: 202, text: "Definir variáveis de ambiente", completed: false },
      ],
    },
  ]);

  const toggleCategory = (id: number) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === id ? { ...category, expanded: !category.expanded } : category
      )
    );
  };

  const toggleCompletion = (categoryId: number, itemId: number) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map((item) =>
                item.id === itemId ? { ...item, completed: !item.completed } : item
              ),
            }
          : category
      )
    );
  };

  const addItem = (categoryId: number) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: [
                ...category.items,
                { id: Date.now(), text: "Novo item", completed: false },
              ],
            }
          : category
      )
    );
  };

  const removeItem = (categoryId: number, itemId: number) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.filter((item) => item.id !== itemId),
            }
          : category
      )
    );
  };

  return (
    <div className="h-full bg-gray-200 p-4 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      <h2 className="text-xl font-semibold mb-4 flex justify-center">Onboarding</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id} className="bg-white rounded-lg shadow-md">
            <div
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-100"
              onClick={() => toggleCategory(category.id)}
            >
              <span className="font-semibold text-lg">{category.title}</span>
              <ChevronDown
                className={`transform transition-transform ${category.expanded ? "rotate-180" : "rotate-0"}`}
              />
            </div>
            {category.expanded && (
              <ul className="space-y-2 p-2">
                {category.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-4 p-3 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleCompletion(category.id, item.id)}
                        className="w-6 h-6 cursor-pointer"
                      />
                      <span className={item.completed ? "line-through text-gray-500" : "text-gray-900"}>
                        {item.text}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => addItem(category.id)}
                        className="p-1 bg-green-500 text-white rounded-full hover:bg-green-600"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => removeItem(category.id, item.id)}
                        className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Checklist;

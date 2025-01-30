import React, { useState } from "react";
import { Plus, Trash, ChevronDown } from "lucide-react";

const Checklist = () => {

  type Item = {
    id: number;
    text: string;
    completed: boolean;
  };
  
  type Category = {
    id: number;
    title: string;
    expanded: boolean;
    items: Item[];
  };
  
  const [categories, setCategories] = useState<Category[]>([]);
  

  const toggleCategory = (id) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === id ? { ...category, expanded: !category.expanded } : category
      )
    );
  };

  const toggleCompletion = (categoryId, itemId) => {
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

  const addItem = (categoryId) => {
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

  const removeItem = (categoryId, itemId) => {
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

  const addCategory = () => {
    setCategories((prevCategories) => [
      ...prevCategories,
      { id: Date.now(), title: "Novo Título", expanded: true, items: [] },
    ]);
  };

  const removeCategory = (categoryId) => {
    setCategories((prevCategories) => prevCategories.filter(category => category.id !== categoryId));
  };

  return (
    <div className="h-full bg-gray-200 p-4 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      <h2 className="text-xl font-semibold mb-4 flex justify-center">Onboarding</h2>
      <ul className="space-y-2">
        {categories.length === 0 && (
          <div className="flex justify-center">
            <button
              onClick={addCategory}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Adicionar Título
            </button>
          </div>
        )}
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
                {category.items.length === 0 && (
                  <div className="flex justify-center">
                    <button
                      onClick={() => addItem(category.id)}
                      className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Adicionar Item
                    </button>
                  </div>
                )}
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
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => addCategory()}
                    className="flex-1 p-2 bg-blue-500 text-white rounded-l-lg hover:bg-blue-600"
                  >
                    Adicionar Título
                  </button>
                  <button
                    onClick={() => removeCategory(category.id)}
                    className="flex-1 p-2 bg-red-500 text-white rounded-r-lg hover:bg-red-600"
                  >
                    Remover Título
                  </button>
                </div>
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Checklist;

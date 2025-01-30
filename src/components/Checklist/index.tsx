import React, { useState } from "react";
import { Plus, Trash, ChevronDown } from "lucide-react";

// const Checklist = () => {
//   const [items, setItems] = useState([
//     { id: 1, text: "Task 1", completed: false },
//     { id: 2, text: "Task 2", completed: false },
//     { id: 3, text: "Task 3", completed: false },
//   ]);

//   const toggleCompletion = (id: number) => {
//     setItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, completed: !item.completed } : item
//       )
//     );
//   };

//   const addItem = (index: number) => {
//     const newItem = { id: Date.now(), text: "Novo item", completed: false };
//     const newItems = [...items];
//     newItems.splice(index + 1, 0, newItem); // Adiciona o item logo abaixo
//     setItems(newItems);
//   };

//   const removeItem = (id: number) => {
//     setItems((prevItems) => prevItems.filter((item) => item.id !== id));
//   };

//   const handleEdit = (id: number, newText: string) => {
//     setItems((prevItems) =>
//       prevItems.map((item) => (item.id === id ? { ...item, text: newText } : item))
//     );
//   };

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
        category.id === id
          ? { ...category, expanded: !category.expanded }
          : category
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
                item.id === itemId
                  ? { ...item, completed: !item.completed }
                  : item
              ),
            }
          : category
      )
    );
  };

  return (
    <div
      className="h-full bg-gray-200 p-4 overflow-y-auto"
      style={{ scrollbarWidth: "none" }}
    >
      <h2 className="text-xl font-semibold mb-4 flex justify-center">
        Onboarding
      </h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id} className="bg-white rounded-lg shadow-md">
            <div
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-100"
              onClick={() => toggleCategory(category.id)}
            >
              <span className="font-semibold text-lg">{category.title}</span>
              <ChevronDown className={`transform transition-transform ${category.expanded ? "rotate-180" : "rotate-0"}`} />
            </div>
            {category.expanded && (
              <ul className="space-y-2 p-2">
                {category.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-4 p-3 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleCompletion(category.id, item.id)}
                      className="w-6 h-6 cursor-pointer"
                    />
                    <span className={item.completed ? "line-through text-gray-500" : "text-gray-900"}>{item.text}</span>
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

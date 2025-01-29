import React, { useState } from "react";

const Checklist = () => {

  const [items, setItems] = useState([
    { id: 1, text: "Task 1", completed: false },
    { id: 2, text: "Task 2", completed: false },
    { id: 3, text: "Task 3", completed: false },
    { id: 4, text: "Task 4", completed: false },
    { id: 5, text: "Task 5", completed: false },
    { id: 6, text: "Task 6", completed: false },
  ]);

  const toggleCompletion = (id:number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div
      className="h-full bg-gray-200 p-4 overflow-y-auto"
    >
      <h2 className="text-xl font-semibold mb-4">Onboarding</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-start gap-4 p-3 bg-white rounded-lg shadow-md hover:bg-gray-100"
          >
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleCompletion(item.id)}
              className="w-6 h-6 cursor-pointer"
            />
            <span
              className={`text-base ${
                item.completed ? "line-through text-gray-500" : "text-gray-900"
              }`}
            >
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Checklist;

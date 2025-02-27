"use client";
import React, { useState, useEffect } from "react";
import {
    Plus,
    Trash,
    ChevronDown,
    ChevronRight,
    ChevronLeft,
} from "lucide-react";

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

    const [categories, setCategories] = useState<Category[]>(() => {
        const savedCategories = localStorage.getItem("checklistCategories");
        return savedCategories ? JSON.parse(savedCategories) : [];
    });

    const [editingCategory, setEditingCategory] = useState<number | null>(null);
    const [editingItem, setEditingItem] = useState<number | null>(null);

    useEffect(() => {
        localStorage.setItem("checklistCategories", JSON.stringify(categories));
    }, [categories]);

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

    const addItem = (categoryId: number) => {
        setCategories((prevCategories) =>
            prevCategories.map((category) =>
                category.id === categoryId
                    ? {
                          ...category,
                          items: [
                              ...category.items,
                              {
                                  id: Date.now(),
                                  text: "Novo item",
                                  completed: false,
                              },
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
                          items: category.items.filter(
                              (item) => item.id !== itemId
                          ),
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

    const removeCategory = (categoryId: number) => {
        setCategories((prevCategories) =>
            prevCategories.filter((category) => category.id !== categoryId)
        );
    };

    const updateCategoryTitle = (categoryId: number, newTitle: string) => {
        setCategories((prevCategories) =>
            prevCategories.map((category) =>
                category.id === categoryId
                    ? { ...category, title: newTitle }
                    : category
            )
        );
    };

    const updateItemText = (
        categoryId: number,
        itemId: number,
        newText: string
    ) => {
        setCategories((prevCategories) =>
            prevCategories.map((category) =>
                category.id === categoryId
                    ? {
                          ...category,
                          items: category.items.map((item) =>
                              item.id === itemId
                                  ? { ...item, text: newText }
                                  : item
                          ),
                      }
                    : category
            )
        );
    };

    const [expanded, setExpanded] = useState(true);

    return (
        <div
            className={`h-full flex flex-col bg-gray-800 p-6 overflow-y-auto transition-all duration-300 rounded-2xl ${
                expanded ? "w-full" : "w-24"
            }`}
            style={{ scrollbarWidth: "none" }}
        >
            <div
                className="flex items-center justify-center bg-[#50A296] rounded-xl p-2 h-12 text-white cursor-pointer mb-4"
                onClick={() => setExpanded(!expanded)}
            >
                {expanded ? (
                    <div className="flex flex-row items-center justify-center w-full">
                        <ChevronLeft size={24} className="justify-self-start" />
                        <h2 className="text-xl font-semibold flex justify-center bg-[#50A296] rounded-xl p-2 text-white">
                            Onboarding
                        </h2>
                    </div>
                ) : (
                    <ChevronRight size={24} />
                )}
            </div>
            {expanded && (
                <ul className="space-y-2 flex flex-col flex-1 gap-2">
                    {categories.length === 0 && (
                        <div className="flex justify-center">
                            <button
                                onClick={addCategory}
                                className="p-2 w-full bg-[#4C8CE6] text-white rounded-lg hover:bg-[#629E44]"
                            >
                                Novo Título
                            </button>
                        </div>
                    )}
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            className="bg-gray-700 rounded-lg shadow-md text-gray-300"
                        >
                            <div className="flex items-center justify-between p-3 cursor-pointer">
                                {editingCategory === category.id ? (
                                    <input
                                        type="text"
                                        value={category.title}
                                        onChange={(e) =>
                                            updateCategoryTitle(
                                                category.id,
                                                e.target.value
                                            )
                                        }
                                        onBlur={() => setEditingCategory(null)}
                                        autoFocus
                                        className=" p-1 bg-gray-700"
                                    />
                                ) : (
                                    <span
                                        className="font-semibold text-lg"
                                        onClick={() =>
                                            setEditingCategory(category.id)
                                        }
                                    >
                                        {category.title}
                                    </span>
                                )}
                                <ChevronDown
                                    onClick={() => toggleCategory(category.id)}
                                    className={`transform transition-transform ${
                                        category.expanded
                                            ? "rotate-180"
                                            : "rotate-0"
                                    }`}
                                />
                            </div>
                            {category.expanded && (
                                <ul className="space-y-2 p-2">
                                    {category.items.length === 0 && (
                                        <div className="flex justify-center">
                                            <button
                                                onClick={() =>
                                                    addItem(category.id)
                                                }
                                                className="p-2 bg-[#50A296] text-white rounded-lg hover:bg-[#629E44] w-full"
                                            >
                                                Novo Item
                                            </button>
                                        </div>
                                    )}
                                    {category.items.map((item) => (
                                        <li
                                            key={item.id}
                                            className="flex items-center justify-between gap-4 p-3 bg-gray-300 rounded-lg hover:bg-gray-200"
                                        >
                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="checkbox"
                                                    checked={item.completed}
                                                    onChange={() =>
                                                        toggleCompletion(
                                                            category.id,
                                                            item.id
                                                        )
                                                    }
                                                    className="w-6 h-6 cursor-pointer"
                                                />
                                                {editingItem === item.id ? (
                                                    <input
                                                        type="text"
                                                        value={item.text}
                                                        onChange={(e) =>
                                                            updateItemText(
                                                                category.id,
                                                                item.id,
                                                                e.target.value
                                                            )
                                                        }
                                                        onBlur={() =>
                                                            setEditingItem(null)
                                                        }
                                                        autoFocus
                                                        className="border p-1 text-black"
                                                    />
                                                ) : (
                                                    <span
                                                        className={
                                                            item.completed
                                                                ? "line-through text-gray-500"
                                                                : "text-gray-900"
                                                        }
                                                        onClick={() =>
                                                            setEditingItem(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        {item.text}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() =>
                                                        addItem(category.id)
                                                    }
                                                    className="p-1 bg-[#50A296] text-white rounded-full hover:bg-[#629E44]"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        removeItem(
                                                            category.id,
                                                            item.id
                                                        )
                                                    }
                                                    className="p-1 bg-[#9E2449] text-white rounded-full hover:bg-[#CF7541]"
                                                >
                                                    <Trash size={16} />
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                    <div className="flex justify-between mt-2">
                                        <button
                                            onClick={addCategory}
                                            className="flex-1 p-2 bg-[#4C8CE6] text-white rounded-l-lg hover:bg-blue-600"
                                        >
                                            Adicionar Título
                                        </button>
                                        <button
                                            onClick={() =>
                                                removeCategory(category.id)
                                            }
                                            className="flex-1 p-2 bg-[#9E2449] text-white rounded-r-lg hover:bg-[#CF7541]"
                                        >
                                            Remover Título
                                        </button>
                                    </div>
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Checklist;

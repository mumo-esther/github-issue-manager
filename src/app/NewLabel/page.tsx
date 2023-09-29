"use client"
import React, { useState } from "react";
import { postNewLabel } from "../api/githubAPI";
import Link from "next/link";
import { useRouter } from "next/navigation";

function NewLabel() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "f9d0c4",
    default: false,
  });

  const router = useRouter();

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;

    if (name === "color" && !/^#[0-9a-fA-F]{6}$/.test(value)) {
      return;
    }

    const colorValue = value.startsWith("#") ? value.substring(1) : value;

    setFormData({
      ...formData,
      [name]: colorValue,
    });
  };

  const handleCheckboxChange = (event: { target: { name: any; checked: any; }; }) => {
    const { name, checked } = event.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      await postNewLabel(formData);
      setFormData({
        name: "",
        description: "",
        color: "",
        default: false,
      });
      router.push('/LabelsList')
    } catch (error) {
      console.error("Error creating new label:", error);
    }
  };

  return (
    <div className="border rounded-md border-blue-700 m-10 p-6">
      <h1 className="text-xl font-semibold mb-4">New Label</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">
            Label Name
          </label>
          <input
            type="text"
            id="name" 
            name="name"
            className="mt-1 p-2 w-full border rounded-md  border-blue-500 focus:ring-blue-500 focus:border-blue-900 block"
            placeholder="Enter label name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            className="mt-1 p-2 w-full h-32 border rounded-md border-blue-500 focus:ring-blue-500 focus:border-blue-500 block"
            placeholder="Enter label description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Label Color
          </label>
          <input
            type="text"
            name="color"
            className="mt-1 p-2 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 block"
            placeholder="f9d0c4"
            value={formData.color}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="isDefault"
              className="form-checkbox text-blue-500"
              checked={formData.default}
              onChange={handleCheckboxChange}
            />
            <span className="text-sm font-medium text-gray-700">
              Default label
            </span>
          </label>
        </div>
        <div className="flex justify-end">
          <Link href='/LabelsList' >
            <button
              className="bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 border rounded-md"
          >
            Create Label
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewLabel;

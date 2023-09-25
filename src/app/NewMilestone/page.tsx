"use client"
import React, { useState } from "react";
import {postNewMilestone} from "../api/githubAPI";
import { useRouter } from "next/navigation";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Link from "next/link";

function NewMilestone() {
  const [selectedDate, setSelectedDate] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (date: any) => {
    setSelectedDate(date);
  };

 const router = useRouter();

  const handleInputChange = (event: { target: { name: string; value: any; }; }) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      await postNewMilestone(formData);
      setFormData({
        title: "",
        description: "",
      });
      router.push('/MilestonesList')
    } catch (error) {
      console.error("Error creating new Milestone:", error);
    }
  };

  return (
    <div className="border rounded-md m-10">
      <div className="border-b-2 m-2">
      <h1 className="text-bold text-lg py-2">New Milestone</h1>
      <p className="text-sm py-1">Create a new milestone to help organize your issues and pull requests.</p>
      </div>
      <form onSubmit={handleSubmit}>
      <label className="m-4">Title </label>
        <input
          name="title"
          className="w-full h-10 p-2 bg-gray-100 border rounded-md mb-2 text-black border-blue-500"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <div className="bg-gray-200 flex items-start">
        </div>
        <div className="flex flex-col">
        <label className="m-4" >Due date (optional) : </label>
      <DatePicker
      className="border border-blue-500 rounded-md w-3/5 h-10"
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy" 
        placeholderText="dd/mm/yyyy" 
      />
        </div>
        <label className="m-4" >Description </label>
        <textarea
          name="description"
          className="w-full h-40 p-4 border rounded-md mb-4 bg-gray-100 border-blue-500"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
        ></textarea>
        <div className="flex justify-end">
          <Link href = '/MilestonesList'>
        <button
            className="bg-blue-300 hover:bg-blue-600 text-black px-4 py-2 rounded-md ml-10"
          >
            Cancel
          </button>
          </Link>
          <button
            type="submit"
            className="bg-gray-200 hover:bg-blue-600 text-black px-4 py-2 rounded-md ml-10"
          >
            Submit New Milestone
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewMilestone;

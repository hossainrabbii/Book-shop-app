import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { showToast } from "./Toast";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from "../redux/features/category/categoryApi";
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";

interface UserFormData {
  name: string;
}

const AddBookCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>();
  const [addCategory] = useAddCategoryMutation();

  const { data, isFetching, isLoading, error } =
    useGetAllCategoriesQuery(undefined);

  // delete category
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDeleteCategory = async (categoryId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmDelete) {
      try {
        const res = await deleteCategory(categoryId).unwrap();
        if (res.success) {
          toast.success(res?.message || "Category deleted!");
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
  };

  const [updateCategory] = useUpdateCategoryMutation();

  // State for editing
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [updatedName, setUpdatedName] = useState("");
  // Handle edit button click
  const handleEditClick = (categoryId: string, name: string) => {
    setEditingCategory(categoryId);
    setUpdatedName(name);
  };

  // Handle save after editing
  const handleSaveEdit = async (categoryId: string) => {
 
    const res = await updateCategory({
      categoryId,
      categoryData: { name: updatedName },
    }).unwrap();
    try {
      if (res.success) {
        toast.success(res.message || "Updated");
      } else {
        toast.warning(res?.message || "Failed");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
    setEditingCategory(null);
  };

  let categoryContent;

  // Check if it's loading or fetching
  if (isLoading || isFetching) {
    categoryContent = <p>Loading books...</p>;
  }

  // Check for error
  else if (error) {
    categoryContent = <p>Network: {"Something went wrong"}</p>;
  }

  // If there are books available
  else if (data && data?.data && data?.data?.length > 0) {
    categoryContent = (
  <div className="flex flex-wrap gap-3 my-4">
  {data?.data?.map((category: { _id: string; name: string }) => (
    <div
      key={category._id}
      className="flex items-center gap-2 rounded border border-gray-300 bg-gray-100 px-3 py-1"
    >
      {editingCategory === category._id ? (
        <input
          className="bg-white rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
          aria-label={`Edit category name for ${category.name}`}
        />
      ) : (
        <strong className="text-gray-700 text-sm">{category.name}</strong>
      )}

      {editingCategory === category._id ? (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition"
          onClick={() => handleSaveEdit(category._id)}
          aria-label={`Save changes to category ${category.name}`}
        >
          Save
        </button>
      ) : (
        <button
          onClick={() => handleEditClick(category._id, category.name)}
          className="text-blue-600 hover:text-blue-800 cursor-pointer p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label={`Edit category ${category.name}`}
          type="button"
        >
          <MdEdit size={18} />
        </button>
      )}

      <button
        onClick={() => handleDeleteCategory(category._id)}
        className="bg-red-500 hover:bg-red-600 text-white p-1 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
        aria-label={`Delete category ${category.name}`}
        type="button"
      >
        <MdDeleteOutline size={18} />
      </button>
    </div>
  ))}
</div>

    );
  }

  // If no books are available
  else {
    categoryContent = <p className="mb-12">No category added yet.</p>;
  }
  const onSubmit = async (categoryData: UserFormData) => {
    try {
      const res = await addCategory(categoryData).unwrap();
      if (res.success) {
        toast.success(res?.message || "Category Added successfully!");
        reset();
      } else {
        showToast(res?.message || "Failed");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <title>Book Category</title>
    
     <div className="max-w-md mx-auto p-2 md:p-6 bg-white shadow-lg rounded-lg my-5">
      {categoryContent}
      <h2 className="text-xl font-semibold mb-4">Add new Category</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <input
            type="text"
            placeholder="Category Name"
            {...register("name", { required: "Category name is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add Category
        </button>
      </form>
    </div></>
  );
};

export default AddBookCategory;

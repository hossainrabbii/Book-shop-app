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
        console.log(res);
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
    console.log(categoryId);
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
      <div className="flex flex-wrap gap-2 my-4">
        {data?.data?.map((category: { _id: string; name: string }) => (
          <div
            className="rounded border p-1 bg-gray-100 flex items-center gap-1"
            key={category._id}
          >
            {editingCategory === category._id ? (
              // Show input field when editing
              <input
                className="bg-white rounded p-1 border"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            ) : (
              <strong className="bg-white rounded p-1">{category.name}</strong>
            )}

            {editingCategory === category._id ? (
              <button
                className="bg-blue-300 px-2 py-1 rounded text-white"
                onClick={() => handleSaveEdit(category._id)}
              >
                Save
              </button>
            ) : (
              <div
                className="edit cursor-pointer text-blue-500"
                onClick={() => handleEditClick(category._id, category.name)}
              >
                <MdEdit />
              </div>
            )}

            <div
              className="bg-red-300 p-1 rounded cursor-pointer"
              onClick={() => handleDeleteCategory(category._id)}
            >
              <MdDeleteOutline />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // If no books are available
  else {
    categoryContent = <p>No category added yet.</p>;
  }
  const onSubmit = async (categoryData: UserFormData) => {
    try {
      const res = await addCategory(categoryData).unwrap();
      console.log(res);
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
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg my-5">
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
          Add
        </button>
      </form>
    </div>
  );
};

export default AddBookCategory;

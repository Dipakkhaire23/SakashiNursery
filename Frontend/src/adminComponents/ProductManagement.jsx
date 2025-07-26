import  { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search ,Loader } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

// const token=localStorage.getItem("token");

const ProductManagement = () => {
   
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // ✅ New state
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
   const [loading1, setLoading1] = useState(true); // Loader state
   const [loadingall, setLoadingall] = useState(true); // Loader state

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stockQuantity: "",
    images: [],
    status: "AVAILABLE",
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories(); // ✅ Fetch categories on mount
  }, []);

  const fetchProducts = async () => {
    try {
      setLoadingall(true); // Show loader while fetching
      const res = await fetch(import.meta.env.VITE_BACKEND_URL+"/api/admin/products/all",{
        method: "GET",
            credentials: "include",
  headers: {
    "Content-Type": "application/json",
    // "Authorization": `Bearer ${token}` // <-- attach token here
  }
      });
      const data = await res.json();
      console.log(data);
      setProducts(data);
      console.log(data.status);
    } catch (err) {
      console.error("Error fetching products", err);
    }finally {
      setLoadingall(false); // Hide loader when done
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL+"/api/admin/products/categories",{
            credentials: "include",
            method:"GET",
         headers: {
    "Content-Type": "application/json",
    // "Authorization": `Bearer ${token}` // <-- attach token here
  }
      });
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  const fetchProductDetailByName = async (name) => {
    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL+`/api/admin/products/product/${name}`,{
            credentials: "include",
               headers: {
    "Content-Type": "application/json",
    // "Authorization": `Bearer ${token}` // <-- attach token here
  }
      });
      const data = await res.json();
      setSelectedProduct(data);
    } catch (err) {
      console.error("Error fetching product detail by name", err);
    }
  };

  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   setFormData({ ...formData, images: files });
  // };

const handleSubmit = async (e) => {
  e.preventDefault();
  // const firebaseToken = "dQvzjNA3YAZzaUIauKMYH1:APA91bGfGv4mccoE4bGGSnINUabgykXTCM327agLHYSuoSjPa6k4aZcKHB5XSCQ99AXw4OpHNnx9stpB0-APsGSV2IM5aSAWEs5Izct1qTSNq8ccgwo2QfE";
  setLoading(true);
   const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 try {
    if (editingProduct) {
      await updateProduct(editingProduct.id);
    } else {
      await createProduct();
    }
    await delay(2000); // 🕒 wait 2 seconds
    resetForm();
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

const createProduct = async () => {
  const product = {
    name: formData.name,
    description: formData.description,
    price: parseFloat(formData.price),
    stockQuantity: parseInt(formData.stockQuantity),
    category: { name: formData.category },
    status: formData.status,
  };

  const form = new FormData();
  form.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
  formData.images.forEach((img) => form.append("file", img));

  try {
     setLoading1(true); // Show loader
    const res = await fetch(import.meta.env.VITE_BACKEND_URL+`/api/admin/products/create`, {
      method: "POST",
      credentials: "include",
      body: form,
    });

    if (!res.ok) throw new Error(await res.text());
    const newProduct = await res.json();
    setProducts((prev) => [...prev, newProduct]);
    toast.success("✅ Product Created!");
  } catch (err) {
    console.error("Create Error:", err);
    toast.error("❌ Failed to create product.");
  }
  finally
  {
    setLoading1(false)
  }
};

const updateProduct = async (productId) => {
  const product = {
    name: formData.name,
    description: formData.description,
    price: parseFloat(formData.price),
    stockQuantity: parseInt(formData.stockQuantity),
    category: { name: formData.category },
    status: formData.status,
  };

  const form = new FormData();
  form.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
  formData.images.forEach((img) => form.append("file", img));

  try {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL+`/api/admin/products/update/${productId}`, {
      method: "PUT",
      credentials: "include",
      body: form,
    });

    if (!res.ok) throw new Error(await res.text());
    const updated = await res.json();
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
   setTimeout(()=>{
     toast.success("✅ Product Updated!");
   },2000)
  } catch (err) {
    console.error("Update Error:", err);
    toast.error("❌ Failed to update product.");
  }
};

const resetForm = () => {
  setFormData({
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    category: "",
    status: "AVAILABLE",
    images: [],
  });
  setEditingProduct(null);
  setShowModal(false);
};


  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category?.name || "",
      price: product.price.toString(),
      stockQuantity: product.stockQuantity.toString(),
      images: [],
      status: product.status,
    });
    setShowModal(true);
  };

  const handleDelete = async (name) => {
    try {
      await fetch(import.meta.env.VITE_BACKEND_URL+`/api/admin/products/deleteByName?name=${encodeURIComponent(name)}`, {
        method: "DELETE",
        credentials: "include",
       
      });
       toast.success("Deleted")
      setProducts(products.filter((p) => p.name !== name));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

const getImageUrl = (image) => {
  if (!image || !image.data) {
    return "https://via.placeholder.com/150";
  }
  return `data:${image.contentType};base64,${image.data}`;
};


  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => {
        const nameMatch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const categoryMatch = product.category?.name?.toLowerCase().includes(searchTerm.toLowerCase());
        return nameMatch || categoryMatch;
      })
    : [];

  return (
    <div className="space-y-6">
       <Toaster position="top-right" />
       <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Plant Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 space-x-2 text-white bg-blue-600 rounded"
        >
          <Plus size={20} /> <span>Add Plant</span>
        </button>
      </div>

      <div className="p-4 bg-white-50 border rounded-lg">
  <div className="relative">
    <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={18} />
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full py-1.5 pl-9 pr-3 text-sm border rounded-md"
    />
  </div>
</div>


   {loadingall ? (
      <div className="flex items-center justify-center py-10">
        <Loader className="animate-spin text-blue-500" size={40} />
        <span className="ml-3 text-gray-600">Loading products...</span>
      </div>
    ) :  (<div className="bg-white-50 border rounded-lg">
  {/* Desktop View - Styled Product Table */}
<div className="hidden md:block overflow-x-auto">
  <table className="w-full text-sm text-left bg-white border border-gray-200 shadow-sm rounded-lg">
    <thead className="bg-white-50 text-gray-700">
      <tr>
        <th className="px-6 py-3 font-semibold">Plant</th>
        <th className="px-6 py-3 font-semibold">Category</th>
        <th className="px-6 py-3 font-semibold">Price</th>
        <th className="px-6 py-3 font-semibold">Stock</th>
        <th className="px-6 py-3 font-semibold">Status</th>
        <th className="px-6 py-3 font-semibold text-center">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100">
      {filteredProducts.map((product) => (
        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
          <td
            className="flex items-center gap-3 px-6 py-4 cursor-pointer hover:underline"
            onClick={() => fetchProductDetailByName(product.name)}
          >
            <img
                   src={
  Array.isArray(product.images) && product.images.length > 0
    ? getImageUrl(product.images[0])  // Pass the first image object
    : "https://via.placeholder.com/50"
}
              alt="Product"
              className="w-10 h-10 object-cover rounded border border-gray-200"
            />
            <span className="font-medium text-gray-800">{product.name}</span>
          </td>

          <td className="px-6 py-4 text-gray-700">{product.category?.name}</td>
          <td className="px-6 py-4 text-gray-700">₹{product.price}</td>
          <td className="px-6 py-4 text-gray-700">{product.stockQuantity}</td>

          <td className="px-6 py-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                product.status === "AVAILABLE"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.status}
            </span>
          </td>

          <td className="px-6 py-4 flex justify-center gap-3">
            <button
              onClick={() => handleEdit(product)}
              className="text-green-600 hover:text-green-800 transition"
              title="Edit"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => handleDelete(product.name)}
              className="text-red-600 hover:text-red-800 transition"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


{/* Mobile view - Product Card Layout */}
<div className="block space-y-4 md:hidden">
  {filteredProducts.map((product) => (
    <div
      key={product.id}
      className="p-4 bg-white border border-gray-200 rounded-lg shadow-md"
    >
      <div className="flex items-center gap-3 mb-3">
        <img
         src={
  Array.isArray(product.images) && product.images.length > 0
    ? getImageUrl(product.images[0])  // Pass the first image object
    : "https://via.placeholder.com/50"
}
          alt="Product"
          className="object-cover w-16 h-16 border rounded-lg"
        />
        <div>
          <h3
            className="text-lg font-semibold text-blue-600 cursor-pointer"
            onClick={() => fetchProductDetailByName(product.name)}
          >
            {product.name}
          </h3>
          <p className="text-sm text-gray-500">{product.category?.name}</p>
        </div>
      </div>

      <div className="mb-3 space-y-1 text-sm text-gray-700">
        <p><span className="font-medium">Price:</span> ₹{product.price}</p>
        <p><span className="font-medium">Stock:</span> {product.stockQuantity}</p>
       <p>
  <span className="font-medium">Status:</span>{" "}
  <span
    className={`px-2 py-1 rounded text-white font-semibold ${
      product.status === "AVAILABLE"
        ? "bg-green-600"
        : "bg-red-600"
    }`}
  >
    {product.status}
  </span>
</p>

      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => handleEdit(product)}
          className="px-4 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(product.name)}
          className="px-4 py-1 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

</div>)}


      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="mb-4 text-xl font-bold text-center">Plant Details</h2>
            <div className="space-y-2">
              <p><strong>Name:</strong> {selectedProduct.name}</p>
              <p><strong>Description:</strong> {selectedProduct.description}</p>
              <p><strong>Category:</strong> {selectedProduct.category?.name}</p>
             <p><strong>Price:</strong> ₹{selectedProduct.price < 0 ? 0 : selectedProduct.price}</p>

              <p><strong>Stock:</strong> {selectedProduct.stockQuantity}</p>
           <p>
  <strong>Status:</strong>{" "}
  <span
    className={
      selectedProduct.status === "AVAILABLE"
        ? "text-green-600 font-semibold"
        : "text-red-600 font-semibold"
    }
  >
    {selectedProduct.status}
  </span>
</p>

            </div>
            <div className="mt-4">
              <h3 className="mb-2 font-semibold">Plant Images</h3>
              <div className="grid grid-cols-2 gap-4">
                {selectedProduct.images?.map((img, idx) => (
  <img
    key={idx}
    src={getImageUrl(img)}
    alt={img.fileName || `Plant ${idx}`}
    className="object-cover w-full h-40 border rounded-lg"
  />
))}

              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                onClick={() => setSelectedProduct(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ... (rest of the UI remains unchanged) */}

      {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
      <h2 className="mb-4 text-xl font-bold text-center">
        {editingProduct ? "Edit Plant" : "Add Plant"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Product Name"
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Product Description"
          required
          className="w-full p-2 border rounded"
        ></textarea>

        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
          className="w-full p-2 border rounded"
        >
          <option value="" disabled>Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>

        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          placeholder="Price"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          value={formData.stockQuantity}
          onChange={(e) =>
            setFormData({ ...formData, stockQuantity: e.target.value })
          }
          placeholder="Stock Quantity"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          multiple
          onChange={(e) =>
            setFormData({ ...formData, images: Array.from(e.target.files) })
          }
          className="w-full p-2 border rounded"
        />

        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className={`w-full p-2 border rounded 
            ${formData.status === 'AVAILABLE' ? 'bg-green-100 text-green-700 border-green-300' : ''}
            ${formData.status === 'OUT_OF_STOCK' ? 'bg-red-100 text-red-700 border-red-300' : ''}
          `}
        >
          <option value="AVAILABLE">AVAILABLE</option>
          <option value="OUT_OF_STOCK">OUT_OF_STOCK</option>
        </select>

        <div className="flex justify-between">
          <button
  type="submit"
  disabled={loading}
  className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
>
  {loading ? (
    <>
      <svg
        className="w-4 h-4 animate-spin"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
        ></path>
      </svg>
      <span>Processing...</span>
    </>
  ) : (
    <span>{editingProduct ? "Update Plant" : "Add Plant"}</span>
  )}
</button>

        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default ProductManagement;

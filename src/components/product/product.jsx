import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import edit from "../../assets/edit.svg";
import close from "../../assets/close.svg";
import hapus from "../../assets/delete.svg";

const Product = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [detail, setDetail] = useState([]);
  const [updateId, setUpdateId] = useState();
  const [updateName, setUpdateName] = useState();
  const [updatePrice, setUpdatePrice] = useState();
  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleModalTambah = () => {
    const modalTambah = document.querySelector("#modalTambah");

    modalTambah.classList.remove("hidden");
  };

  const handleCloseModalTambah = () => {
    const modalTambah = document.querySelector("#modalTambah");

    modalTambah.classList.add("hidden");
  };

  const handleCloseModalDetail = () => {
    const detailModal = document.querySelector("#detailModal");

    detailModal.classList.add("hidden");
  };

  const handleCloseModalUpdate = () => {
    const updateModal = document.querySelector("#updateModal");

    updateModal.classList.add("hidden");
  };

  const handleTambah = () => {
    const barang = document.querySelector("#barang").value;
    const harga = document.querySelector("#harga").value;

    const dataTambah = {
      name: barang,
      price: harga,
    };
    axios
      .post(
        "https://testcrud.fikrisabriansyah.my.id/api/product/store",
        dataTambah,
        config
      )
      .then((res) => console.log(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleDetail = (id) => {
    const detailModal = document.querySelector("#detailModal");
    axios
      .get(
        `https://testcrud.fikrisabriansyah.my.id/api/product/show?product_id=${id}`,
        config
      )
      .then((res) => {
        setDetail(res.data.data);
        detailModal.classList.remove("hidden");
      })
      .catch((err) => console.log(err));
  };

  const handleHapus = (id) => {
    axios
      .delete(
        `https://testcrud.fikrisabriansyah.my.id/api/product/${id}`,
        config
      )
      .then((res) => {
        getAllData();
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    const updateModal = document.querySelector("#updateModal");
    axios
      .get(
        `https://testcrud.fikrisabriansyah.my.id/api/product/show?product_id=${id}`,
        config
      )
      .then((res) => {
        setUpdateId(id);
        setUpdateName(res.data.data.name);
        setUpdatePrice(res.data.data.price);
        updateModal.classList.remove("hidden");
      })
      .catch((err) => console.log(err));
  };

  const handleSimpanUpdate = () => {
    const updateData = {
      product_id: updateId,
      name: updateName,
      price: updatePrice,
    };
    axios
      .post(
        "https://testcrud.fikrisabriansyah.my.id/api/product/update",
        updateData,
        config
      )
      .then((res) => {
        getAllData();
        handleCloseModalUpdate();
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const getAllData = () => {
    axios
      .get("https://testcrud.fikrisabriansyah.my.id/api/product", config)
      .then((res) => setDataProduct(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    axios
      .post("https://testcrud.fikrisabriansyah.my.id/api/logout", config)
      .then((res) => {
        console.log(res);
        localStorage.removeItem("token");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllData();
  }, []);

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-[#f4f4f4] h-screen md:px-40">
      <div>
        <h2>Integrasi Api</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="flex justify-between py-6">
        <h2>Product</h2>
        <button
          onClick={handleModalTambah}
          className="bg-slate-500 text-white py-2 px-4 rounded-md"
        >
          Tambah
        </button>
      </div>
      {/* modal start */}
      <div
        id="modalTambah"
        className="bg-black bg-opacity-50 h-screen fixed left-0 top-0 right-0 bottom-0 flex justify-center items-center hidden"
      >
        <div className="bg-white p-12 rounded-md relative">
          <div
            onClick={handleCloseModalTambah}
            className="absolute right-2 top-2 cursor-pointer"
          >
            <img src={close} alt="close" />
          </div>
          <div className="mb-4">
            <h2>Tambah Product</h2>
          </div>
          <div className="mb-4">
            <div className="flex flex-col mb-2">
              <label className="mb-1">Barang</label>
              <input
                className="outline-none border-2 pl-2 py-1 rounded-md"
                id="barang"
                type="text"
                placeholder="Nama Barang"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Harga</label>
              <input
                className="outline-none border-2 pl-2 py-1 rounded-md"
                id="harga"
                type="number"
                placeholder="Harga"
              />
            </div>
          </div>
          <div>
            <button
              onClick={handleTambah}
              className="bg-slate-500 text-white rounded-md py-2 px-4"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
      {/* modal end */}

      {/* modal start Detail */}
      <div
        id="detailModal"
        className="bg-black bg-opacity-50 h-screen fixed left-0 top-0 right-0 bottom-0 flex justify-center items-center hidden"
      >
        <div className="bg-white rounded-md p-6 relative">
          <div
            onClick={handleCloseModalDetail}
            className="absolute right-2 top-2 cursor-pointer"
          >
            <img src={close} alt="close" />
          </div>
          <h2>Detail Product</h2>
          <div>
            <h3>Nama Barang</h3>
            <p>{detail.name}</p>
            <h3>Harga</h3>
            <p>{detail.price}</p>
          </div>
        </div>
      </div>
      {/* modal end Detail */}

      {/* modal start Update */}
      <div
        id="updateModal"
        className="bg-black bg-opacity-50 h-screen fixed left-0 top-0 right-0 bottom-0 flex justify-center items-center hidden"
      >
        <div className="bg-white rounded-md p-6 relative">
          <div
            onClick={handleCloseModalUpdate}
            className="absolute right-2 top-2 cursor-pointer"
          >
            <img src={close} alt="close" />
          </div>
          <h2>Edit Product</h2>
          <div>
            <h3>Nama Barang</h3>
            <input
              id="barang"
              className="outline-none border-2 focus:border-sky-400 rounded-md pl-3 py-2"
              type="text"
              value={updateName}
              onChange={(e) => setUpdateName(e.target.value)}
            />
            <h3>Harga</h3>
            <input
              id="harga"
              className="outline-none border-2 focus:border-sky-400 rounded-md pl-3 py-2"
              type="number"
              value={updatePrice}
              onChange={(e) => setUpdatePrice(e.target.value)}
            />
          </div>
          <button
            onClick={handleSimpanUpdate}
            className="bg-slate-500 text-white py-2 px-4 rounded-md"
          >
            Simpan
          </button>
        </div>
      </div>
      {/* modal end Update */}
      {dataProduct.map((res, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-md mb-4 p-4 flex"
        >
          <div className="basis-3/12">
            <label>Nama Barang</label>
            <h2>{res.name}</h2>
          </div>
          <div className="basis-6/12">
            <label>Harga</label>
            <p>{res.price}</p>
          </div>
          <div className="flex items-center w-full justify-between">
            <button onClick={() => handleDetail(res.id)}>Detail</button>
            <div className="flex items-center">
              <img
                onClick={() => handleEdit(res.id)}
                className="mr-4 cursor-pointer"
                src={edit}
                alt="edit"
              />
              <img
                onClick={() => handleHapus(res.id)}
                className="cursor-pointer"
                src={hapus}
                alt="hapus"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;

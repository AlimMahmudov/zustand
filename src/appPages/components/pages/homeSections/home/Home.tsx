"use client";
import { useEffect, useState } from "react";
import scss from "./Home.module.scss";
import zustand from "@/stores/zustand";

const Home = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [imageEdit, setImageEdit] = useState("");
  const [titleEdit, setTitleEdit] = useState("");
  const [isEdit, setIsEdit] = useState<number | null>(null);
  const { GetProduct, PostProduct, DeleteProduct, PatchProduct, product } =
    zustand();

  const onSubmit = async () => {
    const newProduct = {
      image,
      title,
    };
    await PostProduct(newProduct);
    setImage("");
    setTitle("");
  };

  const onSubmitEdit = async () => {
    if (isEdit !== null) {
      const newProduct = {
        image: imageEdit,
        title: titleEdit,
      };
      await PatchProduct(isEdit, newProduct);
      setIsEdit(null);
      setImageEdit("");
      setTitleEdit("");
    }
  };

  useEffect(() => {
    GetProduct();
  }, [GetProduct]);

  return (
    <div id={scss.Home}>
      <div className="container">
        <div className={scss.home}>
          <h1>Todo List</h1>
          <div className="">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title"
            />
            <input
              type="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

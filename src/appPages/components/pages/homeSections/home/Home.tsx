"use client";
import { useEffect, useState } from "react";
import scss from "./Home.module.scss";
import zustand from "@/stores/zustand";
import Image from "next/image";

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
    // Отправка нового продукта на сервер
    await PostProduct(newProduct);

    // Обновляем состояние с новыми продуктами
    zustand.setState({
      product: [...product, newProduct], // Добавляем новый продукт в список
    });

    // Очищаем поля ввода
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

      // Обновляем состояние с новыми значениями продукта
      const updatedProduct = product.map((p) =>
        p._id === isEdit ? { ...p, image: imageEdit, title: titleEdit } : p
      );

      zustand.setState({ product: updatedProduct }); // Обновляем состояние с новыми данными

      // Очистка состояния редактирования
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
          <p>
            https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg
          </p>
          <p>https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg</p>
          <p>
            https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg
          </p>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="image"
          />

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
          />

          <button onClick={onSubmit}>add</button>

          {product.map((el, index) => (
            <div key={el._id || `product-${index}`}>
              {isEdit === el._id ? (
                <>
                  <input
                    type="text"
                    value={titleEdit}
                    onChange={(e) => setTitleEdit(e.target.value)}
                    placeholder="title"
                  />
                  <input
                    type="text"
                    value={imageEdit}
                    onChange={(e) => setImageEdit(e.target.value)}
                    placeholder="image"
                  />
                  <button onClick={onSubmitEdit}>Confirm</button>
                </>
              ) : (
                <>
                  {el.image ? ( // Убедитесь, что src не пустой
                    <Image
                      src={el.image.trimStart()} // Убираем начальные пробелы
                      width={300}
                      height={300}
                      alt={el.title}
                    />
                  ) : (
                    <p>Image not available</p> // Покажите альтернативный контент, если image пустой
                  )}
                  <h1>{el.title}</h1>
                  <button onClick={() => DeleteProduct(el._id)}>Delete</button>
                  <button
                    onClick={() => {
                      setIsEdit(el._id);
                      setImageEdit(el.image);
                      setTitleEdit(el.title);
                    }}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

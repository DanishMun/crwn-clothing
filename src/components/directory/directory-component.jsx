import CategoryItem from "../category-item/category-item";
import "./directory-style.scss";

const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map((catagory) => (
        <CategoryItem key={catagory.id} categories={catagory} />
      ))}
    </div>
  );
};

export default Directory;

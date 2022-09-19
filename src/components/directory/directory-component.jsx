import CategoryItem from "../category-item/category-item";
import "./directory-style.scss";

const Directory = ({ catagories }) => {
  return (
    <div className="directory-container">
      {catagories.map((catagory) => (
        <CategoryItem key={catagory.id} catagories={catagory} />
      ))}
    </div>
  );
};

export default Directory;

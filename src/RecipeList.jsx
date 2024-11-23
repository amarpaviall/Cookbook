import { useEffect } from "react";
import { useState } from "react";

function RecipeList() {
  const [items, setItems] = useState([]);
  const [isLoding, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => response.json())
      .then((results) => {
        //console.log(results.categories);
        setIsLoading(false);
        setItems(results.categories);
      })
      .catch(() => {
        setIsLoading(false);
        setErrorMessage("There was an error");
      });
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      {isLoding && <div>Loding .......</div>}
      {items && (
        <ul>
          {items.map((item) => (
            <li key={item.idCategory}>
              <img src={item.strCategoryThumb} />
              {/* <a href={`${item.idCategory}`}>{item.strCategory}</a> */}
              <h3>{item.strCategory}</h3>
              <p>{item.strCategoryDescription}</p>
            </li>
          ))}
        </ul>
      )}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
}

export default RecipeList;

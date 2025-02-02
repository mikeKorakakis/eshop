import { getProducts } from '@/lib/actions';
import './searchBar.css';
import { useEffect, useState } from 'react';
import { Product } from '@/types';
import { Dictionary } from '@/lib/get-dictionary';

interface Props {
  dictionary: Dictionary;
  lng: string;
}

export default function SearchBar({ dictionary, lng }: Props) {
  const [data, setData] = useState<Product[]>([]);
  const [filter, setFilter] = useState<Product[]>([]);
  const [search, setSearch] = useState<boolean>(false);
  const common_dictionary = dictionary.common;

  async function fetchProducts() {
    if (data.length === 0) {
      let products = await getProducts();
      if (products && products.length > 0) {
        setData(products);
      }
    }
  }
  useEffect(() => {
    fetchProducts();
  }, [data]);

  const searchProducts = async (text: string) => {
    let temp = [...data];
    if (text) {
      const newData = temp.filter((item, index) => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilter(newData);
    
      console.log(newData);
    } else {
      setFilter([]);
      
    }
  };

  return (
    <>
      <input
        className="searchInput"
        type="text"
        placeholder="Search..." onSelect={()=>{setSearch(true)}} 
        onChange={(e) => {
          searchProducts(e.target.value);
        }}
      />

      {search && <div className="searchOverlay" onClick={()=>{setSearch(false)}}>
        {filter.length > 0 && (
          <div className="searchContainer">
            {filter.map((item: Product, index: number) => (
              <div className="searchItem" key={item.product_id}>
                <a
                  href={`/${lng}/product/${item.product_id}`}
                  onClick={() => {
                    setFilter([]);
                  }}
                >
                  <h4 className="searchTitle">{item.name}</h4>
                  <p className="searchText">{item.price} €</p>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>}
    </>
  );
}

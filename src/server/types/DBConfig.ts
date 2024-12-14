import CardInterface from "./Card";

interface DBConfigInterface {
  commonAttributes: CardInterface;
  gameSpecificAttributes: Record<string, CardInterface>;
  indexing: Array<object>;
  gameDataUrls: Record<string, string>;
}

export default DBConfigInterface;

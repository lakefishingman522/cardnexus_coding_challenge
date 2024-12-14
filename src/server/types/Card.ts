type FieldSchema = {
  type:
    | StringConstructor
    | NumberConstructor
    | DateConstructor
    | ArrayConstructor
    | ObjectConstructor;
  required?: boolean;
  unique?: boolean;
  enum?: Array<any>;
};

interface CardInterface {
  [key: string]: FieldSchema;
}

export default CardInterface;

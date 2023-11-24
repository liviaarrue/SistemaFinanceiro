import "./index.css";
import { TableItem } from "../TableItem";

// Insira a prop list
export const TableArea = ({ list }) => {
  return (
    <table className="table">
      <thead>
        <tr>
        <th className="tableHeadColumn" style={{ width: 100 }}>Data</th>
        <th className="tableHeadColumn" style={{ width: 130 }}>Categoria</th>
        <th className="tableHeadColumn" style={{ width: 140 }}>Título</th>
        <th className="tableHeadColumn" style={{ width: 150 }}>Valor</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item, index) => {
          return  <TableItem key={index} item={item} />
})}
      </tbody>
    </table>
    /*
      
        Dentro do tbody faça um map em list e dentro do map chame o componente TasbleItem, passando as props necessárias.
      */
  );
};

import { useState } from "react";
import "./index.css";
import { categories } from "../../data/categories"

export const InputArea = ({onAdd}) => {
  const [dateField, setDateField] = useState("");
  const [categoryField, setCategoryField] = useState("");

  const [titleField, setTitleField] = useState("");

  const [valueField, setValueField] = useState(0);


  let categoryKeys = Object.keys(categories);


  const handleAddEvent = () => {
    let errors = []

    if (isNaN(new Date(dateField).getTime())) {
      errors.push("Data inválida!");
    }
    if (!categoryKeys.includes(categoryField)) {
      errors.push("Categoria inválida!");
    }
    if (titleField === "") {
      errors.push("Título vazio!");
    }
    if (valueField <= 0) {
      errors.push("Valor inválido!");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
    } else {
      onAdd({
        date: new Date(dateField.concat("T00:00")),
        category: categoryField,
        title: titleField,
        value: valueField,
      });
      clearFields();
  }
}


  /* 
    Crie uma função handleaddEvent.
    Dentro crie uma  let errors = [];
    Faça as verificações se os campos estão vazios. Caso esteja vazio dê um push em error com a mensagem de erro.
    Faça uma verificação se errors.length > 0, insira alert(errors.join("\n"));
    Se for false, no else chame a função onAdd passando o objeto com os valores dos inputs e chame a função clearFields.
  */

  // Crie uma função clearFields e limpe todos os campos do formulário.
  const clearFields = () => {
    setDateField("");
    setCategoryField("");
    setTitleField("");
    setValueField(0);
  }

  return (
    <div className="form-container">
      <label className="inputLabel">
        <div className="inputTitle">Data</div>
        <input className="input" type="date" value={dateField} onChange={(e) => setDateField(e.target.value)} />
      </label>
      <label className="inputLabel">
        <div className="inputTitle">Categoria</div>
        <select
          className="select" 
          /*
             Insira no value o categoryField e no onChange  (e) => setCategoryField(e.target.value).
          */
          value={categoryField}
          onChange={(e) => setCategoryField(e.target.value)}
        >
          <>
            <option></option>
            {categoryKeys.map((key, index) => (
              <option key={index} value={key}>
                {categories[key].title}
              </option>
            ))}
            {/*
            Crie um map em categoryKeys.
            Dentro do map insira a tag <option  key={index} value={key}></option>.
            Dentro da tag insira {categories[key].title}.
        */}
          </>
        </select>
      </label>
      <label className="inputLabel">
        <div className="inputTitle">Título</div>
        <input className="input" value={titleField} onChange={(e) => setTitleField(e.target.value)}/>

      </label>
      <label className="inputLabel">
        <div className="inputTitle">Valor</div>
        <input className="input" type="number" value={valueField} onChange={(e) => setValueField(parseFloat(e.target.value))}/>
      </label>
      <label className="inputLabel">
        <div>&nbsp;</div>
        <button className="button" onClick={handleAddEvent}>Adicionar</button>
      </label>
    </div>
  );
};

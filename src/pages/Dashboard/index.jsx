import { useNavigate } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";
import { InfoArea } from "../../components/InfoArea";
import { getCurrentMonth, filterListByMonth } from "../../helpers/dateFilter";
import { InputArea } from "../../components/InputArea";
import { categories } from "../../data/categories";
import { TableArea } from "../../components/TableArea";


const Dashboard = () => {
  const navigate = useNavigate();
  const authenticated = JSON.parse(localStorage.getItem("authenticated"));

  const [list, setList] = useState([])

  const [filteredList, setFilteredList] = useState([])

  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth()) 

  const [income, setIncome] = useState(0)

  const [expense, setExpense] = useState(0)

  
  useEffect(() => {
    /*const monthList = filterListByMonth(list, currentMonth)
    setFilteredList(monthList)
 
 */

    setFilteredList(filterListByMonth(list, currentMonth));
  }, 
  [list, currentMonth, setFilteredList]);

  /*
  LEMBRAR
      Crie um useEffect que tenha list, currentMonth e setFilteredList como dependência.
      Dentro dele crie uma const monthList que recebe o valor da função filterListByMonth(list, currentMonth)
      Use setFilteredList com o valor da monthList.
  */

  useEffect(() => {
    let incomeCount = 0
    let expenseCount = 0

    for(let i in filteredList) {
      if (categories[filteredList[i].category].expense) {
        expenseCount += filteredList[i].value
       
      } else {
        incomeCount += filteredList[i].value
      }

      
    }

    setIncome(incomeCount)
    setExpense(expenseCount)
  }, [filteredList])
  /*
    Crie um useEffect que tenha filteredList como dependência.
    Crie uma let incomeCount que recebe 0.
    Crie uma let expenseCount que recebe 0.
    Crie um laço for (let i in filteredList) {}.
    Dentro do laço crie um if e verifique se categories[filteredList[i].category].expense.
    Se for verdadeiro incremente expenseCount com filteredList[i].value.
    Se for falso, incremente incomeCount com filteredList[i].value.
    Use o setIncome com o valor de incomeCount.
    Use o setExpense com o valor de expenseCount.
  */

    const handleMonthChange = (newMonth) => {
      setCurrentMonth(newMonth)

    }
  // Crie uma função handleMonthChange que recebe um newMonth. Dentro dela use o setCurrentMonth com o valor recebido na função


  const handleAddItem = (item) => {
    let newList = [...list]
    newList.push(item)
    setList(newList)
    localStorage.setItem("finances", JSON.stringify(newList))
  }
  /* Crie uma função handleAddItem que recebe um item. Dentro dela crie uma let newList que recebe uma cópia do array list.
      Em seguida dê push em newList com o valor de item.
      Em seguida use setList com o valor de newList.
  */

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.setItem("authenticated", "false");
    navigate("/login");
  };

  if (!authenticated) {
    navigate("/login");
  }

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("finances"));
    if (savedList) {
      setList(savedList);
    }
  }, []);


  return (
    <div>
      <div className="header">
        <h1 className="headerText">Sistema Financeiro</h1>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="body">
        {/* Insira a InfoArea e suas props */}
        <InfoArea currentMonth={currentMonth} onMonthChange={handleMonthChange} income={income} expense={expense}/>

        {/* Insira a InputArea e sua prop */}
        <InputArea onAdd={handleAddItem}/>

        {/* Insira a TableArea e sua prop */}
        <TableArea list={filteredList} />
      </div>
    </div>
  );
};

export default Dashboard;

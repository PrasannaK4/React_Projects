import React, { useEffect, useState, useRef } from 'react'

function App() {
  const [item, setItem] = useState([]);
  const [input, setInput] = useState("");
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState('');
  const inputRef = useRef(null);

  function handleItem(e) {
    setInput(e.target.value)
  }

  function handleAmount(e) {
    const { value } = e.target;
    if (!isNaN(value)) {
      setAmount(value)
    } else {
      alert('Please enter a valid number for amount.');
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim() || !amount.trim()) {
      return;
    }
    setItem([...item, { name: input, amount: amount }])
    console.log(item)
    setInput('');
    setAmount('');
    inputRef.current.blur();
  }

  function handleClear(e) {
    e.preventDefault();
    setItem([])
    setInput('');
    setAmount('');
    setTotal(0);
    inputRef.current.focus();
  }

  function deleteListItem(index) {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedList = item.filter((_e, i) => index !== i);
      setItem(updatedList);
    }
  }

 
  function increaseTotal(index) {
    const selectedItem = item[index];
    const itemPrice = parseInt(selectedItem.amount);
    if (!isNaN(itemPrice)) {
      const updatedTotal = total + itemPrice;
      setTotal(updatedTotal);
    }
  }
  
  
  
  useEffect(() => {
    let totalAmount = item.reduce((acc, curr) => acc + parseInt(curr.amount), 0);
    setTotal(totalAmount);
  }, [item])

  return (
    <div className='container'>
      <div className="App">
        <p className='Expense-Tracker'>Expence Tracker</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="item">Item :</label>
          <input ref={inputRef} type='text' id='item' value={input} placeholder='input for the item' onChange={handleItem} /> <br />
          <label htmlFor="amount">Amount :</label>
          <input type='number' id='amount' value={amount} placeholder='input for the amount' onChange={handleAmount} /><br />
          <button type="submit">Add Item</button>
          <button onClick={handleClear}>Clear Item</button>
        </form>
        <ul>
          {item.map((element, index) =>
            <li key={index} className='listData'>
              <div>{element.name} : {element.amount + '.00'}</div>
              <div>
                <i key={index} onClick={() => deleteListItem(index)} className="fa-solid fa-trash"></i>
                <i key={index} onClick={() => increaseTotal(index)} className="fas fa-plus"></i>
              </div>
            </li>
          )}
        </ul>
        <p id="total">Total: {total}.00</p>

      </div>
    </div>
  );
}

export default App;

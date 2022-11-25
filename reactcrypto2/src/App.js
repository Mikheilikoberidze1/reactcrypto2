import { useEffect, useState } from 'react';
import './App.css';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from './gel.png';
import green from './green.png';

function App() {
  const [number1, setNumber1] = useState('');
  const [sum, setSum] = useState();
  const [oper, setOper] = useState('');
  const [oper2, setOper2] = useState('');
  const [datas,setDatas] = useState([]);
  const numberFormatter = Intl.NumberFormat('en-US');
  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
  function Capitalise(x){
   return x.charAt(0).toUpperCase()+ x.slice(1)
  }
  const fetchData = async () => {
    const result = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cbinancecoin%2Csolana%2Ctether%2Cdogecoin%2Cflow%2Cstellar&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=false&precision=false',
    );
    const data = await result.json();
    setDatas(data);
    };
  useEffect(() => {
    fetchData();
    
      const result = (Number(number1)*Number(oper))/Number(oper2);
      setSum(result);

    },[sum,oper2,oper,number1]);
  return (
    
    <html>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="http://localhost:3000/">
            <img
              src={logo}
              alt=""
              width="40"
              height="40"
              className="d-inline-block align-top"
            />{' '}
            React Coin Store
          </Navbar.Brand>
        </Container>
      </Navbar>
    <div className='tbl'>
    <Table striped bordered="true" hover variant="dark">
    <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>24h Change</th>
                  <th>24h Volume</th>
                  <th>Market Cap</th>
                </tr>
              </thead>
              <tbody>  
              {Object.entries(datas).map(([key,value])=>
               <tr>  <td> <div><img className='coinimg' src={require(`./images/${key}.png`)} alt="Coin img"></img>{Capitalise(key)}</div>
                 </td> 
                 <td>
                 <div>${numberFormatter.format(value.usd.toFixed(2))}</div>
                </td>
                <td>
                 <div>{value.usd_24h_change.toFixed(2)}%</div>
                 </td>
                 <td>
                 <div>${numberFormatter.format(value.usd_24h_vol.toFixed(2))}</div>
                
                </td>
                <td>
                 <div>${numberFormatter.format(value.usd_market_cap.toFixed(2))}</div>
                </td>
                  </tr>)}
</tbody>
     </Table>
  </div>
        <div className='converter'>
        <input className='convinput'  type="text" 
               value={number1} 
               onChange={(event) => setNumber1(event.target.value)} 
        />
        </div>
        <div className='converter2'>
        <select className='convinput' name="opr" id="opr"  onChange={(event) => setOper(event.target.value)}>
        {Object.entries(datas).map(([key,value])=>
                 <option value={value.usd}>{Capitalise(key)}</option>
                )}
        </select>
        <label><img src={green} width="15" height="15" alt=""/></label>
       <select className='convinput' name="opr2" id="opr2" onChange={(event) => setOper2(event.target.value)}>
        {Object.entries(datas).map(([key,value])=>
                 <option value={value.usd}>{Capitalise(key)}</option>
                )}
        </select>
        </div>
        <div className='converter2'>
        <p className='result'>
         {numberFormatter.format(financial(sum))}
        </p>
        </div>
  </html>
  );
}
export default App;

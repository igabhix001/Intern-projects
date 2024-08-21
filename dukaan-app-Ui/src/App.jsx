import { Slidebar } from './components/Slidebar';
import { Topbar } from './components/topbar';
import { Overview } from './components/Overview';
import { Transection } from './components/Transection';
import { Table } from './components/Table';
import {Footer} from './components/footer';

import './App.css';

function App() {


  return (
    <div>
      <div> <Slidebar /></div>
      <div className="border-b border-black-150 sm:pl-64"><Topbar /></div>
      <div className=' m-5 mb-0 sm:ml-64 grid gap-8'><Overview />
        <div className='grid gap-6'>
          <Transection />
          <Table />
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default App

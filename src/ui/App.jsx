import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import User from './pages/User';
import RegisterForm from './pages/Register';
import Login from './pages/Login';
import Layout from './layouts/Layout';
import AuthLayout from './layouts/AuthLayout';
import Frame from './components/Frame'
import Footer from './components/Footer';
import Production from './pages/Production';
import Maintenance from './pages/Maintenance';
import Machine from './pages/Machine';
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import Profile from './pages/Profile';
import OrderFabrication from './pages/OrderFabrication';
import Personnel from './pages/Personnel';
import Atelier from './pages/Atelier';
import ShowAtelier from './pages/ShowAtelier';
import Roles from './pages/Roles';
import ViewRole from './pages/ViewRole';

function App() {
  return (
    <>
   
      <Routes>
        {/* Authentication Routes */}
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<Login />} />
        </Route>
        <Route path='/atelier/:id' element={<ShowAtelier />} />

        {/* Main Layout Routes */}
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/production' element={<Production />} />
          <Route path='/maintenance' element={<Maintenance />} />
          <Route path='/machines' element={<Machine />} />
          <Route path='/of' element={<OrderFabrication />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/users' element={<User />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/personnel' element={<Personnel />} />
          <Route path='/ateliers' element={<Atelier />} />
          <Route path='/roles' element={<Roles />} />
          <Route path='/roles/:id' element={<ViewRole />} />
          
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App;
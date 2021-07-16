import './styles/style.scss';
import Routes from './router/Routes';
import Nav from './components/nav/Nav';
import NavMobile from './components/nav/NavMobile';
import { useDispatch, useSelector } from 'react-redux'
import NotificationsSystem, { atalhoTheme, dismissNotification } from 'reapop'
import { setUpNotifications } from 'reapop'
import {
  BrowserRouter as Router,
} from "react-router-dom";


function App() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications)
  setUpNotifications({
    defaultProps: {
      position: 'top-center',
      dismissible: true,
      dismissAfter: 3000
    }
  })
  return (
    <Router>
      <NotificationsSystem
        notifications={notifications}
        smallScreenBreakpoint={500}
        dismissNotification={(id) => dispatch(dismissNotification(id))}
        theme={atalhoTheme}
      />
      <Nav />
      <NavMobile />
      <Routes />
    </Router>
  );
}

export default App;

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import TasksList from './tabs/TasksList.jsx';
import TaskCreate from './tabs/TaskCreate.jsx';
import TaskInsights from './tabs/TaskInsights.jsx';
import Sidebar from './component/Sidebar.jsx';

export default function App(){
    return (
        <Router>
            <div className="flex bg-[#D1D1D1]">
                <Sidebar />
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<TaskCreate/>}/>
                        <Route path="/tasks" element={<TasksList/>}/>
                        <Route path="/insights" element={<TaskInsights/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}
   



import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import puzzles from './assets/puzzles';
import GameScreen from './Components/GameScreen/GameScreen'
import { HomeScreen } from './Components/HomeScreen/HomeScreen';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeScreen/>} />
                <Route path="/:puzzleID" element={<GameScreen />} />
            </Routes>
      </BrowserRouter>

    )
}

export default App

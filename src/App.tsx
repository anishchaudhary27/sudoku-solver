import { useEffect, useState } from "react"

const initState = [
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null]
]

const cols = [
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false]
]

const rows = [
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false]
]

const boxes = [
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false]
]

type boxVal = null | number

function SolveSudoku(state: boxVal[][], n: number): boxVal[][] | null {
  if (n == 81) {
    return state
  }
  const j = n % 9
  const i = (n - j) / 9
  if (state[i][j] !== null) {
    return SolveSudoku(state, n + 1)
  }
  for (let key = 1; key < 10; key++) {
    if (cols[j][key - 1] == true || rows[i][key - 1] == true || boxes[(i - i % 3) + (j - j % 3) / 3][key - 1] == true) {
      continue
    }
    state[i][j] = key
    cols[j][key - 1] = true
    rows[i][key - 1] = true
    boxes[(i - i % 3) + (j - j % 3) / 3][key - 1] = true
    const ret = SolveSudoku(state, n + 1)
    cols[j][key - 1] = false
    rows[i][key - 1] = false
    boxes[(i - i % 3) + (j - j % 3) / 3][key - 1] = false
    if (ret != null) {
      return ret
    }
    state[i][j] = null
  }
  return null
}

function App() {
  const [state, setState] = useState<boxVal[][]>(initState.slice())
  const [editable, setEditable] = useState(true)
  const [selected, setSelected] = useState({
    x: -1,
    y: -1
  })
  const [solving, setSolving] = useState(false)

  useEffect(() => {
    const tmp = state.slice()
    setState(tmp)
  }, [selected])

  const handleClick = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>, i: number, j: number) => {
    if (solving) return
    setSelected({
      x: i,
      y: j
    })

  }

  const handleSolve = () => {
    setSolving(true)
    setEditable(false)
    const ret = SolveSudoku(state.slice(), 0)
    if (ret) {
      setState(ret)
    }
    else {
      window.alert("no solution found!")
    }
    setSolving(false)
  }

  const onInput = (key: boxVal) => {
    if (!editable) return
    if (selected.x != -1) {
      if (key) {
        if (cols[selected.y][key - 1] == false && rows[selected.x][key - 1] == false && boxes[(selected.x - selected.x % 3) + (selected.y - selected.y % 3) / 3][key - 1] == false) {
          const tmp = state.slice()
          tmp[selected.x][selected.y] = key
          setSelected({
            x: -1,
            y: -1
          })
          setState(tmp)
          cols[selected.y][key - 1] = true
          rows[selected.x][key - 1] = true
          boxes[(selected.x - selected.x % 3) + (selected.y - selected.y % 3) / 3][key - 1] = true
        }
      }
      else {
        if (state[selected.x][selected.y] !== null) {
          const tmp = state.slice()
          // @ts-ignore: Object is possibly 'null'.
          cols[selected.y][state[selected.x][selected.y] - 1] = false
          // @ts-ignore: Object is possibly 'null'.
          rows[selected.x][state[selected.x][selected.y] - 1] = false
          // @ts-ignore: Object is possibly 'null'.
          boxes[(selected.x - selected.x % 3) + (selected.y - selected.y % 3) / 3][state[selected.x][selected.y] - 1] = false
          tmp[selected.x][selected.y] = key
          setSelected({
            x: -1,
            y: -1
          })
          setState(tmp)
        }
      }
    }
  }

  const handleReset = () => {
    setEditable(true)
    setState([
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null]
    ])
    setSolving(false)
    setSelected({
      x: -1,
      y: -1
    })
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        boxes[i][j] = false
        cols[i][j] = false
        rows[i][j] = false
      }
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center mb-10">
      <h1 className="mt-[50px] text-4xl font-semibold">Sudoku Solver</h1>
      <div className="border-4 border-indigo-500  mt-[20px] rounded text-slate-900" tabIndex={0}>
        {
          state.map((row, i) => {
            return (
              <div className="flex" key={i}>
                {
                  row.map((box, j) => {
                    if (selected.x === i && selected.y === j) {
                      if (j == 2 || j == 5) {
                        if (i == 2 || i == 5) {
                          return <p key={i * 9 + j} onClick={(e) => handleClick(e, i, j)} className="h-[40px] w-[40px] flex items-center font-medium justify-center border-t-[1px] border-b-[4px] border-l-[1px] bg-slate-300 border-r-[4px] border-slate-200 hover:bg-slate-200 active:bg-slate-300 cursor-pointer">{box}</p>
                        }
                        else {
                          return <p key={i * 9 + j} onClick={(e) => handleClick(e, i, j)} className="h-[40px] w-[40px] flex items-center font-medium justify-center border-y-[1px] border-l-[1px] border-r-[4px] bg-slate-300 border-slate-200 hover:bg-slate-200 active:bg-slate-300 cursor-pointer">{box}</p>
                        }
                      }
                      else {
                        if (i == 2 || i == 5) {
                          return <p key={i * 9 + j} onClick={(e) => handleClick(e, i, j)} className="h-[40px] w-[40px] flex items-center font-medium justify-center border-x-[1px] border-t-[1px] border-b-[4px] bg-slate-300 border-slate-200 hover:bg-slate-200 active:bg-slate-300 cursor-pointer">{box}</p>
                        }
                        else {
                          return <p key={i * 9 + j} onClick={(e) => handleClick(e, i, j)} className="h-[40px] w-[40px] flex items-center font-medium justify-center border-[1px] border-slate-200 hover:bg-slate-200 bg-slate-300 active:bg-slate-300 cursor-pointer">{box}</p>
                        }
                      }
                    }
                    else {
                      if (j == 2 || j == 5) {
                        if (i == 2 || i == 5) {
                          return <p key={i * 9 + j} onClick={(e) => handleClick(e, i, j)} className="h-[40px] w-[40px] flex items-center font-medium justify-center border-t-[1px] border-b-[4px] border-l-[1px] border-r-[4px] border-slate-200 hover:bg-slate-200 active:bg-slate-300 cursor-pointer">{box}</p>
                        }
                        else {
                          return <p key={i * 9 + j} onClick={(e) => handleClick(e, i, j)} className="h-[40px] w-[40px] flex items-center font-medium justify-center border-y-[1px] border-l-[1px] border-r-[4px] border-slate-200 hover:bg-slate-200 active:bg-slate-300 cursor-pointer">{box}</p>
                        }
                      }
                      else {
                        if (i == 2 || i == 5) {
                          return <p key={i * 9 + j} onClick={(e) => handleClick(e, i, j)} className="h-[40px] w-[40px] flex items-center font-medium justify-center border-x-[1px] border-t-[1px] border-b-[4px] border-slate-200 hover:bg-slate-200 active:bg-slate-300 cursor-pointer">{box}</p>
                        }
                        else {
                          return <p key={i * 9 + j} onClick={(e) => handleClick(e, i, j)} className="h-[40px] w-[40px] flex items-center font-medium justify-center border-[1px] border-slate-200 hover:bg-slate-200 active:bg-slate-300 cursor-pointer">{box}</p>
                        }
                      }
                    }
                  })
                }
              </div>
            )
          })
        }
      </div>
      {
        solving &&
        <button className="mt-[20px] bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
          STOP
        </button>
      }
      {
        !solving &&
        <div className="flex mt-[20px] w-[200px] justify-between">
          <button onClick={handleReset} className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full">
            RESET
          </button>
          <button onClick={handleSolve} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            SOLVE
          </button>
        </div>
      }
      <div className="mt-[20px] flex flex-col items-center">
        <div className="flex">
          <button onClick={() => onInput(1)} className="mr-[5px] bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">1</button>
          <button onClick={() => onInput(2)} className="mr-[5px] bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">2</button>
          <button onClick={() => onInput(3)} className="mr-[5px] bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">3</button>
        </div>
        <div className="flex mt-[5px]">
          <button onClick={() => onInput(4)} className="mr-[5px] bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">4</button>
          <button onClick={() => onInput(5)} className="mr-[5px] bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">5</button>
          <button onClick={() => onInput(6)} className="mr-[5px] bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">6</button>
        </div>
        <div className="flex mt-[5px]">
          <button onClick={() => onInput(7)} className="mr-[5px] bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">7</button>
          <button onClick={() => onInput(8)} className="mr-[5px] bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">8</button>
          <button onClick={() => onInput(9)} className="mr-[5px] bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">9</button>
        </div>
        <button onClick={() => onInput(null)} className="mt-[5px] bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          CLEAR
        </button>
      </div>
    </div >
  )
}

export default App

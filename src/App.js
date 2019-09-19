import React, { useReducer } from 'react';
import { Layout } from './components/Layout';
import { Button }  from './components/Button';
import { FormulaScreen } from './components/FormulaScreen';
import { Display } from './components/Display';
import './App.scss';

const initialState = {
	onDisplay: '0',
	history: [],
	result: ''
};

const CLICK_AC = 'CLICK_AC';
const CLICK_NUMBER = 'CLICK_NUMBER';
const CLICK_MATHEMATICAL_ACTION = 'CLICK_MATHEMATICAL_ACTION';
const CLICK_EQUALS = 'CLICK_EQUALS';
const CLICK_DECIMAL = 'CLICK_DECIMAL';

const reducer = (state, action) => {
	const len = state.history.length;
	const last = state.history[len - 1];

	switch(action.type) {
		case CLICK_AC:
			return {...state, ...initialState};
		case CLICK_NUMBER:
			return {
				...state,
				onDisplay: state.onDisplay ==='0' || isNaN(state.onDisplay) || state.result ? action.value : state.onDisplay + action.value,
				history: state.result ? [action.value] : last ==='0' ? [...state.history.slice(0, len - 1), action.value] : [...state.history, action.value],
				result: ''
			};
		case CLICK_MATHEMATICAL_ACTION:
			return {
				...state,
				onDisplay: action.value,
				history: state.result ? [state.result, action.value] : 
						last === action.value ? [...state.history] :
						len > 2 && last ==='-' && isNaN(action.value) ? [...state.history.slice(0, len - 2) ,action.value] :
						isNaN(last) && action.value !== '-' ? [...state.history.slice(0, len - 1), action.value] :
						[...state.history, action.value],
				result: ''
			};
		case CLICK_EQUALS:
			try {
				var answer = Math.round(1000000000000 * eval(state.history.join(''))) / 1000000000000;
			}
			catch(e) {
				console.log(e);
			}
			return {
				...state,
				onDisplay: answer,
				history: [...state.history, '=', answer],
				result: answer
			};
		case CLICK_DECIMAL:
			return {
				...state,
				onDisplay: state.result || isNaN(state.onDisplay) ? '0.' : ~state.onDisplay.indexOf('.') ? state.onDisplay : state.onDisplay + '.',
				history: state.result || !state.history.length ? ['0.'] : [...state.history, '.'],
				result: ''
			}
		default: return state
	}
}

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const handleClick = (e) => {
		const { value } = e.target;
		if (value ==='AC') dispatch({type: CLICK_AC});
		if (value ==='+' || value ==='-' || value ==='/') dispatch({type: CLICK_MATHEMATICAL_ACTION, value});
		if (value ==='x') dispatch({type: CLICK_MATHEMATICAL_ACTION, value: '*'});
		if (value >=0 && value < 10) dispatch({type: CLICK_NUMBER, value});
		if (value === '=') dispatch({type: CLICK_EQUALS});
		if (value === '.') dispatch({type: CLICK_DECIMAL});
	}

  return (
	<Layout>
		<div className='calculator'>
			<FormulaScreen value={state.history} />
			<Display value={state.onDisplay}/>
			<div>
				<Button className='btn wide red' id='clear' value='AC' handleClick={handleClick}/>
				<Button className='btn grey' id='divide' value='/' handleClick={handleClick}/>
				<Button className='btn grey' id='multiply' value='x' handleClick={handleClick}/>
				<Button className='btn' id='seven' value='7' handleClick={handleClick}/>
				<Button className='btn' id='eight' value='8' handleClick={handleClick}/>
				<Button className='btn' id='nine' value='9' handleClick={handleClick}/>
				<Button className='btn grey' id='subtract' value='-' handleClick={handleClick}/>
				<Button className='btn' id='four' value='4' handleClick={handleClick}/>
				<Button className='btn' id='five' value='5' handleClick={handleClick}/>
				<Button className='btn' id='six' value='6' handleClick={handleClick}/>
				<Button className='btn grey' id='add' value='+' handleClick={handleClick}/>
				<Button className='btn' id='one' value='1' handleClick={handleClick}/>
				<Button className='btn' id='two' value='2' handleClick={handleClick}/>
				<Button className='btn' id='three' value='3' handleClick={handleClick}/>
				<Button className='btn wide' id='zero' value='0' handleClick={handleClick}/>
				<Button className='btn' id='decimal' value='.' handleClick={handleClick}/>
				<Button className='btn equals' id='equals' value='=' handleClick={handleClick}/>
			</div>
		</div>
    </Layout>
  );
}

export default App;
